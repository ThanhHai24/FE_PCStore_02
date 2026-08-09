import { fetchApi } from './api';

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string | null;
  avatar: string | null;
  role: 'ADMIN' | 'CUSTOMER';
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  ordersCount?: number;
  totalSpent?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: UserAccount[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getUsersApi(params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}): Promise<UsersResponse> {
  const token = localStorage.getItem('token');
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.search) searchParams.append('search', params.search);
  if (params?.role) searchParams.append('role', params.role);
  if (params?.status) searchParams.append('status', params.status);

  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';

  return fetchApi<UsersResponse>(`/api/users${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createUserApi(data: {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: 'ADMIN' | 'CUSTOMER';
  status?: 'ACTIVE' | 'INACTIVE' | 'BANNED';
}): Promise<{ message: string; user: UserAccount }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string; user: UserAccount }>('/api/users', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function updateUserApi(
  id: string,
  data: {
    fullName?: string;
    phone?: string;
    avatar?: string;
    role?: 'ADMIN' | 'CUSTOMER';
    status?: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  }
): Promise<{ message: string; user: UserAccount }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string; user: UserAccount }>(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deleteUserApi(id: string): Promise<{ message: string }> {
  const token = localStorage.getItem('token');
  return fetchApi<{ message: string }>(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
