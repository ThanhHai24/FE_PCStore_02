import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Award,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/products', label: 'Sản phẩm', icon: Package, badge: '128' },
  { path: '/admin/orders', label: 'Đơn hàng', icon: ShoppingCart, badge: '5 mới' },
  { path: '/admin/customers', label: 'Khách hàng', icon: Users },
  { path: '/admin/categories', label: 'Danh mục', icon: FolderTree },
  { path: '/admin/brands', label: 'Thương hiệu', icon: Award },
];


export const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 bg-white border-r border-gray-200 z-40 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'
        }`}
    >
      {/* Brand Header */}
      <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] flex items-center justify-center text-white font-black text-xs shadow-sm flex-shrink-0">
            PC
          </div>
          {!collapsed && (
            <div className="min-w-0 whitespace-nowrap">
              <h2 className="text-sm font-bold text-gray-900 leading-tight">PC Store</h2>
              <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-blue-600" /> Admin Portal
              </span>
            </div>
          )}
        </div>
        {/* Top toggle button replaced with whitespace */}
        <div className="w-6" />
      </div>

      {/* Navigation list + Clickable whitespace below */}
      <div className="flex-1 py-4 px-3 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
                  ? 'bg-blue-50 text-blue-600 font-bold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Clickable Empty Whitespace area below nav items to toggle collapse/expand */}
        <div
          onClick={onToggle}
          className="flex-1 min-h-[60px] cursor-pointer rounded-xl transition-colors hover:bg-gray-50/80 flex items-end justify-center pb-3 my-2"
          title={collapsed ? 'Bấm vào khoảng trắng để mở rộng Sidebar' : 'Bấm vào khoảng trắng để thu gọn Sidebar'}
        >
          <span className="text-[10px] font-bold text-gray-300 opacity-0 hover:opacity-100 transition-opacity">
            {collapsed ? '▶' : '◀ Click để thu gọn'}
          </span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-gray-100 space-y-2">
        {!collapsed && (
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Trang bán hàng</span>
          </NavLink>
        )}

        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                alt="Admin Avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0 whitespace-nowrap">
                <span className="text-xs font-bold text-gray-900 truncate">{user?.fullName || 'Quản trị viên'}</span>
                <span className="text-[11px] text-gray-500 truncate">{user?.email || 'admin@pcstore.com'}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
