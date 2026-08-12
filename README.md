# 🛒 PC Store Frontend Web Application

Giao diện ứng dụng thương mại điện tử **PC Store** - Hệ thống bán lẻ máy tính, linh kiện PC và công cụ tự xây dựng cấu hình máy tính cá nhân hóa. Được xây dựng trên nền tảng **React 19**, **TypeScript**, **Vite**, và **Tailwind CSS v4**.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Core Framework & Library:** React 19, TypeScript
- **Build Tool & Bundler:** Vite (v8)
- **Styling:** Tailwind CSS (v4)
- **UI Components & Icons:** Lucide React, Swiper (Carousel/Slider)
- **WYSIWYG Editor:** CKEditor 5 React (Soạn thảo mô tả sản phẩm cho Admin)
- **Routing:** React Router DOM (v7)
- **State Management:** React Context API (`AuthContext`, `CartContext`)

---

## 🌟 Tính năng nổi bật (Key Features)

### 🏬 1. Khách Hàng (Customer Storefront)
- **Trang chủ (Home):**
  - Banner quảng cáo hiệu ứng mượt mà (Swiper).
  - Danh mục sản phẩm nổi bật, ưu đãi hot, sản phẩm bán chạy.
- **Danh sách sản phẩm (Product Catalog):**
  - Phân trang, tìm kiếm theo từ khóa.
  - Lọc đa điều kiện: Theo danh mục, thương hiệu, khoảng giá, sắp xếp theo giá/tên.
- **Chi tiết sản phẩm (Product Detail):**
  - Xem ảnh phóng to, lựa chọn biến thể.
  - Thông số kỹ thuật chi tiết.
  - Đánh giá sản phẩm & Hỏi đáp (Q&A).
- **Công cụ Build PC (Tự cấu hình máy tính):**
  - Chọn linh kiện chuẩn theo từng hạng mục (CPU, Mainboard, RAM, VGA, SSD/HDD, PSU, Case, Tản nhiệt,...).
  - Tính tổng chi phí tự động và chuyển trực tiếp dàn PC vào giỏ hàng.
- **So sánh sản phẩm (Product Compare):**
  - Đặt lên bàn cân thông số kỹ thuật và giá cả của các linh kiện khác nhau.
- **Giỏ hàng & Thanh toán (Cart & Checkout):**
  - Quản lý số lượng, mã giảm giá.
  - Hỗ trợ thanh toán COD (Thanh toán khi nhận hàng) và thanh toán trực tuyến qua **VNPay Sandbox**.
- **Quản lý tài khoản (Account & Order Tracking):**
  - Xem lịch sử đơn hàng, chi tiết từng đơn và trạng thái giao hàng.

### 🛡️ 2. Trình Quản Trị (Admin Portal)
- **Dashboard:** Thống kê tổng quan doanh thu, số lượng đơn hàng, sản phẩm và khách hàng.
- **Quản lý sản phẩm (Products Management):**
  - Danh sách sản phẩm, thêm mới / chỉnh sửa / xóa sản phẩm.
  - Trình soạn thảo mô tả phong phú với **CKEditor 5**.
- **Quản lý danh mục & thương hiệu (Categories & Brands):** Thêm/sửa danh mục, thương hiệu sản phẩm.
- **Quản lý đơn hàng (Orders Management):** Cập nhật trạng thái xử lý, vận chuyển, hủy hoặc xác nhận thanh toán.
- **Quản lý khách hàng (Customers Management):** Danh sách người dùng hệ thống.

---

## 📁 Cấu trúc thư mục (Directory Structure)

```text
FE_PCStore_02/
├── public/                 # File tĩnh (Favicon, logo, static assets)
├── src/
│   ├── assets/             # Hình ảnh, font chữ, icons tĩnh
│   ├── components/         # Standard UI components & layout elements
│   ├── config/             # Cấu hình dự án & hằng số
│   ├── context/            # Global React Contexts (AuthContext, CartContext)
│   ├── data/               # Dữ liệu tĩnh hoặc mock data fallback
│   ├── layouts/            # MainLayout (Storefront) & AdminLayout
│   ├── pages/              # Các trang chính (Home, Product, Cart, Build PC, Admin,...)
│   ├── services/           # Tầng gọi API kết nối Backend (Fetch API wrappers)
│   ├── types/              # TypeScript Interfaces & Types
│   ├── utils/              # Helper functions (Formatting currency, date, validation)
│   ├── App.tsx             # Định tuyến App (React Router) & Context Providers
│   └── main.tsx            # React Root Rendering
├── .env.example            # Mẫu biến môi trường Frontend
├── package.json
└── vite.config.ts
```

---

## ⚙️ Hướng dẫn cài đặt & Khởi chạy (Installation & Setup)

### Yêu cầu hệ thống:
- **Node.js**: `>= 18.x`
- **npm**: `>= 9.x`
- **Backend API**: Server Backend `BE_PCStore_02` đang chạy.

### Bước 1: Install Dependencies
```bash
npm install
```

### Bước 2: Cấu hình biến môi trường
Tạo file `.env` từ file `.env.example`:
```bash
cp .env.example .env
```
*Nội dung file `.env`:*
```env
VITE_API_URL="http://localhost:3000"
```

### Bước 3: Khởi chạy ứng dụng

- **Môi trường Development:**
  ```bash
  npm run dev
  ```
  *Ứng dụng sẽ chạy tại:* `http://localhost:4000`

- **Build cho Production:**
  ```bash
  npm run build
  ```
  *Xem thử bản build Production:*
  ```bash
  npm run preview
  ```

---

## 📜 Danh sách Scripts (`package.json`)

| Command | Description |
| :--- | :--- |
| `npm run dev` | Khởi chạy Vite Dev Server tại cổng 4000 (HMR) |
| `npm run build` | Biên dịch TypeScript & đóng gói ứng dụng qua Vite cho Production (`dist/`) |
| `npm run lint` | Kiểm tra lỗi cú pháp và chuẩn code với ESLint |
| `npm run preview` | Khởi chạy server local preview bản build Production |

---

## 🔗 Tài liệu liên quan

- API Endpoints Specification: **[API_DOCS.md](file:///e:/FEE/FE_PCStore_02/API_DOCS.md)**
