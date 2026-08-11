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
  Tag,
  Printer,
  Flame,
  Trophy,
  LineChart,
  Layers,
  Award
} from 'lucide-react';
import { getProducts, getCategories, formatPrice } from '../../services/productService';
import { getAdminOrdersApi } from '../../services/orderService';
import { getUsersApi } from '../../services/userService';
import { ORDER_STATUS_MAP, type Order } from '../../types/order';
import type { ApiProduct, ApiCategory } from '../../types/apiProduct';
import { Link } from 'react-router-dom';

type TimeMode = 'day' | 'month' | 'year' | 'custom';
type ChartType = 'bar' | 'line';
type TopProductsSort = 'quantity' | 'revenue';

interface TopProductItem {
  id: string;
  name: string;
  image?: string | null;
  categoryName: string;
  quantitySold: number;
  totalRevenue: number;
  stock: number;
}

export const Dashboard: React.FC = () => {
  const [timeMode, setTimeMode] = useState<TimeMode>('month');
  const [customStartDate, setCustomStartDate] = useState<string>('2026-08-01');
  const [customEndDate, setCustomEndDate] = useState<string>('2026-08-11');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState<boolean>(false);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [topSortBy, setTopSortBy] = useState<TopProductsSort>('quantity');
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

  // Filter valid (non-cancelled) orders for revenue calculations
  const validOrders = useMemo(() => {
    return orders.filter((o) => o.status !== 'CANCELLED');
  }, [orders]);

  // Overall KPI: Total Revenue
  const totalRevenueAmount = useMemo(() => {
    return validOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }, [validOrders]);

  // Overall KPI: Average Order Value (Giá trị đơn trung bình - AOV)
  const averageOrderValue = useMemo(() => {
    return validOrders.length > 0 ? totalRevenueAmount / validOrders.length : 0;
  }, [validOrders, totalRevenueAmount]);

  // Overall KPI: Total Items Sold
  const totalItemsSold = useMemo(() => {
    return validOrders.reduce((sum, o) => {
      if (o.items && Array.isArray(o.items)) {
        return sum + o.items.reduce((iSum, item) => iSum + (item.quantity || 1), 0);
      }
      return sum;
    }, 0);
  }, [validOrders]);

  // Map of productId -> product details for quick lookup
  const productMap = useMemo(() => {
    const map = new Map<string, ApiProduct>();
    products.forEach((p) => map.set(p.id, p));
    return map;
  }, [products]);

  // Compute Top Best-Selling Products from Order Items
  const topBestSellingProducts = useMemo<TopProductItem[]>(() => {
    const itemMap = new Map<string, { name: string; image?: string | null; quantitySold: number; totalRevenue: number; productId: string }>();

    validOrders.forEach((o) => {
      if (o.items && Array.isArray(o.items)) {
        o.items.forEach((item) => {
          const pId = item.productId || item.id;
          const current = itemMap.get(pId) || {
            productId: pId,
            name: item.productName || 'Sản phẩm ' + pId,
            image: item.image || null,
            quantitySold: 0,
            totalRevenue: 0,
          };
          current.quantitySold += item.quantity || 1;
          current.totalRevenue += (item.price || 0) * (item.quantity || 1);
          itemMap.set(pId, current);
        });
      }
    });

    const result: TopProductItem[] = [];
    itemMap.forEach((val, pId) => {
      const prod = productMap.get(pId);
      result.push({
        id: pId,
        name: prod?.name || val.name,
        image: prod?.image || val.image,
        categoryName: prod?.category?.name || 'Linh kiện',
        quantitySold: val.quantitySold,
        totalRevenue: val.totalRevenue,
        stock: prod?.stock ?? 0,
      });
    });

    // Fallback: If no order items are present yet, show products with sample rank or catalog
    if (result.length === 0 && products.length > 0) {
      return products.slice(0, 5).map((p) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        categoryName: p.category?.name || 'Sản phẩm',
        quantitySold: 0,
        totalRevenue: 0,
        stock: p.stock ?? 0,
      }));
    }

    result.sort((a, b) => (topSortBy === 'quantity' ? b.quantitySold - a.quantitySold : b.totalRevenue - a.totalRevenue));
    return result.slice(0, 8);
  }, [validOrders, productMap, products, topSortBy]);

  // #1 Best Selling Product
  const top1Product = useMemo(() => {
    return topBestSellingProducts.length > 0 ? topBestSellingProducts[0] : null;
  }, [topBestSellingProducts]);

  // Compute Revenue & Orders statistics grouped by TimeMode (Day, Month, Year, Custom)
  const timeStats = useMemo(() => {
    let labels: string[] = [];
    let rangeText = '';
    let revenueBuckets: number[] = [];
    let orderBuckets: number[] = [];

    const now = new Date();

    if (timeMode === 'day') {
      // Last 7 Days breakdown (by exact date: DD/MM)
      labels = [];
      const daysCount = 7;
      const bucketDates: string[] = [];
      for (let i = daysCount - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        const dayStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
        labels.push(dayStr);
        bucketDates.push(d.toDateString());
      }
      rangeText = '7 ngày gần nhất';

      revenueBuckets = new Array(daysCount).fill(0);
      orderBuckets = new Array(daysCount).fill(0);

      validOrders.forEach((o) => {
        const orderDateStr = new Date(o.createdAt).toDateString();
        const idx = bucketDates.indexOf(orderDateStr);
        if (idx >= 0) {
          revenueBuckets[idx] += o.totalAmount || 0;
          orderBuckets[idx] += 1;
        }
      });
    } else if (timeMode === 'month') {
      // 12 Months of current year (Tháng 1 - Tháng 12)
      labels = ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'];
      rangeText = `Năm ${now.getFullYear()} (Theo tháng)`;
      revenueBuckets = new Array(12).fill(0);
      orderBuckets = new Array(12).fill(0);

      validOrders.forEach((o) => {
        const d = new Date(o.createdAt);
        if (d.getFullYear() === now.getFullYear()) {
          const m = d.getMonth(); // 0..11
          revenueBuckets[m] += o.totalAmount || 0;
          orderBuckets[m] += 1;
        }
      });
    } else if (timeMode === 'year') {
      // Last 5 Years
      const currentYear = now.getFullYear();
      labels = [
        (currentYear - 4).toString(),
        (currentYear - 3).toString(),
        (currentYear - 2).toString(),
        (currentYear - 1).toString(),
        currentYear.toString(),
      ];
      rangeText = `Giai đoạn ${currentYear - 4} - ${currentYear}`;
      revenueBuckets = new Array(5).fill(0);
      orderBuckets = new Array(5).fill(0);

      validOrders.forEach((o) => {
        const yr = new Date(o.createdAt).getFullYear();
        const idx = yr - (currentYear - 4);
        if (idx >= 0 && idx < 5) {
          revenueBuckets[idx] += o.totalAmount || 0;
          orderBuckets[idx] += 1;
        }
      });
    } else {
      // Custom Date Range
      labels = ['Đợt 1', 'Đợt 2', 'Đợt 3', 'Đợt 4', 'Đợt 5'];
      rangeText = `Từ ${customStartDate || '01/08/2026'} đến ${customEndDate || '11/08/2026'}`;
      revenueBuckets = new Array(5).fill(0);
      orderBuckets = new Array(5).fill(0);

      const s = customStartDate ? new Date(customStartDate) : new Date(0);
      const e = customEndDate ? new Date(customEndDate) : new Date();
      e.setHours(23, 59, 59, 999);

      const step = (e.getTime() - s.getTime()) / 5;
      validOrders.forEach((o) => {
        const d = new Date(o.createdAt).getTime();
        if (d >= s.getTime() && d <= e.getTime()) {
          const idx = Math.min(4, Math.max(0, Math.floor((d - s.getTime()) / Math.max(step, 1))));
          revenueBuckets[idx] += o.totalAmount || 0;
          orderBuckets[idx] += 1;
        }
      });
    }

    const revenueInMillions = revenueBuckets.map((amt) => Number((amt / 1000000).toFixed(2)));
    const totalRevInPeriod = revenueBuckets.reduce((sum, val) => sum + val, 0);
    const maxRev = Math.max(...revenueInMillions, 1);

    return {
      labels,
      rangeText,
      revenueBuckets,
      revenueInMillions,
      orderBuckets,
      totalRevInPeriod,
      maxRev,
    };
  }, [timeMode, customStartDate, customEndDate, validOrders]);

  // Compute Product Category Revenue & Quantity Breakdown for Chart 2 (Donut Chart)
  const categoryStats = useMemo(() => {
    const catMap = new Map<string, { name: string; revenue: number; quantity: number; count: number }>();

    // Initial setup with fetched categories
    categories.forEach((cat) => {
      catMap.set(cat.name, { name: cat.name, revenue: 0, quantity: 0, count: 0 });
    });

    // Count product catalog distribution
    products.forEach((p) => {
      const cName = p.category?.name || 'Khác';
      const existing = catMap.get(cName) || { name: cName, revenue: 0, quantity: 0, count: 0 };
      existing.count += 1;
      catMap.set(cName, existing);
    });

    // Calculate revenue & quantity from valid order items
    validOrders.forEach((o) => {
      if (o.items && Array.isArray(o.items)) {
        o.items.forEach((item) => {
          const prod = productMap.get(item.productId);
          const cName = prod?.category?.name || 'Linh kiện / Khác';
          const existing = catMap.get(cName) || { name: cName, revenue: 0, quantity: 0, count: 0 };
          existing.revenue += (item.price || 0) * (item.quantity || 1);
          existing.quantity += item.quantity || 1;
          catMap.set(cName, existing);
        });
      }
    });

    const entries = Array.from(catMap.values()).filter((item) => item.count > 0 || item.revenue > 0 || item.quantity > 0);
    entries.sort((a, b) => b.revenue - a.revenue || b.count - a.count);

    const totalRev = entries.reduce((sum, item) => sum + item.revenue, 0) || 1;
    const colors = [
      { stroke: '#2563EB', bg: 'bg-blue-600', text: 'text-blue-600' },
      { stroke: '#6366F1', bg: 'bg-indigo-500', text: 'text-indigo-500' },
      { stroke: '#F59E0B', bg: 'bg-amber-500', text: 'text-amber-500' },
      { stroke: '#10B981', bg: 'bg-emerald-500', text: 'text-emerald-500' },
      { stroke: '#8B5CF6', bg: 'bg-purple-500', text: 'text-purple-500' },
      { stroke: '#EC4899', bg: 'bg-pink-500', text: 'text-pink-500' },
    ];

    let accumPct = 0;
    const itemsWithPct = entries.slice(0, 5).map((item, idx) => {
      const pct = Math.round((item.revenue > 0 ? item.revenue / totalRev : item.count / Math.max(products.length, 1)) * 100);
      const dashOffset = -accumPct;
      accumPct += pct;
      return {
        ...item,
        percentage: pct,
        dashOffset,
        color: colors[idx % colors.length],
      };
    });

    if (entries.length > 5) {
      const otherRev = entries.slice(5).reduce((sum, item) => sum + item.revenue, 0);
      const otherQty = entries.slice(5).reduce((sum, item) => sum + item.quantity, 0);
      const otherCount = entries.slice(5).reduce((sum, item) => sum + item.count, 0);
      const pct = Math.max(0, 100 - accumPct);
      itemsWithPct.push({
        name: 'Danh mục khác',
        revenue: otherRev,
        quantity: otherQty,
        count: otherCount,
        percentage: pct,
        dashOffset: -accumPct,
        color: colors[5],
      });
    }

    return itemsWithPct;
  }, [categories, products, validOrders, productMap]);

  // Low stock products warning (stock <= 5)
  const lowStockProducts = useMemo(() => {
    return products
      .filter((p) => (p.stock ?? 0) <= 5)
      .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
      .slice(0, 5);
  }, [products]);

  // Recent 5 Orders
  const recentOrders = useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);

  const handleApplyCustomDate = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeMode('custom');
    setShowCustomDatePicker(false);
  };

  // Export CSV Report
  const handleExportCSV = () => {
    let csv = '\uFEFF'; // UTF-8 BOM
    csv += 'BAO CAO THONG KE DOANH THU & BAN HANG PCSTORE\n';
    csv += `Thoi gian xuat: ${new Date().toLocaleString('vi-VN')}\n`;
    csv += `Giai doan thong ke: ${timeStats.rangeText}\n\n`;

    csv += 'THONG KE DOANH THU THEO THOI GIAN\n';
    csv += 'Kỳ,Doanh Thu (VND),So Don Hang\n';
    timeStats.labels.forEach((lbl, idx) => {
      csv += `"${lbl}",${timeStats.revenueBuckets[idx]},${timeStats.orderBuckets[idx]}\n`;
    });

    csv += '\nTHONG KE THEO DANH MUC SAN PHAM\n';
    csv += 'Danh Muc,Doanh Thu (VND),So Luong Da Ban,Ty Le (%)\n';
    categoryStats.forEach((cat) => {
      csv += `"${cat.name}",${cat.revenue},${cat.quantity},${cat.percentage}%\n`;
    });

    csv += '\nTOP SAN PHAM BAN CHAY\n';
    csv += 'Ten San Pham,Danh Muc,So Luong Da Ban,Doanh Thu (VND),Ton Kho\n';
    topBestSellingProducts.forEach((p) => {
      csv += `"${p.name}","${p.categoryName}",${p.quantitySold},${p.totalRevenue},${p.stock}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Bao_Cao_PCStore_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-sans pb-8">
      {/* Top Bar: Header & Controls */}
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
            Đang lọc: <span className="font-bold text-gray-800">{timeStats.rangeText}</span>
          </p>
        </div>

        {/* Global Controls & Time Selector */}
        <div className="flex flex-wrap items-center gap-2 relative">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-600 transition-colors disabled:opacity-50 cursor-pointer"
            title="Làm mới dữ liệu từ API"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          <button
            onClick={handleExportCSV}
            className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Xuất báo cáo CSV"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Xuất CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-600 transition-colors cursor-pointer"
            title="In báo cáo"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Time Mode Filter Buttons */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200/80">
            <Filter className="w-3.5 h-3.5 text-gray-400 ml-2 mr-1" />
            {[
              { id: 'day', label: 'Theo Ngày' },
              { id: 'month', label: 'Theo Tháng' },
              { id: 'year', label: 'Theo Năm' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setTimeMode(item.id as TimeMode);
                  setShowCustomDatePicker(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${timeMode === item.id
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-100 font-bold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${timeMode === 'custom'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-gray-700 hover:bg-gray-200/60'
                }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Tùy Chọn</span>
            </button>
          </div>

          {/* Custom Date Picker Popover */}
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
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
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
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomDatePicker(false)}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-xl font-semibold cursor-pointer"
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

      {/* KPI Cards: Total Revenue, Total Orders, Best Seller, Inventory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Tổng Doanh Thu */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tổng Doanh Thu
            </span>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : formatPrice(totalRevenueAmount)}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                Thực tế
              </span>
              <span className="text-gray-400 font-normal">từ {validOrders.length} đơn hoàn tất</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Tổng Đơn Hàng */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tổng Đơn Hàng Hệ Thống
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
                {validOrders.length} đơn
              </span>
              <span className="text-gray-400 font-normal">
                {orders.length - validOrders.length > 0 ? `(${orders.length - validOrders.length} bị hủy)` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* KPI 3: Giá Trị Đơn Trung Bình (AOV) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Giá Trị Đơn Trung Bình
            </span>
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-amber-600" /> : formatPrice(averageOrderValue)}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                {totalItemsSold} sp đã bán
              </span>
              <span className="text-gray-400 font-normal">trên 1 đơn hợp lệ</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Sản Phẩm & Khách Hàng */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Danh Mục & Sản Phẩm
            </span>
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-gray-900 tracking-tight">
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-purple-600" /> : `${products.length} SP / ${categories.length} DM`}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className="flex items-center text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                <Users className="w-3 h-3 mr-1" />
                {totalCustomers} Khách hàng
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 MAIN CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: Biểu đồ Doanh Thu & Đơn Hàng theo Ngày / Tháng / Năm */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[390px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">
                  Biểu Đồ Doanh Thu Theo {timeMode === 'day' ? 'Ngày' : timeMode === 'month' ? 'Tháng' : timeMode === 'year' ? 'Năm' : 'Khoảng Thời Gian'}
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Thống kê chi tiết tính theo <span className="font-semibold text-blue-600">{timeStats.rangeText}</span>
              </p>
            </div>

            {/* Toggle Chart Type & Legend */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 cursor-pointer ${chartType === 'bar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Cột</span>
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 cursor-pointer ${chartType === 'line' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <LineChart className="w-3.5 h-3.5" />
                  <span>Đường</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-blue-600"></span>
                  <span className="text-gray-600">Doanh thu (Triệu ₫)</span>
                </div>
                <div className="flex items-center gap-1.5 hidden sm:flex">
                  <span className="w-3 h-3 rounded-sm bg-amber-400"></span>
                  <span className="text-gray-600">Số đơn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chart Area */}
          {loading ? (
            <div className="h-64 flex items-center justify-center text-xs text-gray-400 space-x-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>Đang tải biểu đồ doanh thu...</span>
            </div>
          ) : (
            <div className="h-64 flex items-end justify-between gap-1 sm:gap-3 pt-8 px-2 border-b border-gray-100 relative">
              {timeStats.revenueInMillions.map((rev, idx) => {
                const heightPercent = timeStats.maxRev > 0 ? Math.max(10, Math.round((rev / timeStats.maxRev) * 100)) : 10;
                const isHovered = hoveredBar === idx;
                const ordersCnt = timeStats.orderBuckets[idx];
                const rawAmt = timeStats.revenueBuckets[idx];

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-16 z-30 bg-gray-900 text-white text-[11px] py-1.5 px-3 rounded-xl shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none">
                        <p className="font-bold text-amber-300">{timeStats.labels[idx]}</p>
                        <p>Doanh thu: <span className="font-semibold text-white">{formatPrice(rawAmt)}</span></p>
                        <p>Số đơn: <span className="font-semibold text-blue-300">{ordersCnt} đơn</span></p>
                      </div>
                    )}

                    {/* Chart Elements (Bar or Line mode) */}
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {chartType === 'bar' ? (
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${isHovered
                            ? 'bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] shadow-md shadow-blue-500/30'
                            : rev > 0
                              ? 'bg-blue-600/90 hover:bg-blue-600'
                              : 'bg-gray-200'
                            }`}
                        ></div>
                      ) : (
                        <div className="w-full flex flex-col items-center justify-end h-full relative">
                          <div
                            style={{ bottom: `${heightPercent}%` }}
                            className={`absolute w-3 h-3 rounded-full border-2 border-white shadow transition-all ${isHovered ? 'bg-amber-400 scale-125 z-10' : 'bg-blue-600'
                              }`}
                          ></div>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-0.5 bg-blue-300/80 rounded-t"
                          ></div>
                        </div>
                      )}

                      <div
                        style={{ height: `${Math.max(8, Math.round((ordersCnt / Math.max(...timeStats.orderBuckets, 1)) * 75))}%` }}
                        className="w-full max-w-[12px] bg-amber-400 hover:bg-amber-500 rounded-t-md transition-all duration-300 hidden sm:block"
                      ></div>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 mt-2 truncate w-full text-center">
                      {timeStats.labels[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-gray-500">
            <span>Đơn vị tính: Triệu VNĐ</span>
            <span className="font-bold text-blue-600">
              Tổng doanh thu kỳ lọc: {formatPrice(timeStats.totalRevInPeriod)}
            </span>
          </div>
        </div>

        {/* CHART 2: Biểu đồ Tròn (Donut Chart) - Thống kê theo Danh Mục Sản Phẩm */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-gray-900">
                  Thống Kê Danh Mục
                </h2>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-full">
                Theo doanh thu
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Cơ cấu đóng góp doanh thu & số lượng theo danh mục
            </p>

            {/* Dynamic Math SVG Donut Chart */}
            <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F3F4F6" strokeWidth="3.8" />
                {categoryStats.map((cat, idx) => (
                  <circle
                    key={idx}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={cat.color.stroke}
                    strokeWidth="3.8"
                    strokeDasharray={`${cat.percentage} ${Math.max(0, 100 - cat.percentage)}`}
                    strokeDashoffset={cat.dashOffset}
                    className="transition-all duration-500 hover:stroke-width-4 cursor-pointer"
                  >
                    <title>{`${cat.name}: ${cat.percentage}% (${formatPrice(cat.revenue)})`}</title>
                  </circle>
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xs font-bold text-gray-400 uppercase">Tổng danh mục</span>
                <span className="text-lg font-black text-gray-900">{categoryStats.length}</span>
              </div>
            </div>

            {/* Category Legend & Breakdown List */}
            <div className="space-y-2.5 mt-4">
              {categoryStats.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1.5 truncate max-w-[160px]">
                      <span className={`w-2.5 h-2.5 rounded-full ${cat.color.bg} shrink-0`}></span>
                      <span className="text-gray-800 truncate" title={cat.name}>{cat.name}</span>
                    </div>
                    <span className="text-gray-900 font-bold">
                      {cat.percentage}% <span className="text-gray-400 font-normal">({cat.quantity} sp)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${cat.percentage}%` }}
                      className={`h-full ${cat.color.bg} rounded-full transition-all duration-500`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TOP BEST-SELLING PRODUCTS & RECENT ORDERS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Sản Phẩm Bán Chạy (Table & Horizontal Bar Chart) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-gray-900">
                  Top Sản Phẩm Bán Chạy Nhất
                </h2>
              </div>
              <p className="text-xs text-gray-500">Xếp hạng sản phẩm có doanh số & doanh thu cao nhất</p>
            </div>

            {/* Sort toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setTopSortBy('quantity')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${topSortBy === 'quantity' ? 'bg-white text-amber-600 font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Số lượng bán
              </button>
              <button
                onClick={() => setTopSortBy('revenue')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${topSortBy === 'revenue' ? 'bg-white text-amber-600 font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Doanh thu
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
                <tr>
                  <th className="px-3 py-3 rounded-l-xl w-12 text-center">Hạng</th>
                  <th className="px-3 py-3">Sản phẩm</th>
                  <th className="px-3 py-3">Danh mục</th>
                  <th className="px-3 py-3 text-center">Đã bán</th>
                  <th className="px-3 py-3 text-right">Tổng doanh thu</th>
                  <th className="px-3 py-3 rounded-r-xl text-center">Tồn kho</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-8 text-center text-gray-400">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto text-amber-600 mb-1" />
                      Đang tải danh sách bán chạy...
                    </td>
                  </tr>
                ) : topBestSellingProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-8 text-center text-gray-400 font-medium">
                      Chưa có dữ liệu bán lẻ.
                    </td>
                  </tr>
                ) : (
                  topBestSellingProducts.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-3 py-3.5 text-center">
                        <span
                          className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs ${idx === 0
                            ? 'bg-amber-400 text-white shadow-sm'
                            : idx === 1
                              ? 'bg-gray-300 text-gray-800'
                              : idx === 2
                                ? 'bg-amber-700/70 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 font-bold text-gray-900 max-w-[220px]">
                        <div className="flex items-center gap-2">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover border border-gray-100 shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 font-bold">
                              PC
                            </div>
                          )}
                          <span className="truncate" title={p.name}>{p.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-gray-600 font-medium">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-[11px]">
                          {p.categoryName}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-center font-bold text-amber-600">
                        {p.quantitySold} sp
                      </td>
                      <td className="px-3 py-3.5 text-right font-bold text-gray-900">
                        {formatPrice(p.totalRevenue)}
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.stock <= 5 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600'
                            }`}
                        >
                          {p.stock} sp
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Warning */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-gray-900">Cảnh Báo Tồn Kho Kho hàng</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Các sản phẩm có tồn kho thấp (từ 5 sản phẩm trở xuống)
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
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-gray-100/70 transition-colors"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-gray-900 truncate" title={p.name}>{p.name}</p>
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

      {/* RECENT ORDERS TABLE */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Đơn Hàng Mới Nhất</h2>
            <p className="text-xs text-gray-500">Danh sách đơn hàng vừa phát sinh trên hệ thống</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả đơn hàng</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
              <tr>
                <th className="px-3 py-3 rounded-l-xl">Mã đơn</th>
                <th className="px-3 py-3">Khách hàng</th>
                <th className="px-3 py-3">Sản phẩm phát sinh</th>
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
                      <td className="px-3 py-3.5 text-gray-600 max-w-[220px] truncate">
                        {firstItem ? (
                          <span>
                            {firstItem.productName}
                            {extraItems > 0 && <span className="text-blue-600 font-semibold ml-1">(+{extraItems} sp khác)</span>}
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
    </div>
  );
};

export default Dashboard;
