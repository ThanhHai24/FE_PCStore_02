import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Save,
  AlertTriangle,
  Package,
  Loader2,
  RotateCcw,
  FolderTree,
  Award
} from 'lucide-react';
import { getProducts, getCategories, getBrands, deleteProduct } from '../../services/productService';
import { getImageUrl } from '../../services/api';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductItem {
  id: string;
  sku?: string;
  name: string;
  category: string;
  brand?: string;
  distributor?: string;
  warranty?: string;
  shortDescription?: string;
  description?: string;
  marketPrice?: string;
  sellPrice?: string;
  price: string;
  stock: number;
  minStockAlert?: number;
  importPrice?: string;
  discountPrice?: string;
  profitMargin?: string;
  status: 'In Stock' | 'Out of Stock' | 'Low Stock';
  coverImage?: string;
  productImages?: string[];
  image: string;
  specs?: ProductSpec[];
}

export const Products: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const [categoriesList, setCategoriesList] = useState<{ id: string; name: string }[]>([]);
  const [brandsList, setBrandsList] = useState<{ id: string; name: string }[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);

  // Fetch Master Data (Categories & Brands)
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          getCategories(),
          getBrands()
        ]);
        if (catRes && catRes.categories) {
          setCategoriesList(catRes.categories.map((c: any) => ({ id: c.id.toString(), name: c.name })));
        }
        if (brandRes && brandRes.brands) {
          setBrandsList(brandRes.brands.map((b: any) => ({ id: b.id.toString(), name: b.name })));
        }
      } catch (err) {
        console.warn('Fetch master data error:', err);
      }
    };
    fetchMasterData();
  }, []);

  // Fetch real products from API
  const fetchRealProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts({
        limit: 100,
        search: searchTerm || undefined,
        categoryId: categoryFilter !== 'all' ? categoryFilter : undefined,
        brandId: brandFilter !== 'all' ? brandFilter : undefined,
        status: 'ALL',
      });

      if (res && res.products && res.products.length > 0) {
        const mapped: ProductItem[] = res.products.map((p) => {
          const formattedSellPrice = p.price ? `${p.price.toLocaleString('vi-VN')} ₫` : '0 ₫';
          const formattedMarketPrice = p.originalPrice ? `${p.originalPrice.toLocaleString('vi-VN')} ₫` : '';
          const specsArray: ProductSpec[] = [];
          if (p.specifications && typeof p.specifications === 'object') {
            Object.entries(p.specifications).forEach(([k, v]) => {
              if (v) specsArray.push({ name: k, value: String(v) });
            });
          }

          return {
            id: p.id.toString(),
            sku: p.sku || `PRD-${p.id}`,
            name: p.name,
            category: p.category?.name || 'Chưa phân loại',
            brand: p.brand?.name || 'N/A',
            distributor: 'Synnex FPT',
            warranty: p.warranty ? `${p.warranty} Tháng` : '36 Tháng',
            shortDescription: p.shortDescription || '',
            description: p.description || '',
            marketPrice: formattedMarketPrice,
            sellPrice: formattedSellPrice,
            price: formattedSellPrice,
            stock: p.stock ?? 0,
            minStockAlert: 5,
            status: (p.stock === 0 ? 'Out of Stock' : (p.stock ?? 0) <= 5 ? 'Low Stock' : 'In Stock') as any,
            coverImage: p.image ? getImageUrl(p.image) : 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
            productImages: p.images ? p.images.map((img) => getImageUrl(img)) : [],
            image: p.image ? getImageUrl(p.image) : 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80',
            specs: specsArray
          };
        });
        setProducts(mapped);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.warn('API getProducts fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealProducts();
  }, [searchTerm, categoryFilter, brandFilter]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setBrandFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Open Delete Modal
  const handleOpenDeleteModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct.id);
        fetchRealProducts();
      } catch (err) {
        console.warn('Delete product API error fallback:', err);
      }
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
    }
  };

  // Open View Modal
  const handleOpenViewModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Filter Products by Status on Frontend
  const filteredProducts = products.filter((prod) => {
    const matchesStatus = statusFilter === 'all' || prod.status === statusFilter;
    return matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasActiveFilters = searchTerm !== '' || categoryFilter !== 'all' || brandFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản Lý Sản Phẩm</h1>
          <p className="text-xs text-gray-500 mt-1">Danh sách sản phẩm PC Store, lọc theo danh mục, thương hiệu và trạng thái tồn kho (10 sản phẩm/trang).</p>
        </div>
        <button
          onClick={() => navigate('/admin/products/create')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Thêm Sản Phẩm Mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm tên sản phẩm, SKU hoặc Mã SP..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 text-xs text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <FolderTree className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs text-gray-800 font-medium outline-none cursor-pointer"
              >
                <option value="all">Tất cả danh mục</option>
                {categoriesList.map((c) => (
                  <option key={c.id} value={c.id}>
                    📁 {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <Award className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={brandFilter}
                onChange={(e) => {
                  setBrandFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs text-gray-800 font-medium outline-none cursor-pointer"
              >
                <option value="all">Tất cả thương hiệu</option>
                {brandsList.map((b) => (
                  <option key={b.id} value={b.id}>
                    🏷️ {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs text-gray-800 font-medium outline-none cursor-pointer"
              >
                <option value="all">Tất cả trạng thái kho</option>
                <option value="In Stock">✅ Còn hàng</option>
                <option value="Low Stock">⚠️ Sắp hết hàng (&le;5)</option>
                <option value="Out of Stock">❌ Hết hàng (0)</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl border border-gray-200 transition-colors"
                title="Xóa bộ lọc"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5">Mã & Tên Sản Phẩm</th>
                <th className="px-4 py-3.5">Danh Mục</th>
                <th className="px-4 py-3.5">Thương Hiệu</th>
                <th className="px-4 py-3.5">Giá Niêm Yết</th>
                <th className="px-4 py-3.5">Giá Bán</th>
                <th className="px-4 py-3.5">Tồn Kho</th>
                <th className="px-4 py-3.5">Trạng Thái</th>
                <th className="px-4 py-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    Đang nạp danh sách sản phẩm từ máy chủ...
                  </td>
                </tr>
              ) : paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    Không tìm thấy sản phẩm nào khớp với bộ lọc.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.coverImage || prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{prod.name}</p>
                          <p className="text-[11px] text-blue-600 font-mono font-semibold">{prod.sku || prod.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-[11px]">
                        {prod.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">
                      <span className="inline-block px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[11px]">
                        {prod.brand}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 line-through text-[11px]">
                      {prod.marketPrice || '-'}
                    </td>
                    <td className="px-4 py-3 font-black text-blue-600">
                      {prod.sellPrice || prod.price}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900">
                      {prod.stock}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          prod.status === 'In Stock'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : prod.status === 'Low Stock'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        }`}
                      >
                        {prod.status === 'In Stock' ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : prod.status === 'Low Stock' ? (
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-rose-600" />
                        )}
                        {prod.status === 'In Stock'
                          ? 'Còn hàng'
                          : prod.status === 'Low Stock'
                          ? 'Sắp hết'
                          : 'Hết hàng'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleOpenViewModal(prod)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Xem chi tiết"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => navigate(`/admin/products/edit/${prod.id}`)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Sửa sản phẩm"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleOpenDeleteModal(prod)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa sản phẩm"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-medium">
            Hiển thị <span className="font-bold text-gray-800">{filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</span> đến{' '}
            <span className="font-bold text-gray-800">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</span> trên tổng số{' '}
            <span className="font-bold text-gray-900">{filteredProducts.length}</span> sản phẩm
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Trang trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Trang sau
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 3: XÓA */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto"><AlertTriangle className="w-6 h-6" /></div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa Sản Phẩm Này?</h2>
              <p className="text-xs text-gray-500 mt-1">Bạn có chắc chắn muốn xóa "{selectedProduct.name}" không?</p>
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl">Hủy</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-xl shadow">Xác Nhận Xóa</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: XEM CHI TIẾT */}
      {isViewModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" /> Chi Tiết Sản Phẩm ({selectedProduct.id})
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img src={selectedProduct.coverImage || selectedProduct.image} alt={selectedProduct.name} className="w-20 h-20 rounded-xl object-cover border border-gray-200" />
              <div>
                <h3 className="font-bold text-sm text-gray-900">{selectedProduct.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {selectedProduct.marketPrice && <span className="text-xs text-gray-400 line-through">{selectedProduct.marketPrice}</span>}
                  <span className="text-sm text-blue-600 font-black">{selectedProduct.sellPrice || selectedProduct.price}</span>
                </div>
                <div className="flex gap-2 text-[11px] text-gray-500 mt-1">
                  <span>DM: <strong className="text-gray-700">{selectedProduct.category}</strong></span>
                  {selectedProduct.brand && <span>| TH: <strong className="text-blue-600">{selectedProduct.brand}</strong></span>}
                </div>
              </div>
            </div>
            {selectedProduct.specs && selectedProduct.specs.length > 0 && (
              <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="font-bold text-xs text-gray-900 mb-1">Thông số kỹ thuật:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedProduct.specs.map((s, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-lg border border-gray-200/60">
                      <span className="text-gray-400 block text-[10px]">{s.name}</span>
                      <span className="font-semibold text-gray-800 text-xs">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2 text-xs text-gray-700">
              <p><span className="font-semibold text-gray-900">Nhà phân phối:</span> {selectedProduct.distributor || 'Chưa cập nhật'}</p>
              <p><span className="font-semibold text-gray-900">Bảo hành:</span> {selectedProduct.warranty || 'Chưa cập nhật'}</p>
              <p><span className="font-semibold text-gray-900">Tồn kho:</span> {selectedProduct.stock} sản phẩm</p>
              <p><span className="font-semibold text-gray-900">Mô tả ngắn:</span> {selectedProduct.shortDescription || 'Chưa có mô tả ngắn'}</p>
            </div>
            <div className="pt-3 flex justify-end border-t border-gray-100">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
