import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockProducts';
import SubCategoryHeader from '../../components/ProductList/SubCategoryHeader';
import ProductListFilter from '../../components/ProductList/ProductListFilter';
import ProductSortBar from '../../components/ProductList/ProductSortBar';
import type { SortOptionKey, ViewMode } from '../../components/ProductList/ProductSortBar';
import ProductCard from '../../components/BoxProductCategory/ProductCard';
import type { Product } from '../../types/product';

export const ProductList: React.FC = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('vfx');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [currentSort, setCurrentSort] = useState<SortOptionKey>('price-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleFilterChange = (key: string, value: string | null) => {
    setSelectedFilters((prev) => {
      const next = { ...prev };
      if (!value) delete next[key];
      else next[key] = value;
      return next;
    });
  };

  const handleResetFilters = () => {
    setSelectedPriceRange(null);
    setSelectedFilters({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list: Product[] = [...mockProducts];

    // Filter by price range
    if (selectedPriceRange === '15-20') {
      list = list.filter((p) => p.numericPrice >= 15000000 && p.numericPrice <= 20000000);
    } else if (selectedPriceRange === '20-50') {
      list = list.filter((p) => p.numericPrice >= 20000000 && p.numericPrice <= 50000000);
    } else if (selectedPriceRange === '50-100') {
      list = list.filter((p) => p.numericPrice >= 50000000 && p.numericPrice <= 100000000);
    } else if (selectedPriceRange === 'gt-100') {
      list = list.filter((p) => p.numericPrice > 100000000);
    }

    // Filter by criterion (brand, cpuLine, etc.)
    if (selectedFilters.brand) {
      list = list.filter((p) => p.brand?.toLowerCase().includes(selectedFilters.brand.toLowerCase()));
    }

    // Sorting logic
    if (currentSort === 'price-asc') {
      list.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (currentSort === 'price-desc') {
      list.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (currentSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === 'name-az') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [selectedPriceRange, selectedFilters, currentSort]);

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center space-x-1.5">
        <Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link>
        <span>&gt;</span>
        <span className="text-gray-800 font-bold uppercase">MÁY TÍNH ĐỒ HỌA / WORKSTATION</span>
      </nav>

      {/* Sub-Category Icon Header */}
      <SubCategoryHeader
        activeId={selectedSubCategory}
        onSelectCategory={setSelectedSubCategory}
      />

      {/* Filter Section */}
      <ProductListFilter
        selectedPriceRange={selectedPriceRange}
        onSelectPriceRange={setSelectedPriceRange}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Sort & View Mode Bar */}
      <ProductSortBar
        currentSort={currentSort}
        onSortChange={setCurrentSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalProducts={filteredProducts.length}
      />

      {/* Product List Content */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-base font-bold text-gray-800">Không tìm thấy sản phẩm phù hợp</h3>
          <p className="text-xs text-gray-500">Vui lòng thử bỏ bớt tiêu chí lọc hoặc chọn khoảng giá khác.</p>
          <button
            onClick={handleResetFilters}
            className="mt-2 inline-block bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.images[0]}
              price={product.price}
              marketPrice={product.marketPrice}
              discountPercent={product.discountPercent}
              badge={product.badge}
              inStock={product.inStock}
              link={`/product/${product.id}`}
            />
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <button className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-xs shadow-sm">1</button>
          <button className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50">2</button>
          <button className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50">3</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
