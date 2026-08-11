import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Package,
    MapPin,
    Phone,
    User,
    CreditCard,
    Clock,
    CheckCircle,
    Loader2,
    X,
    AlertCircle,
    Star,
    CheckCircle2,
} from 'lucide-react';
import { getOrderDetailApi, cancelOrderApi } from '../../services/orderService';
import { createReviewApi } from '../../services/reviewService';
import { getImageUrl } from '../../services/api';
import type { Order, OrderStatus, OrderStatusHistory, OrderItem } from '../../types/order';
import { ORDER_STATUS_MAP } from '../../types/order';

/* ─────────────────────────── helpers ─────────────────────────── */

function formatDateTime(dateStr: string) {
    const d = new Date(dateStr);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}



const PAYMENT_METHOD_MAP: Record<string, string> = {
    COD: 'Thanh toán khi nhận hàng (COD)',
    VNPAY: 'VNPay',
    MOMO: 'Ví MoMo',
    BANK_TRANSFER: 'Chuyển khoản ngân hàng',
};

const PAYMENT_STATUS_MAP: Record<string, { label: string; className: string }> = {
    PENDING: { label: 'Chưa thanh toán', className: 'text-[#f59e0b] font-[600]' },
    PAID: { label: 'Đã thanh toán', className: 'text-[#10b981] font-[600]' },
    FAILED: { label: 'Thanh toán thất bại', className: 'text-[#e53935] font-[600]' },
    REFUNDED: { label: 'Đã hoàn tiền', className: 'text-[#6366f1] font-[600]' },
};


const STATUS_FLOW: OrderStatus[] = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPING', 'DELIVERED'];

const STATUS_ICON_MAP: Record<OrderStatus, React.ReactNode> = {
    PENDING: <Clock size={16} />,
    CONFIRMED: <CheckCircle size={16} />,
    PROCESSING: <Package size={16} />,
    SHIPPING: <MapPin size={16} />,
    DELIVERED: <CheckCircle size={16} />,
    CANCELLED: <X size={16} />,
};

const STATUS_LABEL_NOTE_MAP: Record<OrderStatus, string> = {
    PENDING: 'Đơn hàng được tạo',
    CONFIRMED: 'Trạng thái được cập nhật',
    PROCESSING: 'Trạng thái được cập nhật',
    SHIPPING: 'Trạng thái được cập nhật',
    DELIVERED: 'Trạng thái được cập nhật',
    CANCELLED: 'Đơn hàng đã bị hủy',
};

/* ─────────────────────────── component ─────────────────────────── */

function OrderDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cancel
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [cancelling, setCancelling] = useState(false);

    // Review Modal States
    const [reviewItem, setReviewItem] = useState<OrderItem | null>(null);
    const [reviewRating, setReviewRating] = useState<number>(5);
    const [reviewComment, setReviewComment] = useState<string>('');
    const [submittingReview, setSubmittingReview] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleOpenReviewModal = (item: OrderItem) => {
        setReviewItem(item);
        setReviewRating(5);
        setReviewComment('');
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewItem || !reviewComment.trim()) return;

        setSubmittingReview(true);
        try {
            await createReviewApi(reviewItem.productId, {
                rating: reviewRating,
                comment: reviewComment.trim(),
            });
            setReviewItem(null);
            setReviewComment('');
            setToastMessage(`Cảm ơn bạn đã gửi đánh giá cho sản phẩm "${reviewItem.productName}"!`);
            setTimeout(() => setToastMessage(null), 4000);
        } catch (err: any) {
            alert(err.message || 'Gửi đánh giá không thành công, vui lòng thử lại!');
        } finally {
            setSubmittingReview(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getOrderDetailApi(id)
            .then((res) => setOrder(res.order))
            .catch((err) => setError(err.message || 'Không thể tải thông tin đơn hàng'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleCancel = async () => {
        if (!order) return;
        setCancelling(true);
        try {
            const res = await cancelOrderApi(order.id, cancelReason || undefined);
            setOrder(res.order);
            setShowCancelModal(false);
            setCancelReason('');
        } catch (err: any) {
            alert(err.message || 'Hủy đơn thất bại');
        } finally {
            setCancelling(false);
        }
    };

    /* ── Loading ── */
    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="animate-spin text-[#1a75ff]" size={36} />
            </div>
        );
    }

    /* ── Error ── */
    if (error || !order) {
        return (
            <div className="max-w-[900px] mx-auto px-4 py-16 flex flex-col items-center gap-4 text-center">
                <AlertCircle size={48} className="text-[#e53935]" />
                <h2 className="text-[20px] font-[700] text-[#1a1a2e]">Không tìm thấy đơn hàng</h2>
                <p className="text-[#6b7280]">{error}</p>
                <button
                    onClick={() => navigate('/order')}
                    className="flex items-center gap-2 bg-[#1a75ff] text-white px-5 py-2 rounded-[10px] font-[600] hover:bg-[#155dcc] transition-colors"
                >
                    <ArrowLeft size={16} /> Quay lại đơn hàng
                </button>
            </div>
        );
    }

    const statusInfo = ORDER_STATUS_MAP[order.status];
    const paymentStatusInfo = PAYMENT_STATUS_MAP[order.paymentStatus] ?? PAYMENT_STATUS_MAP.PENDING;
    const canCancel = order.status === 'PENDING' || order.status === 'CONFIRMED';

    /* ── Build timeline from statusHistories or derive from current status ── */
    const histories: OrderStatusHistory[] = order.statusHistories ?? [];

    return (
        <div className="max-w-[1250px] mx-auto px-4 py-6">
            {/* ── Top bar ── */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/order')}
                        className="flex items-center gap-1 text-[#6b7280] hover:text-[#1a75ff] text-sm font-[500] transition-colors"
                    >
                        <ArrowLeft size={16} /> Đơn hàng của tôi
                    </button>
                    <span className="text-[#e5e7eb]">/</span>
                    <span className="text-[#1a1a2e] text-sm font-[600]">#{order.code}</span>
                </div>
                {canCancel && (
                    <button
                        onClick={() => setShowCancelModal(true)}
                        className="flex items-center gap-2 border border-[#e53935] text-[#e53935] px-4 py-2 rounded-[8px] text-sm font-[600] hover:bg-[#fff0f0] transition-colors"
                    >
                        <X size={15} /> Hủy đơn hàng
                    </button>
                )}
            </div>

            {/* ── Order header card ── */}
            <div className="flex items-start justify-between bg-white rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] px-6 py-4 mb-4 flex-wrap gap-2">
                <div>
                    <h1 className="text-[20px] font-[800] text-[#1a1a2e]">Đơn hàng #{order.code}</h1>
                    <p className="text-[#9ca3af] text-sm mt-0.5">Ngày đặt: {formatDateTime(order.createdAt)}</p>
                </div>
                <span className={`border text-[14px] font-[700] py-1.5 px-4 rounded-[8px] ${statusInfo.bgColor} ${statusInfo.color}`}>
                    {statusInfo.label}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
                {/* ── Left column ── */}
                <div className="space-y-4">
                    {/* Order info */}
                    <div className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <CreditCard size={18} className="text-[#1a75ff]" />
                            <h2 className="text-[16px] font-[700] text-[#1a1a2e]">Thông tin đơn hàng</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                            <div>
                                <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide mb-1">Mã đơn hàng</div>
                                <div className="text-[#1a1a2e] font-[700] text-[15px]">#{order.code}</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide mb-1">Trạng thái</div>
                                <span className={`border text-[13px] font-[600] py-0.5 px-2.5 rounded-[6px] inline-block ${statusInfo.bgColor} ${statusInfo.color}`}>
                                    {statusInfo.label}
                                </span>
                            </div>
                            <div>
                                <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide mb-1">Người nhận</div>
                                <div className="flex items-center gap-1.5 text-[#1a1a2e] font-[600]">
                                    <User size={14} className="text-[#6b7280]" />
                                    {order.customerName}
                                </div>
                            </div>
                            <div>
                                <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide mb-1">Số điện thoại</div>
                                <div className="flex items-center gap-1.5 text-[#1a1a2e] font-[600]">
                                    <Phone size={14} className="text-[#6b7280]" />
                                    {order.customerPhone}
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide mb-1">Địa chỉ nhận hàng</div>
                                <div className="flex items-start gap-1.5 text-[#1a1a2e] font-[600]">
                                    <MapPin size={14} className="text-[#1a75ff] mt-0.5 flex-shrink-0" />
                                    {order.shippingAddress}
                                </div>
                            </div>
                            <div>
                                <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide mb-1">Phương thức thanh toán</div>
                                <div className="text-[#1a1a2e] font-[600]">{PAYMENT_METHOD_MAP[order.paymentMethod] ?? order.paymentMethod}</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide mb-1">Trạng thái thanh toán</div>
                                <div className={paymentStatusInfo.className}>{paymentStatusInfo.label}</div>
                            </div>
                            {order.notes && (
                                <div className="sm:col-span-2">
                                    <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide mb-1">Ghi chú</div>
                                    <div className="text-[#374151] text-sm italic">{order.notes}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Package size={18} className="text-[#1a75ff]" />
                            <h2 className="text-[16px] font-[700] text-[#1a1a2e]">
                                Sản phẩm trong đơn ({order.items?.length ?? 0})
                            </h2>
                        </div>

                        {/* Table head */}
                        <div className="hidden sm:grid grid-cols-[1fr_120px_60px_130px_110px] gap-4 pb-2 border-b border-[#e5e7eb] text-[11px] font-[700] text-[#9ca3af] uppercase tracking-wide">
                            <div>Sản phẩm</div>
                            <div className="text-right">Đơn giá</div>
                            <div className="text-center">SL</div>
                            <div className="text-right">Thành tiền</div>
                            <div className="text-center">Đánh giá</div>
                        </div>

                        {/* Items */}
                        <div className="divide-y divide-dashed divide-[#e5e7eb]">
                            {order.items?.map((item) => {
                                const imgUrl = item.image ? getImageUrl(item.image) : '';
                                const canReview = order.status === 'DELIVERED';
                                return (
                                    <div key={item.id} className="py-4 grid grid-cols-1 sm:grid-cols-[1fr_120px_60px_130px_110px] gap-4 items-center">
                                        {/* Product info */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-[52px] h-[52px] flex-shrink-0 rounded-[8px] bg-[#f8f9fa] border border-[#e5e7eb] p-1 flex items-center justify-center overflow-hidden">
                                                {imgUrl ? (
                                                    <img src={imgUrl} alt={item.productName} className="w-full h-full object-contain" />
                                                ) : (
                                                    <Package size={20} className="text-[#d1d5db]" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-sm font-[600] text-[#1a1a2e] line-clamp-2">{item.productName}</div>
                                                {item.productSku && (
                                                    <div className="text-xs text-[#1a75ff] mt-0.5">SKU: {item.productSku}</div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Unit price */}
                                        <div className="text-right text-sm text-[#374151] font-[500]">
                                            <span className="sm:hidden text-[#9ca3af] mr-1">Đơn giá:</span>
                                            {item.price.toLocaleString('vi-VN')}đ
                                        </div>
                                        {/* Qty */}
                                        <div className="text-center text-sm text-[#374151] font-[600]">
                                            <span className="sm:hidden text-[#9ca3af] mr-1">SL:</span>
                                            x{item.quantity}
                                        </div>
                                        {/* Subtotal */}
                                        <div className="text-right text-[#e53935] font-[700] text-sm">
                                            <span className="sm:hidden text-[#9ca3af] mr-1">Thành tiền:</span>
                                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                        </div>
                                        {/* Review Button */}
                                        <div className="text-center">
                                            {canReview && (
                                                <button
                                                    onClick={() => handleOpenReviewModal(item)}
                                                    className="inline-flex items-center justify-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 font-[700] text-xs px-3 py-1.5 rounded-[8px] transition-all cursor-pointer shadow-sm hover:shadow"
                                                >
                                                    <Star size={13} className="fill-amber-400 text-amber-400" />
                                                    Đánh giá
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary */}
                        <div className="border-t border-[#e5e7eb] pt-4 mt-2 space-y-2">
                            <div className="flex justify-between text-sm text-[#6b7280]">
                                <span>Tạm tính</span>
                                <span>{order.subtotal.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="flex justify-between text-sm text-[#6b7280]">
                                <span>Phí vận chuyển</span>
                                <span>{order.shippingFee.toLocaleString('vi-VN')}đ</span>
                            </div>
                            {order.discountAmount > 0 && (
                                <div className="flex justify-between text-sm text-[#10b981]">
                                    <span>Giảm giá {order.couponCode ? `(${order.couponCode})` : ''}</span>
                                    <span>-{order.discountAmount.toLocaleString('vi-VN')}đ</span>
                                </div>
                            )}
                            <div className="flex justify-between text-[16px] font-[800] text-[#1a1a2e] pt-2 border-t border-[#e5e7eb]">
                                <span>Tổng cộng</span>
                                <span className="text-[#e53935] text-[18px]">{order.totalAmount.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right column: Status timeline ── */}
                <div className="space-y-4">
                    <div className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Clock size={18} className="text-[#1a75ff]" />
                            <h2 className="text-[16px] font-[700] text-[#1a1a2e]">Lịch sử trạng thái</h2>
                        </div>

                        {histories.length > 0 ? (
                            <div className="relative">
                                {/* vertical line */}
                                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-[#e5e7eb]" />
                                <div className="space-y-5">
                                    {histories.map((h, idx) => {
                                        const hStatusInfo = ORDER_STATUS_MAP[h.status];
                                        const isLatest = idx === histories.length - 1;
                                        return (
                                            <div key={h.id} className="flex gap-4 relative">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${isLatest
                                                        ? 'bg-[#1a75ff] border-[#1a75ff] text-white'
                                                        : 'bg-white border-[#1a75ff] text-[#1a75ff]'
                                                        }`}
                                                >
                                                    {STATUS_ICON_MAP[h.status]}
                                                </div>
                                                <div className="flex-1 pt-1 min-w-0">
                                                    <div className="text-[14px] font-[700] text-[#1a1a2e]">{hStatusInfo.label}</div>
                                                    <div className="text-[12px] text-[#9ca3af] mt-0.5">{formatDateTime(h.createdAt)}</div>
                                                    <div className="text-[12px] text-[#6b7280] mt-0.5 italic">
                                                        {h.notes || STATUS_LABEL_NOTE_MAP[h.status]}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            /* Fallback: derive from current status */
                            <div className="relative">
                                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-[#e5e7eb]" />
                                <div className="space-y-5">
                                    <div className="flex gap-4 relative">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 bg-[#1a75ff] border-[#1a75ff] text-white">
                                            {STATUS_ICON_MAP[order.status]}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="text-[14px] font-[700] text-[#1a1a2e]">{statusInfo.label}</div>
                                            <div className="text-[12px] text-[#9ca3af] mt-0.5">{formatDateTime(order.updatedAt)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick actions */}
                    <div className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-5 space-y-2">
                        <Link
                            to="/order"
                            className="flex items-center gap-2 w-full border border-[#e5e7eb] text-[#374151] px-4 py-2.5 rounded-[8px] text-sm font-[600] hover:border-[#1a75ff] hover:text-[#1a75ff] transition-colors"
                        >
                            <ArrowLeft size={15} /> Quay lại danh sách đơn hàng
                        </Link>
                        {canCancel && (
                            <button
                                onClick={() => setShowCancelModal(true)}
                                className="flex items-center gap-2 w-full border border-[#e53935] text-[#e53935] px-4 py-2.5 rounded-[8px] text-sm font-[600] hover:bg-[#fff0f0] transition-colors"
                            >
                                <X size={15} /> Hủy đơn hàng
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Cancel Modal ── */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[16px] shadow-2xl p-6 w-[90%] max-w-[440px]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#fff0f0] flex items-center justify-center">
                                <AlertCircle size={20} className="text-[#e53935]" />
                            </div>
                            <h3 className="text-[17px] font-[700] text-[#1a1a2e]">Xác nhận hủy đơn hàng</h3>
                        </div>
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
            {/* ── Toast Message ── */}
            {toastMessage && (
                <div className="fixed top-20 right-4 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-2 animate-bounce text-xs font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* ── Review Modal ── */}
            {reviewItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                Đánh giá sản phẩm
                            </h3>
                            <button
                                onClick={() => setReviewItem(null)}
                                className="text-gray-400 hover:text-gray-600 font-bold text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Product Summary */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {reviewItem.image ? (
                                    <img src={getImageUrl(reviewItem.image)} alt={reviewItem.productName} className="w-full h-full object-contain" />
                                ) : (
                                    <Package size={20} className="text-gray-400" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-gray-900 truncate">{reviewItem.productName}</p>
                                {reviewItem.productSku && (
                                    <p className="text-[11px] text-blue-600 font-medium">SKU: {reviewItem.productSku}</p>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-bold text-gray-700 mb-1">Mức độ hài lòng của bạn *</label>
                                <div className="flex items-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setReviewRating(s)}
                                            className="p-1 focus:outline-none cursor-pointer"
                                        >
                                            <Star
                                                className={`w-6 h-6 transition-colors ${s <= reviewRating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-300'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="font-bold text-amber-600 ml-2">{reviewRating} sao</span>
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 mb-1">Nhận xét chi tiết *</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                    placeholder="Hãy chia sẻ nhận xét của bạn về chất lượng sản phẩm, hiệu năng, dịch vụ giao hàng..."
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500 leading-relaxed text-xs"
                                />
                            </div>

                            <div className="flex items-center justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setReviewItem(null)}
                                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                                    disabled={submittingReview}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingReview || !reviewComment.trim()}
                                    className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow flex items-center space-x-1 disabled:opacity-50"
                                >
                                    {submittingReview && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>{submittingReview ? 'Đang gửi...' : 'Gửi đánh giá'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;
