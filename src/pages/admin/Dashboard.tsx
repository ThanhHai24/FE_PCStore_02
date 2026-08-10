import React, { useState, useEffect, useMemo } from 'react';
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
  ArrowRight,
  RefreshCw,
  Loader2,
  XCircle,
  Tag
} from 'lucide-react';
import { getProducts, getCategories, formatPrice } from '../../services/productService';
import { getAdminOrdersApi } from '../../services/orderService';
import { getUsersApi } from '../../services/userService';
import { ORDER_STATUS_MAP, type Order, type OrderStatus } from '../../types/order';
import type { ApiProduct, ApiCategory } from '../../types/apiProduct';
import { Link } from 'react-router-dom';

type TimeRange = 'today' | '7days' | 'this_month' | 'quarter' | 'this_year' | 'custom';

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const [startDate, setStartDate] = useState<string>('2026-08-01');
  const [endDate, setEndDate] = useState<string>('2026-08-10');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState<boolean>(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [prodRes, orderRes, catRes, userRes] = await Promise.allSettled([
        getProducts({ limit: 500 }),
        getAdminOrdersApi({ limit: 500 }),
        getCategories({ tree: false }),
        getUsersApi({ limit: 500 }),
      ]);

      if (prodRes.status === 'fulfilled' && prodRes.value && Array.isArray(prodRes.value.products)) {
        setProducts(prodRes.value.products);
      } else {
        setProducts([]);
      }

      if (orderRes.status === 'fulfilled' && orderRes.value && Array.isArray(orderRes.value.orders)) {
        setOrders(orderRes.value.orders);
      } else {
        setOrders([]);
      }

      if (catRes.status === 'fulfilled' && catRes.value && Array.isArray(catRes.value.categories)) {
        setCategories(catRes.value.categories);
      } else {
        setCategories([]);
      }

      if (userRes.status === 'fulfilled' && userRes.value) {
        const total = (userRes.value as any).pagination?.total ?? (userRes.value as any).users?.length ?? 0;
        setTotalCustomers(total);
      } else {
        setTotalCustomers(0);
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Compute KPI Statistics from real data
  const validOrders = useMemo(() => {
    return orders.filter((o) => o.status !== 'CANCELLED');
  }, [orders]);

  const totalRevenueAmount = useMemo(() => {
    return validOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }, [validOrders]);

  const totalRevenueFormatted = useMemo(() => {
    return formatPrice(totalRevenueAmount);
  }, [totalRevenueAmount]);

  const lowStockProducts = useMemo(() => {
    return products
      .filter((p) => (p.stock ?? 0) <= 5)
      .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
      .slice(0, 5);
  }, [products]);

  const recentOrders = useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);

  // Compute real category distribution based on products count per category
  const categoryDistribution = useMemo(() => {
    if (products.length === 0) {
      return [
        { name: 'Chưa có dữ liệu', percentage: 100, color: 'bg-gray-400', count: 0 }
      ];
    }

    const map = new Map<string, number>();
    products.forEach((p) => {
      const catName = p.category?.name || 'Khác';
      map.set(catName, (map.get(catName) || 0) + 1);
    });

    const colors = ['bg-blue-600', 'bg-indigo-500', 'bg-amber-400', 'bg-emerald-500', 'bg-purple-500', 'bg-rose-500'];
    const entries = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

    const totalProds = products.length;
    let accumulated = 0;
    const result = [];

    const top = entries.slice(0, 4);
    top.forEach(([name, count], idx) => {
      const percentage = Math.round((count / totalProds) * 100);
      accumulated += percentage;
      result.push({
        name,
        percentage,
        count,
        color: colors[idx % colors.length]
      });
    });

    if (entries.length > 4) {
      const otherCount = entries.slice(4).reduce((sum, [, cnt]) => sum + cnt, 0);
      const otherPercent = Math.max(0, 100 - accumulated);
      result.push({
        name: 'Khác',
        percentage: otherPercent,
        count: otherCount,
        color: colors[4]
      });
    }

    return result;
  }, [products]);

  // Compute Chart Data grouping real orders by selected TimeRange
  const chartData = useMemo(() => {
    let labels: string[] = [];
    let rangeText = '';
    let filterFn: (o: Order) => boolean = () => true;
    let getBucketIndex: (o: Order) => number = () => 0;

    const now = new Date();

    if (timeRange === 'today') {
      labels = ['00:00-08:00', '08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-24:00'];
      rangeText = `Hôm nay (${now.toLocaleDateString('vi-VN')})`;
      filterFn = (o) => {
        const d = new Date(o.createdAt);
        return d.toDateString() === now.toDateString();
      };
      getBucketIndex = (o) => {
        const h = new Date(o.createdAt).getHours();
        if (h < 8) return 0;
        if (h < 12) return 1;
        if (h < 16) return 2;
        if (h < 20) return 3;
        return 4;
      };
    } else if (timeRange === '7days') {
      labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
      rangeText = '7 ngày qua';
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      filterFn = (o) => new Date(o.createdAt) >= sevenDaysAgo;
      getBucketIndex = (o) => {
        const day = new Date(o.createdAt).getDay(); // 0 = Sun, 1 = Mon ...
        return day === 0 ? 6 : day - 1;
      };
    } else if (timeRange === 'this_month') {
      labels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
      rangeText = `Tháng ${now.getMonth() + 1}/${now.getFullYear()}`;
      filterFn = (o) => {
        const d = new Date(o.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      };
      getBucketIndex = (o) => {
        const date = new Date(o.createdAt).getDate();
        if (date <= 7) return 0;
        if (date <= 14) return 1;
        if (date <= 21) return 2;
        return 3;
      };
    } else if (timeRange === 'quarter') {
      labels = ['Tháng 1', 'Tháng 2', 'Tháng 3'];
      const q = Math.floor(now.getMonth() / 3) + 1;
      rangeText = `Quý ${q} / ${now.getFullYear()}`;
      const qStartMonth = (q - 1) * 3;
      labels = [`Tháng ${qStartMonth + 1}`, `Tháng ${qStartMonth + 2}`, `Tháng ${qStartMonth + 3}`];
      filterFn = (o) => {
        const d = new Date(o.createdAt);
        return d.getFullYear() === now.getFullYear() && Math.floor(d.getMonth() / 3) + 1 === q;
      };
      getBucketIndex = (o) => {
        return new Date(o.createdAt).getMonth() % 3;
      };
    } else if (timeRange === 'this_year') {
      labels = ['Q1', 'Q2', 'Q3', 'Q4'];
      rangeText = `Năm ${now.getFullYear()}`;
      filterFn = (o) => new Date(o.createdAt).getFullYear() === now.getFullYear();
      getBucketIndex = (o) => Math.floor(new Date(o.createdAt).getMonth() / 3);
    } else {
      labels = ['Đợt 1', 'Đợt 2', 'Đợt 3', 'Đợt 4'];
      rangeText = `Từ ${startDate || '01/08/2026'} đến ${endDate || '10/08/2026'}`;
      const s = startDate ? new Date(startDate) : new Date(0);
      const e = endDate ? new Date(endDate) : new Date();
      e.setHours(23, 59, 59, 999);
      filterFn = (o) => {
        const d = new Date(o.createdAt);
        return d >= s && d <= e;
      };
      getBucketIndex = (o) => {
        const d = new Date(o.createdAt).getTime();
        const step = (e.getTime() - s.getTime()) / 4;
        if (step <= 0) return 0;
        const idx = Math.floor((d - s.getTime()) / step);
        return Math.max(0, Math.min(3, idx));
      };
    }

    const filtered = validOrders.filter(filterFn);
    const revenueBuckets = new Array(labels.length).fill(0);
    const orderBuckets = new Array(labels.length).fill(0);

    filtered.forEach((o) => {
      const idx = getBucketIndex(o);
      if (idx >= 0 && idx < labels.length) {
        revenueBuckets[idx] += o.totalAmount || 0;
        orderBuckets[idx] += 1;
      }
    });

    // Convert revenue into Millions (Triệu ₫) for chart display
    const revenueInMillions = revenueBuckets.map((amt) => Number((amt / 1000000).toFixed(1)));
    const totalRev = filtered.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return {
      labels,
      rangeText,
      revenueInMillions,
      rawRevenue: revenueBuckets,
      ordersCount: orderBuckets,
      totalRevenueFormatted: formatPrice(totalRev),
      totalOrdersFormatted: `${filtered.length} đơn`,
      maxRevenueInMillions: Math.max(...revenueInMillions, 1),
    };
  }, [timeRange, startDate, endDate, validOrders]);

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
            <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              API Realtime
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-blue-500" />
            Đang hiển thị: <span className="font-bold text-gray-800">{chartData.rangeText}</span>
          </p>
        </div>

        {/* Time Selector Dropdown & Refresh Controls */}
        <div className="flex flex-wrap items-center gap-2 relative">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-600 transition-colors disabled:opacity-50"
            title="Làm mới dữ liệu từ API"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>

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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
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
                  className="text-xs text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
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
                    className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow flex items-center gap-1 cursor-pointer"
                  >
                    <span>Áp dụng</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tổng Doanh Thu Đơn Hàng
            </span>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : totalRevenueFormatted}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                Thực tế
              </span>
              <span className="text-gray-400 font-normal">từ {validOrders.length} đơn hợp lệ</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tổng Đơn Hàng System
            </span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-emerald-600" /> : `${orders.length} đơn hàng`}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {orders.length > 0 ? `${validOrders.length} đơn thành công` : '0 đơn'}
              </span>
              <span className="text-gray-400 font-normal">đã phát sinh</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Sản Phẩm Trong Kho
            </span>
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-amber-600" /> : `${products.length} sản phẩm`}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className={`flex items-center px-2 py-0.5 rounded-full ${lowStockProducts.length > 0 ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'}`}>
                {lowStockProducts.length > 0 ? (
                  <>
                    <TrendingDown className="w-3.5 h-3.5 mr-1" />
                    {lowStockProducts.length} sp sắp hết
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Tồn kho dồi dào
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tài Khoản Khách Hàng
            </span>
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-purple-600" /> : `${totalCustomers} người dùng`}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                {categories.length} Danh mục sản phẩm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: Biểu đồ Cột Doanh Thu & Đơn Hàng theo thời gian thực */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[380px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">
                  Biểu Đồ Doanh Thu & Đơn Hàng Thực Tế
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Số liệu tính theo <span className="font-semibold text-blue-600">{chartData.rangeText}</span>
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
          {loading ? (
            <div className="h-64 flex items-center justify-center text-xs text-gray-400 space-x-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>Đang tải biểu đồ...</span>
            </div>
          ) : (
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 px-2 border-b border-gray-100 relative">
              {chartData.revenueInMillions.map((rev, idx) => {
                const heightPercent = chartData.maxRevenueInMillions > 0
                  ? Math.max(10, Math.round((rev / chartData.maxRevenueInMillions) * 100))
                  : 10;
                const isHovered = hoveredBar === idx;
                const ordersCnt = chartData.ordersCount[idx];
                const rawAmt = chartData.rawRevenue[idx];

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
                        <p className="font-bold text-amber-300">{chartData.labels[idx]}</p>
                        <p>Doanh thu: <span className="font-semibold text-white">{formatPrice(rawAmt)}</span></p>
                        <p>Số đơn: <span className="font-semibold text-blue-300">{ordersCnt} đơn</span></p>
                      </div>
                    )}

                    {/* Dual Bars */}
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                          isHovered
                            ? 'bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] shadow-md shadow-blue-500/30'
                            : rev > 0
                            ? 'bg-blue-600/90 hover:bg-blue-600'
                            : 'bg-gray-200'
                        }`}
                      ></div>

                      <div
                        style={{ height: `${Math.max(8, Math.round((ordersCnt / Math.max(...chartData.ordersCount, 1)) * 80))}%` }}
                        className="w-full max-w-[14px] bg-amber-400 hover:bg-amber-500 rounded-t-md transition-all duration-300 hidden sm:block"
                      ></div>
                    </div>

                    <span className="text-[11px] font-semibold text-gray-500 mt-2 truncate w-full text-center">
                      {chartData.labels[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-gray-500">
            <span>Đơn vị: Triệu VNĐ</span>
            <span className="font-bold text-blue-600">Tổng kỳ chọn: {chartData.totalRevenueFormatted}</span>
          </div>
        </div>

        {/* CHART 2: Biểu đồ Cơ Cấu Sản Phẩm Theo Danh Mục */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PieChartIcon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-gray-900">
                Phân Bố Sản Phẩm Danh Mục
              </h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Tỷ lệ số lượng sản phẩm thực tế theo danh mục
            </p>

            <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#2563EB" strokeWidth="3.8" strokeDasharray="42 58" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6366F1" strokeWidth="3.8" strokeDasharray="28 72" strokeDashoffset="-42" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="3.8" strokeDasharray="18 82" strokeDashoffset="-70" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10B981" strokeWidth="3.8" strokeDasharray="12 88" strokeDashoffset="-88" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-gray-900">{products.length}</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">Sản phẩm</span>
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
                    <span className="text-gray-900 font-bold">{cat.percentage}% ({cat.count} sp)</span>
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
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Đơn hàng mới nhất từ hệ thống</h2>
              <p className="text-xs text-gray-500">Danh sách đơn hàng vừa phát sinh thực tế</p>
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
                  <th className="px-3 py-3">Sản phẩm</th>
                  <th className="px-3 py-3">Tổng tiền</th>
                  <th className="px-3 py-3 rounded-r-xl">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-gray-400">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-600 mb-1" />
                      Đang tải danh sách đơn hàng...
                    </td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-gray-400 font-medium">
                      Chưa có đơn hàng nào trong hệ thống.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => {
                    const statusMeta = ORDER_STATUS_MAP[order.status] || {
                      label: order.status,
                      color: 'text-gray-700',
                      bgColor: 'bg-gray-50 border-gray-200'
                    };
                    const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
                    const extraItems = order.items && order.items.length > 1 ? order.items.length - 1 : 0;

                    return (
                      <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-3 py-3.5 font-bold text-blue-600">{order.code || order.id}</td>
                        <td className="px-3 py-3.5 font-medium text-gray-900">
                          <div>
                            <p className="font-bold">{order.customerName}</p>
                            <p className="text-[10px] text-gray-400">{order.customerPhone}</p>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 text-gray-600 max-w-[200px] truncate">
                          {firstItem ? (
                            <span>
                              {firstItem.productName}
                              {extraItems > 0 && <span className="text-blue-600 font-semibold ml-1">(+{extraItems} sp)</span>}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Đơn hàng không có chi tiết</span>
                          )}
                        </td>
                        <td className="px-3 py-3.5 font-bold text-gray-900">{formatPrice(order.totalAmount)}</td>
                        <td className="px-3 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusMeta.bgColor} ${statusMeta.color}`}
                          >
                            {order.status === 'DELIVERED' && <CheckCircle2 className="w-3 h-3" />}
                            {order.status === 'PENDING' && <Clock className="w-3 h-3" />}
                            {order.status === 'CANCELLED' && <XCircle className="w-3 h-3" />}
                            <span>{statusMeta.label}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Products Warning */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-gray-900">Cảnh báo tồn kho thực tế</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Sản phẩm có tồn kho thấp (từ 5 sản phẩm trở xuống)
            </p>

            {loading ? (
              <div className="py-8 text-center text-xs text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-600 mb-1" />
                Đang tải dữ liệu tồn kho...
              </div>
            ) : lowStockProducts.length === 0 ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-800">Tồn kho an toàn</p>
                <p className="text-[11px] text-emerald-600">Tất cả sản phẩm đều có số lượng tồn kho trên 5 sp</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        <span>{p.category?.name || 'Linh kiện'}</span>
                      </p>
                    </div>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg shrink-0">
                      Còn {p.stock ?? 0} sp
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <Link
              to="/admin/products"
              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Quản lý danh sách sản phẩm</span>
              <Plus className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
