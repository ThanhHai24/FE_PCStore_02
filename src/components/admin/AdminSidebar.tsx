import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/products', label: 'Sản phẩm', icon: Package, badge: '128' },
  { path: '/admin/orders', label: 'Đơn hàng', icon: ShoppingCart, badge: '5 mới' },
  { path: '/admin/categories', label: 'Danh mục', icon: FolderTree },
  { path: '/admin/customers', label: 'Khách hàng', icon: Users },
  { path: '/admin/settings', label: 'Cài đặt', icon: Settings },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white text-gray-800 border-r border-gray-200/80 shadow-sm transition-all duration-300 ease-in-out flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Header / Brand Logo matching Customer Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white">
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="relative w-9 h-9 rounded-full border-2 border-white flex items-center justify-center bg-white/10 shrink-0 shadow-inner">
              <div className="w-7 h-7 rounded-full border border-white/80 flex items-center justify-center font-extrabold text-xs tracking-tighter">
                PC
              </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col leading-tight whitespace-nowrap">
                <span className="text-base font-black tracking-tight text-white drop-shadow-sm">
                  PC<span className="text-amber-300 font-extrabold">STORE</span>
                </span>
                <span className="text-[10px] text-blue-100 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-300" /> Admin Portal
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggle}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            title={collapsed ? 'Mở rộng' : 'Thu gọn'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 group font-semibold text-xs ${
                    isActive
                      ? 'bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white shadow-md shadow-blue-500/20'
                      : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  {!collapsed && (
                    <span className="truncate text-xs whitespace-nowrap">{item.label}</span>
                  )}
                </div>

                {!collapsed && item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      item.badge.includes('mới')
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/50">
        {!collapsed && (
          <NavLink
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 mb-3 py-2 px-3 bg-white border border-gray-200 text-blue-600 font-semibold rounded-xl text-xs hover:bg-blue-50 transition-colors shadow-sm"
          >
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Xem Web Bán Hàng</span>
          </NavLink>
        )}

        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Admin Avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0 whitespace-nowrap">
                <span className="text-xs font-bold text-gray-900 truncate">Quản trị viên</span>
                <span className="text-[11px] text-gray-500 truncate">admin@pcstore.vn</span>
              </div>
            )}
          </div>

          <NavLink
            to="/admin/login"
            className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
