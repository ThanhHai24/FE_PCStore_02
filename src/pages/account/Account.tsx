import React from 'react';
import { User, Lock, Mail } from 'lucide-react';

export const Account: React.FC = () => {
  return (
    <div className="max-w-[450px] mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Đăng Nhập Tài Khoản</h1>
          <p className="text-xs text-gray-500">Nhập thông tin tài khoản của bạn để tiếp tục</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email / Số điện thoại</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="vd: user@example.com"
                className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow transition-colors">
            Đăng Nhập
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Chưa có tài khoản?{' '}
          <a href="register" className="text-blue-600 font-semibold hover:underline">
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default Account;
