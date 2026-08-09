import { fetchApi } from './api';
import type {
  User,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
  AuthResponse,
} from '../types/auth';

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMeApi(): Promise<{ user: User }> {
  return fetchApi<{ user: User }>('/api/auth/me', {
    method: 'GET',
  });
}

export async function updateProfileApi(payload: UpdateProfilePayload): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function changePasswordApi(payload: ChangePasswordPayload): Promise<{ message: string }> {
  return fetchApi<{ message: string }>('/api/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
