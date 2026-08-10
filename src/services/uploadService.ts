import { fetchApi } from './api';

/**
 * Upload a single product cover image.
 * Returns the server URL of the saved file.
 */
export async function uploadProductCoverImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const BASE_URL = import.meta.env.VITE_API_URL ?? '';
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/api/upload/product-image`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });

    if (!response.ok) {
        const text = await response.text();
        let msg = `Upload thất bại (${response.status})`;
        try {
            const parsed = JSON.parse(text);
            if (parsed.message) msg = parsed.message;
        } catch { /* ignore */ }
        throw new Error(msg);
    }

    const data = await response.json();
    return data.url as string; // e.g. /uploads/products/<uuid>.jpg
}

/**
 * Upload multiple product gallery images.
 * Returns an array of server URLs.
 */
export async function uploadProductGalleryImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach((f) => formData.append('images', f));

    const BASE_URL = import.meta.env.VITE_API_URL ?? '';
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/api/upload/product-images`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });

    if (!response.ok) {
        const text = await response.text();
        let msg = `Upload thất bại (${response.status})`;
        try {
            const parsed = JSON.parse(text);
            if (parsed.message) msg = parsed.message;
        } catch { /* ignore */ }
        throw new Error(msg);
    }

    const data = await response.json();
    return data.urls as string[];
}

/**
 * Create a new product via API.
 */
export async function createProductApi(payload: {
    name: string;
    sku: string;
    categoryId: string;
    brandId: string;           // bắt buộc
    shortDescription?: string;
    description?: string;
    price: number;
    originalPrice?: number;
    importPrice?: number;
    stock: number;
    image?: string;
    images?: string[];
    specifications?: Record<string, string | number>;
    warranty?: number;
    status?: string;
    isFeatured?: boolean;
}): Promise<{ message: string; product: Record<string, unknown> }> {
    return fetchApi('/api/products', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

/**
 * Update an existing product via API.
 */
export async function updateProductApi(
    id: string | number,
    payload: Record<string, unknown>
): Promise<{ message: string; product: Record<string, unknown> }> {
    return fetchApi(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}


