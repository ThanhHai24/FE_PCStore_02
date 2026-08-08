import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Out of Stock' | 'Low Stock';
  image: string;
}

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const products: ProductItem[] = [
    {
      id: 'PROD-001',
      name: 'PC Gaming Ultra RTX 4090 i9-14900K',
      category: 'PC Nguyên Bộ',
      price: '89.990.000 ₫',
      stock: 12,
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'PROD-002',
      name: 'Màn hình Dell UltraSharp U2723QE 27" 4K',
      category: 'Màn Hình',
      price: '14.250.000 ₫',
      stock: 3,
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'PROD-003',
      name: 'Card màn hình ASUS ROG Strix RTX 4080 Super',
      category: 'Linh Kiện PC',
      price: '34.500.000 ₫',
      stock: 0,
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'PROD-004',
      name: 'Bàn phím cơ Không dây Keychron Q1 Pro',
      category: 'Phụ Kiện',
      price: '4.890.000 ₫',
      stock: 25,
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'PROD-005',
      name: 'Tai nghe Logitech G Pro X 2 LIGHTSPEED Wireless',
      category: 'Phụ Kiện',
      price: '5.990.000 ₫',
      stock: 8,
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80',
    },
  ];

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
            Danh sách tất cả linh kiện, máy tính và phụ kiện của PC Store.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow transition-all">
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Thêm sản phẩm mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
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

        {/* Category selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-gray-50 text-xs text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">Tất cả danh mục</option>
            <option value="PC Nguyên Bộ">PC Nguyên Bộ</option>
            <option value="Linh Kiện PC">Linh Kiện PC</option>
            <option value="Màn Hình">Màn Hình</option>
            <option value="Phụ Kiện">Phụ Kiện</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
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
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Xem chi tiết">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Chỉnh sửa">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
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
    </div>
  );
};

export default Products;
