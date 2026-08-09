import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronLeft, ChevronRight, Loader2, ShoppingBag, LogIn } from 'lucide-react';
import OrderCard from '../../components/order/OrderCard';
import { getMyOrdersApi } from '../../services/orderService';
import type { Order, OrderStatus } from '../../types/order';
import { useAuth } from '../../context/AuthContext';

const STATUS_TABS: { label: string; value: string; status?: OrderStatus }[] = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Chờ xác nhận', value: 'PENDING', status: 'PENDING' },
  { label: 'Đã xác nhận', value: 'CONFIRMED', status: 'CONFIRMED' },
  { label: 'Đang xử lý', value: 'PROCESSING', status: 'PROCESSING' },
  { label: 'Đang giao', value: 'SHIPPING', status: 'SHIPPING' },
  { label: 'Hoàn thành', value: 'DELIVERED', status: 'DELIVERED' },
  { label: 'Đã hủy', value: 'CANCELLED', status: 'CANCELLED' },
];

const LIMIT = 5;

function Order() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (tab: string, currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyOrdersApi({
        page: currentPage,
        limit: LIMIT,
        status: tab === 'ALL' ? undefined : tab,
      });
      setOrders(res.orders);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.totalPages);
    } catch (err: any) {
      setError(err.message || 'Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchOrders(activeTab, page);
    }
  }, [activeTab, page, isAuthenticated, authLoading, fetchOrders]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleOrderCancelled = (orderId: string) => {
    // Re-fetch to get fresh data after cancellation
    fetchOrders(activeTab, page);
  };

  // Loading auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-[#1a75ff]" size={36} />
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="max-w-[1250px] mx-auto px-4 py-16 flex flex-col items-center gap-6">
        <div className="w-[80px] h-[80px] bg-[#e8f0fe] rounded-full flex items-center justify-center">
          <ShoppingBag size={36} className="text-[#1a75ff]" />
        </div>
        <div className="text-center">
          <h2 className="text-[22px] font-[700] text-[#1a1a2e] mb-2">Bạn chưa đăng nhập</h2>
          <p className="text-[#6b7280] text-[15px]">Vui lòng đăng nhập để xem lịch sử đơn hàng của bạn.</p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-[#1a75ff] text-white px-6 py-3 rounded-[10px] font-[600] hover:bg-[#155dcc] transition-colors"
        >
          <LogIn size={18} /> Đăng nhập ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-6 space-y-4">
      {/* Page title */}
      <div className="flex items-center gap-3 mb-2">
        <Package size={22} className="text-[#1a75ff]" />
        <h1 className="text-[20px] font-[700] text-[#1a1a2e]">Đơn hàng của tôi</h1>
        {total > 0 && (
          <span className="bg-[#1a75ff] text-white text-xs font-[700] px-2 py-0.5 rounded-full">
            {total}
          </span>
        )}
      </div>

      {/* Status Tabs */}
      <div className="status-tabs flex flex-wrap bg-white py-[10px] px-[12px] gap-[8px] rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`status-tab-item px-4 py-2 rounded-[8px] text-xs cursor-pointer font-[600] border transition-all ${
              activeTab === tab.value
                ? 'bg-[#1a75ff] text-white border-[#1a75ff]'
                : 'bg-transparent border-[#e5e7eb] text-[#6b7280] hover:border-[#1a75ff] hover:text-[#1a75ff]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#1a75ff]" size={32} />
        </div>
      ) : error ? (
        <div className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-10 text-center">
          <p className="text-[#e53935] font-[600] mb-3">{error}</p>
          <button
            onClick={() => fetchOrders(activeTab, page)}
            className="bg-[#1a75ff] text-white px-5 py-2 rounded-[8px] font-[600] text-sm hover:bg-[#155dcc] transition-colors"
          >
            Thử lại
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-12 text-center flex flex-col items-center gap-4">
          <div className="w-[70px] h-[70px] bg-[#f3f4f6] rounded-full flex items-center justify-center">
            <Package size={30} className="text-[#d1d5db]" />
          </div>
          <div>
            <p className="text-[#1a1a2e] font-[600] text-[16px] mb-1">Chưa có đơn hàng nào</p>
            <p className="text-[#9ca3af] text-sm">
              {activeTab === 'ALL'
                ? 'Bạn chưa có đơn hàng nào. Hãy khám phá sản phẩm ngay!'
                : 'Không có đơn hàng nào ở trạng thái này.'}
            </p>
          </div>
          {activeTab === 'ALL' && (
            <button
              onClick={() => navigate('/products')}
              className="bg-[#1a75ff] text-white px-5 py-2 rounded-[8px] font-[600] text-sm hover:bg-[#155dcc] transition-colors"
            >
              Mua sắm ngay
            </button>
          )}
        </div>
      ) : (
        <>
          <div>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onCancelled={handleOrderCancelled} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-[#e5e7eb] bg-white text-[#374151] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#1a75ff] hover:text-[#1a75ff] transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded-[8px] border text-sm font-[600] transition-colors ${
                    p === page
                      ? 'bg-[#1a75ff] border-[#1a75ff] text-white'
                      : 'border-[#e5e7eb] bg-white text-[#374151] hover:border-[#1a75ff] hover:text-[#1a75ff]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-[#e5e7eb] bg-white text-[#374151] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#1a75ff] hover:text-[#1a75ff] transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Order;