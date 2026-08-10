import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, CheckCircle, FileText, Image as ImageIcon, Printer, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { CustomerInfo } from '../../types/cart';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Hà Nội',
    district: '',
    note: '',
    invoiceRequired: false,
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'qr' | 'vnpay'>('vnpay');
  const [orderSuccessModal, setOrderSuccessModal] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCustomerInfo((prev) => ({ ...prev, [name]: checked }));
    } else {
      setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (paymentMethod === 'vnpay' || paymentMethod === 'qr') {
      setIsSubmitting(true);
      try {
        const res = await fetch('http://localhost:3000/api/payment/vnpay/create_payment_url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalPrice,
            orderInfo: `Thanh toan don hang PCStore: ${customerInfo.fullName || 'Khach hang'}`,
            orderId: `ORDER_${Date.now()}`,
            bankCode: 'NCB',
          }),
        });
        const data = await res.json();
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
          return;
        }
      } catch (err) {
        console.error('Error creating VNPAY payment URL:', err);
      } finally {
        setIsSubmitting(false);
      }
    }

    setOrderSuccessModal(true);
  };

  const formatVND = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="max-w-[950px] mx-auto px-4 py-6 space-y-6">
      {/* Top Header Row matching screenshot */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h1 className="text-lg font-extrabold text-gray-900 flex items-center space-x-2">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          <span>Giỏ hàng của bạn</span>
        </h1>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-xs text-blue-600 hover:underline flex items-center space-x-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&lt; Mua thêm sản phẩm khác</span>
          </Link>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-gray-500 hover:text-red-600 font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              Xóa giỏ hàng
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-3xl text-gray-400">
            🛒
          </div>
          <h2 className="text-base font-bold text-gray-800">Giỏ hàng của bạn đang trống</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Hãy chọn các sản phẩm PC Gaming, Linh kiện hoặc Màn hình ưng ý để thêm vào giỏ hàng nhé!
          </p>
          <Link
            to="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase py-3 px-6 rounded-xl shadow transition-colors"
          >
            Khám phá sản phẩm ngay
          </Link>
        </div>
      ) : (
        <form onSubmit={handleOrderSubmit} className="space-y-6">
          {/* Cart Items List matching screenshot */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 space-y-4 shadow-sm">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all gap-4"
              >
                {/* Product Info & Thumbnail */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-xs font-bold text-gray-800 line-clamp-2 hover:text-red-600 transition-colors"
                    >
                      {item.product.title}
                    </Link>
                    {item.selectedVariant && (
                      <span className="inline-block text-[11px] text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded mt-1">
                        {item.selectedVariant}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity & Pricing Controls */}
                <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0">
                  {/* Quantity [- 1 +] */}
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold text-gray-800">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[100px]">
                    <div className="text-xs font-extrabold text-red-600">
                      {formatVND(item.product.numericPrice * item.quantity)}
                    </div>
                    {item.product.marketPrice && (
                      <div className="text-[10px] text-gray-400 line-through">
                        {item.product.marketPrice}
                      </div>
                    )}
                  </div>

                  {/* Remove Trash Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                    title="Xóa sản phẩm này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* THÔNG TIN KHÁCH HÀNG Form Box matching screenshot */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-4 shadow-sm">
            <h2 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
              THÔNG TIN KHÁCH HÀNG
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Họ tên *"
                  required
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại *"
                  required
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ *"
                  required
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Hà Nội">Tỉnh/Thành phố: Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">Tỉnh/Thành phố: TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Tỉnh/Thành phố: Đà Nẵng</option>
                  <option value="Hải Phòng">Tỉnh/Thành phố: Hải Phòng</option>
                </select>
                <select
                  name="district"
                  value={customerInfo.district}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Quận/Huyện</option>
                  <option value="Thanh Xuân">Quận Thanh Xuân</option>
                  <option value="Cầu Giấy">Quận Cầu Giấy</option>
                  <option value="Đống Đa">Quận Đống Đa</option>
                  <option value="Quận 1">Quận 1</option>
                  <option value="Quận 10">Quận 10</option>
                </select>
              </div>

              <div>
                <textarea
                  name="note"
                  rows={3}
                  placeholder="Ghi chú"
                  value={customerInfo.note}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  id="invoiceRequired"
                  name="invoiceRequired"
                  checked={customerInfo.invoiceRequired}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="invoiceRequired" className="text-[11px] font-medium cursor-pointer">
                  Yêu cầu xuất hóa đơn công ty
                </label>
              </div>
            </div>
          </div>

          {/* PHƯƠNG THỨC THANH TOÁN Box */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-3 shadow-sm text-xs">
            <h2 className="font-extrabold text-blue-600 uppercase tracking-wider">
              PHƯƠNG THỨC THANH TOÁN
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer font-bold text-gray-800">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer font-bold text-gray-800">
                <input
                  type="radio"
                  name="payment"
                  value="qr"
                  checked={paymentMethod === 'qr'}
                  onChange={() => setPaymentMethod('qr')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="flex items-center space-x-1.5">
                  <span>Thanh toán VNPAY Sandbox (Quét mã QR / Thẻ ATM)</span>
                  <span className="bg-red-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded tracking-wider">
                    VNPAY
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/* TỔNG TIỀN Box matching screenshot */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-3 shadow-sm text-xs">
            <h2 className="font-extrabold text-gray-900 uppercase">TỔNG TIỀN</h2>
            <div className="space-y-1.5 border-t border-gray-100 pt-3">
              <div className="flex justify-between text-gray-700">
                <span>Tổng cộng:</span>
                <span className="font-bold text-gray-900">{formatVND(totalPrice)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-gray-900 pt-1">
                <span>Thành tiền:</span>
                <span className="text-red-600 text-base font-black">{formatVND(totalPrice)}</span>
              </div>
              <div className="text-[11px] text-gray-400 text-right italic">(Giá đã bao gồm VAT)</div>
            </div>
          </div>

          {/* Action Buttons Row matching screenshot */}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 px-4 rounded-xl text-center text-sm uppercase tracking-wider shadow-md transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>ĐANG ĐẾN VNPAY...</span>
                </>
              ) : (
                <span>ĐẶT HÀNG</span>
              )}
            </button>


            <button
              type="button"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3 px-4 rounded-xl text-center text-xs uppercase tracking-wider shadow transition-colors"
            >
              MUA TRẢ GÓP
            </button>

            {/* Utility Buttons Row: EXCEL, BÁO GIÁ, IN BÁO GIÁ */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>TẢI FILE EXCEL</span>
              </button>
              <button
                type="button"
                className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>TẢI ẢNH BÁO GIÁ</span>
              </button>
              <button
                type="button"
                className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>IN BÁO GIÁ</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Order Success Modal */}
      {orderSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Đặt hàng thành công!</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Cảm ơn quý khách <strong className="text-gray-900">{customerInfo.fullName || 'KH'}</strong> đã đặt hàng. Bộ phận CSKH PCStore sẽ liên hệ số điện thoại <strong className="text-blue-600">{customerInfo.phone || 'của quý khách'}</strong> trong thời gian sớm nhất!
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setOrderSuccessModal(false);
                  clearCart();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs uppercase shadow transition-colors"
              >
                Hoàn tất & Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
