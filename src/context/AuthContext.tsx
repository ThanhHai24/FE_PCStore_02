import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  User,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from '../types/auth';
import {
  loginApi,
  registerApi,
  getMeApi,
  updateProfileApi,
  changePasswordApi,
} from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  updateProfile: (payload: UpdateProfilePayload) => Promise<User>;
  changePassword: (payload: ChangePasswordPayload) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const res = await getMeApi();
          setUser(res.user);
          setToken(savedToken);
        } catch (error) {
          console.error('Failed to authenticate session token:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (payload: LoginPayload): Promise<User> => {
    const res = await loginApi(payload);
    if (res.token && res.user) {
      localStorage.setItem('token', res.token);
      setToken(res.token);
      setUser(res.user);
      return res.user;
    } else {
      throw new Error(res.message || 'Đăng nhập không thành công');
    }
  };

  const register = async (payload: RegisterPayload) => {
    const res = await registerApi(payload);
    if (res.token && res.user) {
      localStorage.setItem('token', res.token);
      setToken(res.token);
      setUser(res.user);
    } else {
      throw new Error(res.message || 'Đăng ký không thành công');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
    const res = await updateProfileApi(payload);
    if (res.user) {
      setUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Cập nhật thông tin thất bại');
  };

  const changePassword = async (payload: ChangePasswordPayload): Promise<void> => {
    await changePasswordApi(payload);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
