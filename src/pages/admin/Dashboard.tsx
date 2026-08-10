import React, { useState, useEffect } from 'react';
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
  Plus,
  Calendar as CalendarIcon,
  Download,
  PieChart as PieChartIcon,
  BarChart3,
  Filter,
  ArrowRight
} from 'lucide-react';
import { getProducts, getCategories } from '../../services/productService';
import { getAdminOrdersApi } from '../../services/orderService';
import { getUsersApi } from '../../services/userService';

type TimeRange = 'today' | '7days' | 'this_month' | 'quarter' | 'this_year' | 'custom';

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const [startDate, setStartDate] = useState<string>('2026-08-01');
  const [endDate, setEndDate] = useState<string>('2026-08-08');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState<boolean>(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const [realStats, setRealStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const [prodRes, orderRes, catRes, userRes] = await Promise.allSettled([
          getProducts({ limit: 100 }),
          getAdminOrdersApi({ limit: 100 }),
          getCategories(),
          getUsersApi({ limit: 100 }),
        ]);

        if (!isMounted) return;

        let totalP = 12;
        let totalO = 8;
        let totalC = 15;
        let totalCat = 5;

        if (prodRes.status === 'fulfilled' && prodRes.value && Array.isArray((prodRes.value as any).products)) {
          totalP = (prodRes.value as any).products.length;
        }
        if (orderRes.status === 'fulfilled' && orderRes.value && Array.isArray((orderRes.value as any).orders)) {
          totalO = (orderRes.value as any).orders.length;
        }
        if (userRes.status === 'fulfilled' && userRes.value && (userRes.value as any).pagination) {
          totalC = (userRes.value as any).pagination.total || ((userRes.value as any).users ? (userRes.value as any).users.length : 15);
        }
        if (catRes.status === 'fulfilled' && catRes.value && Array.isArray((catRes.value as any).categories)) {
          totalCat = (catRes.value as any).categories.length;
        }

        setRealStats({
          totalProducts: totalP,
          totalOrders: totalO,
          totalCustomers: totalC,
          totalCategories: totalCat,
        });
      } catch (err) {
        console.warn('Dashboard fetchStats fallback:', err);
      }
    };
    fetchStats();
    return () => { isMounted = false; };
  }, []);

  // Mock data dynamic based on time range
  const chartDataByRange: Record<TimeRange, {
    labels: string[];
    revenue: number[]; // In Millions VND
    orders: number[];
    rangeText: string;
    totalRevenue: string;
    totalOrders: string;
  }> = {
    today: {
      labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
      revenue: [12, 28, 45, 32, 60, 52, 38],
      orders: [3, 7, 12, 8, 15, 14, 9],
      rangeText: 'Hôm nay (08/08/2026)',
      totalRevenue: '267.000.000 ₫',
      totalOrders: '68 đơn',
    },
    '7days': {
      labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
      revenue: [120, 150, 180, 140, 220, 290, 240],
      orders: [28, 35, 42, 30, 55, 72, 60],
      rangeText: '7 ngày qua (02/08 - 08/08/2026)',
      totalRevenue: '1.340.000.000 ₫',
      totalOrders: '322 đơn',
    },
    this_month: {
      labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
      revenue: [450, 520, 610, 480],
      orders: [110, 135, 160, 125],
      rangeText: 'Tháng 8/2026',
      totalRevenue: '2.060.000.000 ₫',
      totalOrders: '530 đơn',
    },
    quarter: {
      labels: ['Tháng 6', 'Tháng 7', 'Tháng 8'],
      revenue: [1800, 2100, 2060],
      orders: [420, 490, 530],
      rangeText: 'Quý III / 2026',
      totalRevenue: '5.960.000.000 ₫',
      totalOrders: '1.440 đơn',
    },
    this_year: {
      labels: ['Q1', 'Q2', 'Q3 (Hiện tại)', 'Q4 (Dự kiến)'],
      revenue: [4500, 5200, 5960, 6800],
      orders: [1150, 1320, 1440, 1600],
      rangeText: 'Năm 2026',
      totalRevenue: '22.460.000.000 ₫',
      totalOrders: '5.510 đơn',
    },
    custom: {
      labels: ['Ngày 1', 'Ngày 2', 'Ngày 3', 'Ngày 4', 'Ngày 5', 'Ngày 6', 'Ngày 7', 'Ngày 8'],
      revenue: [110, 145, 170, 160, 210, 260, 230, 280],
      orders: [25, 32, 38, 35, 50, 65, 58, 70],
      rangeText: `Tùy chọn (${startDate ? startDate.split('-').reverse().join('/') : '01/08/2026'} đến ${endDate ? endDate.split('-').reverse().join('/') : '08/08/2026'})`,
      totalRevenue: '1.565.000.000 ₫',
      totalOrders: '373 đơn',
    },
  };

  const currentData = chartDataByRange[timeRange];
  const maxRevenue = Math.max(...currentData.revenue);

  // Donut Chart Data (Product Category Breakdown)
  const categoryDistribution = [
    { name: 'PC Gaming Nguyên Bộ', percentage: 42, color: 'bg-blue-600' },
    { name: 'Linh Kiện PC (VGA, CPU, RAM)', percentage: 28, color: 'bg-indigo-500' },
    { name: 'Màn Hình Đồ Họa & Gaming', percentage: 18, color: 'bg-amber-400' },
    { name: 'Phụ Kiện (Phím, Chuột, Tai nghe)', percentage: 12, color: 'bg-emerald-500' },
  ];

  const recentOrders = [
    {
      id: '#ORD-9482',
      customer: 'Nguyễn Văn An',
      product: 'PC Gaming RTX 4080 i7-14700K',
      total: '45.990.000 ₫',
      status: 'Đã hoàn thành',
    },
    {
      id: '#ORD-9481',
      customer: 'Trần Thị Bình',
      product: 'Màn hình ASUS ROG Swift 32"',
      total: '18.500.000 ₫',
      status: 'Đang xử lý',
    },
    {
      id: '#ORD-9480',
      customer: 'Lê Hoàng Cường',
      product: 'Bàn phím cơ Custom Akko Mod007',
      total: '3.200.000 ₫',
      status: 'Đã hoàn thành',
    },
    {
      id: '#ORD-9479',
      customer: 'Phạm Minh Đức',
      product: 'Card màn hình MSI RTX 4070 Ti',
      total: '22.900.000 ₫',
      status: 'Đang vận chuyển',
    },
  ];

  const lowStockProducts = [
    { name: 'Nguồn Corsair RM1000x', stock: 2, limit: 10 },
    { name: 'Ram G.Skill Trident Z5 32GB', stock: 4, limit: 15 },
    { name: 'VGA ASUS ROG Strix RTX 4090', stock: 1, limit: 5 },
  ];

  const handleApplyCustomDate = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeRange('custom');
    setShowCustomDatePicker(false);
  };

  return (
    <div className="space-y-6 font-sans pb-8">
      {/* Top Header & Global Time Selector Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Báo Cáo Tổng Quan Kinh Doanh
            </h1>
            <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
              Realtime
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-blue-500" />
            Đang hiển thị: <span className="font-bold text-gray-800">{currentData.rangeText}</span>
          </p>
        </div>

        {/* Time Selector Dropdown & Custom Range Picker Controls */}
        <div className="flex flex-wrap items-center gap-2 relative">
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200/80">
            <Filter className="w-3.5 h-3.5 text-gray-400 ml-2 mr-1" />
            {(['today', '7days', 'this_month', 'quarter', 'this_year'] as TimeRange[]).map((range) => {
              const labels: Record<TimeRange, string> = {
                today: 'Hôm nay',
                '7days': '7 Ngày',
                this_month: 'Tháng này',
                quarter: 'Quý này',
                this_year: 'Năm nay',
                custom: 'Tùy chọn',
              };
              return (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    setShowCustomDatePicker(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    timeRange === range
                      ? 'bg-white text-blue-600 shadow-sm border border-gray-100 font-bold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
                >
                  {labels[range]}
                </button>
              );
            })}

            {/* Custom Date Range Button Trigger */}
            <button
              onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                timeRange === 'custom'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-gray-700 hover:bg-gray-200/60'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Khoảng ngày</span>
            </button>
          </div>

          {/* Custom Date Range Picker Popover Dropdown */}
          {showCustomDatePicker && (
            <div className="absolute right-0 top-12 z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 w-72 sm:w-80 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                  Chọn khoảng thời gian
                </span>
                <button
                  onClick={() => setShowCustomDatePicker(false)}
                  className="text-xs text-gray-400 hover:text-gray-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleApplyCustomDate} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Từ ngày
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Đến ngày
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomDatePicker(false)}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-xl font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow flex items-center gap-1"
                  >
                    <span>Áp dụng</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          <button
            onClick={() => alert('Xuất báo cáo PDF/Excel')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span className="hidden sm:inline">Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Doanh Thu Kỳ Này
            </span>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {currentData.totalRevenue}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +14.2%
              </span>
              <span className="text-gray-400 font-normal">so với kỳ trước</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tổng Đơn Hàng
            </span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {currentData.totalOrders}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +8.5%
              </span>
              <span className="text-gray-400 font-normal">tăng trưởng</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Sản Phẩm Tồn Kho
            </span>
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              524 sản phẩm
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                <TrendingDown className="w-3.5 h-3.5 mr-1" />
                -2.1%
              </span>
              <span className="text-gray-400 font-normal">cần nhập kho</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Khách Hàng Mới
            </span>
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              892 khách hàng
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +22.4%
              </span>
              <span className="text-gray-400 font-normal">thành viên mới</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: Biểu đồ Cột Doanh Thu & Đơn Hàng theo thời gian */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">
                  Biểu Đồ Doanh Thu & Đơn Hàng
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Thống kê số liệu theo <span className="font-semibold text-blue-600">{currentData.rangeText}</span>
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-600"></span>
                <span className="text-gray-600">Doanh thu (Triệu ₫)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-400"></span>
                <span className="text-gray-600">Số đơn hàng</span>
              </div>
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 px-2 border-b border-gray-100 relative">
            {currentData.revenue.map((rev, idx) => {
              const heightPercent = Math.max(15, Math.round((rev / maxRevenue) * 100));
              const isHovered = hoveredBar === idx;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip Popup on Hover */}
                  {isHovered && (
                    <div className="absolute -top-14 z-20 bg-gray-900 text-white text-[11px] py-1.5 px-3 rounded-xl shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none">
                      <p className="font-bold text-amber-300">{currentData.labels[idx]}</p>
                      <p>Doanh thu: <span className="font-semibold text-white">{rev} Triệu ₫</span></p>
                      <p>Số đơn: <span className="font-semibold text-blue-300">{currentData.orders[idx]} đơn</span></p>
                    </div>
                  )}

                  {/* Dual Bars */}
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                        isHovered
                          ? 'bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] shadow-md shadow-blue-500/30'
                          : 'bg-blue-600/90 hover:bg-blue-600'
                      }`}
                    ></div>

                    <div
                      style={{ height: `${Math.max(10, Math.round(heightPercent * 0.45))}%` }}
                      className="w-full max-w-[14px] bg-amber-400 hover:bg-amber-500 rounded-t-md transition-all duration-300 hidden sm:block"
                    ></div>
                  </div>

                  <span className="text-[11px] font-semibold text-gray-500 mt-2 truncate w-full text-center">
                    {currentData.labels[idx]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-gray-500">
            <span>Đơn vị tính: Triệu VNĐ</span>
            <span className="font-bold text-blue-600">Tổng doanh thu kỳ này: {currentData.totalRevenue}</span>
          </div>
        </div>

        {/* CHART 2: Biểu đồ Tròn Cơ Cấu Doanh Thu */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PieChartIcon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-gray-900">
                Tỷ Lệ Doanh Thu Danh Mục
              </h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Cơ cấu đóng góp doanh thu theo nhóm hàng PC Store
            </p>

            <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#2563EB" strokeWidth="3.8" strokeDasharray="42 58" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6366F1" strokeWidth="3.8" strokeDasharray="28 72" strokeDashoffset="-42" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="3.8" strokeDasharray="18 82" strokeDashoffset="-70" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10B981" strokeWidth="3.8" strokeDasharray="12 88" strokeDashoffset="-88" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-gray-900">100%</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">Danh mục</span>
              </div>
            </div>

            <div className="space-y-2.5 mt-4">
              {categoryDistribution.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                      <span className={`w-2.5 h-2.5 rounded-full ${cat.color} shrink-0`}></span>
                      <span className="text-gray-800 truncate">{cat.name}</span>
                    </div>
                    <span className="text-gray-900 font-bold">{cat.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${cat.percentage}%` }}
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Recent Orders & Stock Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Đơn hàng mới phát sinh</h2>
              <p className="text-xs text-gray-500">Danh sách đơn hàng vừa đặt trên hệ thống PC Store</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả đơn</span>
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
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : order.status === 'Đang xử lý'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
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

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-gray-900">Cảnh báo tồn kho</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Các linh kiện / máy tính dưới định mức tối thiểu.
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
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg">
                    Còn {p.stock} sp
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <Link
              to="/admin/products"
              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Quản lý kho hàng sản phẩm</span>
              <Plus className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
