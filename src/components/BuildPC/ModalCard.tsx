import { ChevronRight } from "lucide-react"
import pcImg from "../../assets/images/products/pc.jpg"
import khungSaleCpu from "../../assets/images/khung-sale-cpu.png"

interface ModalCardProps {
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
    image = pcImg,
    saleFrame = khungSaleCpu,
    title = "CPU AMD Ryzen 5 3400G 3.7 GHz (4.2 GHz with boost) / 6MB / 4 cores 8 threads / Radeon Vega 11 / 65W)",
    warranty = "36 tháng",
    stockStatus = "Còn hàng",
    productCode = "CPU000109H",
    price = "1.690.000đ",
    marketPrice = "2.500.000đ",
    discountPercent = "-32%",
    onSelect
}: ModalCardProps) {
    return (
        <div className="item flex items-start justify-between gap-4 py-4 px-5 border-b border-[#e5e5e5] bg-white">
            {/* Product Image & Sale Frame */}
            <a href="#" className="relative block w-[140px] shrink-0 aspect-square">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain p-1"
                />
                {saleFrame && (
                    <img
                        src={saleFrame}
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
                    {title}
                </a>

                <div className="text-[14px] text-[#222222] space-y-1 mb-2">
                    <div className="flex items-center gap-6">
                        <span className="font-bold w-[75px]">Bảo hành:</span>
                        <span>{warranty}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="font-bold w-[75px]">Kho hàng:</span>
                        <span>
                            {stockStatus} <span className="mx-1 text-gray-400">|</span> <span className="font-bold">Mã SP:</span> {productCode}
                        </span>
                    </div>
                </div>

                <div className="p-price text-[#ec1b23] text-xl font-bold leading-tight mb-1">
                    {price}
                </div>

                <div className="product-market-main flex items-center gap-2 text-sm">
                    <span className="product-market-price text-[#777777] line-through text-[14px]">
                        {marketPrice}
                    </span>
                    {discountPercent && (
                        <span className="product-market-percent text-white bg-[#be1f2d] text-[12px] font-bold px-2 py-0.5 rounded-[5px]">
                            {discountPercent}
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
