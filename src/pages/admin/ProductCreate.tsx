import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Plus,
    Save,
    X,
    Loader2,
    Upload,
    CheckCircle,
    AlertCircle,
    ImageIcon,
    Tag,
} from 'lucide-react';
import { getCategories, getBrandsByCategory, getProducts } from '../../services/productService';
import { uploadProductCoverImage, uploadProductGalleryImages, createProductApi } from '../../services/uploadService';
import type { ApiCategory, ApiBrand } from '../../types/apiProduct';
import DynamicSpecForm, { type SpecRecord } from '../../components/admin/DynamicSpecForm';
import { orderSpecifications } from '../../config/specDefinitions';
import CKEditor5Component from '../../components/admin/CKEditor5';

/* ─────────────────────────── constants ─────────────────────────── */

/** Map category slug/keyword → SKU prefix */
const SKU_PREFIX_MAP: { keywords: string[]; prefix: string }[] = [
    { keywords: ['pc', 'máy tính', 'nguyen-bo', 'nguyen bo', 'bộ pc', 'nguyên bộ'], prefix: 'PC' },
    { keywords: ['tản nhiệt', 'cooler', 'cooling'], prefix: 'CLR' },
    { keywords: ['cpu', 'bộ xử lý', 'processor'], prefix: 'CPU' },
    { keywords: ['vga', 'card', 'màn hình rời', 'gpu'], prefix: 'GPU' },
    { keywords: ['ram', 'bộ nhớ'], prefix: 'RAM' },
    { keywords: ['ssd', 'hdd', 'ổ cứng', 'storage'], prefix: 'STO' },
    { keywords: ['mainboard', 'main', 'bo mạch'], prefix: 'MB' },
    { keywords: ['nguồn', 'psu', 'power'], prefix: 'PSU' },
    { keywords: ['case', 'vỏ máy', 'thùng máy'], prefix: 'CAS' },
];

function getSkuPrefix(categoryName: string): string {
    const lower = categoryName.toLowerCase();
    for (const { keywords, prefix } of SKU_PREFIX_MAP) {
        if (keywords.some((k) => lower.includes(k))) return prefix;
    }
    return 'PRD';
}

/** Lấy số SKU tiếp theo từ API dựa theo prefix (tăng dần) */
async function fetchNextSkuNumber(prefix: string): Promise<number> {
    try {
        // Gọi song song cả 3 trạng thái để lấy hết sản phẩm theo prefix
        const [r1, r2, r3] = await Promise.allSettled([
            getProducts({ search: prefix, limit: 500, status: 'ACTIVE' }),
            getProducts({ search: prefix, limit: 500, status: 'INACTIVE' }),
            getProducts({ search: prefix, limit: 500, status: 'OUT_OF_STOCK' }),
        ]);
        const allProducts = [
            ...(r1.status === 'fulfilled' ? (r1.value.products ?? []) : []),
            ...(r2.status === 'fulfilled' ? (r2.value.products ?? []) : []),
            ...(r3.status === 'fulfilled' ? (r3.value.products ?? []) : []),
        ];
        let maxNum = 0;
        const regex = new RegExp(`^${prefix}-(\\d+)$`, 'i');
        for (const p of allProducts) {
            const match = (p.sku ?? '').match(regex);
            if (match) {
                const n = parseInt(match[1], 10);
                if (n > maxNum) maxNum = n;
            }
        }
        return maxNum + 1;
    } catch {
        return 1;
    }
}

async function generateSkuAsync(categoryName: string): Promise<string> {
    const prefix = getSkuPrefix(categoryName);
    const nextNum = await fetchNextSkuNumber(prefix);
    const padded = String(nextNum).padStart(5, '0');
    return `${prefix}-${padded}`;
}

const DISTRIBUTOR_OPTIONS = [
    'Synnex FPT',
    'Phong Vũ Tech',
    'Vĩnh Xuân (SPC)',
    'Viễn Sơn',
    'Thủy Linh (TLC)',
    'Châu Nguyên',
    'Long Trần',
];

const WARRANTY_OPTIONS = ['12 Tháng', '24 Tháng', '36 Tháng', '60 Tháng', '72 Tháng', '96 Tháng', 'Theo từng linh kiện'];


/* ─────────────────────────── component ─────────────────────────── */

const ProductCreate: React.FC = () => {
    const navigate = useNavigate();

    /* ── Data from API ── */
    const [categories, setCategories] = useState<ApiCategory[]>([]);
    const [brands, setBrands] = useState<ApiBrand[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingBrands, setLoadingBrands] = useState(false);

    /* ── Form state ── */
    const [formData, setFormData] = useState({
        sku: 'PRD-00001',          // auto-generated, read-only
        name: '',
        categoryId: '',
        categoryName: '',           // for SKU prefix lookup
        brandId: '',
        distributor: '',
        warranty: '36 Tháng',
        shortDescription: '',
        description: '',
        marketPrice: '',
        sellPrice: '',
        importPrice: '',
        profitMargin: '',
        stock: 10,
        minStockAlert: 5,
        status: 'ACTIVE',          // trạng thái bán
        isFeatured: false,         // Sản phẩm Nổi bật / GIÁ TỐT MỖI NGÀY
        specs: {} as SpecRecord,
    });

    const [skuLoading, setSkuLoading] = useState(false);

    /* ── Image state ── */
    // coverImage: { file, preview, serverUrl, uploading, error }
    const [coverImage, setCoverImage] = useState<{
        file: File | null;
        preview: string;
        serverUrl: string;
        uploading: boolean;
        error: string;
    }>({ file: null, preview: '', serverUrl: '', uploading: false, error: '' });

    // gallery images
    const [galleryImages, setGalleryImages] = useState<{
        file: File;
        preview: string;
        serverUrl: string;
        uploading: boolean;
        error: string;
    }[]>([]);

    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    /* ── Load categories on mount ── */
    useEffect(() => {
        setLoadingCategories(true);
        getCategories()
            .then(async (res) => {
                const rawCategories = res.categories ?? [];
                const flattenCategories = (cats: ApiCategory[]): ApiCategory[] => {
                    const list: ApiCategory[] = [];
                    const traverse = (items: ApiCategory[]) => {
                        for (const item of items) {
                            list.push(item);
                            if (item.children && item.children.length > 0) {
                                traverse(item.children);
                            }
                        }
                    };
                    traverse(cats);
                    return list;
                };
                const allCategories = flattenCategories(rawCategories);
                setCategories(allCategories);
                // set default SKU once categories load
                if (allCategories.length > 0) {
                    const first = allCategories[0];
                    setSkuLoading(true);
                    const sku = await generateSkuAsync(first.name);
                    setFormData((prev) => ({
                        ...prev,
                        categoryId: first.id,
                        categoryName: first.name,
                        sku,
                    }));
                    setSkuLoading(false);
                }
            })
            .catch(console.error)
            .finally(() => setLoadingCategories(false));
    }, []);

    /* ── Load brands when category changes ── */
    useEffect(() => {
        if (!formData.categoryId) {
            setBrands([]);
            return;
        }
        setLoadingBrands(true);
        setBrands([]);
        setFormData((prev) => ({ ...prev, brandId: '' }));
        getBrandsByCategory(formData.categoryId)
            .then((res) => setBrands(res.brands ?? []))
            .catch(() => setBrands([]))
            .finally(() => setLoadingBrands(false));
    }, [formData.categoryId]);


    const calculateMargin = (sellStr: string, importStr: string) => {
        const sell = parseFloat(sellStr.replace(/[^0-9]/g, ''));
        const imp = parseFloat(importStr.replace(/[^0-9]/g, ''));
        if (sell > 0 && imp > 0 && sell > imp) {
            const margin = (((sell - imp) / sell) * 100).toFixed(1);
            return `${margin}% (${(sell - imp).toLocaleString('vi-VN')} ₫)`;
        }
        return '';
    };

    const handleCategoryChange = async (id: string) => {
        const cat = categories.find((c) => c.id === id);
        setFormData((prev) => ({
            ...prev,
            categoryId: id,
            categoryName: cat?.name ?? '',
            specs: {},
        }));
        if (cat) {
            setSkuLoading(true);
            const sku = await generateSkuAsync(cat.name);
            setFormData((prev) => ({ ...prev, sku }));
            setSkuLoading(false);
        }
    };


    /* ── Cover image upload ── */
    const handleCoverUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setCoverImage({ file, preview, serverUrl: '', uploading: true, error: '' });
        try {
            const url = await uploadProductCoverImage(file);
            setCoverImage({ file, preview, serverUrl: url, uploading: false, error: '' });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Upload thất bại';
            setCoverImage((prev) => ({ ...prev, uploading: false, error: msg }));
        }
    }, []);

    /* ── Gallery images upload ── */
    const handleGalleryUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length === 0) return;

        // Add placeholders immediately for UX
        const newEntries = files.map((f) => ({
            file: f,
            preview: URL.createObjectURL(f),
            serverUrl: '',
            uploading: true,
            error: '',
        }));
        setGalleryImages((prev) => [...prev, ...newEntries]);

        try {
            const urls = await uploadProductGalleryImages(files);
            setGalleryImages((prev) => {
                // find the placeholder entries we just added (last N items)
                const updated = [...prev];
                const start = updated.length - files.length;
                urls.forEach((url, i) => {
                    if (updated[start + i]) {
                        updated[start + i] = { ...updated[start + i], uploading: false, serverUrl: url };
                    }
                });
                return updated;
            });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Upload thất bại';
            setGalleryImages((prev) => {
                const updated = [...prev];
                const start = updated.length - files.length;
                for (let i = start; i < updated.length; i++) {
                    updated[i] = { ...updated[i], uploading: false, error: msg };
                }
                return updated;
            });
        }
    }, []);

    const removeGalleryImage = (idx: number) =>
        setGalleryImages((prev) => prev.filter((_, i) => i !== idx));

    /* ── Scroll to first field error ── */
    const scrollToError = (errors: Record<string, string>) => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length === 0) return;

        const firstKey = errorKeys[0];
        setTimeout(() => {
            const el = document.getElementById(`field-${firstKey}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const focusable = el.querySelector<HTMLElement>('input, select, textarea, button') || el;
                if (focusable && typeof focusable.focus === 'function') {
                    focusable.focus({ preventScroll: true });
                }
            }
        }, 50);
    };

    /* ── Validate before submit ── */
    const validate = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) errors.name = 'Vui lòng nhập tên sản phẩm';
        if (!formData.categoryId) errors.categoryId = 'Vui lòng chọn danh mục';
        if (!formData.brandId) errors.brandId = 'Vui lòng chọn thương hiệu (bắt buộc)';
        if (skuLoading) errors.sku = 'SKU đang được tạo, vui lòng đợi một chút...';
        else if (!formData.sku) errors.sku = 'SKU chưa được tạo, vui lòng thử lại';

        const sellRaw = String(formData.sellPrice).replace(/[^0-9]/g, '');
        const sellNum = parseFloat(sellRaw);
        if (!sellRaw || isNaN(sellNum) || sellNum <= 0) {
            errors.sellPrice = 'Vui lòng nhập giá bán hợp lệ (> 0)';
        }

        if (formData.stock === undefined || formData.stock === null || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
            errors.stock = 'Vui lòng nhập số lượng tồn kho hợp lệ (≥ 0)';
        }

        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            setSaveError('Vui lòng kiểm tra và điền đầy đủ các thông tin bắt buộc còn thiếu (*)');
            scrollToError(errors);
            return false;
        }

        return true;
    };


    /* ── Submit ── */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveError('');
        setSaveSuccess(false);

        if (!validate()) return;

        setSaving(true);
        try {
            const sellNum = parseFloat(formData.sellPrice.replace(/[^0-9]/g, '')) || 0;
            const marketNum = parseFloat(formData.marketPrice.replace(/[^0-9]/g, '')) || undefined;
            const importNum = parseFloat(formData.importPrice.replace(/[^0-9]/g, '')) || undefined;

            const specsRecord = formData.specs as SpecRecord;
            const orderedSpecs = orderSpecifications(specsRecord, formData.categoryName);

            // Parse warranty: "36 Tháng" → 36
            const warrantyNum = formData.warranty
                ? parseInt(formData.warranty.replace(/[^0-9]/g, ''), 10) || undefined
                : undefined;

            await createProductApi({
                name: formData.name.trim(),
                sku: formData.sku,
                categoryId: formData.categoryId,
                brandId: formData.brandId,
                shortDescription: formData.shortDescription.trim() || undefined,
                description: formData.description || undefined,
                price: sellNum,
                originalPrice: marketNum,
                importPrice: importNum,
                stock: formData.stock,
                image: coverImage.serverUrl || undefined,
                images: galleryImages.filter((g) => g.serverUrl).map((g) => g.serverUrl),
                specifications: Object.keys(orderedSpecs).length > 0 ? orderedSpecs : undefined,
                warranty: warrantyNum,
                status: formData.status,
                isFeatured: formData.isFeatured,
            });

            setSaveSuccess(true);
            // Redirect sau 800ms để user thấy success
            setTimeout(() => navigate('/admin/products'), 800);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Lưu sản phẩm thất bại';
            setSaveError(msg);
            setSaving(false);
        }
    };

    /* ─────────────────────────── render ─────────────────────────── */
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">

            {/* ── Page Header ── */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => navigate('/admin/products')}
                    className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <Plus className="w-6 h-6 text-blue-600" />
                        Thêm Sản Phẩm Mới
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Hệ quản trị → Danh mục sản phẩm → Thêm mới
                    </p>
                </div>
            </div>

            {/* Save error banner */}
            {saveError && (
                <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>
                            {saveError.includes('Forbidden') || saveError.includes('Access denied') || saveError.includes('403')
                                ? 'Lỗi phân quyền (Forbidden): Bạn chưa đăng nhập bằng tài khoản Quản trị viên (ADMIN).'
                                : saveError
                            }
                        </span>
                    </div>
                    {(saveError.includes('Forbidden') || saveError.includes('Access denied') || saveError.includes('403')) && (
                        <button
                            type="button"
                            onClick={() => navigate('/admin/login')}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors ml-3 whitespace-nowrap shadow-sm text-[11px]"
                        >
                            Đăng nhập Admin
                        </button>
                    )}
                </div>
            )}

            {/* Save success banner */}
            {saveSuccess && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Tạo sản phẩm thành công! Đang chuyển hướng...</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* ══════ KHỐI 1: THÔNG TIN CƠ BẢN ══════ */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900">Thông tin cơ bản</h3>
                        <span className="text-[11px] text-rose-500 font-medium">* Bắt buộc</span>
                    </div>

                    {/* Tên sản phẩm */}
                    <div id="field-name">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Tên sản phẩm *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: '' }));
                            }}
                            placeholder="VD: Laptop Gaming ASUS ROG Strix G16 / PC RTX 4090"
                            className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all ${fieldErrors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                                }`}
                        />
                        {fieldErrors.name && (
                            <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />{fieldErrors.name}
                            </p>
                        )}
                    </div>

                    {/* SKU (auto, read-only) */}
                    <div id="field-sku">
                        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                            SKU / Mã sản phẩm
                            <span className="text-[10px] font-normal text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">Tự động tăng dần</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                readOnly
                                value={skuLoading ? 'Đang tạo SKU...' : formData.sku}
                                className="w-full text-xs px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 font-mono font-semibold cursor-not-allowed"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 flex items-center gap-1">
                                {skuLoading
                                    ? <Loader2 className="w-3 h-3 animate-spin" />
                                    : 'Tự động theo danh mục'
                                }
                            </span>
                        </div>
                    </div>

                    {/* Danh mục & Thương hiệu */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div id="field-categoryId">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Danh mục *</label>
                            {loadingCategories ? (
                                <div className="flex items-center gap-2 text-xs text-gray-400 h-9">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Đang tải danh mục...
                                </div>
                            ) : (
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => {
                                        handleCategoryChange(e.target.value);
                                        if (fieldErrors.categoryId) setFieldErrors((p) => ({ ...p, categoryId: '' }));
                                    }}
                                    className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium ${fieldErrors.categoryId ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                                        }`}
                                >
                                    <option value="">-- Chọn danh mục --</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            )}
                            {fieldErrors.categoryId && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />{fieldErrors.categoryId}
                                </p>
                            )}
                        </div>

                        <div id="field-brandId">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Thương hiệu *
                                <span className="ml-1 text-[10px] font-normal text-red-400">(Bắt buộc)</span>
                            </label>
                            {loadingBrands ? (
                                <div className="flex items-center gap-2 text-xs text-gray-400 h-9">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Đang tải...
                                </div>
                            ) : (
                                <select
                                    value={formData.brandId}
                                    onChange={(e) => {
                                        setFormData({ ...formData, brandId: e.target.value });
                                        if (fieldErrors.brandId) setFieldErrors((p) => ({ ...p, brandId: '' }));
                                    }}
                                    className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium ${fieldErrors.brandId ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                                        }`}
                                    disabled={brands.length === 0}
                                >
                                    <option value="">{
                                        brands.length === 0
                                            ? '(Không có thương hiệu – chọn danh mục khác)'
                                            : '-- Chọn thương hiệu --'
                                    }</option>
                                    {brands.map((b) => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            )}
                            {fieldErrors.brandId && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />{fieldErrors.brandId}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Nhà phân phối & Bảo hành */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nhà phân phối</label>
                            <select
                                value={formData.distributor}
                                onChange={(e) => setFormData({ ...formData, distributor: e.target.value })}
                                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium"
                            >
                                <option value="">-- Chọn nhà phân phối --</option>
                                {DISTRIBUTOR_OPTIONS.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Bảo hành</label>
                            <select
                                value={formData.warranty}
                                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium"
                            >
                                <option value="">-- Chọn thời gian --</option>
                                {WARRANTY_OPTIONS.map((w) => (
                                    <option key={w} value={w}>{w}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Trạng thái bán */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-gray-500" />
                            Trạng thái bán
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { value: 'ACTIVE', label: 'Đang bán', color: 'emerald', desc: 'Hiển thị & mua được' },
                                { value: 'INACTIVE', label: 'Tạm ẩn', color: 'amber', desc: 'Ẩn khỏi cửa hàng' },
                                { value: 'OUT_OF_STOCK', label: 'Hết hàng', color: 'red', desc: 'Hiển thị, không mua' },
                            ].map(({ value, label, color, desc }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, status: value })}
                                    className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-center ${formData.status === value
                                            ? color === 'emerald'
                                                ? 'border-emerald-500 bg-emerald-50 shadow-sm shadow-emerald-100'
                                                : color === 'amber'
                                                    ? 'border-amber-400 bg-amber-50 shadow-sm shadow-amber-100'
                                                    : 'border-red-400 bg-red-50 shadow-sm shadow-red-100'
                                            : 'border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-100/50'
                                        }`}
                                >
                                    <span className={`w-2.5 h-2.5 rounded-full ${color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-400' : 'bg-red-500'
                                        } ${formData.status === value ? 'ring-2 ring-offset-1 ' + (color === 'emerald' ? 'ring-emerald-300' : color === 'amber' ? 'ring-amber-300' : 'ring-red-300') : ''}`} />
                                    <span className={`text-[11px] font-bold ${formData.status === value
                                            ? color === 'emerald' ? 'text-emerald-700' : color === 'amber' ? 'text-amber-700' : 'text-red-700'
                                            : 'text-gray-600'
                                        }`}>{label}</span>
                                    <span className="text-[9px] text-gray-400 leading-tight">{desc}</span>
                                    {formData.status === value && (
                                        <div className={`absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center ${color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-400' : 'bg-red-500'
                                            }`}>
                                            <CheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mô tả ngắn */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
                        <input
                            type="text"
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            placeholder="Mô tả ngắn gọn về sản phẩm, hiển thị trên danh sách"
                            className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                        />
                    </div>

                    {/* Mô tả chi tiết */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả chi tiết</label>
                        <CKEditor5Component
                            value={formData.description}
                            onChange={(html) => setFormData((prev) => ({ ...prev, description: html }))}
                            placeholder="Nhập mô tả chi tiết sản phẩm..."
                            minHeight="150px"
                        />
                    </div>
                </div>

                {/* ══════ KHỐI 2: ẢNH BÌA ══════ */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-blue-600" /> Ảnh bìa sản phẩm
                        </h3>
                        <span className="text-[10px] text-gray-400">1 ảnh • Tối đa 5MB • JPG/PNG/WebP</span>
                    </div>

                    <div className="relative border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/20 p-6 text-center hover:bg-blue-50/50 transition-colors cursor-pointer group">
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                            onChange={handleCoverUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            disabled={coverImage.uploading}
                        />

                        {coverImage.uploading ? (
                            <div className="flex flex-col items-center gap-2 text-blue-600">
                                <Loader2 className="w-8 h-8 animate-spin" />
                                <p className="text-xs font-semibold">Đang upload...</p>
                            </div>
                        ) : coverImage.preview ? (
                            <div className="flex items-center justify-center gap-4">
                                <div className="relative">
                                    <img
                                        src={coverImage.preview}
                                        alt="Cover"
                                        className="w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                                    />
                                    {coverImage.serverUrl && (
                                        <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-0.5">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                        </div>
                                    )}
                                    {coverImage.error && (
                                        <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                        </div>
                                    )}
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-gray-800">
                                        {coverImage.serverUrl ? 'Upload thành công ✓' : 'Ảnh bìa đã chọn'}
                                    </p>
                                    {coverImage.serverUrl && (
                                        <p className="text-[10px] text-gray-400 mt-0.5 font-mono break-all">{coverImage.serverUrl}</p>
                                    )}
                                    {coverImage.error && (
                                        <p className="text-[10px] text-red-500 mt-0.5">{coverImage.error}</p>
                                    )}
                                    <p className="text-[10px] text-blue-500 mt-1">Click để đổi ảnh</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                                    <Upload className="w-5 h-5 text-blue-500" />
                                </div>
                                <p className="text-xs font-bold text-gray-700">Kéo thả hoặc click để tải ảnh bìa</p>
                                <p className="text-[10px] text-gray-400">Tên file sẽ được mã hóa tự động (UUID)</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ══════ KHỐI 3: ẢNH GALLERY ══════ */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-gray-500" /> Ảnh gallery sản phẩm
                        </h3>
                        <span className="text-[10px] text-gray-400">Tối đa 10 ảnh • 5MB/ảnh</span>
                    </div>

                    <div className="relative border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 p-5 text-center hover:bg-gray-100/50 transition-colors cursor-pointer">
                        <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                            onChange={handleGalleryUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="space-y-2">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                                <Upload className="w-4 h-4 text-gray-500" />
                            </div>
                            <p className="text-xs font-bold text-gray-700">Click hoặc kéo thả nhiều ảnh</p>
                            <p className="text-[10px] text-gray-400">Mỗi file sẽ được đặt tên theo UUID tự động</p>
                        </div>
                    </div>

                    {galleryImages.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-1">
                            {galleryImages.map((img, idx) => (
                                <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square bg-gray-100">
                                    <img src={img.preview} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />

                                    {/* Uploading overlay */}
                                    {img.uploading && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                                        </div>
                                    )}

                                    {/* Success indicator */}
                                    {img.serverUrl && !img.uploading && (
                                        <div className="absolute top-1 left-1 bg-emerald-500 text-white rounded-full p-0.5">
                                            <CheckCircle className="w-3 h-3" />
                                        </div>
                                    )}

                                    {/* Error indicator */}
                                    {img.error && (
                                        <div className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-0.5">
                                            <AlertCircle className="w-3 h-3" />
                                        </div>
                                    )}

                                    {/* Remove button */}
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryImage(idx)}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ══════ KHỐI 4: THÔNG SỐ KỸ THUẬT ══════ */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4 overflow-hidden w-full min-w-0">
                    <div className="flex items-center pb-2 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-4 h-4 text-blue-600 text-base">⚙️</span>
                            Thông số kỹ thuật
                        </h3>
                        {formData.categoryName && (
                            <span className="ml-auto text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                {formData.categoryName}
                            </span>
                        )}
                    </div>
                    <DynamicSpecForm
                        categoryName={formData.categoryName}
                        specs={formData.specs as SpecRecord}
                        onChange={(s) => setFormData((prev) => ({ ...prev, specs: s as any }))}
                        categories={categories}
                    />
                </div>

                {/* ══════ KHỐI 5: GIÁ BÁN & TỒN KHO ══════ */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">Giá bán & Tồn kho</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Giá niêm yết (Market Price)</label>
                            <input
                                type="text"
                                value={formData.marketPrice}
                                onChange={(e) => setFormData({ ...formData, marketPrice: e.target.value })}
                                placeholder="VD: 39990000"
                                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                            />
                        </div>
                        <div id="field-sellPrice">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Giá bán (Sell Price) *</label>
                            <input
                                type="text"
                                value={formData.sellPrice}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setFormData({ ...formData, sellPrice: val, profitMargin: calculateMargin(val, formData.importPrice) });
                                    if (fieldErrors.sellPrice) setFieldErrors((p) => ({ ...p, sellPrice: '' }));
                                }}
                                placeholder="VD: 34990000"
                                className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all font-bold text-blue-600 ${fieldErrors.sellPrice ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                                    }`}
                            />
                            {fieldErrors.sellPrice && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />{fieldErrors.sellPrice}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Giá nhập (đ)</label>
                            <input
                                type="text"
                                value={formData.importPrice}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setFormData({ ...formData, importPrice: val, profitMargin: calculateMargin(formData.sellPrice, val) });
                                }}
                                placeholder="VD: 20000000"
                                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Biên lợi nhuận</label>
                            <input
                                type="text"
                                readOnly
                                value={formData.profitMargin || 'Tự động tính từ Giá bán - Giá nhập'}
                                className="w-full text-xs px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div id="field-stock">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Số lượng tồn kho *</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.stock}
                                onChange={(e) => {
                                    setFormData({ ...formData, stock: Number(e.target.value) });
                                    if (fieldErrors.stock) setFieldErrors((p) => ({ ...p, stock: '' }));
                                }}
                                className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all ${fieldErrors.stock ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                                    }`}
                            />
                            {fieldErrors.stock && (
                                <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />{fieldErrors.stock}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Ngưỡng cảnh báo hết hàng</label>
                            <input
                                type="number"
                                value={formData.minStockAlert}
                                onChange={(e) => setFormData({ ...formData, minStockAlert: Number(e.target.value) })}
                                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Trạng thái & Tính năng Nổi bật / Deal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Trạng thái sản phẩm</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                            >
                                <option value="ACTIVE">ACTIVE - Đang kinh doanh</option>
                                <option value="INACTIVE">INACTIVE - Ngừng kinh doanh</option>
                                <option value="OUT_OF_STOCK">OUT_OF_STOCK - Hết hàng</option>
                            </select>
                        </div>
                        <div className="flex items-center pt-5">
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                />
                                <div>
                                    <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                                        ⚡ Sản phẩm Nổi bật / GIÁ TỐT MỖI NGÀY
                                    </span>
                                    <p className="text-[11px] text-gray-500 font-normal">
                                        Hiển thị ở dải sản phẩm Flash Sale / Deal tại trang chủ
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* ── Action buttons ── */}
                <div className="flex items-center justify-end gap-3 pb-8">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="submit"
                        disabled={saving || saveSuccess || skuLoading || coverImage.uploading || galleryImages.some((g) => g.uploading)}
                        className="px-6 py-2.5 text-xs font-bold bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : saveSuccess ? (
                            <CheckCircle className="w-4 h-4" />
                        ) : skuLoading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        <span>{
                            saving ? 'Đang lưu...'
                                : saveSuccess ? 'Đã lưu thành công!'
                                    : skuLoading ? 'Đang tạo SKU...'
                                        : 'Lưu Sản Phẩm'
                        }</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductCreate;
