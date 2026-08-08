import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/home/Home';
import ProductList from './pages/product/ProductList';
import ProductDetail from './pages/productdetail/ProductDetail';
import Cart from './pages/cart/Cart';
import BuildPc from './pages/build-pc/BuildPc';
import News from './pages/news/News';
import Account from './pages/account/Account';
import Register from './pages/account/Register';
import NotFound from './pages/not-found/NotFound';
import { CartProvider } from './context/CartContext';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* User Storefront Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="category/:categoryId" element={<ProductList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="build-pc" element={<BuildPc />} />
            <Route path="news" element={<News />} />
            <Route path="login" element={<Account />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Portal Layout & Pages */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Dashboard />} />
            <Route path="categories" element={<Products />} />
            <Route path="customers" element={<Dashboard />} />
            <Route path="settings" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
