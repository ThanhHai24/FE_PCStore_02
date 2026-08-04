import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    MapPin,
    Cpu,
    PhoneCall,
    Newspaper,
    ShoppingCart,
    User,
    Menu,
    ChevronDown,
    X,
    Laptop,
    Monitor,
    HardDrive,
    Keyboard,
    Flame,
    Sparkles,
    ChevronRight,
    ShieldCheck,
    Phone
} from 'lucide-react';

interface CategoryItem {
    id: string;
    name: string;
    icon: React.ReactNode;
    subcategories: {
        title: string;
        items: string[];
    }[];
}

const CATEGORIES: CategoryItem[] = [
    {
        id: 'pc',
        name: 'PC',
        icon: <Cpu className="w-4 h-4 text-blue-500" />,
        subcategories: [
            {
                title: 'PC Theo Nhu Cầu',
                items: ['PC Gaming', 'PC Đồ Họa - Render', 'PC Văn Phòng', 'PC Giả Lập - NOX', 'PC Server - Workstation'],
            },
            {
                title: 'PC Theo Vấn Đề / Chi Phí',
                items: ['PC Dưới 10 Triệu', 'PC 10 - 20 Triệu', 'PC 20 - 40 Triệu', 'PC Cao Cấp > 50 Triệu'],
            },
            {
                title: 'Bảo Hành & Đãi Ngộ',
                items: ['Bảo hành 1 đổi 1 tận nơi', 'Miễn phí giao hàng toàn quốc', 'Hỗ trợ trả góp 0%'],
            },
        ],
    },
    {
        id: 'laptop',
        name: 'Laptop',
        icon: <Laptop className="w-4 h-4 text-blue-500" />,
        subcategories: [
            {
                title: 'Laptop Theo Hãng',
                items: ['ASUS', 'MSI', 'Acer', 'Lenovo', 'Dell', 'HP', 'Apple Macbook'],
            },
            {
                title: 'Laptop Theo Nhu Cầu',
                items: ['Laptop Gaming High-End', 'Laptop Văn Phòng Mỏng Nhẹ', 'Laptop Đồ Họa 3D', 'Laptop Sinh Viên Giá Rẻ'],
            },
        ],
    },
    {
        id: 'minipc',
        name: 'Mini PC',
        icon: <HardDrive className="w-4 h-4 text-blue-500" />,
        subcategories: [
            {
                title: 'Dòng Mini PC Hot',
                items: ['Intel NUC Kit', 'ASUS NUC Series', 'Mac Mini M2/M3', 'Minisforum High Performance'],
            },
        ],
    },
    {
        id: 'pcai',
        name: 'PC AI',
        icon: <Sparkles className="w-4 h-4 text-amber-500" />,
        subcategories: [
            {
                title: 'Trạm Xử Lý AI Workstation',
                items: ['PC AI Deep Learning Dual RTX 4090', 'PC AI Large Language Model (LLM)', 'Workstation NVIDIA RTX 6000 Ada'],
            },
        ],
    },
    {
        id: 'linhkien',
        name: 'Linh kiện PC',
        icon: <Cpu className="w-4 h-4 text-blue-500" />,
        subcategories: [
            {
                title: 'Linh Kiện Chính',
                items: ['CPU - Bộ Vi Xử Lý', 'VGA - Card Màn Hình', 'Mainboard - Bo Mạch Chủ', 'RAM - Bộ Nhớ Trong'],
            },
            {
                title: 'Lưu Trữ & Nguồn',
                items: ['Ổ Cứng SSD / HDD', 'Nguồn Máy Tính (PSU)', 'Vỏ Case Máy Tính', 'Tản Nhiệt CPU (Khí/Nước)'],
            },
        ],
    },
    {
        id: 'manhinh',
        name: 'Màn hình',
        icon: <Monitor className="w-4 h-4 text-blue-500" />,
        subcategories: [
            {
                title: 'Màn Hình Chuyên Dụng',
                items: ['Màn Hình Gaming 144Hz - 360Hz', 'Màn Hình Đồ Họa Chuẩn Màu (Asus ProArt, Dell Ultrasharp)', 'Màn Hình Cong UltraWide 4K'],
            },
        ],
    },
    {
        id: 'gear',
        name: 'Phím chuột ghế gear',
        icon: <Keyboard className="w-4 h-4 text-blue-500" />,
        subcategories: [
            {
                title: 'Gaming Gear & Accessories',
                items: ['Bàn Phím Cơ Wireless / Custom', 'Chuột Gaming Siêu Nhẹ', 'Tai Nghe Gaming 7.1', 'Ghế Gaming Ergonomics', 'Bàn Di Chuột RGB'],
            },
        ],
    },
];

const POPULAR_SEARCHES = [
    'RTX 4070 Super',
    'PC Gaming 15 triệu',
    'Core i5 14600K',
    'Màn hình 27 inch 180Hz',
    'Bàn phím cơ không dây',
    'SSD 1TB NVMe',
];

const SHOWROOMS = [
    { city: 'Hà Nội', address: '17 Hà Kế Tấn, Phường Phương Liệt, Q. Thanh Xuân', phone: '098.741.4899' },
    { city: 'Hà Nội', address: '83b Nguyễn Văn Cừ, Q. Long Biên', phone: '098.122.6969' },
    { city: 'TP. Hồ Chí Minh', address: '249 Lý Thường Kiệt, Phường 15, Quận 11', phone: '0707.08.6666' },
];

export const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartCount] = useState(0);

    const searchRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);

    // Close search suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false);
            }
            if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
                setIsMegaMenuOpen(false);
                setActiveCategory(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="w-full font-sans select-none sticky top-0 z-50 shadow-md">
            <div className="bg-gradient-to-r from-[#1752e5] via-[#1a64f0] to-[#1e75fa] text-white">
                <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-2.5 flex items-center justify-between gap-2 md:gap-4">
                    <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors focus:outline-none"
                            aria-label="Toggle Navigation"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <a href="/" className="flex items-center space-x-2 group">
                            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all duration-300 shadow-inner">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/80 flex items-center justify-center font-extrabold text-xs sm:text-sm tracking-tighter">
                                    NC
                                </div>
                            </div>
                            <div className="flex flex-col justify-center leading-none">
                                <span className="text-base sm:text-lg md:text-xl font-black tracking-tight text-white drop-shadow-sm font-sans">
                                    PC<span className="text-amber-300 font-extrabold">STORE</span>
                                </span>
                            </div>
                        </a>
                        <div className="relative hidden md:block">
                            <button
                                onClick={() => setIsLocationOpen(!isLocationOpen)}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white transition-all duration-200"
                                title="Hệ thống showroom Nguyễn Công PC"
                            >
                                <MapPin className="w-4 h-4" />
                            </button>
                            {isLocationOpen && (
                                <div className="absolute left-0 mt-2 w-72 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 py-3 px-4 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 font-bold text-gray-900 text-sm">
                                        <div className="flex items-center space-x-1.5 text-blue-600">
                                            <MapPin className="w-4 h-4" />
                                            <span>Hệ Thống Showroom</span>
                                        </div>
                                        <button onClick={() => setIsLocationOpen(false)} className="text-gray-400 hover:text-gray-600">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                                        {SHOWROOMS.map((sr, idx) => (
                                            <div key={idx} className="p-2 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-300 transition-colors">
                                                <div className="font-bold text-blue-700 text-xs">{sr.city}</div>
                                                <div className="text-gray-600 mt-0.5 text-[11px] leading-snug">{sr.address}</div>
                                                <div className="text-blue-600 font-semibold text-[11px] mt-1 flex items-center gap-1">
                                                    <Phone className="w-3 h-3" />
                                                    <a href={`tel:${sr.phone.replace(/\./g, '')}`} className="hover:underline">
                                                        {sr.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div ref={searchRef} className="relative flex-1 max-w-xl mx-1 sm:mx-2">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="relative flex items-center"
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchOpen(true)}
                                placeholder="Bạn cần tìm gì?"
                                className="w-full bg-white text-gray-900 placeholder-gray-400 text-xs sm:text-sm pl-4 pr-10 py-2 sm:py-2.5 rounded-full shadow-inner border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            />
                            {searchQuery ? (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-9 text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            ) : null}
                            <button
                                type="submit"
                                aria-label="Tìm kiếm"
                                className="absolute right-2 text-gray-500 hover:text-blue-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </form>
                        {isSearchOpen && (
                            <div className="absolute left-0 right-0 mt-1.5 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                                <div className="flex items-center space-x-1.5 font-bold text-gray-900 mb-2">
                                    <Flame className="w-4 h-4 text-red-500" />
                                    <span>Tìm kiếm phổ biến</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {POPULAR_SEARCHES.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setSearchQuery(item);
                                                setIsSearchOpen(false);
                                            }}
                                            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 text-xs font-medium transition-colors border border-gray-200/60"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-2 flex items-center justify-between text-[11px] text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                        Cam kết chính hãng 100%
                                    </span>
                                    <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                                        Xem tất cả khuyến mãi →
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: ACTION UTILITIES (Icon + Label vertical stacked) */}
                    <div className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-xs font-medium">
                        {/* 1. XÂY DỰNG CẤU HÌNH */}
                        <a
                            href="/build-pc"
                            className="flex flex-col items-center justify-center p-1.5 px-2 rounded-lg hover:bg-white/15 transition-all text-center group"
                        >
                            <Cpu className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
                            <span className="text-[11px] leading-tight font-medium text-blue-50 group-hover:text-white">
                                Xây Dựng Cấu Hình
                            </span>
                        </a>

                        {/* 2. KHÁCH HÀNG LIÊN HỆ */}
                        <a
                            href="/contact"
                            className="flex flex-col items-center justify-center p-1.5 px-2 rounded-lg hover:bg-white/15 transition-all text-center group"
                        >
                            <PhoneCall className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
                            <span className="text-[11px] leading-tight font-medium text-blue-50 group-hover:text-white">
                                Khách Hàng Liên Hệ
                            </span>
                        </a>

                        {/* 3. TIN TỨC CÔNG NGHỆ */}
                        <a
                            href="/news"
                            className="flex flex-col items-center justify-center p-1.5 px-2 rounded-lg hover:bg-white/15 transition-all text-center group"
                        >
                            <Newspaper className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
                            <span className="text-[11px] leading-tight font-medium text-blue-50 group-hover:text-white">
                                Tin Tức Công Nghệ
                            </span>
                        </a>

                        {/* 4. GIỎ HÀNG */}
                        <a
                            href="/cart"
                            className="relative flex flex-col items-center justify-center p-1.5 px-2 rounded-lg hover:bg-white/15 transition-all text-center group"
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
                                {cartCount >= 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-blue-600 shadow">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-[11px] leading-tight font-medium text-blue-50 group-hover:text-white">
                                Giỏ Hàng
                            </span>
                        </a>

                        {/* 5. TÀI KHOẢN */}
                        <a
                            href="/account"
                            className="flex flex-col items-center justify-center p-1.5 px-2 rounded-lg hover:bg-white/15 transition-all text-center group"
                        >
                            <User className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
                            <span className="text-[11px] leading-tight font-medium text-blue-50 group-hover:text-white">
                                Tài Khoản
                            </span>
                        </a>
                    </div>

                    {/* MOBILE QUICK CARTS & USER */}
                    <div className="flex lg:hidden items-center space-x-2 shrink-0">
                        <a href="/cart" className="relative p-1.5 text-white hover:bg-white/15 rounded-lg">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-blue-600">
                                {cartCount}
                            </span>
                        </a>
                        <a href="/account" className="p-1.5 text-white hover:bg-white/15 rounded-lg">
                            <User className="w-5 h-5" />
                        </a>
                    </div>

                </div>
            </div>

            {/* ========================================================================= */}
            {/* BOTTOM NAV BAR: CATEGORY NAVIGATION ROW */}
            {/* ========================================================================= */}
            <div className="bg-[#1554d3] border-t border-blue-400/30 text-white hidden lg:block">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex items-center">

                    {/* MEGA MENU CATEGORIES BUTTON */}
                    <div ref={categoryRef} className="relative py-1.5 pr-3">
                        <button
                            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            className="bg-white text-[#1752e5] hover:bg-gray-100 font-extrabold text-xs px-3.5 py-2 rounded-md shadow flex items-center space-x-2 transition-all cursor-pointer uppercase tracking-wider"
                        >
                            <Menu className="w-4 h-4 text-[#1752e5]" />
                            <span>DANH MỤC SẢN PHẨM</span>
                        </button>

                        {/* MEGA MENU DROPDOWN PANEL */}
                        {isMegaMenuOpen && (
                            <div
                                onMouseLeave={() => {
                                    setIsMegaMenuOpen(false);
                                    setActiveCategory(null);
                                }}
                                className="absolute left-0 top-full mt-1.5 w-[850px] bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 flex z-50 overflow-hidden animate-in fade-in duration-150"
                            >
                                {/* Left side: Category List */}
                                <div className="w-1/3 bg-gray-50 border-r border-gray-200 py-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onMouseEnter={() => setActiveCategory(cat)}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-colors text-left ${activeCategory?.id === cat.id
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2.5">
                                                <span className={activeCategory?.id === cat.id ? 'text-white' : ''}>{cat.icon}</span>
                                                <span>{cat.name}</span>
                                            </div>
                                            <ChevronRight className={`w-3.5 h-3.5 ${activeCategory?.id === cat.id ? 'text-white' : 'text-gray-400'}`} />
                                        </button>
                                    ))}
                                </div>

                                {/* Right side: Subcategories Content */}
                                <div className="w-2/3 p-5 bg-white overflow-y-auto max-h-[420px]">
                                    {activeCategory ? (
                                        <div>
                                            <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-gray-100 font-bold text-sm text-blue-700">
                                                {activeCategory.icon}
                                                <span>{activeCategory.name}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                {activeCategory.subcategories.map((sub, idx) => (
                                                    <div key={idx} className="space-y-2">
                                                        <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wide border-l-2 border-blue-600 pl-2">
                                                            {sub.title}
                                                        </h4>
                                                        <ul className="space-y-1.5 text-xs text-gray-600 pl-2">
                                                            {sub.items.map((item, itemIdx) => (
                                                                <li key={itemIdx}>
                                                                    <a
                                                                        href="#"
                                                                        className="hover:text-blue-600 hover:underline transition-colors block py-0.5"
                                                                    >
                                                                        {item}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2 py-12">
                                            <Menu className="w-8 h-8 stroke-1 text-gray-300" />
                                            <span className="text-xs">Rê chuột vào danh mục bên trái để xem chi tiết</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* HORIZONTAL CATEGORIES LINKS */}
                    <nav className="flex items-center space-x-1 xl:space-x-3 overflow-x-auto no-scrollbar py-2 text-xs font-semibold">
                        {CATEGORIES.map((cat) => (
                            <div key={cat.id} className="relative group">
                                <a
                                    href={`/category/${cat.id}`}
                                    className="flex items-center space-x-1 px-2.5 py-1 rounded hover:bg-white/15 text-white whitespace-nowrap transition-colors"
                                >
                                    <span>{cat.name}</span>
                                    <ChevronDown className="w-3 h-3 text-blue-200 group-hover:rotate-180 transition-transform duration-200" />
                                </a>

                                {/* Submenu Dropdown on Hover */}
                                <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                    <div className="px-3 py-1 font-bold text-blue-600 border-b border-gray-100 text-[11px] uppercase tracking-wider mb-1">
                                        {cat.name}
                                    </div>
                                    {cat.subcategories.flatMap((sub) => sub.items).slice(0, 6).map((item, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* MOBILE DRAWER NAVIGATION MENU */}
            {/* ========================================================================= */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white text-gray-900 border-t border-gray-200 shadow-xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
                    {/* Quick Actions in Mobile Drawer */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-blue-50 border-b border-blue-100">
                        <a
                            href="/build-pc"
                            className="flex items-center space-x-2 p-2 rounded-lg bg-white shadow-sm text-xs font-semibold text-blue-700"
                        >
                            <Cpu className="w-4 h-4 text-blue-600" />
                            <span>Xây Dựng Cấu Hình</span>
                        </a>
                        <a
                            href="/contact"
                            className="flex items-center space-x-2 p-2 rounded-lg bg-white shadow-sm text-xs font-semibold text-blue-700"
                        >
                            <PhoneCall className="w-4 h-4 text-blue-600" />
                            <span>Khách Hàng Liên Hệ</span>
                        </a>
                        <a
                            href="/news"
                            className="flex items-center space-x-2 p-2 rounded-lg bg-white shadow-sm text-xs font-semibold text-blue-700"
                        >
                            <Newspaper className="w-4 h-4 text-blue-600" />
                            <span>Tin Tức Công Nghệ</span>
                        </a>
                        <a
                            href="/account"
                            className="flex items-center space-x-2 p-2 rounded-lg bg-white shadow-sm text-xs font-semibold text-blue-700"
                        >
                            <User className="w-4 h-4 text-blue-600" />
                            <span>Tài Khoản</span>
                        </a>
                    </div>

                    {/* Categories List in Mobile Drawer */}
                    <div className="p-3">
                        <div className="font-extrabold text-xs text-gray-500 uppercase tracking-wider mb-2">
                            Danh Mục Sản Phẩm
                        </div>
                        <div className="space-y-1">
                            {CATEGORIES.map((cat) => (
                                <div key={cat.id} className="border-b border-gray-100 pb-1">
                                    <div className="flex items-center justify-between p-2 rounded-md font-bold text-xs text-gray-800 hover:bg-gray-50">
                                        <div className="flex items-center space-x-2">
                                            {cat.icon}
                                            <span>{cat.name}</span>
                                        </div>
                                    </div>
                                    <div className="pl-6 space-y-1 pb-1">
                                        {cat.subcategories.flatMap(s => s.items).slice(0, 3).map((item, idx) => (
                                            <a
                                                key={idx}
                                                href="#"
                                                className="block text-[11px] text-gray-600 hover:text-blue-600 py-0.5"
                                            >
                                                • {item}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;