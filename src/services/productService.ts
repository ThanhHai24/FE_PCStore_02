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
import type { Product, SpecItem } from '../types/product';

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
    marketPrice: (product.originalPrice && product.originalPrice > product.price) ? formatPrice(product.originalPrice) : undefined,
    discountPercent,
    badge: product.isFeatured ? 'HOT' : undefined,
    inStock: (product.stock ?? 1) > 0,
    promotion: product.shortDescription || (product.category ? `Danh mục: ${product.category.name}` : undefined),
    link: `/product/${product.id}`,
  };
}

export function formatProductToDealCardProps(product: ApiProduct): DealProductCardProps {
  const discountPercent = calculateDiscount(product.price, product.originalPrice);
  const stock = product.stock ?? 10;
  const sold = Math.max(1, Math.min(stock, Math.floor(stock * 0.4) || 3));

  return {
    id: product.id,
    title: product.name,
    image: getImageUrl(product.image),
    price: formatPrice(product.price),
    marketPrice: (product.originalPrice && product.originalPrice > product.price) ? formatPrice(product.originalPrice) : undefined,
    discountPercent,
    sold,
    total: stock + sold,
    link: `/product/${product.id}`,
  };
}

export function parseSingleSpecItem(key: string, rawVal: unknown): SpecItem {
  let name: string;
  let productId: string | undefined = undefined;
  let warranty = 'Chính hãng';

  if (typeof rawVal === 'object' && rawVal !== null) {
    const obj = rawVal as Record<string, unknown>;
    name = String(obj.name || obj.title || JSON.stringify(obj));
    productId = obj.id ? String(obj.id) : obj.productId ? String(obj.productId) : undefined;
    if (obj.warranty) warranty = String(obj.warranty);
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

export function parseSpecsToTable(specifications: unknown): SpecItem[] {
  if (!specifications) return [];

  if (Array.isArray(specifications)) {
    return specifications.map((item) => {
      const key = item?.key || item?.name || '';
      const rawVal = item?.value || item?.name || '';
      return parseSingleSpecItem(key, rawVal);
    });
  }

  if (typeof specifications === 'object' && specifications !== null) {
    const result: SpecItem[] = [];
    for (const [key, rawVal] of Object.entries(specifications)) {
      if (key === 'importPrice') continue;
      result.push(parseSingleSpecItem(key, rawVal));
    }
    return result;
  }

  return [];
}

export function mapApiProductToProduct(apiProd: ApiProduct): Product {
  return {
    id: apiProd.id,
    title: apiProd.name,
    images: apiProd.images && apiProd.images.length > 0
      ? apiProd.images.map((img) => getImageUrl(img))
      : [getImageUrl(apiProd.image)],
    price: formatPrice(apiProd.price),
    numericPrice: apiProd.price || 0,
    marketPrice: apiProd.originalPrice && apiProd.originalPrice > apiProd.price ? formatPrice(apiProd.originalPrice) : undefined,
    discountPercent: calculateDiscount(apiProd.price, apiProd.originalPrice),
    badge: apiProd.isFeatured ? 'HOT' : undefined,
    inStock: (apiProd.stock ?? 0) > 0,
    stockQuantity: apiProd.stock ?? 0,
    warrantyInfo: apiProd.warranty ? `Bảo hành ${apiProd.warranty} tháng` : 'Bảo hành chính hãng',
    rating: (apiProd as any).rating || 0,
    reviewCount: (apiProd as any).reviewCount || 0,
    viewCount: apiProd.viewCount || 0,
    commentCount: 0,
    purchaseCount: 0,
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

export async function getCategories(
  paramsOrTree?: boolean | { tree?: boolean; search?: string; parentId?: string }
): Promise<ApiCategoriesResponse> {
  const query = new URLSearchParams();
  if (typeof paramsOrTree === 'boolean') {
    if (paramsOrTree) query.append('tree', 'true');
  } else if (paramsOrTree) {
    if (paramsOrTree.tree) query.append('tree', 'true');
    if (paramsOrTree.search) query.append('search', paramsOrTree.search);
    if (paramsOrTree.parentId) query.append('parentId', paramsOrTree.parentId);
  }
  const queryString = query.toString() ? `?${query.toString()}` : '';
  return fetchApi<ApiCategoriesResponse>(`/api/categories${queryString}`);
}


export async function getCategoryDetail(idOrSlug: string): Promise<{ category: ApiCategory }> {
  return fetchApi<{ category: ApiCategory }>(`/api/categories/${idOrSlug}`);
}

export async function getBrandsByCategory(idOrSlug: string): Promise<{ category: ApiCategory; brands: ApiBrand[] }> {
  return fetchApi<{ category: ApiCategory; brands: ApiBrand[] }>(`/api/categories/${idOrSlug}/brands`);
}

export async function getBrands(search?: string): Promise<{ brands: ApiBrand[] }> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return fetchApi<{ brands: ApiBrand[] }>(`/api/brands${query}`);
}

export async function createBrandApi(data: {
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  categoryIds?: string[];
}): Promise<{ message: string; brand: ApiBrand }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string; brand: ApiBrand }>('/api/brands', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function updateBrandApi(
  id: string | number,
  data: { name?: string; slug?: string; description?: string; logo?: string; categoryIds?: string[] }
): Promise<{ message: string; brand: ApiBrand }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string; brand: ApiBrand }>(`/api/brands/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function deleteBrandApi(id: string | number): Promise<{ message: string }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string }>(`/api/brands/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}


export async function getProductDetail(idOrSlug: string): Promise<{ product: ApiProduct }> {
  return fetchApi<{ product: ApiProduct }>(`/api/products/${idOrSlug}`);
}

export async function createProduct(data: any): Promise<{ message: string; product: ApiProduct }> {
  return fetchApi<{ message: string; product: ApiProduct }>('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: string | number, data: any): Promise<{ message: string; product: ApiProduct }> {
  return fetchApi<{ message: string; product: ApiProduct }>(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string | number): Promise<{ message: string }> {
  return fetchApi<{ message: string }>(`/api/products/${id}`, {
    method: 'DELETE',
  });
}

export async function createCategoryApi(data: {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string | null;
}): Promise<{ message: string; category: ApiCategory }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string; category: ApiCategory }>('/api/categories', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function updateCategoryApi(
  id: string | number,
  data: { name?: string; slug?: string; description?: string; parentId?: string | null }
): Promise<{ message: string; category: ApiCategory }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string; category: ApiCategory }>(`/api/categories/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}


export async function deleteCategoryApi(id: string | number): Promise<{ message: string }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string }>(`/api/categories/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}


