import React, { useState } from 'react';
import type { SpecItem } from '../../types/product';

interface ProductTabsProps {
  specsTable: SpecItem[];
  descriptionHtml?: string;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ specsTable, descriptionHtml }) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'desc'>('specs');

  return (
    <div className="space-y-4">
      {/* Tabs Header Buttons matching screenshot 3 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl">
        <button
          onClick={() => setActiveTab('specs')}
          className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
            activeTab === 'specs'
              ? 'bg-sky-50 border-sky-400 text-sky-600 shadow-sm'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Thông số kỹ thuật
        </button>
        <button
          onClick={() => setActiveTab('desc')}
          className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
            activeTab === 'desc'
              ? 'bg-sky-50 border-sky-400 text-sky-600 shadow-sm'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Mô tả sản phẩm
        </button>
      </div>

      {/* Tab Content Box */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden">
        {activeTab === 'specs' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50 text-gray-800 font-bold uppercase tracking-wider text-center">
                  <th className="border border-gray-300 px-3 py-3 w-20 sm:w-28">MÃ</th>
                  <th className="border border-gray-300 px-4 py-3 text-center">TÊN LINH KIỆN</th>
                  <th className="border border-gray-300 px-3 py-3 w-24 sm:w-32">BẢO HÀNH</th>
                </tr>
              </thead>
              <tbody>
                {specsTable.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                    <td className="border border-gray-300 px-3 py-3 font-bold text-gray-800 text-center uppercase">
                      {item.key}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-red-600 font-semibold text-center leading-relaxed">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-3 py-3 text-gray-700 font-medium text-center">
                      {item.warranty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            {descriptionHtml ? (
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            ) : (
              <p className="text-gray-500 italic">Đang cập nhật bài viết mô tả cho sản phẩm này...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
