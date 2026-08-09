import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  X,
  Save,
  AlertTriangle,
  Mail,
  Phone
} from 'lucide-react';

export interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: string;
  status: 'Active' | 'Blocked';
  avatar: string;
}

export const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [customers, setCustomers] = useState<CustomerItem[]>([
    {
      id: 'CUST-001',
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@gmail.com',
      phone: '0987.414.899',
      ordersCount: 5,
      totalSpent: '125.490.000 ₫',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'CUST-002',
      name: 'Trần Thị Bình',
      email: 'binh.tran@yahoo.com',
      phone: '0912.345.678',
      ordersCount: 2,
      totalSpent: '28.500.000 ₫',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'CUST-003',
      name: 'Lê Hoàng Cường',
      email: 'cuong.lh@outlook.com',
      phone: '0903.888.999',
      ordersCount: 8,
      totalSpent: '210.000.000 ₫',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'CUST-004',
      name: 'Phạm Minh Đức',
      email: 'duc.pm@hotmail.com',
      phone: '0977.123.456',
      ordersCount: 1,
      totalSpent: '22.900.000 ₫',
      status: 'Blocked',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  ]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active' as 'Active' | 'Blocked',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  });

  // Open Add Modal
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    });
    setIsAddModalOpen(true);
  };

  // Submit Add Customer
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCust: CustomerItem = {
      id: `CUST-00${customers.length + 1}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ordersCount: 0,
      totalSpent: '0 ₫',
      status: formData.status,
      avatar: formData.avatar,
    };
    setCustomers([newCust, ...customers]);
    setIsAddModalOpen(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (cust: CustomerItem) => {
    setSelectedCustomer(cust);
    setFormData({
      name: cust.name,
      email: cust.email,
      phone: cust.phone,
      status: cust.status,
      avatar: cust.avatar,
    });
    setIsEditModalOpen(true);
  };

  // Submit Edit Customer
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    setCustomers(
      customers.map((c) =>
        c.id === selectedCustomer.id
          ? { ...c, name: formData.name, email: formData.email, phone: formData.phone, status: formData.status }
          : c
      )
    );
    setIsEditModalOpen(false);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (cust: CustomerItem) => {
    setSelectedCustomer(cust);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!selectedCustomer) return;
    setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
    setIsDeleteModalOpen(false);
  };

  // Open View Detail Modal
  const handleOpenViewModal = (cust: CustomerItem) => {
    setSelectedCustomer(cust);
    setIsViewModalOpen(true);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Quản Lý Khách Hàng
          </h1>
          <p className="text-xs text-gray-500">
            Quản lý tài khoản người dùng, xem tổng chi tiêu và thực hiện Thêm, Sửa, Xóa.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow transition-all"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Thêm Khách Hàng Mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tên, email, số điện thoại..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 text-xs text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
          />
        </div>
      </div>

      {/* Customers Data Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5">Khách hàng</th>
                <th className="px-4 py-3.5">Liên hệ</th>
                <th className="px-4 py-3.5">Số đơn đã mua</th>
                <th className="px-4 py-3.5">Tổng chi tiêu</th>
                <th className="px-4 py-3.5">Trạng thái</th>
                <th className="px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{cust.name}</p>
                        <p className="text-[11px] text-blue-600 font-semibold">{cust.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-800 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-gray-400" /> {cust.email}
                    </p>
                    <p className="text-gray-500 text-[11px] flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-gray-400" /> {cust.phone}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{cust.ordersCount} đơn</td>
                  <td className="px-4 py-3 font-bold text-blue-600">{cust.totalSpent}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        cust.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {cust.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {cust.status === 'Active' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenViewModal(cust)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(cust)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Sửa thông tin"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(cust)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa tài khoản"
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

      {/* MODAL 1: THÊM KHÁCH HÀNG */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Thêm Khách Hàng Mới
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="vd: Nguyễn Văn A"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="vd: khachhang@gmail.com"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="vd: 0988.777.666"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
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
                  <span>Tạo Tài Khoản</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SỬA KHÁCH HÀNG */}
      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-600" /> Sửa Khách Hàng ({selectedCustomer.id})
              </h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Trạng thái tài khoản</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Active">✅ Hoạt động</option>
                  <option value="Blocked">🔒 Khóa tài khoản</option>
                </select>
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
                  <span>Cập Nhật Thông Tin</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: XÓA KHÁCH HÀNG */}
      {isDeleteModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa Khách Hàng Này?</h2>
              <p className="text-xs text-gray-500 mt-1">
                Xác nhận xóa tài khoản của <span className="font-bold text-gray-900">{selectedCustomer.name}</span> ({selectedCustomer.email})?
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

      {/* MODAL 4: XEM CHI TIẾT KHÁCH HÀNG */}
      {isViewModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" /> Hồ Sơ Khách Hàng ({selectedCustomer.id})
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h3 className="font-bold text-sm text-gray-900">{selectedCustomer.name}</h3>
                <p className="text-xs text-gray-500">{selectedCustomer.email}</p>
                <p className="text-xs text-blue-600 font-bold mt-0.5">{selectedCustomer.phone}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><span className="font-semibold text-gray-900">Tổng số đơn đã mua:</span> {selectedCustomer.ordersCount} đơn</p>
              <p><span className="font-semibold text-gray-900">Tổng chi tiêu lũy kế:</span> <span className="font-bold text-blue-600">{selectedCustomer.totalSpent}</span></p>
              <p><span className="font-semibold text-gray-900">Trạng thái:</span> {selectedCustomer.status === 'Active' ? 'Hoạt động bình thường' : 'Tài khoản đang bị khóa'}</p>
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

export default Customers;
