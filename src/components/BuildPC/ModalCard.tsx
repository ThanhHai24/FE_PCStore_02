import { ChevronRight } from "lucide-react"
import pcImg from "../../assets/images/products/pc.jpg"
import khungSaleCpu from "../../assets/images/khung-sale-cpu.png"
import type { BuilderProduct } from "../../data/builderProducts"

interface ModalCardProps {
    product?: BuilderProduct
    image?: string
    saleFrame?: string
    title?: string
    warranty?: string
    stockStatus?: string
    productCode?: string
    price?: string
    marketPrice?: string
    discountPercent?: string
    onSelect?: () => void
}

function ModalCard({
    product,
    image,
    saleFrame,
    title,
    warranty,
    stockStatus,
    productCode,
    price,
    marketPrice,
    discountPercent,
    onSelect
}: ModalCardProps) {
    const displayImage = product?.image || image || pcImg;
    const displaySaleFrame = product?.saleFrame !== undefined ? product.saleFrame : (saleFrame !== undefined ? saleFrame : khungSaleCpu);
    const displayTitle = product?.title || title || "Sản phẩm chưa cập nhật tên";
    const displayWarranty = product?.warranty || warranty || "36 tháng";
    const displayStockStatus = product?.stockStatus || stockStatus || "Còn hàng";
    const displayProductCode = product?.productCode || productCode || "SP0001";
    const displayPrice = product ? `${product.price.toLocaleString('vi-VN')}đ` : (price || "0đ");
    const displayMarketPrice = product?.marketPrice ? `${product.marketPrice.toLocaleString('vi-VN')}đ` : marketPrice;
    const displayDiscountPercent = product?.discountPercent || discountPercent;
    return (
        <div className="item flex items-start justify-between gap-4 py-4 px-5 border-b border-[#e5e5e5] bg-white">
            {/* Product Image & Sale Frame */}
            <a href="#" className="relative block w-[140px] shrink-0 aspect-square">
                <img
                    src={displayImage}
                    alt={displayTitle}
                    className="w-full h-full object-contain p-1"
                />
                {displaySaleFrame && (
                    <img
                        src={displaySaleFrame}
                        alt="Sale Frame"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />
                )}
            </a>

            {/* Product Info */}
            <div className="flex-1 min-w-0 pr-2 text-sm">
                <a
                    href="#"
                    className="p-name text-[#111111] font-bold text-[15px] leading-[1.35] hover:text-[#005aab] block mb-2"
                >
                    {displayTitle}
                </a>

                <div className="text-[14px] text-[#222222] space-y-1 mb-2">
                    <div className="flex items-center gap-6">
                        <span className="font-bold w-[75px]">Bảo hành:</span>
                        <span>{displayWarranty}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="font-bold w-[75px]">Kho hàng:</span>
                        <span>
                            {displayStockStatus} <span className="mx-1 text-gray-400">|</span> <span className="font-bold">Mã SP:</span> {displayProductCode}
                        </span>
                    </div>
                </div>

                <div className="p-price text-[#ec1b23] text-xl font-bold leading-tight mb-1">
                    {displayPrice}
                </div>

                <div className="product-market-main flex items-center gap-2 text-sm">
                    {displayMarketPrice && (
                        <span className="product-market-price text-[#777777] line-through text-[14px]">
                            {displayMarketPrice}
                        </span>
                    )}
                    {displayDiscountPercent && (
                        <span className="product-market-percent text-white bg-[#be1f2d] text-[12px] font-bold px-2 py-0.5 rounded-[5px]">
                            {displayDiscountPercent}
                        </span>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <button
                type="button"
                onClick={onSelect}
                className="btn-select shrink-0 self-start bg-[#005aab] hover:bg-[#004788] text-white text-[13px] font-bold px-3.5 py-2 rounded-[3px] uppercase flex items-center gap-0.5 transition-colors cursor-pointer"
            >
                Thêm vào cấu hình
                <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
        </div>
    )
}

export default ModalCard
