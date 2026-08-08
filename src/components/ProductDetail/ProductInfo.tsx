import React, { useState, useEffect } from 'react';
import { Star, Eye, MessageSquare, ShoppingBag, ShieldCheck, CheckCircle2, RefreshCw, Cpu, Monitor, HardDrive, Plus, Minus } from 'lucide-react';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedStorage, setSelectedStorage] = useState<string>('1TB');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Live countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: product.flashSale?.hours || 23,
    minutes: product.flashSale?.minutes || 33,
    seconds: product.flashSale?.seconds || 46,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedStorage);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="space-y-4 text-gray-800 relative">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-4 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold">Đã thêm {quantity} sản phẩm vào giỏ hàng!</span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
        {product.title}
      </h1>

      {/* Ratings & Stats bar */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-b border-gray-100 pb-3">
        <div className="flex items-center space-x-1 text-amber-400 font-semibold">
          <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-blue-600 font-normal">({product.reviewCount} đánh giá)</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4 text-gray-400" />
          <span>{product.viewCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <span>{product.commentCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ShoppingBag className="w-4 h-4 text-gray-400" />
          <span>{product.purchaseCount}</span>
        </div>
      </div>

      {/* Warranty & In-stock line */}
      <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm">
        <div>
          <span className="text-gray-500">Bảo hành: </span>
          <span className="text-red-600 font-semibold">{product.warrantyInfo}</span>
        </div>
        <div>
          <span className="text-gray-500">Tình trạng: </span>
          <span className="text-emerald-600 font-bold">{product.inStock ? 'Còn hàng' : 'Hết hàng'}</span>
        </div>
      </div>

      {/* FLASH SALE Box */}
      <div className="border-2 border-red-500 rounded-2xl overflow-hidden bg-white shadow-sm">
        {/* Flash Sale Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-black text-sm uppercase tracking-wider">
            <span className="text-lg">🔥</span>
            <span>FLASH SALE</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="font-semibold">Kết thúc sau</span>
            <div className="flex items-center space-x-1 font-bold text-red-600">
              <span className="bg-white px-1.5 py-0.5 rounded text-[11px] min-w-[22px] text-center">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-white">:</span>
              <span className="bg-white px-1.5 py-0.5 rounded text-[11px] min-w-[22px] text-center">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-white">:</span>
              <span className="bg-white px-1.5 py-0.5 rounded text-[11px] min-w-[22px] text-center">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Flash Sale Price Content */}
        <div className="p-4 flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 tracking-tight">
            {product.price}
          </div>
          {product.installmentPrice && (
            <div className="text-xs text-gray-600">
              <span>Hoặc </span>
              <span className="text-gray-900 font-bold">{product.installmentPrice}</span>
            </div>
          )}
        </div>
      </div>

      {/* Variant Selection Option */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-700">Tùy chọn dung lượng SSD:</label>
        <div className="flex flex-wrap gap-2">
          {['1TB NVMe Gen4', '2TB NVMe Gen4 (+1.800.000đ)'].map((option) => (
            <button
              key={option}
              onClick={() => setSelectedStorage(option)}
              className={`px-3 py-1.5 text-xs rounded-lg border font-semibold transition-all ${
                selectedStorage === option
                  ? 'border-red-600 bg-red-50 text-red-600 ring-1 ring-red-500'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Khuyến mại & Quà tặng khác Box */}
      <div className="border border-red-200 rounded-xl overflow-hidden bg-red-50/20">
        <div className="bg-red-600 text-white text-xs sm:text-sm font-bold px-4 py-2">
          Khuyến mại & Quà tặng khác
        </div>
        <ul className="p-4 space-y-2 text-xs text-gray-700 list-disc list-inside leading-relaxed">
          {product.promotions.map((promo, idx) => (
            <li key={idx} className="marker:text-red-500 font-medium">
              {promo}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Specs Summary (CPU, VGA, RAM) */}
      {product.quickSpecs && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {product.quickSpecs.cpu && (
            <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg">
              <div className="flex items-center space-x-1.5 font-bold text-gray-500 mb-1">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>CPU</span>
              </div>
              <p className="text-blue-700 font-bold line-clamp-2">{product.quickSpecs.cpu}</p>
            </div>
          )}
          {product.quickSpecs.vga && (
            <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg">
              <div className="flex items-center space-x-1.5 font-bold text-gray-500 mb-1">
                <Monitor className="w-4 h-4 text-blue-600" />
                <span>VGA</span>
              </div>
              <p className="text-blue-700 font-bold line-clamp-2">{product.quickSpecs.vga}</p>
            </div>
          )}
          {product.quickSpecs.ram && (
            <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg">
              <div className="flex items-center space-x-1.5 font-bold text-gray-500 mb-1">
                <HardDrive className="w-4 h-4 text-blue-600" />
                <span>RAM</span>
              </div>
              <p className="text-blue-700 font-bold line-clamp-2">{product.quickSpecs.ram}</p>
            </div>
          )}
        </div>
      )}

      {/* Quantity & Action Buttons Row */}
      <div className="space-y-3 pt-2">
        {/* Quantity selector */}
        <div className="flex items-center space-x-3 text-xs font-bold text-gray-700">
          <span>Số lượng:</span>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <button
              onClick={handleDecreaseQuantity}
              className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Giảm số lượng"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 py-1 text-xs font-bold text-gray-900 border-x border-gray-200">
              {quantity}
            </span>
            <button
              onClick={handleIncreaseQuantity}
              className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Tăng số lượng"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex-1 min-w-[110px] bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-4 rounded-xl text-center text-xs uppercase shadow transition-colors">
            TRẢ GÓP
          </button>
          <button className="flex-1 min-w-[130px] bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 px-4 rounded-xl text-center text-xs uppercase shadow transition-colors">
            MUA NGAY
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-white border-2 border-red-600 hover:bg-red-50 text-red-600 font-bold py-3 px-4 rounded-xl text-xs whitespace-nowrap transition-colors active:scale-95"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>

      {/* Chính sách mua hàng Box */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
        <h4 className="font-bold text-xs text-gray-900 uppercase">Chính sách mua hàng</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Cam kết giá tốt.</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Sản phẩm mới 100%.</span>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Lỗi 1 đổi 1 ngay lập tức.</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Hỗ trợ trả góp - Thủ tục nhanh gọn.</span>
          </div>
        </div>
      </div>

      {/* Khách hàng vừa mua notification banner matching screenshot */}
      <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span>
          <strong className="font-bold text-emerald-800">Khách hàng Hương (037 964 xxxx)</strong> Đã mua hàng 25 phút trước
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
