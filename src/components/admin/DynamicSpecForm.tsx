import React, { useState, useEffect, useRef } from 'react';
import {
    Plus,
    X,
    Search,
    ChevronDown,
    Cpu,
    Server,
    MemoryStick,
    HardDrive,
    Zap,
    Box,
    Wind,
    Monitor,
    Package,
} from 'lucide-react';
import {
    type SpecField,
    type CategoryType,
    SPEC_TEMPLATES,
    detectCategoryType,
    PC_COMPONENT_TYPES,
    type PcComponentKey,
    orderSpecifications,
} from '../../config/specDefinitions';
import { getProducts } from '../../services/productService';
import type { ApiProduct } from '../../types/apiProduct';

/* ─────────────────────────── types ─────────────────────────── */

export type SpecRecord = Record<string, string>;

interface DynamicSpecFormProps {
    categoryName: string;
    specs: SpecRecord;
    onChange: (specs: SpecRecord) => void;
    /** All loaded categories for PC component search */
    categories?: { id: string; name: string }[];
}

/* ─────────────────────────── PC component icons ─────────────────────────── */

const COMPONENT_ICONS: Record<string, React.ReactNode> = {
    cpu: <Cpu className="w-4 h-4" />,
    vga: <Monitor className="w-4 h-4" />,
    ram: <MemoryStick className="w-4 h-4" />,
    ssd: <HardDrive className="w-4 h-4" />,
    hdd: <HardDrive className="w-4 h-4" />,
    mainboard: <Server className="w-4 h-4" />,
    psu: <Zap className="w-4 h-4" />,
    case: <Box className="w-4 h-4" />,
    cooler: <Wind className="w-4 h-4" />,
};

/* ─────────────────────────── ProductSearchPicker ─────────────────────────── */

interface ProductSearchPickerProps {
    componentKey: PcComponentKey;
    label: string;
    keywords: readonly string[];
    allCategories: { id: string; name: string }[];
    selected: ApiProduct | null;
    onSelect: (p: ApiProduct | null) => void;
}

const ProductSearchPicker: React.FC<ProductSearchPickerProps> = ({
    componentKey,
    label,
    keywords,
    allCategories,
    selected,
    onSelect,
}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Find matching category IDs
    const matchedCategoryIds = allCategories
        .filter((c) => keywords.some((k) => c.name.toLowerCase().includes(k)))
        .map((c) => c.id);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const search = (q: string) => {
        setLoading(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(async () => {
            try {
                const catId = matchedCategoryIds[0];
                let res = await getProducts({
                    q: q.trim() || undefined,
                    categoryId: catId,
                    limit: 10,
                });
                let prods = res.products ?? [];
                if (prods.length === 0) {
                    res = await getProducts({
                        q: q.trim() || keywords[0] || undefined,
                        limit: 10,
                    });
                    prods = res.products ?? [];
                }
                setResults(prods);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    const handleOpen = () => {
        setOpen(true);
        if (!results.length) search('');
    };

    return (
        <div ref={ref} className="relative">
            {/* Selected product chip */}
            {selected ? (
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
                    {selected.image ? (
                        <img
                            src={selected.image}
                            alt={selected.name}
                            className="w-8 h-8 object-cover rounded-lg flex-shrink-0 border border-blue-100"
                        />
                    ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                            {COMPONENT_ICONS[componentKey] ?? <Package className="w-4 h-4" />}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">{selected.name}</p>
                        <p className="text-[10px] text-blue-600 font-mono">{selected.sku}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onSelect(null)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={handleOpen}
                    className="w-full flex items-center gap-2 bg-gray-50 border border-dashed border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-500 hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
                >
                    <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        {COMPONENT_ICONS[componentKey] ?? <Package className="w-4 h-4" />}
                    </div>
                    <span className="flex-1 text-left text-gray-400">Chọn {label}...</span>
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                </button>
            )}

            {/* Dropdown */}
            {open && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-1.5">
                            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <input
                                autoFocus
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    search(e.target.value);
                                }}
                                placeholder={`Tìm ${label}...`}
                                className="flex-1 text-xs bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <div className="max-h-52 overflow-y-auto">
                        {loading ? (
                            <div className="p-3 text-center text-xs text-gray-400">Đang tìm kiếm...</div>
                        ) : results.length === 0 ? (
                            <div className="p-3 text-center text-xs text-gray-400">Không tìm thấy sản phẩm</div>
                        ) : (
                            results.map((p) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => {
                                        onSelect(p);
                                        setOpen(false);
                                        setQuery('');
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-blue-50 transition-colors text-left"
                                >
                                    {p.image ? (
                                        <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded-lg border border-gray-100 flex-shrink-0" />
                                    ) : (
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                                            <Package className="w-4 h-4" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                                        <p className="text-[10px] text-gray-400">{p.sku} · {p.price?.toLocaleString('vi-VN')}đ</p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

/* ─────────────────────────── Single spec field ─────────────────────────── */

interface SpecFieldRowProps {
    field: SpecField;
    value: string;
    onChange: (key: string, val: string) => void;
}

const SpecFieldRow: React.FC<SpecFieldRowProps> = ({ field, value, onChange }) => {
    const inputClass =
        'w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all';

    return (
        <div className="flex items-start gap-3">
            <div className="w-52 flex-shrink-0 pt-2">
                <label className="text-xs font-semibold text-gray-700 leading-tight">
                    {field.label}
                    {field.required && <span className="text-rose-500 ml-0.5">*</span>}
                </label>
            </div>
            <div className="flex-1">
                {field.type === 'select' ? (
                    <select
                        required={field.required}
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className={inputClass + ' text-gray-700 font-medium'}
                    >
                        <option value="">-- Chọn --</option>
                        {field.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                ) : field.type === 'number' ? (
                    <div className="flex items-center gap-1.5">
                        <input
                            type="number"
                            required={field.required}
                            value={value}
                            min={0}
                            onChange={(e) => onChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className={inputClass}
                        />
                        {field.unit && (
                            <span className="text-xs text-gray-400 whitespace-nowrap">{field.unit}</span>
                        )}
                    </div>
                ) : (
                    <input
                        type="text"
                        required={field.required}
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        placeholder={field.placeholder ?? `Nhập ${field.label.toLowerCase()}...`}
                        className={inputClass}
                    />
                )}
            </div>
        </div>
    );
};

/* ─────────────────────────── DynamicSpecForm ─────────────────────────── */

const DynamicSpecForm: React.FC<DynamicSpecFormProps> = ({
    categoryName,
    specs,
    onChange,
    categories = [],
}) => {
    const catType: CategoryType = detectCategoryType(categoryName);
    const template: SpecField[] = SPEC_TEMPLATES[catType] ?? SPEC_TEMPLATES.Generic;

    // PC component selections (product objects)
    const [pcComponents, setPcComponents] = useState<Partial<Record<PcComponentKey, ApiProduct | null>>>({});

    /* ── Initial load of existing specs into pcComponents ── */
    useEffect(() => {
        if (catType !== 'PC' || !specs) return;
        const initial: Partial<Record<PcComponentKey, ApiProduct | null>> = {};
        PC_COMPONENT_TYPES.forEach(({ key, label }) => {
            const val = specs[label];
            if (val && typeof val === 'string' && val.startsWith('{')) {
                try {
                    const parsed = JSON.parse(val);
                    if (parsed.id && parsed.name) {
                        initial[key] = {
                            id: parsed.id,
                            name: parsed.name,
                            sku: parsed.sku || '',
                            price: 0,
                            stock: 1,
                            slug: '',
                        } as ApiProduct;
                    }
                } catch {}
            }
        });
        if (Object.keys(initial).length > 0) {
            setPcComponents((prev) => ({ ...initial, ...prev }));
        }
    }, [catType]);

    /* ── PC mode — build specs from selected components ── */
    useEffect(() => {
        if (catType !== 'PC') return;
        const derived: SpecRecord = {};
        PC_COMPONENT_TYPES.forEach(({ key, label }) => {
            const p = pcComponents[key];
            if (p) {
                derived[label] = JSON.stringify({
                    id: p.id,
                    name: p.name,
                    sku: p.sku,
                    warranty: p.warranty ? `${p.warranty} Tháng` : '36 Tháng'
                });
            }
        });
        onChange(derived);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pcComponents, catType]);

    const handleFieldChange = (key: string, val: string) => {
        const updated = { ...specs, [key]: val };
        onChange(orderSpecifications(updated, categoryName));
    };

    /* ── Group fields by `group` property ── */
    const groups: { title: string | undefined; fields: SpecField[] }[] = [];
    template.forEach((f) => {
        const last = groups[groups.length - 1];
        if (!last || (f.group && f.group !== last.title)) {
            groups.push({ title: f.group, fields: [f] });
        } else {
            last.fields.push(f);
        }
    });

    /* ─── No template found for this category ─── */
    if (catType === 'Generic') {
        return (
            <div className="space-y-3">
                <p className="text-xs text-gray-400 italic">
                    Danh mục này không có mẫu thông số cố định. Bạn có thể thêm thủ công bên dưới.
                </p>
                <ManualSpecRows specs={specs} onChange={onChange} />
            </div>
        );
    }

    /* ─── PC mode: component picker ─── */
    if (catType === 'PC') {
        return (
            <div className="space-y-3">
                <p className="text-xs text-blue-600 font-medium bg-blue-50 rounded-xl px-3 py-2 border border-blue-100">
                    🖥️ PC Nguyên Bộ — Chọn linh kiện từ sản phẩm đã có trong hệ thống
                </p>
                <div className="space-y-3">
                    {PC_COMPONENT_TYPES.map(({ key, label, keywords }) => (
                        <div key={key} className="flex items-start gap-3">
                            <div className="w-52 flex-shrink-0 pt-2">
                                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                                    <span className="text-gray-400">{COMPONENT_ICONS[key]}</span>
                                    {label}
                                </label>
                            </div>
                            <div className="flex-1">
                                <ProductSearchPicker
                                    componentKey={key}
                                    label={label}
                                    keywords={keywords}
                                    allCategories={categories}
                                    selected={pcComponents[key] ?? null}
                                    onSelect={(p) => setPcComponents((prev) => ({ ...prev, [key]: p }))}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const getFieldValue = (field: SpecField) => {
        if (specs[field.key] !== undefined && specs[field.key] !== '') return specs[field.key];
        if (specs[field.label] !== undefined && specs[field.label] !== '') return specs[field.label];
        const shortKey = field.key.split(' (')[0];
        if (specs[shortKey] !== undefined && specs[shortKey] !== '') return specs[shortKey];
        for (const [k, v] of Object.entries(specs)) {
            if (!v) continue;
            if (k === 'importPrice') continue;
            if (shortKey.includes(k) || k.includes(shortKey) || field.label.includes(k)) {
                return v;
            }
        }
        return '';
    };

    /* ─── Normal mode: structured fields ─── */
    return (
        <div className="space-y-6">
            {groups.map((g, gi) => (
                <div key={gi} className="space-y-3">
                    {g.title && (
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">{g.title}</span>
                            <div className="flex-1 h-px bg-blue-100" />
                        </div>
                    )}
                    {g.fields.map((field) => (
                        <SpecFieldRow
                            key={field.key}
                            field={field}
                            value={getFieldValue(field)}
                            onChange={handleFieldChange}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

/* ─────────────────────────── ManualSpecRows (generic fallback) ─────────────────────────── */

interface ManualSpecRowsProps {
    specs: SpecRecord;
    onChange: (specs: SpecRecord) => void;
}

const ManualSpecRows: React.FC<ManualSpecRowsProps> = ({ specs, onChange }) => {
    const entries = Object.entries(specs);

    const handleKeyChange = (oldKey: string, newKey: string) => {
        const updated: SpecRecord = {};
        entries.forEach(([k, v]) => {
            updated[k === oldKey ? newKey : k] = v;
        });
        onChange(updated);
    };

    const handleValueChange = (key: string, val: string) => {
        onChange({ ...specs, [key]: val });
    };

    const handleAdd = () => {
        const newKey = `Thông số ${entries.length + 1}`;
        onChange({ ...specs, [newKey]: '' });
    };

    const handleRemove = (key: string) => {
        const updated = { ...specs };
        delete updated[key];
        onChange(updated);
    };

    return (
        <div className="space-y-2">
            {entries.map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => handleKeyChange(key, e.target.value)}
                        placeholder="Tên thông số"
                        className="w-1/3 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleValueChange(key, e.target.value)}
                        placeholder="Giá trị"
                        className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemove(key)}
                        className="p-2 text-rose-400 hover:bg-rose-50 rounded-xl border border-rose-100 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors border border-blue-100"
            >
                <Plus className="w-3.5 h-3.5" /> Thêm thông số
            </button>
        </div>
    );
};

export default DynamicSpecForm;
