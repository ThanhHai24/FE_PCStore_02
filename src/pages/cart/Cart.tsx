import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

export const Cart: React.FC = () => {
  return (
    <div className="max-w-[1250px] mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          <span>Giỏ Hàng Của Bạn</span>
        </h1>
        <Link to="/" className="text-xs text-blue-600 hover:underline flex items-center space-x-1 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Tiếp tục mua hàng</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                  SP #{item}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-800 line-clamp-1">
                    Màn hình Gaming Asus TUF VG279Q3A 27 inch IPS 180Hz
                  </h3>
                  <div className="text-xs font-bold text-red-600 mt-1">4.290.000đ</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100">-</button>
                  <span className="px-3 text-xs font-semibold">1</span>
                  <button className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100">+</button>
                </div>
                <button className="text-gray-400 hover:text-red-600 p-1 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4 h-fit">
          <h2 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-2">Tóm Tắt Đơn Hàng</h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính:</span>
              <span className="font-bold text-gray-800">8.580.000đ</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Giảm giá:</span>
              <span className="font-bold text-green-600">-0đ</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm text-gray-900">
              <span>Tổng tiền:</span>
              <span className="text-red-600 text-base font-extrabold">8.580.000đ</span>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-colors">
            Tiến Hành Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
