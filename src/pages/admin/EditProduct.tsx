import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Edit,
  Upload,
  X
} from 'lucide-react';
import { getCategories, getBrandsByCategory, getProductDetail } from '../../services/productService';
import { uploadProductCoverImage, uploadProductGalleryImages, updateProductApi } from '../../services/uploadService';
import type { ApiCategory, ApiBrand } from '../../types/apiProduct';
import DynamicSpecForm, { type SpecRecord } from '../../components/admin/DynamicSpecForm';
import CKEditor5Component from '../../components/admin/CKEditor5';

export const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /* ── Loading state ── */
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(false);

  /* ── Form state ── */
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    categoryId: '',
    categoryName: '',
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
    status: 'ACTIVE',
    specs: {} as SpecRecord,
  });

  /* ── Image state ── */
  const [coverImage, setCoverImage] = useState<{
    file: File | null;
    preview: string;
    serverUrl: string;
    uploading: boolean;
    error: string;
  }>({ file: null, preview: '', serverUrl: '', uploading: false, error: '' });

  const [galleryImages, setGalleryImages] = useState<{
    file: File | null;
    preview: string;
    serverUrl: string;
    uploading: boolean;
    error: string;
  }[]>([]);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const DISTRIBUTOR_OPTIONS = [
    'Synnex FPT',
    'Phong Vũ Tech',
    'Vĩnh Xuân (SPC)',
    'Viễn Sơn',
    'Thủy Linh (TLC)',
    'Châu Nguyên',
    'Long Trần',
  ];

  const WARRANTY_OPTIONS = ['12 Tháng', '24 Tháng', '36 Tháng', '60 Tháng'];

  /* ── Load categories & product details ── */
  useEffect(() => {
    let isMounted = true;
    setLoadingCategories(true);

    const initData = async () => {
      try {
        const catRes = await getCategories();
        if (isMounted) {
          setCategories(catRes.categories ?? []);
        }

        if (id) {
          const detailRes = await getProductDetail(id);
          if (isMounted && detailRes && detailRes.product) {
            const p = detailRes.product;
            const catId = p.categoryId ? p.categoryId.toString() : (p.category?.id?.toString() || '');
            const brandId = p.brandId ? p.brandId.toString() : (p.brand?.id?.toString() || '');

            setFormData({
              sku: p.sku || `PRD-${p.id}`,
              name: p.name || '',
              categoryId: catId,
              categoryName: p.category?.name || '',
              brandId: brandId,
              distributor: 'Synnex FPT',
              warranty: p.warranty ? `${p.warranty} Tháng` : '36 Tháng',
              shortDescription: p.shortDescription || '',
              description: p.description || '',
              marketPrice: p.originalPrice ? p.originalPrice.toString() : '',
              sellPrice: p.price ? p.price.toString() : '',
              importPrice: '',
              profitMargin: '',
              stock: p.stock ?? 0,
              minStockAlert: 5,
              status: p.status || 'ACTIVE',
              specs: p.specifications && typeof p.specifications === 'object' ? (p.specifications as SpecRecord) : {}
            });

            if (p.image) {
              setCoverImage({
                file: null,
                preview: p.image,
                serverUrl: p.image,
                uploading: false,
                error: ''
              });
            }

            if (p.images && Array.isArray(p.images)) {
              setGalleryImages(p.images.map((img: string) => ({
                file: null,
                preview: img,
                serverUrl: img,
                uploading: false,
                error: ''
              })));
            } else if (p.image) {
              setGalleryImages([{
                file: null,
                preview: p.image,
                serverUrl: p.image,
                uploading: false,
                error: ''
              }]);
            }
          }
        }
      } catch (err) {
        console.warn('Failed to load product detail from API, using fallback editing values:', err);
      } finally {
        if (isMounted) {
          setLoadingCategories(false);
          setLoadingProduct(false);
        }
      }
    };

    initData();
    return () => { isMounted = false; };
  }, [id]);

  /* ── Load brands when category changes ── */
  useEffect(() => {
    if (!formData.categoryId) {
      setBrands([]);
      return;
    }
    setLoadingBrands(true);
    getBrandsByCategory(formData.categoryId)
      .then((res) => {
        setBrands(res.brands ?? []);
      })
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

  const handleCategoryChange = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    setFormData((prev) => ({
      ...prev,
      categoryId: catId,
      categoryName: cat?.name ?? '',
      brandId: '',
      specs: {},
    }));
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

  /* ── Validation ── */
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Vui lòng nhập tên sản phẩm';
    if (!formData.categoryId) errors.categoryId = 'Vui lòng chọn danh mục';
    if (!formData.brandId) errors.brandId = 'Vui lòng chọn thương hiệu (bắt buộc)';

    const sellRaw = String(formData.sellPrice).replace(/[^0-9]/g, '');
    const sellNum = parseFloat(sellRaw);
    if (!sellRaw || isNaN(sellNum) || sellNum <= 0) {
      errors.sellPrice = 'Vui lòng nhập giá bán hợp lệ (> 0)';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ── Submit update ── */
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
      const warrantyNum = formData.warranty
        ? parseInt(formData.warranty.replace(/[^0-9]/g, ''), 10) || undefined
        : undefined;

      const payload = {
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
        image: coverImage.serverUrl || coverImage.preview || undefined,
        images: galleryImages.map((g) => g.serverUrl || g.preview).filter(Boolean),
        specifications: Object.keys(specsRecord).length > 0 ? specsRecord : undefined,
        warranty: warrantyNum,
        status: formData.status,
      };

      if (id) {
        await updateProductApi(id, payload);
      }

      setSaveSuccess(true);
      setTimeout(() => navigate('/admin/products'), 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cập nhật sản phẩm thất bại';
      setSaveError(msg);
      setSaving(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin text-blue-600" />
        <p className="text-sm font-bold text-gray-600">Đang nạp thông tin sản phẩm ({id})...</p>
      </div>
    );
  }

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
            <Edit className="w-6 h-6 text-indigo-600" />
            Chỉnh Sửa Sản Phẩm #{id}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Hệ quản trị → Danh mục sản phẩm → Chỉnh sửa
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
        </div>
      )}

      {/* Save success banner */}
      {saveSuccess && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>Cập nhật sản phẩm thành công! Đang chuyển hướng...</span>
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
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Tên sản phẩm *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: '' }));
              }}
              placeholder="VD: Laptop Gaming ASUS ROG Strix G16 / PC RTX 4090"
              className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all ${
                fieldErrors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
              }`}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />{fieldErrors.name}
              </p>
            )}
          </div>

          {/* SKU (read-only) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">SKU / Mã sản phẩm</label>
            <input
              type="text"
              readOnly
              value={formData.sku}
              className="w-full text-xs px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 font-mono font-semibold cursor-not-allowed"
            />
          </div>

          {/* Danh mục & Thương hiệu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Danh mục *</label>
              {loadingCategories ? (
                <div className="flex items-center gap-2 text-xs text-gray-400 py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tải danh mục...
                </div>
              ) : (
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all font-medium text-gray-700 ${
                    fieldErrors.categoryId ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                  }`}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Thương hiệu *</label>
              {!formData.categoryId ? (
                <div className="text-[11px] text-gray-400 py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl">
                  Vui lòng chọn danh mục trước
                </div>
              ) : loadingBrands ? (
                <div className="flex items-center gap-2 text-xs text-gray-400 py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tải thương hiệu...
                </div>
              ) : (
                <select
                  value={formData.brandId}
                  onChange={(e) => {
                    setFormData({ ...formData, brandId: e.target.value });
                    if (fieldErrors.brandId) setFieldErrors((p) => ({ ...p, brandId: '' }));
                  }}
                  className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all font-medium text-gray-700 ${
                    fieldErrors.brandId ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                  }`}
                >
                  <option value="">-- Chọn thương hiệu --</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
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
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all font-medium text-gray-700"
              >
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
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all font-medium text-gray-700"
              >
                {WARRANTY_OPTIONS.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mô tả ngắn */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Hiển thị ngắn gọn ở danh sách sản phẩm"
              className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Mô tả chi tiết (CKEditor 5) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả chi tiết (Rich Text)</label>
            <CKEditor5Component
              value={formData.description}
              onChange={(html) => setFormData((prev) => ({ ...prev, description: html }))}
              placeholder="Nhập nội dung chi tiết bài viết sản phẩm..."
            />
          </div>
        </div>

        {/* ══════ KHỐI 2: ẢNH BÌA SẢN PHẨM ══════ */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-900">Ảnh bìa sản phẩm</h3>
            <span className="text-[10px] text-gray-400">1 ảnh chính</span>
          </div>

          <div className="border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/20 p-5 text-center hover:bg-blue-50/40 transition-colors relative cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {coverImage.uploading ? (
              <div className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-blue-600">
                <Loader2 className="w-5 h-5 animate-spin" /> Đang tải ảnh lên server...
              </div>
            ) : coverImage.preview ? (
              <div className="flex items-center justify-center gap-4">
                <img
                  src={coverImage.preview}
                  alt="Cover Preview"
                  className="w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-800">Ảnh bìa đã chọn</p>
                  <p className="text-[10px] text-blue-600 mt-0.5 group-hover:underline">Click hoặc kéo thả để đổi ảnh khác</p>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 py-2">
                <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Upload className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-gray-700">Kéo thả hoặc click để tải ảnh bìa</p>
              </div>
            )}
          </div>
        </div>

        {/* ══════ KHỐI 3: Bộ SƯU TẬP ẢNH ══════ */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-900">Bộ sưu tập ảnh sản phẩm</h3>
            <span className="text-[10px] text-gray-400">Nhiều ảnh</span>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 p-4 text-center hover:bg-gray-100/50 transition-colors relative cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleGalleryUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="space-y-1 py-1">
              <div className="w-8 h-8 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center mx-auto">
                <Upload className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-gray-700">Click hoặc kéo thả để tải nhiều ảnh</p>
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-1">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square bg-gray-100">
                  <img src={img.preview} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  {img.uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-20"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══════ KHỐI 4: THÔNG SỐ KỸ THUẬT ĐỘNG ══════ */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <DynamicSpecForm
            categoryName={formData.categoryName}
            value={formData.specs}
            onChange={(newSpecs) => setFormData((prev) => ({ ...prev, specs: newSpecs }))}
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
                placeholder="VD: 39.990.000"
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Giá bán thực tế (Sell Price) *</label>
              <input
                type="text"
                value={formData.sellPrice}
                onChange={(e) => {
                  const val = e.target.value;
                  const margin = calculateMargin(val, formData.importPrice);
                  setFormData({ ...formData, sellPrice: val, profitMargin: margin });
                  if (fieldErrors.sellPrice) setFieldErrors((p) => ({ ...p, sellPrice: '' }));
                }}
                placeholder="VD: 34.990.000"
                className={`w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all font-bold text-blue-600 ${
                  fieldErrors.sellPrice ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
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
                  const margin = calculateMargin(formData.sellPrice, val);
                  setFormData({ ...formData, importPrice: val, profitMargin: margin });
                }}
                placeholder="VD: 28.000.000"
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
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Số lượng tồn kho *</label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Trạng thái mở bán</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium"
              >
                <option value="ACTIVE">Hoạt động (Active)</option>
                <option value="INACTIVE">Ẩn sản phẩm (Inactive)</option>
                <option value="OUT_OF_STOCK">Tạm hết hàng (Out of Stock)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ══════ BOTTOM ACTION BAR ══════ */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Hủy bỏ
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-xs font-bold bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Đang lưu...' : 'Cập Nhật Sản Phẩm'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
