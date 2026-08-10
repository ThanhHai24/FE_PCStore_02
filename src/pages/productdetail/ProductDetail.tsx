import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, mockProducts } from '../../data/mockProducts';
import { getProductDetail, formatPrice, calculateDiscount } from '../../services/productService';
import { getImageUrl } from '../../services/api';
import type { Product, SpecItem } from '../../types/product';
import ProductGallery from '../../components/ProductDetail/ProductGallery';
import ProductInfo from '../../components/ProductDetail/ProductInfo';
import RecentlyViewed from '../../components/ProductDetail/RecentlyViewed';
import RelatedProducts from '../../components/ProductDetail/RelatedProducts';
import ProductTabs from '../../components/ProductDetail/ProductTabs';
import ProductReviews from '../../components/ProductDetail/ProductReviews';
import { Loader2 } from 'lucide-react';

export function parseSpecsToTable(specifications: any): SpecItem[] {
  if (!specifications) return [];

  if (Array.isArray(specifications)) {
    return specifications.map((item) => {
      const key = item.key || item.name || '';
      const rawVal = item.value || item.name || '';
      return parseSingleSpecItem(key, rawVal);
    });
  }

  if (typeof specifications === 'object') {
    const result: SpecItem[] = [];
    for (const [key, rawVal] of Object.entries(specifications)) {
      if (key === 'importPrice') continue;
      result.push(parseSingleSpecItem(key, rawVal));
    }
    return result;
  }

  return [];
}

function parseSingleSpecItem(key: string, rawVal: any): SpecItem {
  let name = '';
  let productId: string | undefined = undefined;
  let warranty = 'Chính hãng';

  if (typeof rawVal === 'object' && rawVal !== null) {
    name = rawVal.name || rawVal.title || JSON.stringify(rawVal);
    productId = rawVal.id || rawVal.productId || undefined;
    if (rawVal.warranty) warranty = String(rawVal.warranty);
  } else if (typeof rawVal === 'string') {
    if (rawVal.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(rawVal);
        name = parsed.name || parsed.title || rawVal;
        productId = parsed.id || parsed.productId || undefined;
        if (parsed.warranty) warranty = String(parsed.warranty);
      } catch {
        name = rawVal;
      }
    } else if (rawVal.includes('||')) {
      const parts = rawVal.split('||');
      name = parts[0];
      productId = parts[1] || undefined;
      if (parts[2]) warranty = parts[2];
    } else {
      name = rawVal;
    }
  } else {
    name = String(rawVal ?? '');
  }

  return {
    key: key.toUpperCase(),
    name,
    warranty,
    productId,
  };
}

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>(() => getProductById(id));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (id) {
      // First set fallback from mock if matches mock ID
      const mockObj = getProductById(id);
      setProduct(mockObj);

      getProductDetail(id)
        .then((res) => {
          if (!isMounted) return;
          const apiProd = res.product;
          if (apiProd) {
            const mapped: Product = {
              id: apiProd.id,
              title: apiProd.name,
              images: apiProd.images && apiProd.images.length > 0
                ? apiProd.images.map((img) => getImageUrl(img))
                : [getImageUrl(apiProd.image)],
              price: formatPrice(apiProd.price),
              numericPrice: apiProd.price || 0,
              marketPrice: apiProd.originalPrice ? formatPrice(apiProd.originalPrice) : undefined,
              discountPercent: calculateDiscount(apiProd.price, apiProd.originalPrice),
              badge: apiProd.isFeatured ? 'HOT' : undefined,
              inStock: (apiProd.stock ?? 0) > 0,
              warrantyInfo: apiProd.warranty ? `Bảo hành ${apiProd.warranty} tháng` : 'Bảo hành chính hãng',
              rating: 5.0,
              reviewCount: 12,
              viewCount: apiProd.viewCount || 100,
              commentCount: 4,
              purchaseCount: 10,
              category: apiProd.category?.slug || 'pc-gaming',
              categoryName: apiProd.category?.name || 'PC GAMING',
              brand: apiProd.brand?.name || '',
              promotions: [
                'Quý khách có thể tùy chọn nâng cấp lên hoặc xuống cấu hình tương đương với: CPU, RAM, SSD theo nhu cầu.',
                'Miễn phí giao hàng toàn quốc.',
                'Tặng Voucher giảm giá 500.000đ cho lần mua tiếp theo.',
              ],
              specsTable: parseSpecsToTable(apiProd.specifications),
              descriptionHtml: apiProd.description || `<p>${apiProd.shortDescription || ''}</p>`,
            };
            setProduct(mapped);
          }
        })
        .catch(() => {
          if (!isMounted) return;
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

  const relatedProducts = mockProducts.filter((p) => p.id !== product.id);
  const recentlyViewedProducts = [product, ...relatedProducts.slice(0, 2)];

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

      {/* Middle Row */}
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
        <ProductTabs specsTable={product.specsTable} descriptionHtml={product.descriptionHtml} />
      </div>

      {/* Product Reviews Section */}
      <div className="pt-2">
        <ProductReviews product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;

