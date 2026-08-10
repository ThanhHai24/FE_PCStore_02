import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, LogIn } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useAuth();

  const isNotAdmin = !loading && (!user || user.role !== 'ADMIN');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex transition-colors">
      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Header Topbar */}
        <AdminHeader onToggleSidebar={() => setCollapsed(!collapsed)} />

        {/* Warning Banner if not logged in as Admin */}
        {isNotAdmin && (
          <div className="bg-amber-500 text-white px-4 py-3 flex items-center justify-between shadow-md text-xs font-semibold">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-bounce" />
              <span>
                Bạn chưa đăng nhập bằng tài khoản <strong>Quản trị viên (ADMIN)</strong>. Vui lòng đăng nhập để có quyền thêm/sửa/xóa sản phẩm.
              </span>
            </div>
            <Link
              to="/admin/login"
              className="px-3 py-1.5 bg-white text-amber-800 rounded-lg hover:bg-amber-50 transition-all font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập Admin</span>
            </Link>
          </div>
        )}

        {/* Content Body */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

