import React from 'react';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Tổng doanh thu',
      value: '1.240.500.000 ₫',
      change: '+14.2%',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Tổng đơn hàng',
      value: '1,428',
      change: '+8.5%',
      isPositive: true,
      icon: ShoppingCart,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Sản phẩm kho',
      value: '524',
      change: '-2.1%',
      isPositive: false,
      icon: Package,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Khách hàng mới',
      value: '892',
      change: '+22.4%',
      isPositive: true,
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-9482',
      customer: 'Nguyễn Văn An',
      product: 'PC Gaming RTX 4080 i7-14700K',
      total: '45.990.000 ₫',
      status: 'Đã hoàn thành',
      date: '10 phút trước',
    },
    {
      id: '#ORD-9481',
      customer: 'Trần Thị Bình',
      product: 'Màn hình ASUS ROG Swift 32"',
      total: '18.500.000 ₫',
      status: 'Đang xử lý',
      date: '25 phút trước',
    },
    {
      id: '#ORD-9480',
      customer: 'Lê Hoàng Cường',
      product: 'Bàn phím cơ Custom Akko Mod007',
      total: '3.200.000 ₫',
      status: 'Đã hoàn thành',
      date: '1 giờ trước',
    },
    {
      id: '#ORD-9479',
      customer: 'Phạm Minh Đức',
      product: 'Card màn hình MSI RTX 4070 Ti',
      total: '22.900.000 ₫',
      status: 'Đang vận chuyển',
      date: '2 giờ trước',
    },
  ];

  const lowStockProducts = [
    { name: 'Nguồn Corsair RM1000x', stock: 2, limit: 10 },
    { name: 'Ram G.Skill Trident Z5 32GB', stock: 4, limit: 15 },
    { name: 'VGA ASUS ROG Strix RTX 4090', stock: 1, limit: 5 },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Tổng Quan Hệ Thống
          </h1>
          <p className="text-xs text-gray-500">
            Xin chào Admin! Dưới đây là tình hình kinh doanh của PC Store hôm nay.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow transition-all"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Thêm sản phẩm mới</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {item.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center font-bold`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xl font-bold text-gray-900 tracking-tight">
                  {item.value}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
                  {item.isPositive ? (
                    <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5 mr-1" />
                      {item.change}
                    </span>
                  ) : (
                    <span className="flex items-center text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      <TrendingDown className="w-3.5 h-3.5 mr-1" />
                      {item.change}
                    </span>
                  )}
                  <span className="text-gray-400 font-normal">so với tháng trước</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid: Recent Orders & Stock Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Đơn hàng mới nhất</h2>
              <p className="text-xs text-gray-500">Danh sách đơn hàng vừa phát sinh trên hệ thống</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
                <tr>
                  <th className="px-3 py-3 rounded-l-xl">Mã đơn</th>
                  <th className="px-3 py-3">Khách hàng</th>
                  <th className="px-3 py-3">Sản phẩm chính</th>
                  <th className="px-3 py-3">Tổng tiền</th>
                  <th className="px-3 py-3 rounded-r-xl">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-3 py-3.5 font-bold text-blue-600">{order.id}</td>
                    <td className="px-3 py-3.5 font-medium text-gray-900">{order.customer}</td>
                    <td className="px-3 py-3.5 text-gray-600 max-w-[180px] truncate">
                      {order.product}
                    </td>
                    <td className="px-3 py-3.5 font-bold text-gray-900">{order.total}</td>
                    <td className="px-3 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          order.status === 'Đã hoàn thành'
                            ? 'bg-emerald-50 text-emerald-700'
                            : order.status === 'Đang xử lý'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {order.status === 'Đã hoàn thành' && <CheckCircle2 className="w-3 h-3" />}
                        {order.status === 'Đang xử lý' && <Clock className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Warning Box */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-gray-900">Cảnh báo tồn kho</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Sản phẩm sắp hết hàng cần nhập thêm ngay.
            </p>

            <div className="space-y-3">
              {lowStockProducts.map((p, i) => (
                <div
                  key={i}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{p.name}</p>
                    <p className="text-[11px] text-gray-400">Định mức: {p.limit} sp</p>
                  </div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                    Còn {p.stock} sp
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <Link
              to="/admin/products"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Quản lý kho hàng sản phẩm →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
