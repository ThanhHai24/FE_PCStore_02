import React, { useState, useMemo } from 'react';
import { ChevronDown, SlidersHorizontal, RotateCcw, X, Layers } from 'lucide-react';
import type { ApiBrand } from '../../types/apiProduct';
import { getCategoryFilterConfig } from './categoryFilterConfigs';

export interface PriceRangeOption {
  id: string;
  label: string;
  count?: number;
  minPrice?: number;
  maxPrice?: number;
}

interface ProductListFilterProps {
  categoryKey?: string | null;
  categoryDisplayName?: string | null;
  brands?: ApiBrand[];
  selectedPriceRange?: string | null;
  onSelectPriceRange?: (id: string | null) => void;
  selectedBrandId?: string | null;
  onSelectBrand?: (brandId: string | null) => void;
  selectedFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string | null) => void;
  onResetFilters?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const defaultPriceRanges: PriceRangeOption[] = [
  { id: 'lt-15', label: 'Dưới 15 triệu', minPrice: 0, maxPrice: 15000000 },
  { id: '15-20', label: '15 - 20 triệu', minPrice: 15000000, maxPrice: 20000000 },
  { id: '20-50', label: '20 - 50 triệu', minPrice: 20000000, maxPrice: 50000000 },
  { id: '50-100', label: '50 - 100 triệu', minPrice: 50000000, maxPrice: 100000000 },
  { id: 'gt-100', label: 'Trên 100 triệu', minPrice: 100000000, maxPrice: 200000000 },
];

export const ProductListFilter: React.FC<ProductListFilterProps> = ({
  categoryKey,
  categoryDisplayName,
  brands = [],
  selectedPriceRange,
  onSelectPriceRange,
  selectedBrandId,
  onSelectBrand,
  selectedFilters = {},
  onFilterChange,
  onResetFilters,
}) => {
  // Get category specific configuration
  const categoryConfig = useMemo(() => {
    return getCategoryFilterConfig(categoryKey || categoryDisplayName);
  }, [categoryKey, categoryDisplayName]);

  // Slider state (in Millions VND)
  const [sliderMax, setSliderMax] = useState<number>(100);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    brand: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: prev[key] === undefined ? false : !prev[key],
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderMax(val);
    if (val <= 15) onSelectPriceRange?.('lt-15');
    else if (val <= 20) onSelectPriceRange?.('15-20');
    else if (val <= 50) onSelectPriceRange?.('20-50');
    else if (val <= 100) onSelectPriceRange?.('50-100');
    else onSelectPriceRange?.('gt-100');
  };

  const activeFiltersCount =
    Object.keys(selectedFilters).filter((k) => selectedFilters[k]).length +
    (selectedPriceRange ? 1 : 0) +
    (selectedBrandId ? 1 : 0);

  return (
    <aside className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm space-y-5 text-xs">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-100 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-sm text-gray-900 uppercase flex items-center space-x-2 tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>BỘ LỌC SẢN PHẨM</span>
          </h2>
          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-red-600 font-bold hover:underline flex items-center space-x-1 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Xóa tất cả ({activeFiltersCount})</span>
            </button>
          )}
        </div>

        {/* Category Context Badge */}
        <div className="flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border border-blue-100">
          <Layers className="w-3.5 h-3.5 shrink-0 text-blue-600" />
          <span className="truncate">
            Loại: {categoryDisplayName || categoryConfig.categoryName}
          </span>
        </div>
      </div>

      {/* 1. KHOẢNG GIÁ - SLIDER & PRESETS */}
      <div className="border-b border-gray-100 pb-5 space-y-3">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-extrabold text-gray-900 uppercase tracking-wider text-xs"
        >
          <span>1. KHOẢNG GIÁ</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections['price'] !== false ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedSections['price'] !== false && (
          <div className="space-y-4 pt-1">
            {/* Range Slider */}
            <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                <span>0đ</span>
                <span className="text-red-600 font-black text-xs sm:text-sm">
                  Đến {sliderMax.toLocaleString('vi-VN')} triệu đ
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={sliderMax}
                onChange={handleSliderChange}
                className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Quick Range Buttons */}
            <div className="grid grid-cols-1 gap-1.5">
              {defaultPriceRanges.map((range) => {
                const isSelected = selectedPriceRange === range.id;
                return (
                  <button
                    key={range.id}
                    onClick={() => onSelectPriceRange?.(isSelected ? null : range.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition-all text-xs font-semibold flex items-center justify-between ${
                      isSelected
                        ? 'border-red-600 bg-red-50 text-red-600 font-bold shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span>{range.label}</span>
                    {isSelected && <X className="w-3.5 h-3.5 text-red-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. HÃNG SẢN XUẤT (THƯƠNG HIỆU) */}
      {brands.length > 0 && (
        <div className="border-b border-gray-100 pb-5 space-y-3">
          <button
            onClick={() => toggleSection('brand')}
            className="w-full flex items-center justify-between font-extrabold text-gray-900 uppercase tracking-wider text-xs"
          >
            <span>2. HÃNG SẢN XUẤT</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                expandedSections['brand'] !== false ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections['brand'] !== false && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              {brands.map((brand) => {
                const isSelected = selectedBrandId === brand.id;
                return (
                  <button
                    key={brand.id}
                    onClick={() => onSelectBrand?.(isSelected ? null : brand.id)}
                    className={`px-3 py-2 rounded-xl border text-center font-bold text-xs transition-all truncate ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    title={brand.name}
                  >
                    {brand.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. CATEGORY SPECIFIC CRITERIA FILTERS */}
      {categoryConfig.criteria.map((crit, idx) => {
        const isExpanded = expandedSections[crit.key] !== false;
        const activeValue = selectedFilters[crit.key];

        return (
          <div key={crit.key} className="border-b border-gray-100 pb-4 space-y-2">
            <button
              onClick={() => toggleSection(crit.key)}
              className="w-full flex items-center justify-between font-extrabold text-gray-900 uppercase tracking-wider text-xs"
            >
              <div className="flex items-center space-x-1.5">
                <span>{`${idx + (brands.length > 0 ? 3 : 2)}. ${crit.title}`}</span>
                {activeValue && (
                  <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    1
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isExpanded && (
              <div className="space-y-1 pt-1">
                {crit.options.map((opt) => {
                  const isChecked = activeValue === opt;
                  return (
                    <label
                      key={opt}
                      onClick={() => onFilterChange?.(crit.key, isChecked ? null : opt)}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60'
                          : 'hover:bg-gray-50 text-gray-700 font-medium'
                      }`}
                    >
                      <span className="text-xs">{opt}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default ProductListFilter;

