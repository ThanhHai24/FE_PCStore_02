import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, mockProducts } from '../../data/mockProducts';
import { getProductDetail, getProducts, mapApiProductToProduct } from '../../services/productService';
import type { Product } from '../../types/product';
import ProductGallery from '../../components/ProductDetail/ProductGallery';
import ProductInfo from '../../components/ProductDetail/ProductInfo';
import RecentlyViewed from '../../components/ProductDetail/RecentlyViewed';
import RelatedProducts from '../../components/ProductDetail/RelatedProducts';
import ProductTabs from '../../components/ProductDetail/ProductTabs';
import ProductReviews from '../../components/ProductDetail/ProductReviews';
import { Loader2 } from 'lucide-react';
import { getRecentlyViewedProducts, addRecentlyViewedProduct } from '../../utils/recentlyViewed';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>(() => getProductById(id));
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (id) {
      // First set fallback from mock if matches mock ID
      const mockObj = getProductById(id);
      setProduct(mockObj);

      // Load initial recently viewed products (excluding current ID)
      const recentList = getRecentlyViewedProducts().filter((p) => String(p.id) !== String(id));
      setRecentlyViewedProducts(recentList);

      getProductDetail(id)
        .then(async (res) => {
          if (!isMounted) return;
          const apiProd = res.product;
          if (apiProd) {
            const mapped = mapApiProductToProduct(apiProd);
            setProduct(mapped);

            // Add current product to recently viewed in localStorage
            addRecentlyViewedProduct(mapped);
            setRecentlyViewedProducts(
              getRecentlyViewedProducts().filter((p) => String(p.id) !== String(mapped.id))
            );

            // Fetch related products from backend
            try {
              const relRes = await getProducts({
                categoryId: apiProd.categoryId ? String(apiProd.categoryId) : undefined,
                limit: 8,
              });

              if (relRes && relRes.products && relRes.products.length > 0) {
                const mappedRel = relRes.products
                  .filter((p) => String(p.id) !== String(apiProd.id))
                  .map(mapApiProductToProduct);
                if (isMounted) setRelatedProducts(mappedRel);
              } else {
                const fallbackRel = mockProducts.filter((p) => String(p.id) !== String(mapped.id));
                if (isMounted) setRelatedProducts(fallbackRel);
              }
            } catch {
              const fallbackRel = mockProducts.filter((p) => String(p.id) !== String(mapped.id));
              if (isMounted) setRelatedProducts(fallbackRel);
            }
          }
        })
        .catch(() => {
          if (!isMounted) return;
          const fallbackRel = mockProducts.filter((p) => String(p.id) !== String(id));
          setRelatedProducts(fallbackRel);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading && !product.title) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-4 sm:py-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center space-x-1.5 flex-wrap">
        <Link to="/" className="hover:text-blue-600 font-medium">Trang chủ</Link>
        <span>&gt;</span>
        <Link to={`/category/${product.category}`} className="hover:text-blue-600 uppercase font-semibold text-gray-700">
          {product.categoryName || 'PC GAMING'}
        </Link>
        <span>&gt;</span>
        <span className="text-gray-800 font-medium truncate max-w-md">{product.title}</span>
      </nav>

      {/* Main Top Grid (Gallery on Left, Info on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
        <div className="lg:col-span-6">
          <ProductGallery images={product.images} title={product.title} />
        </div>
        <div className="lg:col-span-6">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Middle Row (Related & Recently Viewed Products) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RelatedProducts products={relatedProducts} />
        </div>
        <div className="lg:col-span-4">
          <RecentlyViewed products={recentlyViewedProducts} />
        </div>
      </div>

      {/* Bottom Tabs Section (Thông số kỹ thuật / Mô tả sản phẩm) */}
      <div className="pt-2">
        <ProductTabs
          specsTable={product.specsTable}
          descriptionHtml={product.descriptionHtml}
          categoryName={product.categoryName}
        />
      </div>

      {/* Product Reviews Section */}
      <div className="pt-2">
        <ProductReviews product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
