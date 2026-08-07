import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/home/Home';
import ProductList from './pages/product/ProductList';
import ProductDetail from './pages/productdetail/ProductDetail';
import Cart from './pages/cart/Cart';
import BuildPc from './pages/build-pc/BuildPc';
import News from './pages/news/News';
import Account from './pages/account/Account';
import NotFound from './pages/not-found/NotFound';
import Register from './pages/account/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;