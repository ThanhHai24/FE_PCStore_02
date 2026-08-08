import React, { useEffect, useState } from 'react';
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
  HardDrive,
  Loader2
} from 'lucide-react';
import DealProduct from '../../components/DealProduct/DealProduct';
import BoxProductCategory from '../../components/BoxProductCategory/BoxProductCategory';
import type { ProductCardProps } from '../../components/BoxProductCategory/ProductCard';
import type { DealProductCardProps } from '../../components/DealProduct/DealProductCard';
import {
  getProducts,
  formatProductToCardProps,
  formatProductToDealCardProps
} from '../../services/productService';
import type { ApiProduct } from '../../types/apiProduct';

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

export const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dealProducts, setDealProducts] = useState<DealProductCardProps[]>([]);
  const [pcGamingProducts, setPcGamingProducts] = useState<ProductCardProps[]>([]);
  const [pcDoHoaProducts, setPcDoHoaProducts] = useState<ProductCardProps[]>([]);
  const [pcVanPhongProducts, setPcVanPhongProducts] = useState<ProductCardProps[]>([]);
  const [pcAiProducts, setPcAiProducts] = useState<ProductCardProps[]>([]);
  const [ramProducts, setRamProducts] = useState<ProductCardProps[]>([]);
  const [vgaProducts, setVgaProducts] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchHomeProducts() {
      try {
        setLoading(true);
        const res = await getProducts({ limit: 100 });
        if (!isMounted) return;

        const products: ApiProduct[] = res.products || [];

        // Format deals for DealProduct bar
        const formattedDeals = products.map(formatProductToDealCardProps);
        setDealProducts(formattedDeals);

        // Filter products by category IDs or slugs
        const pcGaming = products.filter(
          (p) => p.categoryId === '13' || p.category?.slug === 'pc-gaming'
        ).map(formatProductToCardProps);

        const pcDoHoa = products.filter(
          (p) => p.categoryId === '15' || p.category?.slug === 'pc-do-hoa'
        ).map(formatProductToCardProps);

        const pcVanPhong = products.filter(
          (p) => p.categoryId === '14' || p.category?.slug === 'pc-van-phong'
        ).map(formatProductToCardProps);

        const pcAi = products.filter(
          (p) => p.categoryId === '16' || p.category?.slug === 'pc-ai'
        ).map(formatProductToCardProps);

        const ramList = products.filter(
          (p) => p.categoryId === '5' || p.category?.slug === 'ram-bo-nho-trong'
        ).map(formatProductToCardProps);

        const vgaList = products.filter(
          (p) => p.categoryId === '4' || p.category?.slug === 'vga-card-do-hoa'
        ).map(formatProductToCardProps);

        setPcGamingProducts(pcGaming);
        setPcDoHoaProducts(pcDoHoa);
        setPcVanPhongProducts(pcVanPhong);
        setPcAiProducts(pcAi);
        setRamProducts(ramList);
        setVgaProducts(vgaList);

      } catch (err) {
        console.error('Failed to load products from API:', err);
        if (isMounted) {
          setPcGamingProducts([]);
          setPcDoHoaProducts([]);
          setPcVanPhongProducts([]);
          setPcAiProducts([]);
          setRamProducts([]);
          setVgaProducts([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHomeProducts();

    return () => {
      isMounted = false;
    };
  }, []);

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

      {/* Daily Deals Section */}
      <DealProduct deals={dealProducts} />

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

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="text-gray-500 text-sm font-medium">Đang tải danh sách sản phẩm...</span>
        </div>
      ) : (
        <>
          {/* Box Product Category - PC GAMING */}
          <BoxProductCategory
            title="PC GAMING"
            tabs={["PC Gaming Theo Game", "Chọn PC Gaming Theo Giá"]}
            tabContent={pcGamingProducts}
            viewAllLink="/category/pc-gaming"
          />

          {/* Box Product Category - PC ĐỒ HỌA */}
          <BoxProductCategory
            title="PC ĐỒ HỌA - LÀM VIỆC"
            tabs={["Server - Máy Ảo Hóa", "Máy Tính Đồng Bộ", "Máy Tính Đồ Họa", "Build PC Custom"]}
            tabContent={pcDoHoaProducts}
            viewAllLink="/category/pc-do-hoa"
          />

          {/* Box Product Category - PC VĂN PHÒNG */}
          <BoxProductCategory
            title="PC VĂN PHÒNG"
            tabs={["Mini PC"]}
            tabContent={pcVanPhongProducts}
            viewAllLink="/category/pc-van-phong"
          />

          {/* Box Product Category - PC AI */}
          <BoxProductCategory
            title="PC AI - TRÍ TUỆ NHÂN TẠO"
            tabs={[]}
            tabContent={pcAiProducts}
            viewAllLink="/category/pc-ai"
          />

          {/* Box Product Category - RAM - BỘ NHỚ TRONG */}
          <BoxProductCategory
            title="RAM - BỘ NHỚ TRONG"
            tabs={["RAM DDR5", "RAM DDR4", "RAM 32GB", "RAM 16GB"]}
            tabContent={ramProducts}
            viewAllLink="/category/ram"
          />

          {/* Box Product Category - VGA - CARD ĐỒ HỌA */}
          {vgaProducts.length > 0 && (
            <BoxProductCategory
              title="VGA - CARD ĐỒ HỌA"
              tabs={["NVIDIA RTX 50 Series", "NVIDIA RTX 40 Series", "AMD Radeon"]}
              tabContent={vgaProducts}
              viewAllLink="/category/vga"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
