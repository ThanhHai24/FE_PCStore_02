import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import SubCategoryHeader from '../../components/ProductList/SubCategoryHeader';
import type { SubCategory } from '../../components/ProductList/SubCategoryHeader';
import ProductListFilter, { defaultPriceRanges } from '../../components/ProductList/ProductListFilter';
import ProductSortBar from '../../components/ProductList/ProductSortBar';
import type { SortOptionKey, ViewMode } from '../../components/ProductList/ProductSortBar';
import ProductCard from '../../components/BoxProductCategory/ProductCard';
import {
  getProducts,
  getCategories,
  getBrandsByCategory,
  getCategoryDetail,
  formatProductToCardProps,
} from '../../services/productService';
import type { ApiProduct, ApiBrand, ApiCategory } from '../../types/apiProduct';

export const ProductList: React.FC = () => {
  const { categoryId: routeCategoryId } = useParams<{ categoryId?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamQuery = searchParams.get('q') || searchParams.get('search') || '';
  const searchParamCategory = searchParams.get('categoryId') || routeCategoryId || null;
  const searchParamBrand = searchParams.get('brandId') || null;

  const [categories, setCategories] = useState<SubCategory[]>([]);
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(searchParamCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(searchParamBrand);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [currentSort, setCurrentSort] = useState<SortOptionKey>('price-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 15,
    totalPages: 1,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sync categoryId from route or query params
  useEffect(() => {
    if (searchParamCategory !== selectedSubCategory) {
      setSelectedSubCategory(searchParamCategory);
    }
  }, [searchParamCategory]);

  // Load categories for SubCategoryHeader
  useEffect(() => {
    let isMounted = true;
    getCategories(true)
      .then((res) => {
        if (!isMounted) return;
        const mapped: SubCategory[] = (res.categories || []).map((cat: ApiCategory) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          iconText: cat.name.substring(0, 3).toUpperCase(),
        }));
        setCategories(mapped);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch category details and brands when categoryId changes
  useEffect(() => {
    let isMounted = true;
    const catId = selectedSubCategory || routeCategoryId;
    if (catId) {
      getCategoryDetail(catId)
        .then((res) => {
          if (isMounted && res.category) {
            setCategoryName(res.category.name);
          }
        })
        .catch(() => {
          if (isMounted) setCategoryName('');
        });

      getBrandsByCategory(catId)
        .then((res) => {
          if (isMounted && res.brands) {
            setBrands(res.brands);
          }
        })
        .catch(() => {
          if (isMounted) setBrands([]);
        });
    } else {
      setCategoryName('');
      setBrands([]);
    }
    return () => {
      isMounted = false;
    };
  }, [selectedSubCategory, routeCategoryId]);

  // Fetch products from API
  const fetchProductsList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let minPrice: number | undefined = undefined;
      let maxPrice: number | undefined = undefined;

      if (selectedPriceRange) {
        const found = defaultPriceRanges.find((r) => r.id === selectedPriceRange);
        if (found) {
          minPrice = found.minPrice;
          maxPrice = found.maxPrice;
        }
      }

      let sortBy: 'createdAt' | 'price' | 'viewCount' | 'name' = 'price';
      let sortOrder: 'asc' | 'desc' = 'asc';

      if (currentSort === 'price-asc') {
        sortBy = 'price';
        sortOrder = 'asc';
      } else if (currentSort === 'price-desc') {
        sortBy = 'price';
        sortOrder = 'desc';
      } else if (currentSort === 'popular') {
        sortBy = 'viewCount';
        sortOrder = 'desc';
      } else if (currentSort === 'rating') {
        sortBy = 'createdAt';
        sortOrder = 'desc';
      } else if (currentSort === 'name-az') {
        sortBy = 'name';
        sortOrder = 'asc';
      }

      const response = await getProducts({
        page,
        limit: 15,
        categoryId: selectedSubCategory || undefined,
        brandId: selectedBrandId || undefined,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
        search: searchParamQuery || undefined,
        status: 'ACTIVE',
      });

      setProducts(response.products || []);
      if (response.pagination) {
        setPagination(response.pagination);
      } else {
        setPagination({
          total: response.products ? response.products.length : 0,
          page: 1,
          limit: 15,
          totalPages: 1,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể tải danh sách sản phẩm';
      setError(msg);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, selectedSubCategory, selectedBrandId, selectedPriceRange, currentSort, searchParamQuery]);

  useEffect(() => {
    fetchProductsList();
  }, [fetchProductsList]);

  const handleFilterChange = (key: string, value: string | null) => {
    setSelectedFilters((prev) => {
      const next = { ...prev };
      if (!value) delete next[key];
      else next[key] = value;
      return next;
    });
    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedPriceRange(null);
    setSelectedBrandId(null);
    setSelectedFilters({});
    setSelectedSubCategory(null);
    setPage(1);
    if (searchParams.toString()) {
      setSearchParams({});
    }
  };

  const handleSelectCategory = (catId: string | null) => {
    setSelectedSubCategory(catId);
    setPage(1);
  };

  const handleSelectPriceRange = (rangeId: string | null) => {
    setSelectedPriceRange(rangeId);
    setPage(1);
  };

  const handleSelectBrand = (brandId: string | null) => {
    setSelectedBrandId(brandId);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center space-x-1.5 flex-wrap gap-y-1">
        <Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link>
        <span>&gt;</span>
        <Link to="/products" className="hover:text-blue-600 font-medium uppercase">Sản phẩm</Link>
        {categoryName && (
          <>
            <span>&gt;</span>
            <span className="text-gray-800 font-bold uppercase">{categoryName}</span>
          </>
        )}
        {searchParamQuery && (
          <>
            <span>&gt;</span>
            <span className="text-gray-800 font-bold">Tìm kiếm: "{searchParamQuery}"</span>
          </>
        )}
      </nav>

      {/* Sub-Category Icon Header */}
      <SubCategoryHeader
        categories={categories}
        activeId={selectedSubCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Filter Section */}
      <ProductListFilter
        brands={brands}
        selectedPriceRange={selectedPriceRange}
        onSelectPriceRange={handleSelectPriceRange}
        selectedBrandId={selectedBrandId}
        onSelectBrand={handleSelectBrand}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Sort & View Mode Bar */}
      <ProductSortBar
        currentSort={currentSort}
        onSortChange={(sortKey) => {
          setCurrentSort(sortKey);
          setPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalProducts={pagination.total}
      />

      {/* Loading Skeleton / State */}
      {loading ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-xs font-semibold text-gray-600">Đang tải danh sách sản phẩm...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-2xl p-8 text-center border border-red-100 space-y-3">
          <h3 className="text-sm font-bold text-red-700">Đã xảy ra lỗi khi kết nối máy chủ</h3>
          <p className="text-xs text-red-500">{error}</p>
          <button
            onClick={fetchProductsList}
            className="mt-2 inline-block bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      ) : products.length === 0 ? (
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
          {products.map((product) => {
            const cardProps = formatProductToCardProps(product);
            return (
              <ProductCard
                key={product.id}
                {...cardProps}
              />
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {!loading && !error && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Trước
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pNum) => (
            <button
              key={pNum}
              onClick={() => handlePageChange(pNum)}
              className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors ${
                pNum === page
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages}
            className="px-3 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

