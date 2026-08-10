import { fetchApi } from './api';
import type { Order, OrderListResponse } from '../types/order';

export async function getMyOrdersApi(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<OrderListResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());
  if (params?.status && params.status !== 'ALL') query.append('status', params.status);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return fetchApi<OrderListResponse>(`/api/orders/my-orders${queryString}`, {
    method: 'GET',
  });
}

export async function getOrderDetailApi(idOrCode: string, phone?: string): Promise<{ order: Order }> {
  const query = phone ? `?phone=${encodeURIComponent(phone.trim())}` : '';
  return fetchApi<{ order: Order }>(`/api/orders/${encodeURIComponent(idOrCode.trim())}${query}`, {
    method: 'GET',
  });
}

export async function cancelOrderApi(id: string, reason?: string): Promise<{ message: string; order: Order }> {
  return fetchApi<{ message: string; order: Order }>(`/api/orders/${id}/cancel`, {
    method: 'PUT',
    body: JSON.stringify({ reason }),
  });
}

export interface CreateOrderItemPayload {
  productId: string | number;
  quantity: number;
}

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  paymentMethod?: 'COD' | 'VNPAY' | 'MOMO' | 'STRIPE' | 'MOCK';
  notes?: string;
  couponCode?: string;
  shippingFee?: number;
  items?: CreateOrderItemPayload[];
}

export async function createOrderApi(payload: CreateOrderPayload): Promise<{ message: string; order: Order }> {
  return fetchApi<{ message: string; order: Order }>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
