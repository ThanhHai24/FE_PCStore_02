import { ArrowRight, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import DealProductCard, { type DealProductCardProps } from "./DealProductCard";

interface DealProductProps {
    deals?: DealProductCardProps[];
}

function DealProduct({ deals }: DealProductProps) {
    const displayDeals = deals && deals.length > 0 ? deals : undefined;
    const placeholderDeals = Array.from({ length: 8 });

    return (
        <div className="bg-gradient-to-b from-[#fe7112] to-[#ffdb68] rounded-lg p-5">
            <div className="box-title-deal flex items-center justify-between mb-4">
                <div className="title-deal flex items-center gap-5 flex-wrap">
                    <div className="flex items-center gap-2">
                        <Zap className="font-extrabold h-[40px] w-[40px] text-3xl text-[#feea32]" />
                        <h2 className="font-extrabold text-3xl text-[#feea32]">GIÁ TỐT MỖI NGÀY</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-white font-bold">Kết thúc sau</span>
                        <div className="global-time-deal gap-2 flex items-center">
                            <span className="w-[30px] h-[30px] flex items-center justify-center bg-white text-[#e31233] font-bold rounded-md">67</span>
                            <span className="text-white font-bold">:</span>
                            <span className="w-[30px] h-[30px] flex items-center justify-center bg-white text-[#e31233] font-bold rounded-md">67</span>
                            <span className="text-white font-bold">:</span>
                            <span className="w-[30px] h-[30px] flex items-center justify-center bg-white text-[#e31233] font-bold rounded-md">67</span>
                        </div>
                    </div>
                </div>
                <a href="/deal" className="text-white font-medium flex items-center gap-2 hover:underline">
                    Xem thêm khuyến mãi <ArrowRight className="w-5 h-5" />
                </a>
            </div>

            <div className="relative group/slider">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        480: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 3, spaceBetween: 16 },
                        1024: { slidesPerView: 4, spaceBetween: 16 },
                        1280: { slidesPerView: 5, spaceBetween: 16 },
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: '.deal-swiper-button-prev',
                        nextEl: '.deal-swiper-button-next',
                    }}
                    className="py-1"
                >
                    {displayDeals
                        ? displayDeals.map((item, index) => (
                            <SwiperSlide key={item.id || index}>
                                <DealProductCard {...item} />
                            </SwiperSlide>
                        ))
                        : placeholderDeals.map((_, index) => (
                            <SwiperSlide key={index}>
                                <DealProductCard />
                            </SwiperSlide>
                        ))}
                </Swiper>

                {/* Custom Navigation Arrows */}
                <button
                    className="deal-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg border border-gray-100 opacity-80 group-hover/slider:opacity-100 transition-all cursor-pointer disabled:opacity-0 disabled:cursor-auto"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    className="deal-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg border border-gray-100 opacity-80 group-hover/slider:opacity-100 transition-all cursor-pointer disabled:opacity-0 disabled:cursor-auto"
                    aria-label="Next Slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}

export default DealProduct;
