import { Flame } from "lucide-react";
import rtxProductImg from "../../assets/images/products/rtx.png";

export interface DealProductCardProps {
    id?: string | number;
    image?: string;
    title?: string;
    price?: string;
    marketPrice?: string;
    discountPercent?: string;
    sold?: number;
    total?: number;
    link?: string;
}

export function DealProductCard({
    image = rtxProductImg,
    title = "Card Màn Hình ASUS TUF Gaming T1 GeForce RTX",
    price = "15.990.000đ",
    marketPrice = "19.990.000đ",
    discountPercent = "-20%",
    sold = 3,
    total = 5,
    link = "#"
}: DealProductCardProps) {
    const percentage = Math.min(100, Math.max(0, (sold / total) * 100));

    return (
        <div className="group/card relative flex flex-col justify-between bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 w-full">
            <a href={link} className="block overflow-hidden mb-3">
                <img
                    src={image || rtxProductImg}
                    alt={title}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = rtxProductImg;
                    }}
                    className="w-full h-48 object-contain transition-transform duration-300 group-hover/card:scale-105"
                />
            </a>

            <div className="flex flex-col flex-1 justify-between">
                <a href={link} className="block mb-3">
                    <h3 className="text-[#333333] font-medium text-[15px] leading-snug line-clamp-2 min-h-[42px] group-hover/card:text-[#e31233] transition-colors">
                        {title}
                    </h3>
                </a>

                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <p className="product-market-price text-xs sm:text-sm text-gray-400 line-through">
                            {marketPrice}
                        </p>
                        {discountPercent && (
                            <div className="product-percent-price text-sm font-bold text-white bg-[#be1f2d] border border-[#fbd5d5] p-1.5 rounded-xl">
                                {discountPercent}
                            </div>
                        )}
                    </div>

                    <div className="text-[#d02c2c] text-xl sm:text-2xl font-bold mb-3 tracking-tight">
                        {price}
                    </div>

                    <div className="relative w-full h-8 bg-[#e9ecef] rounded-full flex items-center overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#ff5e00] to-[#ffa800] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        />
                        <div className="absolute left-0 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#ff3c00] via-[#ff7700] to-[#ffaa00] shadow-sm">
                            <Flame className="w-5 h-5 text-yellow-300 fill-yellow-300 stroke-[#ff2200]" />
                        </div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center pl-6 text-xs sm:text-sm font-semibold text-gray-900 pointer-events-none">
                            Còn {sold}/ {total} sản phẩm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DealProductCard;
