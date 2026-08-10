import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  User,
  Clock,
  DollarSign
} from 'lucide-react';
import { getOrderDetailApi, updateOrderStatusApi } from '../../services/orderService';
import { getImageUrl } from '../../services/api';


export interface AdminOrderItemDetail {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
}

export const AdminOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [orderStatus, setOrderStatus] = useState<'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED'>('PENDING');

  // Order Data State
  const [orderData, setOrderData] = useState<{
    code: string;
    createdAt: string;
    customerName: string;
    customerRole: string;
    customerPhone: string;
    customerEmail: string;
    shippingAddress: string;
    paymentMethod: string;
    paymentStatus: string;
    notes: string;
    subtotal: number;
    shippingFee: number;
    discountAmount: number;
    totalAmount: number;
    items: AdminOrderItemDetail[];
    activityLogs: Array<{ time: string; text: string }>;
  }>({
    code: id ? id.replace('#', '') : 'PCS-20260608-VPN9AN',
    createdAt: '11:00:12 8/6/2026',
    customerName: 'Admin',
    customerRole: 'Tài khoản thành viên',
    customerPhone: '0123332221',
    customerEmail: 'admin@example.com',
    shippingAddress: "12312, Xã Ea Trang, Huyện M'Đrắk, Đắk Lắk",
    paymentMethod: 'VNPAY',
    paymentStatus: 'PAID',
    notes: 'Không có ghi chú',
    subtotal: 85085500,
    shippingFee: 225500,
    discountAmount: 0,
    totalAmount: 85311000,
    items: [
      {
        id: '1',
        name: 'Laptop Gigabyte AERO X16 1VH93VNC94DH (Ryzen AI 7 350, RTX 5060 8GB, 16 inch WQXGA, 16GB, 1TB SSD, Win 11, Trắng)',
        sku: 'LAP-00015',
        quantity: 1,
        price: 40900000,
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: '2',
        name: 'Card Màn Hình INNO3D GeForce RTX 5060 TWIN X2 8G GDDR7 INNO3D GeForce RTX 5060',
        sku: 'VGA-00005',
        quantity: 4,
        price: 10990000,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=150&q=80'
      }
    ],
    activityLogs: [
      { time: '11:00 08/06/2026', text: 'Admin tạo đơn hàng mới Đặt hàng' }
    ]
  });

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getOrderDetailApi(id);
        if (isMounted && res && res.order) {
          const o = res.order;
          setOrderStatus(o.status as any);
          setOrderData({
            code: o.code || id.replace('#', ''),
            createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString('vi-VN') : '11:00:12 8/6/2026',
            customerName: o.customerName || 'Admin',
            customerRole: 'Tài khoản thành viên',
            customerPhone: o.customerPhone || '0123332221',
            customerEmail: 'admin@example.com',
            shippingAddress: o.shippingAddress || "12312, Xã Ea Trang, Huyện M'Đrắk, Đắk Lắk",
            paymentMethod: o.paymentMethod || 'VNPAY',
            paymentStatus: o.paymentStatus || 'PAID',
            notes: o.notes || 'Không có ghi chú',
            subtotal: o.subtotal || 85085500,
            shippingFee: o.shippingFee || 225500,
            discountAmount: o.discountAmount || 0,
            totalAmount: o.totalAmount || 85311000,
            items: o.items ? o.items.map((it: any) => ({
              id: it.id,
              name: it.productName,
              sku: it.productSku || 'SKU-001',
              quantity: it.quantity,
              price: it.price,
              image: it.image ? getImageUrl(it.image) : 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80'
            })) : [
              {
                id: '1',
                name: 'Laptop Gigabyte AERO X16 1VH93VNC94DH (Ryzen AI 7 350, RTX 5060 8GB, 16 inch WQXGA, 16GB, 1TB SSD, Win 11, Trắng)',
                sku: 'LAP-00015',
                quantity: 1,
                price: 40900000,
                image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80'
              },
              {
                id: '2',
                name: 'Card Màn Hình INNO3D GeForce RTX 5060 TWIN X2 8G GDDR7 INNO3D GeForce RTX 5060',
                sku: 'VGA-00005',
                quantity: 4,
                price: 10990000,
                image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=150&q=80'
              }
            ],
            activityLogs: [
              { time: o.createdAt ? new Date(o.createdAt).toLocaleString('vi-VN') : '11:00 08/06/2026', text: `${o.customerName || 'Admin'} tạo đơn hàng mới Đặt hàng` }
            ]
          });
        }
      } catch (err) {
        console.warn('Backend order detail fallback loaded:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Timeline steps
  const steps = [
    { key: 'PENDING', label: 'Đặt hàng', date: orderData.createdAt.split(' ')[0] + ' ' + (orderData.createdAt.split(' ')[1] || ''), by: 'Admin' },
    { key: 'CONFIRMED', label: 'Xác nhận' },
    { key: 'PROCESSING', label: 'Đóng gói' },
    { key: 'SHIPPING', label: 'Đang giao' },
    { key: 'DELIVERED', label: 'Hoàn thành' }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'CONFIRMED': return 1;
      case 'PROCESSING': return 2;
      case 'SHIPPING': return 3;
      case 'DELIVERED': return 4;
      case 'CANCELLED': return -1;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(orderStatus);

  const handleUpdateStatus = async (targetStatus: string) => {
    if (!id) return;
    try {
      const targetCodeOrId = id.replace('#', '');
      const res = await updateOrderStatusApi(targetCodeOrId, targetStatus);
      if (res && res.order) {
        setOrderStatus(res.order.status as any);
        if (res.order.paymentStatus) {
          setOrderData(prev => ({ ...prev, paymentStatus: res.order.paymentStatus }));
        }
      } else {
        setOrderStatus(targetStatus as any);
      }
      setOrderData(prev => ({
        ...prev,
        activityLogs: [
          ...prev.activityLogs,
          { time: new Date().toLocaleString('vi-VN'), text: `Admin cập nhật trạng thái thành: ${targetStatus}` }
        ]
      }));
    } catch (err: any) {
      alert(err.message || 'Lỗi cập nhật trạng thái đơn hàng');
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-gray-600">Đang tải chi tiết đơn hàng #{id}...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Chi tiết đơn hàng</h1>
          <p className="text-xs text-gray-500 mt-1">
            Hệ quản trị &rarr; Đơn hàng &rarr; <span className="text-gray-800 font-semibold">{orderData.code}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {orderStatus !== 'CANCELLED' && orderStatus !== 'DELIVERED' && (
            <button
              onClick={() => handleUpdateStatus('CANCELLED')}
              className="px-3.5 py-2 text-xs font-bold bg-rose-700 hover:bg-rose-800 text-white rounded-lg transition-colors shadow-xs"
            >
              Hủy đơn
            </button>
          )}

          {orderStatus === 'PENDING' && (
            <button
              onClick={() => handleUpdateStatus('CONFIRMED')}
              className="px-3.5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-xs"
            >
              Xác nhận đơn hàng (CONFIRMED)
            </button>
          )}

          {orderStatus === 'CONFIRMED' && (
            <button
              onClick={() => handleUpdateStatus('SHIPPING')}
              className="px-3.5 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-xs"
            >
              Giao hàng (SHIPPING)
            </button>
          )}

          {orderStatus === 'SHIPPING' && (
            <button
              onClick={() => handleUpdateStatus('DELIVERED')}
              className="px-3.5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-xs"
            >
              Hoàn thành (DELIVERED)
            </button>
          )}
        </div>
      </div>


      {/* Trạng thái đơn hàng (Timeline Progress) */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-gray-900">Trạng thái đơn hàng</h2>

        <div className="relative pt-4 pb-2 px-8">
          {/* Progress bar background line */}
          <div className="absolute top-8 left-16 right-16 h-0.5 bg-gray-200 -z-0"></div>
          {currentStepIdx >= 0 && (
            <div
              className="absolute top-8 left-16 h-0.5 bg-blue-600 transition-all duration-500 -z-0"
              style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
            ></div>
          )}

          {/* Step Items */}
          <div className="flex items-start justify-between relative z-10">
            {steps.map((st, idx) => {
              const isPassed = currentStepIdx >= idx;
              const isCurrent = currentStepIdx === idx;

              return (
                <div key={st.key} className="flex flex-col items-center text-center max-w-[120px]">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed
                        ? 'bg-[#1D52E7] text-white ring-4 ring-blue-100'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                  </div>

                  <p className={`text-xs font-semibold mt-2.5 ${isPassed ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                    {st.label}
                  </p>

                  {st.date && (
                    <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                      <p>{st.date}</p>
                      <p className="text-gray-500 font-medium">{st.by}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Thông tin đơn hàng (Left) & Khách hàng + Tổng thanh toán (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cột Trái: Thông tin đơn hàng */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 pb-2">Thông tin đơn hàng</h2>

          <div className="divide-y divide-gray-100 text-xs space-y-3">
            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-500 font-medium">Mã đơn hàng</span>
              <span className="font-semibold text-gray-900">#{orderData.code}</span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-gray-500 font-medium">Ngày đặt hàng</span>
              <span className="font-semibold text-gray-900">{orderData.createdAt}</span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-gray-500 font-medium">Trạng thái</span>
              <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-blue-50 text-blue-700 rounded-md border border-blue-200/60">
                {orderStatus}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-gray-500 font-medium">Hình thức thanh toán</span>
              <span className="font-semibold text-gray-900">{orderData.paymentMethod}</span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-gray-500 font-medium">Trạng thái thanh toán</span>
              <span className="font-bold text-emerald-600 text-[11px]">{orderData.paymentStatus}</span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-gray-500 font-medium">Ghi chú</span>
              <span className="text-gray-500 italic">{orderData.notes}</span>
            </div>
          </div>
        </div>

        {/* Cột Phải: Khách hàng & Tổng thanh toán */}
        <div className="space-y-6">
          
          {/* Card 1: Khách hàng */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-gray-900">Khách hàng</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {orderData.customerName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-xs text-gray-900">{orderData.customerName}</p>
                <p className="text-[11px] text-gray-400">{orderData.customerRole}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Số điện thoại</span>
                <span className="font-bold text-gray-900">{orderData.customerPhone}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="text-blue-600 hover:underline">{orderData.customerEmail}</span>
              </div>

              <div className="pt-1">
                <span className="text-gray-500 block mb-0.5">Địa chỉ nhận hàng</span>
                <span className="font-semibold text-gray-800 leading-relaxed block text-right">{orderData.shippingAddress}</span>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Số sản phẩm</span>
                <span className="font-bold text-gray-900">{orderData.items.length} sản phẩm</span>
              </div>
            </div>
          </div>

          {/* Card 2: Tổng thanh toán */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-gray-900">Tổng thanh toán</h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span className="font-semibold text-gray-900">{orderData.subtotal.toLocaleString('vi-VN')} ₫</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span className="font-semibold text-gray-900">{orderData.shippingFee.toLocaleString('vi-VN')} ₫</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Giảm giá</span>
                <span className="font-semibold text-gray-900">- 0 ₫</span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-xs text-gray-900">Tổng cộng</span>
                <span className="text-base font-black text-gray-900">{orderData.totalAmount.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Section: SẢN PHẨM TRONG ĐƠN */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-gray-50/50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Sản phẩm trong đơn</h2>
          <span className="text-xs text-gray-500 font-semibold">{orderData.items.length} sản phẩm</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200/80 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Sản phẩm</th>
                <th className="px-4 py-3.5">SKU</th>
                <th className="px-4 py-3.5 text-center">Số lượng</th>
                <th className="px-4 py-3.5 text-right">Đơn giá</th>
                <th className="px-6 py-3.5 text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orderData.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                      />
                      <p className="font-bold text-gray-900 max-w-lg leading-snug">{item.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-500">{item.sku}</td>
                  <td className="px-4 py-4 text-center font-bold text-gray-800">&times; {item.quantity}</td>
                  <td className="px-4 py-4 text-right font-semibold text-gray-900">{item.price.toLocaleString('vi-VN')} ₫</td>
                  <td className="px-6 py-4 text-right font-black text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50/60 font-bold border-t border-gray-200">
                <td colSpan={4} className="px-6 py-3.5 text-right text-gray-600">Tổng cộng</td>
                <td className="px-6 py-3.5 text-right text-sm font-black text-[#1D52E7]">
                  {orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('vi-VN')} ₫
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Section: Lịch sử hoạt động */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-gray-900">Lịch sử hoạt động</h2>
        <div className="space-y-2 pt-2">
          {orderData.activityLogs.map((log, idx) => (
            <div key={idx} className="flex items-center gap-4 text-xs">
              <span className="text-gray-400 font-medium w-36">{log.time}</span>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-gray-800 font-semibold">{log.text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminOrderDetail;
