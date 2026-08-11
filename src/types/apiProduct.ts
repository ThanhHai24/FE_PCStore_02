export interface ApiBrand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string | null;
  productsCount?: number;
  categoryIds?: string[];
  categories?: ApiCategory[];
}


export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  children?: ApiCategory[];
}

export interface SpecificationItem {
  key: string;
  value: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string;
  description?: string;
  price: number;
  originalPrice?: number | null;
  stock: number;
  image?: string;
  images?: string[];
  specifications?: SpecificationItem[] | Record<string, string>;
  warranty?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  isFeatured?: boolean;
  viewCount?: number;
  soldCount?: number;
  categoryId?: string;
  brandId?: string;
  category?: ApiCategory;
  brand?: ApiBrand;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiProductsResponse {
  products: ApiProduct[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiCategoriesResponse {
  categories: ApiCategory[];
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  q?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  isFeatured?: boolean;
  sortBy?: 'createdAt' | 'price' | 'viewCount' | 'name';
  sortOrder?: 'asc' | 'desc';
}
