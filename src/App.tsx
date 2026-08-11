import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/home/Home';
import ProductList from './pages/product/ProductList';
import ProductDetail from './pages/productdetail/ProductDetail';
import Cart from './pages/cart/Cart';
import BuildPc from './pages/build-pc/BuildPc';
import News from './pages/news/News';
import Account from './pages/account/Account';
import ProductCompare from './pages/compare/ProductCompare';
import PaymentResult from './pages/cart/PaymentResult';
import Register from './pages/account/Register';
import NotFound from './pages/not-found/NotFound';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import EditProduct from './pages/admin/EditProduct';
import Categories from './pages/admin/Categories';
import Brands from './pages/admin/Brands';
import Orders from './pages/admin/Orders';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';
import Customers from './pages/admin/Customers';
import Order from './pages/order/Order';
import OrderDetail from './pages/order/OrderDetail';
import ProductCreate from './pages/admin/ProductCreate';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* User Storefront Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="category/:categoryId" element={<ProductList />} />
              <Route path="products" element={<ProductList />} />
              <Route path="deals" element={<ProductList />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="vnpay-return" element={<PaymentResult />} />
              <Route path="cart" element={<Cart />} />
              <Route path="build-pc" element={<BuildPc />} />
              <Route path="news" element={<News />} />
              <Route path="login" element={<Account />} />
              <Route path="register" element={<Register />} />
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<Order />} />
              <Route path="order/:id" element={<OrderDetail />} />
              <Route path="compare" element={<ProductCompare />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Portal Layout & Pages */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<ProductCreate />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="categories" element={<Categories />} />
              <Route path="brands" element={<Brands />} />
              <Route path="customers" element={<Customers />} />
              <Route path="settings" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}


export default App;
