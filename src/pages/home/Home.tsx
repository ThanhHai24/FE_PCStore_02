import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  PcCase,
  Gamepad2,
  Monitor,
  Briefcase,
  Sparkles,
  Tv,
  CircuitBoard,
  MemoryStick,
  HardDrive
} from 'lucide-react';
import DealProduct from '../../components/DealProduct/DealProduct';
import BoxProductCategory from '../../components/BoxProductCategory/BoxProductCategory';
import type { ProductCardProps } from '../../components/BoxProductCategory/ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner1 from '../../assets/images/slidebanner/1.jpg';
import banner2 from '../../assets/images/slidebanner/2.jpg';
import banner3 from '../../assets/images/slidebanner/3.gif';
import banner4 from '../../assets/images/slidebanner/4.jpg';
import banner5 from '../../assets/images/slidebanner/5.jpg';
import banner6 from '../../assets/images/slidebanner/6.webp';
import banner7 from '../../assets/images/slidebanner/7.jpg';
import banner8 from '../../assets/images/slidebanner/8.jpg';
import banner9 from '../../assets/images/slidebanner/9.jpg';
import banner10 from '../../assets/images/slidebanner/10.jpg';
import banner11 from '../../assets/images/slidebanner/11.jpg';

const slideBanners = [
  banner1, banner2, banner3, banner4, banner5,
  banner6, banner7, banner8, banner9, banner10, banner11
];

const pcGamingProducts: ProductCardProps[] = [
  {
    id: 1,
    title: "Bộ PC Gaming Intel Core Ultra 9 285K, RAM 64GB DDR5, RTX",
    marketPrice: "109.990.000đ",
    discountPercent: "-7%",
    price: "101.750.000đ",
    promotion: {
      prefix: "• Mua thêm màn hình đang được khuyến mại => ",
      highlight: "TẠI ĐÂY",
      suffix: " (Giả...",
      highlightColor: "red"
    },
    inStock: true
  },
  {
    id: 2,
    badge: "HOT",
    banner: { type: "hot", title: "TẶNG MÀN HÌNH", badgeText: "HOT" },
    title: "Bộ PC Gaming I5-12400F, RAM 16GB, RTX 5050 8GB [TẶNG",
    price: "20.890.000đ",
    promotion: {
      prefix: "- Tặng Màn Hình ",
      highlight: "Màn hình VSP IP2408SG",
      suffix: " Hoặc Màn hình VIOX...",
      prefixColor: "red",
      highlightColor: "blue"
    },
    inStock: true
  },
  {
    id: 3,
    banner: { type: "hot", title: "TẶNG MÀN HÌNH", badgeText: "HOT" },
    title: "Bộ PC Gaming Ryzen 5 5500, Ram 16GB, SSD 256GB, VGA",
    marketPrice: "16.990.000đ",
    discountPercent: "-16%",
    price: "14.290.000đ",
    promotion: {
      prefix: "- Tặng Màn Hình: ",
      highlight: "Màn hình EGM24F120H",
      suffix: " hoặc Màn...",
      prefixColor: "red",
      highlightColor: "blue"
    },
    inStock: true
  },
  {
    id: 4,
    badge: "NEW",
    banner: { type: "hot", title: "TẶNG MÀN HÌNH", badgeText: "HOT" },
    title: "Bộ PC NCPC X NVIDIA | VGA RTX 5060 Ti 8GB, Core I5-",
    marketPrice: "33.990.000đ",
    discountPercent: "-15%",
    price: "28.890.000đ",
    promotion: {
      prefix: "• Tặng màn hình : ",
      highlight: "AOC 27B36X",
      suffix: " hoặc Màn Hình MSI PRO...",
      prefixColor: "black",
      highlightColor: "black"
    },
    inStock: true
  },
  {
    id: 5,
    banner: { type: "sale", title: "RẺ QUÁ RẺ", badgeText: "GIÁ" },
    title: "Bộ PC Gaming Ryzen 5 5500GT, RX Vega 7, RAM 16GB, SSD",
    price: "9.300.000đ",
    promotion: {
      prefix: "• Mua thêm màn hình đang được khuyến mại => ",
      highlight: "TẠI ĐÂY",
      suffix: " (Giả...",
      highlightColor: "red"
    },
    inStock: true
  },
  {
    id: 6,
    badge: "HOT",
    banner: { type: "hot", title: "TẶNG MÀN HÌNH", badgeText: "HOT" },
    title: "Bộ PC Gaming Intel Core i7 14700K, RAM 32GB, RTX 4070",
    marketPrice: "45.990.000đ",
    discountPercent: "-10%",
    price: "41.390.000đ",
    promotion: {
      prefix: "- Tặng Màn Hình ",
      highlight: "ASUS VG249Q3A",
      suffix: " 180Hz 1ms IPS...",
      prefixColor: "red",
      highlightColor: "blue"
    },
    inStock: true
  }
];

export const Home: React.FC = () => {
  return (
    <div className="max-w-[1250px] mx-auto px-4 py-6 space-y-8">
      {/* Banner / Hero Section */}
      <section className="space-y-4">
        <div>
          <a href="#">
            <img
              className="rounded-xl w-full object-cover shadow-sm"
              src="/src/assets/images/mainbanner.webp"
              alt="Main Banner"
            />
          </a>
        </div>

        {/* Swiper Slider Section */}
        <div className="relative group -mt-[50px]">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
            }}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            className="rounded-xl overflow-hidden py-1"
          >
            {slideBanners.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <a href="#" className="block overflow-hidden rounded-xl">
                  <img
                    className="w-full h-[150px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
                    src={imgSrc}
                    alt={`Slide Banner ${index + 1}`}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button
            className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg border border-gray-100 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-all cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg border border-gray-100 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-all cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <DealProduct />

      {/* Outstanding Categories Bar */}
      <div className="box-category-outstanding space-y-4">
        <div className="title-box flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 uppercase tracking-tight">
            Danh mục nổi bật
          </h2>
        </div>
        <div className="list-category-outstanding grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          {[
            { title: 'PC Gaming', icon: <Gamepad2 className="w-6 h-6" />, href: '/category/pc-gaming' },
            { title: 'PC Đồ Họa', icon: <Monitor className="w-6 h-6" />, href: '/category/pc-do-hoa' },
            { title: 'PC Văn Phòng', icon: <Briefcase className="w-6 h-6" />, href: '/category/pc-van-phong' },
            { title: 'PC AI', icon: <Sparkles className="w-6 h-6 text-amber-500" />, href: '/category/pc-ai' },
            { title: 'CPU Vi Xử Lý', icon: <Cpu className="w-6 h-6" />, href: '/category/cpu' },
            { title: 'VGA Card', icon: <Tv className="w-6 h-6" />, href: '/category/vga' },
            { title: 'Mainboard', icon: <CircuitBoard className="w-6 h-6" />, href: '/category/mainboard' },
            { title: 'RAM Bộ Nhớ', icon: <MemoryStick className="w-6 h-6" />, href: '/category/ram' },
            { title: 'Ổ Cứng SSD', icon: <HardDrive className="w-6 h-6" />, href: '/category/ssd' },
            { title: 'Vỏ Case', icon: <PcCase className="w-6 h-6" />, href: '/category/case' },
          ].map((cat, idx) => (
            <a
              key={idx}
              href={cat.href}
              className="group flex flex-col items-center justify-center p-3 rounded-xl hover:bg-blue-50/70 hover:border-blue-200 border border-transparent transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 mb-2 rounded-full bg-gray-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:shadow-md">
                {cat.icon}
              </div>
              <span className="title text-xs font-semibold text-gray-700 group-hover:text-blue-600 text-center transition-colors line-clamp-1">
                {cat.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Box Product Category - PC GAMING */}
      <BoxProductCategory
        title="PC GAMING"
        tabs={["PC Gaming Theo Game", "Chọn PC Gaming Theo Giá"]}
        tabContent={pcGamingProducts}
        viewAllLink="/category/pc-gaming"
      />
      <BoxProductCategory
        title="PC ĐỒ HỌA - LÀM VIỆC"
        tabs={["Server - Máy Ảo Hóa", "Máy Tính Đồng Bộ", "Máy Tính Đồ Họa", "Build PC Custom"]}
        tabContent={pcGamingProducts}
        viewAllLink="/category/pc-gaming"
      />
      <BoxProductCategory
        title="PC VĂN PHÒNG"
        tabs={["Mini PC"]}
        tabContent={pcGamingProducts}
        viewAllLink="/category/pc-gaming"
      />
      <BoxProductCategory
        title="PC AI - TRÍ TUỆ NHÂN TẠO"
        tabs={[]}
        tabContent={pcGamingProducts}
        viewAllLink="/category/pc-gaming"
      />
      <BoxProductCategory
        title="RAM - BỘ NHỚ TRONG"
        tabs={["RAM DDR5", "RAM DDR4", "RAM 32GB", "RAM 16GB"]}
        tabContent={pcGamingProducts}
        viewAllLink="/category/pc-gaming"
      />
    </div>
  );
};

export default Home;
