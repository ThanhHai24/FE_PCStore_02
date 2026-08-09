import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  X,
  Save,
  AlertTriangle,
  FileText
} from 'lucide-react';

export interface OrderItem {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  productName: string;
  total: string;
  date: string;
  status: 'Completed' | 'Processing' | 'Shipping' | 'Cancelled';
  paymentMethod: string;
}

export const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: '#ORD-9482',
      customerName: 'Nguyễn Văn An',
      customerPhone: '0987.414.899',
      address: '17 Hà Kế Tấn, Phương Liệt, Thanh Xuân, Hà Nội',
      productName: 'PC Gaming RTX 4080 i7-14700K',
      total: '45.990.000 ₫',
      date: '08/08/2026 14:30',
      status: 'Completed',
      paymentMethod: 'Chuyển khoản Ngân hàng (QR Code)',
    },
    {
      id: '#ORD-9481',
      customerName: 'Trần Thị Bình',
      customerPhone: '0912.345.678',
      address: '83b Nguyễn Văn Cừ, Long Biên, Hà Nội',
      productName: 'Màn hình ASUS ROG Swift 32"',
      total: '18.500.000 ₫',
      date: '08/08/2026 13:15',
      status: 'Processing',
      paymentMethod: 'Thanh toán COD khi nhận hàng',
    },
    {
      id: '#ORD-9480',
      customerName: 'Lê Hoàng Cường',
      customerPhone: '0903.888.999',
      address: '249 Lý Thường Kiệt, Phường 15, Quận 11, TP.HCM',
      productName: 'Bàn phím cơ Custom Akko Mod007',
      total: '3.200.000 ₫',
      date: '08/08/2026 11:20',
      status: 'Completed',
      paymentMethod: 'Ví MoPo / VNPAY',
    },
    {
      id: '#ORD-9479',
      customerName: 'Phạm Minh Đức',
      customerPhone: '0977.123.456',
      address: '45 Lê Duẩn, Quận 1, TP.HCM',
      productName: 'Card màn hình MSI RTX 4070 Ti',
      total: '22.900.000 ₫',
      date: '08/08/2026 09:45',
      status: 'Shipping',
      paymentMethod: 'Chuyển khoản Ngân hàng',
    },
    {
      id: '#ORD-9478',
      customerName: 'Hoàng Văn Em',
      customerPhone: '0966.999.111',
      address: '12 Trần Phú, Hải Châu, Đà Nẵng',
      productName: 'Nguồn Corsair RM1000x + Case NZXT H9',
      total: '7.800.000 ₫',
      date: '07/08/2026 17:10',
      status: 'Cancelled',
      paymentMethod: 'Thanh toán COD',
    },
  ]);

  // Modal States
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [newStatus, setNewStatus] = useState<'Completed' | 'Processing' | 'Shipping' | 'Cancelled'>('Processing');

  // Open View Details
  const handleOpenViewModal = (order: OrderItem) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  // Open Edit Status Modal
  const handleOpenEditStatusModal = (order: OrderItem) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsEditStatusModalOpen(true);
  };

  // Submit Status Edit
  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setOrders(
      orders.map((o) => (o.id === selectedOrder.id ? { ...o, status: newStatus } : o))
    );
    setIsEditStatusModalOpen(false);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (order: OrderItem) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete / Cancel Order
  const handleConfirmDelete = () => {
    if (!selectedOrder) return;
    setOrders(orders.filter((o) => o.id !== selectedOrder.id));
    setIsDeleteModalOpen(false);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Quản Lý Đơn Hàng
          </h1>
          <p className="text-xs text-gray-500">
            Theo dõi, cập nhật trạng thái và xử lý thông tin các đơn hàng PC Store.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm mã đơn, tên khách, số ĐT..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 text-xs text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-gray-50 text-xs text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">Tất cả trạng thái ({orders.length})</option>
            <option value="Processing">Đang xử lý</option>
            <option value="Shipping">Đang vận chuyển</option>
            <option value="Completed">Đã hoàn thành</option>
            <option value="Cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5">Mã đơn</th>
                <th className="px-4 py-3.5">Khách hàng</th>
                <th className="px-4 py-3.5">Sản phẩm</th>
                <th className="px-4 py-3.5">Tổng tiền</th>
                <th className="px-4 py-3.5">Ngày đặt</th>
                <th className="px-4 py-3.5">Trạng thái</th>
                <th className="px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-blue-600">{ord.id}</td>
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-gray-900">{ord.customerName}</p>
                    <p className="text-[11px] text-gray-500">{ord.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3.5 text-gray-700 max-w-[200px] truncate">{ord.productName}</td>
                  <td className="px-4 py-3.5 font-bold text-gray-900">{ord.total}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-[11px]">{ord.date}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        ord.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : ord.status === 'Processing'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : ord.status === 'Shipping'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}
                    >
                      {ord.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                      {ord.status === 'Processing' && <Clock className="w-3 h-3" />}
                      {ord.status === 'Shipping' && <Truck className="w-3 h-3" />}
                      {ord.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                      {ord.status === 'Completed'
                        ? 'Hoàn thành'
                        : ord.status === 'Processing'
                        ? 'Đang xử lý'
                        : ord.status === 'Shipping'
                        ? 'Đang giao'
                        : 'Đã hủy'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenViewModal(ord)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết đơn hàng"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditStatusModal(ord)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Đổi trạng thái đơn"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(ord)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa đơn hàng"
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

      {/* MODAL 1: XEM CHI TIẾT ĐƠN HÀNG */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Chi Tiết Hóa Đơn ({selectedOrder.id})
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><span className="font-semibold text-gray-900">Khách hàng:</span> {selectedOrder.customerName} ({selectedOrder.customerPhone})</p>
              <p><span className="font-semibold text-gray-900">Địa chỉ giao hàng:</span> {selectedOrder.address}</p>
              <p><span className="font-semibold text-gray-900">Sản phẩm đã chọn:</span> <span className="font-bold text-gray-900">{selectedOrder.productName}</span></p>
              <p><span className="font-semibold text-gray-900">Tổng thanh toán:</span> <span className="font-bold text-blue-600">{selectedOrder.total}</span></p>
              <p><span className="font-semibold text-gray-900">Phương thức:</span> {selectedOrder.paymentMethod}</p>
              <p><span className="font-semibold text-gray-900">Thời gian tạo:</span> {selectedOrder.date}</p>
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

      {/* MODAL 2: CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG */}
      {isEditStatusModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-600" /> Đổi Trạng Thái Đơn {selectedOrder.id}
              </h2>
              <button onClick={() => setIsEditStatusModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStatusSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Chọn trạng thái mới</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Processing">⏳ Đang xử lý</option>
                  <option value="Shipping">🚚 Đang vận chuyển</option>
                  <option value="Completed">✅ Đã hoàn thành</option>
                  <option value="Cancelled">❌ Đã hủy đơn</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditStatusModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Cập Nhật Đơn Hàng</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: XÓA / HỦY ĐƠN HÀNG */}
      {isDeleteModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa Đơn Hàng Này?</h2>
              <p className="text-xs text-gray-500 mt-1">
                Xác nhận xóa mã đơn <span className="font-bold text-gray-900">{selectedOrder.id}</span> của khách hàng <span className="font-bold text-gray-900">{selectedOrder.customerName}</span>?
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
    </div>
  );
};

export default Orders;
