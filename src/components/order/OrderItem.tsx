import { getImageUrl } from '../../services/api';
import type { OrderItem as OrderItemType } from '../../types/order';

interface OrderItemProps {
  item: OrderItemType;
}

function OrderItem({ item }: OrderItemProps) {
  const imageUrl = item.image ? getImageUrl(item.image) : '';

  return (
    <div className="order-item py-4 px-5 flex items-center gap-5 last:border-0 border-[#e5e7eb] border-dashed border-b-[1px]">
      <div className="w-[64px] h-[64px] rounded-[10px] bg-[#f8f9fa] border border-[#e5e7eb] p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.productName}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="order-item-info flex-1 min-w-0">
        <div className="order-item-name text-sm font-[600] text-[#1a1a2e] mb-1 line-clamp-2">
          {item.productName}
        </div>
        {item.productSku && (
          <div className="text-[#667085] text-xs">SKU: {item.productSku}</div>
        )}
        <div className="order-item-qty text-[#667085] text-sm">
          Số lượng: <strong>{item.quantity}</strong>
        </div>
      </div>
      <div className="order-item-price text-[#e53935] font-[700] text-md whitespace-nowrap">
        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
      </div>
    </div>
  );
}

export default OrderItem;