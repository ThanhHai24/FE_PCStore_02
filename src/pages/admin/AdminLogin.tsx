import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@pcstore.vn');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin đăng nhập.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin');
    }, 600);
  };

  const fillDemoAccount = () => {
    setEmail('admin@pcstore.vn');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-[450px] w-full mx-auto">
        {/* Customer Style Card Box */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] flex items-center justify-center text-white font-black text-sm tracking-tighter">
                PC
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Đăng Nhập <span className="text-blue-600">Quản Trị viên</span>
            </h1>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> Hệ thống điều hành PC Store
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email / Tên đăng nhập
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vd: admin@pcstore.vn"
                  className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-700">Mật khẩu</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-blue-600 font-semibold hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button with Customer Gradient */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] hover:opacity-95 text-white font-bold text-xs py-3 rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Vào Trang Quản Trị</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill */}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={fillDemoAccount}
              className="w-full py-2.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Sử dụng tài khoản Admin Demo</span>
            </button>
          </div>

          <div className="text-center text-xs text-gray-500">
            <Link to="/" className="text-blue-600 font-semibold hover:underline">
              ← Quay lại trang chủ PC Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
