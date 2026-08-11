export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  productSku?: string | null;
  specifications?: any;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  method: string;
  paymentMethodId?: string | null;
  amount: number;
  status: PaymentStatus;
  transactionCode?: string | null;
  paymentUrl?: string | null;
  paidAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  notes?: string | null;
  changedById?: string | null;
  changedByName?: string | null;
  createdAt: string;
}

export interface Order {
  id: string;
  code: string;
  userId?: string | null;
  customerName: string;
  customerEmail?: string | null;
  customerPhone: string;
  shippingAddress: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  notes?: string | null;
  couponCode?: string | null;
  items?: OrderItem[];
  payment?: Payment | null;
  statusHistories?: OrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderListResponse {
  orders: Order[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
  PENDING: { label: 'Chờ xác nhận', color: 'text-amber-700', bgColor: 'bg-amber-50 border-amber-200' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  PROCESSING: { label: 'Đang đóng gói', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200' },
  SHIPPING: { label: 'Đang giao hàng', color: 'text-indigo-700', bgColor: 'bg-indigo-50 border-indigo-200' },
  SHIPPED: { label: 'Đã vận chuyển', color: 'text-indigo-700', bgColor: 'bg-indigo-50 border-indigo-200' },
  DELIVERED: { label: 'Đã giao hàng', color: 'text-emerald-700', bgColor: 'bg-emerald-50 border-emerald-200' },
  CANCELLED: { label: 'Đã hủy', color: 'text-red-700', bgColor: 'bg-red-50 border-red-200' },
};
