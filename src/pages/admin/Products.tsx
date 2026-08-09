import React, { useState } from 'react';
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
  Package
} from 'lucide-react';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Out of Stock' | 'Low Stock';
  image: string;
  description?: string;
}

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Initial Product List State
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'PROD-001',
      name: 'PC Gaming Ultra RTX 4090 i9-14900K',
      category: 'PC Nguyên Bộ',
      price: '89.990.000 ₫',
      stock: 12,
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80',
      description: 'Cấu hình khủng nhất 2026, chiến mọi tựa game AAA ở độ phân giải 4K 144Hz.',
    },
    {
      id: 'PROD-002',
      name: 'Màn hình Dell UltraSharp U2723QE 27" 4K',
      category: 'Màn Hình',
      price: '14.250.000 ₫',
      stock: 3,
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80',
      description: 'Màn hình chuẩn màu đồ họa 4K IPS, độ phủ màu 100% sRGB & DCI-P3.',
    },
    {
      id: 'PROD-003',
      name: 'Card màn hình ASUS ROG Strix RTX 4080 Super',
      category: 'Linh Kiện PC',
      price: '34.500.000 ₫',
      stock: 0,
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=200&q=80',
      description: 'VGA tản nhiệt 3 quạt hầm hố, LED RGB Aura Sync, 16GB GDDR6X.',
    },
    {
      id: 'PROD-004',
      name: 'Bàn phím cơ Không dây Keychron Q1 Pro',
      category: 'Phụ Kiện',
      price: '4.890.000 ₫',
      stock: 25,
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80',
      description: 'Vỏ nhôm CNC nguyên khối, Switch Gateron Jupiter, kết nối Bluetooth 5.1.',
    },
    {
      id: 'PROD-005',
      name: 'Tai nghe Logitech G Pro X 2 LIGHTSPEED Wireless',
      category: 'Phụ Kiện',
      price: '5.990.000 ₫',
      stock: 8,
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80',
      description: 'Màng loa Graphene 50mm, âm thanh vòm DTS Headphone:X 2.0.',
    },
  ]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    category: 'PC Nguyên Bộ',
    price: '',
    stock: 10,
    status: 'In Stock' as 'In Stock' | 'Out of Stock' | 'Low Stock',
    image: '',
    description: '',
  });

  // Open Add Modal
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      category: 'PC Nguyên Bộ',
      price: '',
      stock: 10,
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80',
      description: '',
    });
    setIsAddModalOpen(true);
  };

  // Submit Add Product
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: ProductItem = {
      id: `PROD-00${products.length + 1}`,
      name: formData.name,
      category: formData.category,
      price: formData.price.includes('₫') ? formData.price : `${Number(formData.price).toLocaleString('vi-VN')} ₫`,
      stock: Number(formData.stock),
      status: Number(formData.stock) === 0 ? 'Out of Stock' : Number(formData.stock) <= 5 ? 'Low Stock' : 'In Stock',
      image: formData.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80',
      description: formData.description || 'Sản phẩm mới ra mắt tại PC Store.',
    };

    setProducts([newProduct, ...products]);
    setIsAddModalOpen(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      image: product.image,
      description: product.description || '',
    });
    setIsEditModalOpen(true);
  };

  // Submit Edit Product
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const updatedList = products.map((p) => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          name: formData.name,
          category: formData.category,
          price: formData.price.includes('₫') ? formData.price : `${Number(formData.price).toLocaleString('vi-VN')} ₫`,
          stock: Number(formData.stock),
          status: Number(formData.stock) === 0 ? 'Out of Stock' : Number(formData.stock) <= 5 ? 'Low Stock' : 'In Stock',
          image: formData.image,
          description: formData.description,
        };
      }
      return p;
    });

    setProducts(updatedList);
    setIsEditModalOpen(false);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!selectedProduct) return;
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setIsDeleteModalOpen(false);
  };

  // Open View Detail Modal
  const handleOpenViewModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Quản Lý Sản Phẩm
          </h1>
          <p className="text-xs text-gray-500">
            Danh sách và các thao tác Thêm, Sửa, Xóa sản phẩm PC Store.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow transition-all"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Thêm Sản Phẩm Mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tên hoặc mã sản phẩm..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 text-xs text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-gray-50 text-xs text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">Tất cả danh mục ({products.length})</option>
            <option value="PC Nguyên Bộ">PC Nguyên Bộ</option>
            <option value="Linh Kiện PC">Linh Kiện PC</option>
            <option value="Màn Hình">Màn Hình</option>
            <option value="Phụ Kiện">Phụ Kiện</option>
          </select>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5">Mã SP & Tên</th>
                <th className="px-4 py-3.5">Danh mục</th>
                <th className="px-4 py-3.5">Giá bán</th>
                <th className="px-4 py-3.5">Số lượng kho</th>
                <th className="px-4 py-3.5">Trạng thái</th>
                <th className="px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">{prod.name}</p>
                        <p className="text-[11px] text-blue-600 font-semibold">{prod.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-medium">{prod.category}</td>
                  <td className="px-4 py-3 font-bold text-gray-900">{prod.price}</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">{prod.stock} sp</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        prod.status === 'In Stock'
                          ? 'bg-emerald-50 text-emerald-700'
                          : prod.status === 'Low Stock'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {prod.status === 'In Stock' && <CheckCircle className="w-3 h-3" />}
                      {prod.status === 'Out of Stock' && <XCircle className="w-3 h-3" />}
                      {prod.status === 'In Stock'
                        ? 'Còn hàng'
                        : prod.status === 'Low Stock'
                        ? 'Sắp hết'
                        : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenViewModal(prod)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Chỉnh sửa (Sửa)"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(prod)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: THÊM SẢN PHẨM MỚI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Thêm Sản Phẩm Mới
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="vd: VGA RTX 4070 Super 12GB"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Danh mục *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="PC Nguyên Bộ">PC Nguyên Bộ</option>
                    <option value="Linh Kiện PC">Linh Kiện PC</option>
                    <option value="Màn Hình">Màn Hình</option>
                    <option value="Phụ Kiện">Phụ Kiện</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Số lượng kho *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Giá bán (VNĐ) *</label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="vd: 18.500.000"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">URL Hình ảnh</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả thông số kỹ thuật..."
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white rounded-xl shadow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Sản Phẩm</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CHỈNH SỬA SẢN PHẨM */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-600" /> Sửa Sản Phẩm ({selectedProduct.id})
              </h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Danh mục *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="PC Nguyên Bộ">PC Nguyên Bộ</option>
                    <option value="Linh Kiện PC">Linh Kiện PC</option>
                    <option value="Màn Hình">Màn Hình</option>
                    <option value="Phụ Kiện">Phụ Kiện</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Số lượng kho *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Giá bán *</label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả sản phẩm</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Cập Nhật Thay Đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: XÁC NHẬN XÓA SẢN PHẨM */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa Sản Phẩm Này?</h2>
              <p className="text-xs text-gray-500 mt-1">
                Bạn có chắc chắn muốn xóa <span className="font-bold text-gray-900">"{selectedProduct.name}"</span> không? Hành động này không thể hoàn tác.
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow"
              >
                Xác Nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: XEM CHI TIẾT SẢN PHẨM */}
      {isViewModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" /> Chi Tiết Sản Phẩm ({selectedProduct.id})
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 rounded-xl object-cover border border-gray-200"
              />
              <div>
                <h3 className="font-bold text-sm text-gray-900">{selectedProduct.name}</h3>
                <p className="text-xs text-blue-600 font-bold mt-0.5">{selectedProduct.price}</p>
                <span className="text-[11px] text-gray-500 font-medium">{selectedProduct.category}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><span className="font-semibold text-gray-900">Tồn kho:</span> {selectedProduct.stock} sản phẩm</p>
              <p><span className="font-semibold text-gray-900">Trạng thái:</span> {selectedProduct.status === 'In Stock' ? 'Còn hàng' : selectedProduct.status === 'Low Stock' ? 'Sắp hết hàng' : 'Hết hàng'}</p>
              <p><span className="font-semibold text-gray-900">Mô tả chi tiết:</span> {selectedProduct.description || 'Không có mô tả bổ sung.'}</p>
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
