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

export async function getAdminOrdersApi(params?: {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  search?: string;
}): Promise<{
  orders: Order[];
  pagination?: { total: number; page: number; limit: number; totalPages: number };
}> {
  const token = localStorage.getItem('token');
  const query = new URLSearchParams();
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());
  if (params?.status && params.status !== 'All') query.append('status', params.status);
  if (params?.paymentStatus) query.append('paymentStatus', params.paymentStatus);
  if (params?.search) query.append('search', params.search);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return fetchApi<{
    orders: Order[];
    pagination?: { total: number; page: number; limit: number; totalPages: number };
  }>(`/api/orders${queryString}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateOrderStatusApi(
  id: string,
  status: string
): Promise<{ message: string; order: Order }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string; order: Order }>(`/api/orders/${id}/status`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
}

