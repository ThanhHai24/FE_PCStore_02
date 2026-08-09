import { fetchApi, getImageUrl } from './api';
import type {
  ApiProduct,
  ApiProductsResponse,
  ApiCategoriesResponse,
  ApiCategory,
  ApiBrand,
  ProductQueryParams,
} from '../types/apiProduct';
import type { ProductCardProps } from '../components/BoxProductCategory/ProductCard';
import type { DealProductCardProps } from '../components/DealProduct/DealProductCard';

export function formatPrice(amount?: number | null): string {
  if (amount == null || isNaN(amount)) return '0đ';
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

export function calculateDiscount(price: number, originalPrice?: number | null): string | undefined {
  if (!originalPrice || originalPrice <= price) return undefined;
  const percent = Math.round(((originalPrice - price) / originalPrice) * 100);
  return `-${percent}%`;
}

export function formatProductToCardProps(product: ApiProduct): ProductCardProps {
  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  return {
    id: product.id,
    title: product.name,
    image: getImageUrl(product.image),
    price: formatPrice(product.price),
    marketPrice: product.originalPrice ? formatPrice(product.originalPrice) : undefined,
    discountPercent,
    badge: product.isFeatured ? 'HOT' : undefined,
    inStock: (product.stock ?? 1) > 0,
    promotion: product.shortDescription || (product.category ? `Danh mục: ${product.category.name}` : undefined),
    link: `/product/${product.id}`,
  };
}

export function formatProductToDealCardProps(product: ApiProduct): DealProductCardProps {
  const discountPercent = calculateDiscount(product.price, product.originalPrice) || '-15%';
  const stock = product.stock ?? 10;
  const sold = Math.max(1, Math.min(stock, Math.floor(stock * 0.4) || 3));

  return {
    id: product.id,
    title: product.name,
    image: getImageUrl(product.image),
    price: formatPrice(product.price),
    marketPrice: product.originalPrice ? formatPrice(product.originalPrice) : formatPrice(Math.round(product.price * 1.2)),
    discountPercent,
    sold,
    total: stock + sold,
    link: `/product/${product.id}`,
  };
}

export async function getProducts(params?: ProductQueryParams): Promise<ApiProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params) {
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.q) searchParams.append('q', params.q);
    if (params.categoryId) searchParams.append('categoryId', params.categoryId);
    if (params.brandId) searchParams.append('brandId', params.brandId);
    if (params.minPrice) searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params.status) searchParams.append('status', params.status);
    if (params.isFeatured !== undefined) searchParams.append('isFeatured', params.isFeatured.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
  }

  const queryStr = searchParams.toString();
  const endpoint = `/api/products${queryStr ? `?${queryStr}` : ''}`;
  return fetchApi<ApiProductsResponse>(endpoint);
}

export async function getFeaturedProducts(limit = 10): Promise<{ products: ApiProduct[] }> {
  return fetchApi<{ products: ApiProduct[] }>(`/api/products/featured?limit=${limit}`);
}

export async function getCategories(tree = false): Promise<ApiCategoriesResponse> {
  return fetchApi<ApiCategoriesResponse>(`/api/categories${tree ? '?tree=true' : ''}`);
}

export async function getCategoryDetail(idOrSlug: string): Promise<{ category: ApiCategory }> {
  return fetchApi<{ category: ApiCategory }>(`/api/categories/${idOrSlug}`);
}

export async function getBrandsByCategory(idOrSlug: string): Promise<{ category: ApiCategory; brands: ApiBrand[] }> {
  return fetchApi<{ category: ApiCategory; brands: ApiBrand[] }>(`/api/categories/${idOrSlug}/brands`);
}

export async function getProductDetail(idOrSlug: string): Promise<{ product: ApiProduct }> {
  return fetchApi<{ product: ApiProduct }>(`/api/products/${idOrSlug}`);
}
