import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_TITLE_MAP: Array<{ path: RegExp; title: string }> = [
  // Admin Routes
  { path: /^\/admin\/login\/?$/, title: 'Đăng Nhập Quản Trị Viên | PC Store Admin' },
  { path: /^\/admin\/?$/, title: 'Dashboard - Báo Cáo Tổng Quan | PC Store Admin' },
  { path: /^\/admin\/products\/create\/?$/, title: 'Thêm Sản Phẩm Mới | PC Store Admin' },
  { path: /^\/admin\/products\/edit\/[^/]+\/?$/, title: 'Chỉnh Sửa Sản Phẩm | PC Store Admin' },
  { path: /^\/admin\/products\/?$/, title: 'Quản Lý Sản Phẩm | PC Store Admin' },
  { path: /^\/admin\/orders\/[^/]+\/?$/, title: 'Chi Tiết Đơn Hàng Admin | PC Store Admin' },
  { path: /^\/admin\/orders\/?$/, title: 'Quản Lý Đơn Hàng | PC Store Admin' },
  { path: /^\/admin\/categories\/?$/, title: 'Quản Lý Danh Mục | PC Store Admin' },
  { path: /^\/admin\/brands\/?$/, title: 'Quản Lý Thương Hiệu | PC Store Admin' },
  { path: /^\/admin\/customers\/?$/, title: 'Quản Lý Người Dùng & Phân Quyền | PC Store Admin' },

  // User Storefront Routes
  { path: /^\/$/, title: 'PC Store - Máy Tính, Linh Kiện & Laptop Chính Hãng' },
  { path: /^\/products\/?$/, title: 'Danh Sách Sản Phẩm | PC Store' },
  { path: /^\/deals\/?$/, title: 'Sản Phẩm Khuyến Mãi & Ưu Đãi | PC Store' },
  { path: /^\/category\/[^/]+\/?$/, title: 'Danh Mục Sản Phẩm | PC Store' },
  { path: /^\/product\/[^/]+\/?$/, title: 'Chi Tiết Sản Phẩm | PC Store' },
  { path: /^\/cart\/?$/, title: 'Giỏ Hàng Của Bạn | PC Store' },
  { path: /^\/build-pc\/?$/, title: 'Xây Dựng Cấu Hình PC (PC Builder) | PC Store' },
  { path: /^\/news\/?$/, title: 'Tin Tức Công Nghệ & Bài Viết | PC Store' },
  { path: /^\/login\/?$/, title: 'Đăng Nhập Tài Khoản | PC Store' },
  { path: /^\/register\/?$/, title: 'Đăng Ký Tài Khoản Mới | PC Store' },
  { path: /^\/account\/?$/, title: 'Hồ Sơ Cá Nhân & Tài Khoản | PC Store' },
  { path: /^\/orders\/?$/, title: 'Lịch Sử Đơn Hàng | PC Store' },
  { path: /^\/order\/[^/]+\/?$/, title: 'Chi Tiết Đơn Hàng | PC Store' },
  { path: /^\/compare\/?$/, title: 'So Sánh Sản Phẩm | PC Store' },
  { path: /^\/vnpay-return\/?$/, title: 'Kết Quả Thanh Toán VNPay | PC Store' },
];

export const PageTitleManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const matched = ROUTE_TITLE_MAP.find((item) => item.path.test(pathname));
    if (matched) {
      document.title = matched.title;
    } else {
      document.title = 'PC Store - Máy Tính, Linh Kiện & Laptop Chính Hãng';
    }
  }, [pathname]);

  return null;
};

export default PageTitleManager;
