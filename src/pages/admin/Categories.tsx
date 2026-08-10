import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  X,
  Save,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { getCategories, createCategoryApi, updateCategoryApi, deleteCategoryApi } from '../../services/productService';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  description: string;
  status: 'Active' | 'Hidden';
}

export const Categories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: 'CAT-01', name: 'PC Nguyên Bộ', slug: 'pc-nguyen-bo', itemCount: 128, description: 'Các cấu hình máy tính nguyên bộ PC Gaming, PC Đồ họa, PC Văn phòng.', status: 'Active' },
    { id: 'CAT-02', name: 'Linh Kiện PC', slug: 'linh-kien-pc', itemCount: 340, description: 'Card màn hình VGA, CPU Intel/AMD, RAM DDR4/DDR5, Mainboard, SSD/HDD.', status: 'Active' },
  ]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      if (res && res.categories && res.categories.length > 0) {
        const mapped: CategoryItem[] = res.categories.map((c: any) => ({
          id: c.id.toString(),
          name: c.name,
          slug: c.slug || c.name.toLowerCase().replace(/\s+/g, '-'),
          itemCount: c._count?.products ?? 0,
          description: c.description || 'Danh mục hàng sản phẩm PC Store',
          status: 'Active'
        }));
        setCategories(mapped);
      }
    } catch (err) {
      console.warn('API getCategories fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'Active' as 'Active' | 'Hidden',
  });

  // Open Add Modal
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      status: 'Active',
    });
    setIsAddModalOpen(true);
  };

  // Submit Add Category
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createCategoryApi({
        name: formData.name,
        slug: formData.slug || undefined,
        description: formData.description || undefined
      });
      if (res && res.category) {
        fetchCategories();
      }
    } catch (err) {
      console.warn('createCategoryApi failed fallback:', err);
      const newCategory: CategoryItem = {
        id: `CAT-0${categories.length + 1}`,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        itemCount: 0,
        description: formData.description || 'Danh mục sản phẩm vừa tạo.',
        status: formData.status,
      };
      setCategories([newCategory, ...categories]);
    }
    setIsAddModalOpen(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      status: cat.status,
    });
    setIsEditModalOpen(true);
  };

  // Submit Edit Category
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    try {
      await updateCategoryApi(selectedCategory.id, {
        name: formData.name,
        slug: formData.slug,
        description: formData.description
      });
      fetchCategories();
    } catch (err) {
      console.warn('updateCategoryApi failed fallback:', err);
      const updated = categories.map((c) =>
        c.id === selectedCategory.id
          ? { ...c, name: formData.name, slug: formData.slug, description: formData.description, status: formData.status }
          : c
      );
      setCategories(updated);
    }
    setIsEditModalOpen(false);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Category
  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategoryApi(selectedCategory.id);
      fetchCategories();
    } catch (err) {
      console.warn('deleteCategoryApi failed fallback:', err);
      setCategories(categories.filter((c) => c.id !== selectedCategory.id));
    }
    setIsDeleteModalOpen(false);
  };

  // Open View Detail
  const handleOpenViewModal = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setIsViewModalOpen(true);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE) || 1;
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Quản Lý Danh Mục Sản Phẩm
          </h1>
          <p className="text-xs text-gray-500">
            Quản lý và thực hiện các thao tác Thêm, Sửa, Xóa danh mục ngành hàng PC Store.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow transition-all"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Thêm Danh Mục Mới</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tên hoặc mã danh mục..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 text-xs text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5">Mã & Tên Danh Mục</th>
                <th className="px-4 py-3.5">Slug URL</th>
                <th className="px-4 py-3.5">Số SP</th>
                <th className="px-4 py-3.5">Mô tả</th>
                <th className="px-4 py-3.5">Trạng thái</th>
                <th className="px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    Đang nạp danh mục từ máy chủ...
                  </td>
                </tr>
              ) : paginatedCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    Không tìm thấy danh mục nào.
                  </td>
                </tr>
              ) : (
                paginatedCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          <FolderTree className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{cat.name}</p>
                          <p className="text-[11px] text-blue-600 font-semibold">{cat.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 font-mono text-[11px]">{cat.slug}</td>
                    <td className="px-4 py-3.5 font-bold text-gray-900">{cat.itemCount} sản phẩm</td>
                    <td className="px-4 py-3.5 text-gray-500 max-w-xs truncate">{cat.description}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          cat.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {cat.status === 'Active' ? 'Đang hiển thị' : 'Đang ẩn'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenViewModal(cat)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(cat)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Sửa danh mục"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(cat)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa danh mục"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
            Hiển thị <span className="font-bold text-gray-800">{filteredCategories.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</span> đến{' '}
            <span className="font-bold text-gray-800">{Math.min(currentPage * ITEMS_PER_PAGE, filteredCategories.length)}</span> trên tổng số{' '}
            <span className="font-bold text-gray-900">{filteredCategories.length}</span> danh mục
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

      {/* MODAL 1: THÊM DANH MỤC */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Thêm Danh Mục Mới
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên danh mục *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="vd: Thiết Bị Lưu Trữ SSD/HDD"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Slug URL (Tùy chọn)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="vd: thiet-bi-luu-tru"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả danh mục</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập mô tả nhóm hàng..."
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
                  <span>Lưu Danh Mục</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SỬA DANH MỤC */}
      {isEditModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-600" /> Sửa Danh Mục ({selectedCategory.id})
              </h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên danh mục *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Slug URL *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả</label>
                <textarea
                  rows={3}
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
                  <span>Cập Nhật Danh Mục</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: XÓA DANH MỤC */}
      {isDeleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa Danh Mục Này?</h2>
              <p className="text-xs text-gray-500 mt-1">
                Bạn có chắc muốn xóa <span className="font-bold text-gray-900">"{selectedCategory.name}"</span>? Các sản phẩm thuộc danh mục này có thể bị ảnh hưởng.
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

      {/* MODAL 4: XEM CHI TIẾT DANH MỤC */}
      {isViewModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-blue-600" /> Chi Tiết Danh Mục ({selectedCategory.id})
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><span className="font-semibold text-gray-900">Tên danh mục:</span> {selectedCategory.name}</p>
              <p><span className="font-semibold text-gray-900">Slug đường dẫn:</span> <code className="bg-gray-100 px-2 py-0.5 rounded">{selectedCategory.slug}</code></p>
              <p><span className="font-semibold text-gray-900">Số sản phẩm đang có:</span> {selectedCategory.itemCount} sản phẩm</p>
              <p><span className="font-semibold text-gray-900">Mô tả:</span> {selectedCategory.description}</p>
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

export default Categories;
