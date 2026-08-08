import React from 'react';
import { ArrowUpNarrowWide, ArrowDownWideNarrow, MessageSquare, Star, ArrowDownAZ, LayoutGrid, List } from 'lucide-react';

export type SortOptionKey = 'price-asc' | 'price-desc' | 'popular' | 'rating' | 'name-az';
export type ViewMode = 'grid' | 'list';

interface ProductSortBarProps {
  currentSort?: SortOptionKey;
  onSortChange?: (sortKey: SortOptionKey) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  totalProducts?: number;
}

export const ProductSortBar: React.FC<ProductSortBarProps> = ({
  currentSort = 'price-asc',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  totalProducts,
}) => {
  const sortOptions = [
    { key: 'price-asc' as SortOptionKey, label: 'Giá tăng dần', icon: ArrowUpNarrowWide },
    { key: 'price-desc' as SortOptionKey, label: 'Giá giảm dần', icon: ArrowDownWideNarrow },
    { key: 'popular' as SortOptionKey, label: 'Trao đổi', icon: MessageSquare },
    { key: 'rating' as SortOptionKey, label: 'Đánh giá', icon: Star },
    { key: 'name-az' as SortOptionKey, label: 'Tên A->Z', icon: ArrowDownAZ },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-wrap items-center justify-between gap-4">
      {/* Left: Sort buttons row matching screenshot */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {totalProducts !== undefined && (
          <span className="font-bold text-gray-500 mr-2 border-r border-gray-200 pr-3">
            {totalProducts} sản phẩm
          </span>
        )}
        {sortOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = currentSort === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onSortChange?.(opt.key)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                isActive
                  ? 'border-red-500 bg-red-50 text-red-600 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Grid vs List layout view mode toggle */}
      <div className="flex items-center space-x-1 border border-gray-200 rounded-xl p-1 bg-gray-50 shrink-0">
        <button
          onClick={() => onViewModeChange?.('grid')}
          className={`p-1.5 rounded-lg transition-colors ${
            viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
          title="Xem dạng lưới"
          aria-label="Xem dạng lưới"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange?.('list')}
          className={`p-1.5 rounded-lg transition-colors ${
            viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-gray-400 hover:text-gray-700'
          }`}
          title="Xem dạng danh sách"
          aria-label="Xem dạng danh sách"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductSortBar;
