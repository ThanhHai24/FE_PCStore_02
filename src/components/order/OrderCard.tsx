import { useState } from 'react';
import { Calendar, CreditCard, Eye, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderItem from './OrderItem';
import type { Order } from '../../types/order';
import { ORDER_STATUS_MAP } from '../../types/order';
import { cancelOrderApi } from '../../services/orderService';

interface OrderCardProps {
  order: Order;
  onCancelled?: (orderId: string) => void;
}

const PAYMENT_METHOD_MAP: Record<string, string> = {
  COD: 'Thanh toán khi nhận hàng (COD)',
  VNPAY: 'VNPay',
  MOMO: 'Ví MoMo',
  BANK_TRANSFER: 'Chuyển khoản ngân hàng',
};

const PAYMENT_STATUS_MAP: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'Chưa thanh toán', className: 'bg-[#fff3cd] text-[#856404]' },
  PAID: { label: 'Đã thanh toán', className: 'bg-[#d4edda] text-[#155724]' },
  FAILED: { label: 'Thanh toán thất bại', className: 'bg-[#f8d7da] text-[#721c24]' },
  REFUNDED: { label: 'Đã hoàn tiền', className: 'bg-[#d1ecf1] text-[#0c5460]' },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function OrderCard({ order, onCancelled }: OrderCardProps) {
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const statusInfo = ORDER_STATUS_MAP[order.status];
  const paymentStatusInfo = PAYMENT_STATUS_MAP[order.paymentStatus] ?? PAYMENT_STATUS_MAP.PENDING;
  const paymentMethodLabel = PAYMENT_METHOD_MAP[order.paymentMethod] ?? order.paymentMethod;
  const canCancel = order.status === 'PENDING' || order.status === 'CONFIRMED';
  const totalItems = order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await cancelOrderApi(order.id, cancelReason || undefined);
      setShowCancelModal(false);
      onCancelled?.(order.id);
    } catch (err: any) {
      alert(err.message || 'Hủy đơn thất bại');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      <div className="order-card bg-white mb-4 rounded-[14px] overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
        {/* Header */}
        <div className="order-card-header flex items-center justify-between px-[20px] py-[14px] flex-wrap gap-[10px] border-b border-[#e5e7eb]">
          <div className="order-meta flex items-center gap-[14px] flex-wrap">
            <div className="order-code font-[700] text-[15px] text-[#1a1a2e]">
              Đơn hàng{' '}
              <span className="text-[#007bff] font-[500] ml-[6px]">#{order.code}</span>
            </div>
            <div className="order-date text-[#667085] flex items-center gap-1 text-[14px] font-[400]">
              <Calendar size={14} />
              {formatDate(order.createdAt)}
            </div>
            <div className={`payment-badge flex items-center gap-1 text-[13px] font-[600] py-1 px-2 rounded-[6px] ${paymentStatusInfo.className}`}>
              <CreditCard size={14} />
              {paymentMethodLabel} · {paymentStatusInfo.label}
            </div>
          </div>
          <div className={`status-badge border text-[13px] font-[600] py-1 px-3 rounded-[6px] ${statusInfo.bgColor} ${statusInfo.color}`}>
            {statusInfo.label}
          </div>
        </div>

        {/* Items */}
        <div className="order-items">
          {order.items && order.items.length > 0 ? (
            order.items.map((item) => <OrderItem key={item.id} item={item} />)
          ) : (
            <div className="py-6 text-center text-[#9ca3af] text-sm">Không có sản phẩm</div>
          )}
        </div>

        {/* Footer */}
        <div className="order-card-footer flex items-center justify-between px-5 py-[12px] bg-[#fafbfc] border-[#e5e7eb] border-t-[1px] gap-4 flex-wrap">
          <div className="order-total-block flex flex-col gap-1">
            <div className="order-total-label text-[#6b7280] text-[14px] font-[400]">
              Tổng tiền ({totalItems} sản phẩm) · Phí ship:{' '}
              {order.shippingFee.toLocaleString('vi-VN')}đ
            </div>
            <div className="order-total-value text-[#e53935] text-[20px] font-[800]">
              {order.totalAmount.toLocaleString('vi-VN')}đ
            </div>
          </div>
          <div className="order-actions flex items-center gap-3 flex-wrap">
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="order-action-btn bg-transparent border border-[#e53935] text-[#e53935] text-sm rounded-[8px] py-[5px] px-[12px] font-[600] cursor-pointer gap-1 flex items-center hover:bg-[#fff0f0] transition-colors"
              >
                <X size={15} /> Hủy đơn
              </button>
            )}
            <Link
              to={`/order/${order.id}`}
              className="order-action-btn bg-[#1a75ff] border border-[#1a75ff] text-white text-sm rounded-[8px] py-[5px] px-[12px] font-[600] cursor-pointer gap-1 flex items-center hover:bg-[#155dcc] transition-colors"
            >
              <Eye size={15} /> Chi tiết
            </Link>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-2xl p-6 w-[90%] max-w-[440px]">
            <h3 className="text-[17px] font-[700] text-[#1a1a2e] mb-1">Xác nhận hủy đơn hàng</h3>
            <p className="text-[#6b7280] text-sm mb-4">
              Bạn có chắc muốn hủy đơn <strong>#{order.code}</strong>? Thao tác này không thể hoàn tác.
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Lý do hủy đơn (không bắt buộc)..."
              rows={3}
              className="w-full border border-[#e5e7eb] rounded-[8px] px-3 py-2 text-sm text-[#1a1a2e] outline-none focus:border-[#1a75ff] resize-none mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowCancelModal(false); setCancelReason(''); }}
                className="px-4 py-2 rounded-[8px] border border-[#e5e7eb] text-[#6b7280] text-sm font-[600] hover:bg-gray-50 transition-colors"
                disabled={cancelling}
              >
                Quay lại
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="px-4 py-2 rounded-[8px] bg-[#e53935] text-white text-sm font-[600] hover:bg-[#c62828] transition-colors flex items-center gap-2 disabled:opacity-60"
              >
                {cancelling && <Loader2 size={14} className="animate-spin" />}
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderCard;