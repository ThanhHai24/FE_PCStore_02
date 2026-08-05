import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 flex items-center space-x-2">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <Link to="/category/pc" className="hover:text-blue-600">PC Gaming</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Chi tiết sản phẩm #{id}</span>
      </div>

      <h1>ProductDetail</h1>
    </div>
  );
};

export default ProductDetail;
