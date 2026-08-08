import React from 'react';

export interface SubCategory {
  id: string;
  name: string;
  iconText?: string;
  iconBg?: string;
}

interface SubCategoryHeaderProps {
  categories?: SubCategory[];
  activeId?: string;
  onSelectCategory?: (id: string) => void;
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
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap">
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory?.(cat.id)}
              className="flex flex-col items-center group space-y-2 cursor-pointer focus:outline-none"
            >
              {/* Circle Icon */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-extrabold text-base sm:text-lg shadow-md transition-transform duration-300 group-hover:scale-105 ${
                  cat.iconBg || 'bg-gray-100 text-gray-800'
                } ${isActive ? 'ring-4 ring-blue-500 ring-offset-2' : ''}`}
              >
                {cat.iconText || cat.name.charAt(0)}
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
