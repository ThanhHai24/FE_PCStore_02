import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, mockProducts } from '../../data/mockProducts';
import ProductGallery from '../../components/ProductDetail/ProductGallery';
import ProductInfo from '../../components/ProductDetail/ProductInfo';
import RecentlyViewed from '../../components/ProductDetail/RecentlyViewed';
import RelatedProducts from '../../components/ProductDetail/RelatedProducts';
import ProductTabs from '../../components/ProductDetail/ProductTabs';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);

  // Other mock products for related & recently viewed
  const relatedProducts = mockProducts.filter((p) => p.id !== product.id);
  const recentlyViewedProducts = [product, ...relatedProducts.slice(0, 2)];

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-4 sm:py-6 space-y-6">
      {/* Breadcrumb matching Screenshot 1 */}
      <nav className="text-xs text-gray-500 flex items-center space-x-1.5 flex-wrap">
        <Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link>
        <span>&gt;</span>
        <Link to="/category/pc-gaming" className="hover:text-blue-600 uppercase font-semibold text-gray-700">
          {product.categoryName || 'PC GAMING'}
        </Link>
        <span>&gt;</span>
        <span className="text-gray-800 font-medium truncate max-w-md">{product.title}</span>
      </nav>

      {/* Main Top Grid (Gallery on Left, Info on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
        {/* Left Gallery Column */}
        <div className="lg:col-span-6">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Right Product Info Column */}
        <div className="lg:col-span-6">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Middle Row (Related Products on Left, Recently Viewed on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Related Products Grid */}
        <div className="lg:col-span-8">
          <RelatedProducts products={relatedProducts} />
        </div>

        {/* Recently Viewed Side Box */}
        <div className="lg:col-span-4">
          <RecentlyViewed products={recentlyViewedProducts} />
        </div>
      </div>

      {/* Bottom Tabs Section (Thông số kỹ thuật / Mô tả sản phẩm) */}
      <div className="pt-2">
        <ProductTabs specsTable={product.specsTable} descriptionHtml={product.descriptionHtml} />
      </div>
    </div>
  );
};

export default ProductDetail;
