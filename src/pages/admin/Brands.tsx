import React, { useState, useEffect } from 'react';
import {
  Award,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  AlertTriangle,
  Loader2,
  Tag,
  CheckSquare,
  Square
} from 'lucide-react';
import { getBrands, getCategories, createBrandApi, updateBrandApi, deleteBrandApi } from '../../services/productService';
import { getImageUrl } from '../../services/api';

export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string;
  productsCount: number;
  categoryIds: string[];
  categories: { id: string; name: string }[];
}

export const Brands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [allCategories, setAllCategories] = useState<{ id: string; name: string }[]>([]);

  // Load all categories for assignment
  useEffect(() => {
    getCategories({ tree: false })
      .then((res) => {
        if (res && res.categories) {
          setAllCategories(res.categories.map((c) => ({ id: c.id.toString(), name: c.name })));
        }
      })
      .catch((err) => console.error('Error fetching categories in Brands page:', err));
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await getBrands(searchTerm || undefined);
      if (res && res.brands) {
        const mapped: BrandItem[] = res.brands.map((b: any) => ({
          id: b.id.toString(),
          name: b.name,
          slug: b.slug || b.name.toLowerCase().replace(/\s+/g, '-'),
          logo: b.logo || null,
          description: b.description || 'Thương hiệu sản phẩm PC Store',
          productsCount: b.productsCount ?? 0,
          categoryIds: b.categoryIds ? b.categoryIds.map((cid: any) => cid.toString()) : [],
          categories: b.categories ? b.categories.map((c: any) => ({ id: c.id.toString(), name: c.name })) : [],
        }));
        setBrands(mapped);
      }
    } catch (err) {
      console.warn('API getBrands fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [searchTerm]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    description: '',
    categoryIds: [] as string[],
  });

  // Open Add Modal
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      slug: '',
      logo: '',
      description: '',
      categoryIds: [],
    });
    setIsAddModalOpen(true);
  };

  // Submit Add Brand
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createBrandApi({
        name: formData.name,
        slug: formData.slug || undefined,
        logo: formData.logo || undefined,
        description: formData.description || undefined,
        categoryIds: formData.categoryIds,
      });
      if (res && res.brand) {
        fetchBrands();
      }
    } catch (err: any) {
      alert(`Lỗi tạo thương hiệu: ${err.message || 'Không thành công'}`);
    }
    setIsAddModalOpen(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (b: BrandItem) => {
    setSelectedBrand(b);
    setFormData({
      name: b.name,
      slug: b.slug,
      logo: b.logo || '',
      description: b.description,
      categoryIds: b.categoryIds || [],
    });
    setIsEditModalOpen(true);
  };

  // Submit Edit Brand
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) return;
    try {
      await updateBrandApi(selectedBrand.id, {
        name: formData.name,
        slug: formData.slug,
        logo: formData.logo || undefined,
        description: formData.description,
        categoryIds: formData.categoryIds,
      });
      fetchBrands();
    } catch (err: any) {
      alert(`Lỗi cập nhật thương hiệu: ${err.message || 'Không thành công'}`);
    }
    setIsEditModalOpen(false);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (b: BrandItem) => {
    setSelectedBrand(b);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Brand
  const handleConfirmDelete = async () => {
    if (!selectedBrand) return;
    try {
      await deleteBrandApi(selectedBrand.id);
      fetchBrands();
    } catch (err: any) {
      alert(`Lỗi xóa thương hiệu: ${err.message || 'Không thể xóa thương hiệu có sản phẩm'}`);
    }
    setIsDeleteModalOpen(false);
  };

  // Open View Detail Modal
  const handleOpenViewModal = (b: BrandItem) => {
    setSelectedBrand(b);
    setIsViewModalOpen(true);
  };

  const handleToggleCategory = (catId: string) => {
    setFormData((prev) => {
      const exists = prev.categoryIds.includes(catId);
      if (exists) {
        return { ...prev, categoryIds: prev.categoryIds.filter((id) => id !== catId) };
      } else {
        return { ...prev, categoryIds: [...prev.categoryIds, catId] };
      }
    });
  };

  const handleSelectAllCategories = () => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: allCategories.map((c) => c.id),
    }));
  };

  const handleClearAllCategories = () => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: [],
    }));
  };

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE) || 1;
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Quản Lý Thương Hiệu (Brands)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý danh sách thương hiệu & các loại sản phẩm/danh mục mà thương hiệu cung cấp.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Thêm Thương Hiệu Mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm tên, mã hoặc slug thương hiệu..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 text-xs text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
          />
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5">Thương Hiệu</th>
                <th className="px-4 py-3.5">Slug URL</th>
                <th className="px-4 py-3.5">Danh Mục Loại Sản Phẩm</th>
                <th className="px-4 py-3.5">Số Sản Phẩm</th>
                <th className="px-4 py-3.5">Mô Tả</th>
                <th className="px-4 py-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    Đang nạp danh sách thương hiệu...
                  </td>
                </tr>
              ) : paginatedBrands.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    Không tìm thấy thương hiệu nào.
                  </td>
                </tr>
              ) : (
                paginatedBrands.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 p-1 flex items-center justify-center overflow-hidden shrink-0">
                          {b.logo ? (
                            <img
                              src={getImageUrl(b.logo)}
                              alt={b.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Award className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{b.name}</p>
                          <p className="text-[11px] text-blue-600 font-semibold">ID: {b.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 font-mono text-[11px]">{b.slug}</td>
                    <td className="px-4 py-3.5 max-w-xs">
                      {b.categories && b.categories.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {b.categories.map((cat) => (
                            <span key={cat.id} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-100">
                              <Tag className="w-2.5 h-2.5" />
                              <span>{cat.name}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-400 italic">Chưa gán danh mục</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-gray-900">{b.productsCount} sản phẩm</td>
                    <td className="px-4 py-3.5 text-gray-500 max-w-xs truncate">{b.description}</td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenViewModal(b)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(b)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="Sửa thương hiệu"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(b)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Xóa thương hiệu"
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
            Hiển thị <span className="font-bold text-gray-800">{filteredBrands.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</span> đến{' '}
            <span className="font-bold text-gray-800">{Math.min(currentPage * ITEMS_PER_PAGE, filteredBrands.length)}</span> trên tổng số{' '}
            <span className="font-bold text-gray-900">{filteredBrands.length}</span> thương hiệu
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

      {/* MODAL 1: THÊM THƯƠNG HIỆU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Thêm Thương Hiệu Mới
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên thương hiệu *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="vd: ASUS, MSI, Gigabyte, Intel..."
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">URL / Đường dẫn Logo (Tùy chọn)</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://... hoặc /uploads/..."
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Slug URL (Tùy chọn)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="vd: asus, msi, intel"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              {/* Linked Categories Selector */}
              <div className="space-y-2 border border-blue-100 bg-blue-50/40 p-3 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span>Danh Mục Loại Sản Phẩm Cung Cấp ({formData.categoryIds.length})</span>
                  </label>
                  <div className="flex gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={handleSelectAllCategories}
                      className="text-blue-600 hover:underline font-bold"
                    >
                      Chọn tất cả
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={handleClearAllCategories}
                      className="text-red-600 hover:underline font-bold"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                </div>

                <div className="max-h-36 overflow-y-auto grid grid-cols-2 gap-1.5 p-1">
                  {allCategories.map((cat) => {
                    const isSelected = formData.categoryIds.includes(cat.id);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => handleToggleCategory(cat.id)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg border text-xs cursor-pointer select-none transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 font-bold'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {isSelected ? <CheckSquare className="w-3.5 h-3.5 shrink-0" /> : <Square className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                        <span className="truncate">{cat.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả thương hiệu</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập giới thiệu hãng sản xuất..."
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
                  className="px-4 py-2 text-xs font-bold bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Thương Hiệu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SỬA THƯƠNG HIỆU */}
      {isEditModalOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-600" /> Sửa Thương Hiệu ({selectedBrand.id})
              </h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tên thương hiệu *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">URL Logo</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
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

              {/* Linked Categories Selector */}
              <div className="space-y-2 border border-indigo-100 bg-indigo-50/40 p-3 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Danh Mục Loại Sản Phẩm Cung Cấp ({formData.categoryIds.length})</span>
                  </label>
                  <div className="flex gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={handleSelectAllCategories}
                      className="text-indigo-600 hover:underline font-bold"
                    >
                      Chọn tất cả
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={handleClearAllCategories}
                      className="text-red-600 hover:underline font-bold"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                </div>

                <div className="max-h-36 overflow-y-auto grid grid-cols-2 gap-1.5 p-1">
                  {allCategories.map((cat) => {
                    const isSelected = formData.categoryIds.includes(cat.id);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => handleToggleCategory(cat.id)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg border text-xs cursor-pointer select-none transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {isSelected ? <CheckSquare className="w-3.5 h-3.5 shrink-0" /> : <Square className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                        <span className="truncate">{cat.name}</span>
                      </div>
                    );
                  })}
                </div>
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
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Cập Nhật Thương Hiệu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: XÓA THƯƠNG HIỆU */}
      {isDeleteModalOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa Thương Hiệu Này?</h2>
              <p className="text-xs text-gray-500 mt-1">
                Xác nhận xóa hãng sản xuất <span className="font-bold text-gray-900">"{selectedBrand.name}"</span>? Các sản phẩm gắn với hãng này có thể bị ảnh hưởng.
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
                className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow cursor-pointer"
              >
                Xác Nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: XEM CHI TIẾT THƯƠNG HIỆU */}
      {isViewModalOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" /> Chi Tiết Thương Hiệu ({selectedBrand.id})
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-lg border border-gray-200 p-1 flex items-center justify-center shrink-0">
                {selectedBrand.logo ? (
                  <img
                    src={getImageUrl(selectedBrand.logo)}
                    alt={selectedBrand.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Award className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">{selectedBrand.name}</h3>
                <p className="text-xs text-blue-600 font-mono">slug: {selectedBrand.slug}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><span className="font-semibold text-gray-900">Mã thương hiệu:</span> #{selectedBrand.id}</p>
              <p><span className="font-semibold text-gray-900">Số sản phẩm đang sử dụng:</span> {selectedBrand.productsCount} sản phẩm</p>
              <div>
                <span className="font-semibold text-gray-900 block mb-1">Các danh mục sản phẩm cung cấp:</span>
                {selectedBrand.categories && selectedBrand.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBrand.categories.map((c) => (
                      <span key={c.id} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-md border border-blue-100">
                        {c.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 italic">Chưa gán danh mục</span>
                )}
              </div>
              <p><span className="font-semibold text-gray-900">Mô tả:</span> {selectedBrand.description}</p>
            </div>

            <div className="pt-3 flex justify-end border-t border-gray-100">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer"
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

export default Brands;
