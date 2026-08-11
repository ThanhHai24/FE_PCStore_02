import { fetchApi } from './api';
import type { ProductReviewsResponse, CreateReviewPayload, ReviewItem } from '../types/review';

export async function getReviewsByProductApi(productId: string): Promise<ProductReviewsResponse> {
  const data = await fetchApi<any>(`/api/products/${productId}/reviews`);
  
  const reviews: ReviewItem[] = (data.reviews || []).map((rev: any) => ({
    id: rev.id,
    userId: rev.userId,
    productId: rev.productId,
    userName: rev.userName || 'Khách hàng',
    userAvatar: rev.userAvatar,
    rating: rev.rating,
    title: rev.title,
    comment: rev.comment,
    purchased: !!rev.purchased,
    date: rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('vi-VN') : 'Vừa xong',
    createdAt: rev.createdAt
  }));

  return {
    productId: data.productId,
    summary: data.summary || {
      totalReviews: reviews.length,
      avgRating: reviews.length > 0 ? Number((reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)) : 0,
      starCounts: [5, 4, 3, 2, 1].map((s) => ({
        star: s,
        count: reviews.filter((r) => r.rating === s).length,
        percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === s).length / reviews.length) * 100 : 0
      }))
    },
    reviews
  };
}

export async function createReviewApi(productId: string, payload: CreateReviewPayload) {
  return await fetchApi<{ message: string; review: any }>(`/api/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteReviewApi(reviewId: string) {
  return await fetchApi<{ message: string }>(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
}
