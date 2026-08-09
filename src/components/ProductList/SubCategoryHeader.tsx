import React from 'react';

export interface SubCategory {
  id: string;
  name: string;
  slug?: string;
  iconText?: string;
  iconBg?: string;
}

interface SubCategoryHeaderProps {
  categories?: SubCategory[];
  activeId?: string | null;
  onSelectCategory?: (id: string | null) => void;
}

const defaultSubCategories: SubCategory[] = [
  { id: 'vfx', name: 'PC Animation - VFX', iconText: 'VFX', iconBg: 'bg-black text-white' },
  { id: 'photoshop', name: 'PC PHOTOSHOP - ILLUSTRATOR', iconText: 'Ps', iconBg: 'bg-blue-700 text-cyan-300' },
  { id: 'do-hoa', name: 'Máy Tính Đồ Họa', iconText: 'NC', iconBg: 'bg-neutral-800 text-white' },
  { id: 'build-pc', name: 'Build PC Custom', iconText: 'PC', iconBg: 'bg-gray-100 text-gray-700 border border-gray-300' },
];

export const SubCategoryHeader: React.FC<SubCategoryHeaderProps> = ({
  categories = defaultSubCategories,
  activeId,
  onSelectCategory,
}) => {
  const displayCategories = categories.length > 0 ? categories : defaultSubCategories;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
        {/* All Products Option */}
        <button
          onClick={() => onSelectCategory?.(null)}
          className="flex flex-col items-center group space-y-2 cursor-pointer focus:outline-none"
        >
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-md transition-transform duration-300 group-hover:scale-105 bg-gray-900 text-white ${
              !activeId ? 'ring-4 ring-blue-500 ring-offset-2' : ''
            }`}
          >
            ALL
          </div>
          <span
            className={`text-xs font-bold text-center max-w-[130px] sm:max-w-[150px] leading-tight transition-colors ${
              !activeId ? 'text-blue-600 font-extrabold' : 'text-gray-800 group-hover:text-blue-600'
            }`}
          >
            Tất cả danh mục
          </span>
        </button>

        {displayCategories.map((cat) => {
          const isActive = activeId === cat.id;
          const shortText = cat.iconText || cat.name.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory?.(isActive ? null : cat.id)}
              className="flex flex-col items-center group space-y-2 cursor-pointer focus:outline-none"
            >
              {/* Circle Icon */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-extrabold text-base sm:text-lg shadow-md transition-transform duration-300 group-hover:scale-105 ${
                  cat.iconBg || 'bg-blue-50 text-blue-700 border border-blue-100'
                } ${isActive ? 'ring-4 ring-blue-500 ring-offset-2' : ''}`}
              >
                {shortText}
              </div>

              {/* Title Label */}
              <span
                className={`text-xs font-bold text-center max-w-[130px] sm:max-w-[150px] leading-tight transition-colors ${
                  isActive ? 'text-blue-600 font-extrabold' : 'text-gray-800 group-hover:text-blue-600'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubCategoryHeader;

