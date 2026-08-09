import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export interface PriceRangeOption {
  id: string;
  label: string;
  count?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface FilterCriteria {
  key: string;
  title: string;
  options: string[];
}

interface ProductListFilterProps {
  selectedPriceRange?: string | null;
  onSelectPriceRange?: (id: string | null) => void;
  selectedFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string | null) => void;
  onResetFilters?: () => void;
}

const defaultPriceRanges: PriceRangeOption[] = [
  { id: '15-20', label: '15 triệu - 20 triệu', count: 2, minPrice: 15000000, maxPrice: 20000000 },
  { id: '20-50', label: '20 triệu - 50 triệu', count: 13, minPrice: 20000000, maxPrice: 50000000 },
  { id: '50-100', label: '50 triệu - 100 triệu', count: 16, minPrice: 50000000, maxPrice: 100000000 },
  { id: 'gt-100', label: 'Trên 100 triệu', count: 13, minPrice: 100000000, maxPrice: Infinity },
];

const defaultCriteriaList: FilterCriteria[] = [
  { key: 'brand', title: 'Thương hiệu', options: ['ASUS / ROG', 'Intel', 'AMD', 'MSI', 'Gigabyte'] },
  { key: 'threads', title: 'Số luồng', options: ['12 Luồng', '16 Luồng', '24 Luồng', '28 Luồng', '32 Luồng'] },
  { key: 'ramSlots', title: 'Số khe Ram', options: ['2 Khe', '4 Khe'] },
  { key: 'cores', title: 'Số nhân', options: ['8 Nhân', '12 Nhân', '14 Nhân', '20 Nhân', '24 Nhân'] },
  { key: 'chipset', title: 'Main Chipset', options: ['Z790', 'B760', 'X870E', 'B650', 'Z890'] },
  { key: 'ramSize', title: 'Bộ nhớ của ram', options: ['16GB', '32GB', '64GB', '128GB'] },
  { key: 'gpu', title: 'GPU', options: ['RTX 4060', 'RTX 4070 Super', 'RTX 4080 Super', 'RTX 4090', 'RTX 5080'] },
  { key: 'storage', title: 'Dung lượng lưu trữ', options: ['512GB SSD', '1TB NVMe', '2TB NVMe', '4TB NVMe'] },
  { key: 'socket', title: 'Loại Socket', options: ['LGA1700', 'LGA1851', 'AM5'] },
  { key: 'cpuLine', title: 'Dòng CPU', options: ['Core i5', 'Core i7', 'Core Ultra 9', 'Ryzen 7', 'Ryzen 9'] },
  { key: 'coolerType', title: 'Kiểu tản nhiệt', options: ['Tản nhiệt khí', 'Tản nhiệt nước AIO 240mm', 'Tản nhiệt nước AIO 360mm'] },
];

export const ProductListFilter: React.FC<ProductListFilterProps> = ({
  selectedPriceRange,
  onSelectPriceRange,
  selectedFilters = {},
  onFilterChange,
  onResetFilters,
}) => {
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdownKey((prev) => (prev === key ? null : key));
  };

  const handleSelectOption = (key: string, optionValue: string) => {
    const currentValue = selectedFilters[key];
    if (currentValue === optionValue) {
      onFilterChange?.(key, null);
    } else {
      onFilterChange?.(key, optionValue);
    }
    setOpenDropdownKey(null);
  };

  const activeFiltersCount = Object.keys(selectedFilters).filter((k) => selectedFilters[k]).length + (selectedPriceRange ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 mb-6 space-y-5">
      {/* Row 1: Khoảng giá Quick Tags */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-xs font-bold text-gray-800 shrink-0 min-w-[90px]">Khoảng giá:</span>
        <div className="flex flex-wrap items-center gap-2">
          {defaultPriceRanges.map((range) => {
            const isSelected = selectedPriceRange === range.id;
            return (
              <button
                key={range.id}
                onClick={() => onSelectPriceRange?.(isSelected ? null : range.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'border-red-600 bg-red-50 text-red-600 ring-1 ring-red-500 font-bold'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {range.label} {range.count !== undefined && <span className="text-gray-400 font-normal">({range.count})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Chọn theo tiêu chí Dropdowns */}
      <div className="flex flex-wrap items-start gap-2 pt-2 border-t border-gray-100">
        <span className="text-xs font-bold text-gray-800 shrink-0 min-w-[120px] pt-2">Chọn theo tiêu chí:</span>
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {defaultCriteriaList.map((crit) => {
            const isOpen = openDropdownKey === crit.key;
            const activeValue = selectedFilters[crit.key];

            return (
              <div key={crit.key} className="relative">
                <button
                  onClick={() => toggleDropdown(crit.key)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    activeValue
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span>{activeValue ? `${crit.title}: ${activeValue}` : crit.title}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Options Popup */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-30 p-2 space-y-1 animate-in fade-in zoom-in-95">
                    {crit.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(crit.key, opt)}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors ${
                          activeValue === opt
                            ? 'bg-blue-600 text-white font-bold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Filters / Reset row if filters applied */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="font-bold text-gray-500">Đã chọn ({activeFiltersCount}):</span>
            {selectedPriceRange && (
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold flex items-center space-x-1">
                <span>Khoảng giá: {defaultPriceRanges.find(r => r.id === selectedPriceRange)?.label}</span>
                <button onClick={() => onSelectPriceRange?.(null)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {Object.entries(selectedFilters).map(([k, v]) => {
              if (!v) return null;
              const crit = defaultCriteriaList.find((c) => c.key === k);
              return (
                <span key={k} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold flex items-center space-x-1">
                  <span>{crit?.title || k}: {v}</span>
                  <button onClick={() => onFilterChange?.(k, null)}><X className="w-3 h-3" /></button>
                </span>
              );
            })}
          </div>

          <button
            onClick={onResetFilters}
            className="text-red-600 font-bold hover:underline shrink-0 ml-auto"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListFilter;
