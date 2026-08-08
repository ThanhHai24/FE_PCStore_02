import type { Product } from '../types/product';
import cleanPcImg from '../assets/images/products/clean_pc.png';
import pcJpg from '../assets/images/products/pc.jpg';
import rtxPng from '../assets/images/products/rtx.png';

export const mockProducts: Product[] = [
  {
    id: 'pc-miku-9800x3d',
    title: 'Bộ PC Hatsune Miku Ryzen 7 9800X3D, RAM 32GB, VGA RTX 5080 16GB',
    images: [cleanPcImg, pcJpg, rtxPng, cleanPcImg],
    thumbnails: [cleanPcImg, pcJpg, rtxPng, cleanPcImg],
    price: '136.000.000đ',
    numericPrice: 136000000,
    marketPrice: '145.000.000đ',
    installmentPrice: '11.666.533 / tháng',
    discountPercent: '-6%',
    badge: 'HOT',
    inStock: true,
    warrantyInfo: 'Bảo hành theo từng linh kiện',
    rating: 0.0,
    reviewCount: 0,
    viewCount: 20689,
    commentCount: 0,
    purchaseCount: 6,
    flashSale: {
      hours: 23,
      minutes: 33,
      seconds: 46,
    },
    category: 'pc-gaming',
    categoryName: 'PC GAMING',
    brand: 'ASUS / ROG',
    promotions: [
      'Quý khách có thể tùy chọn nâng cấp lên hoặc xuống cấu hình tương đương với: CPU, RAM, SSD theo nhu cầu.',
      'Miễn phí giao hàng toàn quốc.',
      'Tặng Voucher giảm giá 500.000đ cho lần mua tiếp theo.',
      'Tặng bàn di chuột Gaming Hatsune Miku Edition trị giá 690.000đ.'
    ],
    quickSpecs: {
      cpu: 'CPU AMD Ryzen 7 9800X3D TRAY NEW (Up to 5.2GHz | 8C / 16T | 96 MB Cache)',
      vga: 'Asus ROG Astral GeForce RTX 5080 16GB GDDR7 OC HATSUNE MIKU EDITION',
      ram: 'Gskill Trident Z5 RGB 32GB (2x16GB) DDR5 6000Mhz Black'
    },
    specsTable: [
      {
        key: 'CPU',
        name: 'CPU AMD Ryzen 7 9800X3D TRAY NEW (Up to 5.2GHz | 8C / 16T | 96 MB Cache)',
        warranty: '36TH'
      },
      {
        key: 'VGA',
        name: 'Asus ROG Astral GeForce RTX 5080 16GB GDDR7 OC HATSUNE MIKU EDITION',
        warranty: '36TH'
      },
      {
        key: 'RAM',
        name: 'Gskill Trident Z5 RGB 32GB (2x16GB) DDR5 6000Mhz Black',
        warranty: '60TH'
      },
      {
        key: 'SSD',
        name: 'NVMe 1TB Lexar NQ780 M.2 PCIe Gen4 x4 up to 6500MB/s read, 2500MB/s write',
        warranty: '60TH'
      },
      {
        key: 'MAIN',
        name: 'Mainboard ASUS ROG STRIX X870E-H GAMING WIFI 7 Hatsune Miku Edition',
        warranty: '36TH'
      },
      {
        key: 'PSU',
        name: 'Nguồn ASUS ROG Thor 1000W Platinum II ATX 3.0',
        warranty: '120TH'
      },
      {
        key: 'CASE',
        name: 'Vỏ máy tính ASUS ROG Hyperion GR701 Hatsune Miku Limited Edition',
        warranty: '24TH'
      }
    ],
    descriptionHtml: `
      <div class="space-y-4 text-gray-700 text-sm leading-relaxed">
        <h3 class="text-base font-bold text-gray-900">Đặc điểm nổi bật của Bộ PC Hatsune Miku Ryzen 7 9800X3D</h3>
        <p>Bộ PC Hatsune Miku Limited Edition sở hữu vẻ ngoài đậm chất e-sports và nghệ thuật Anime với sự hợp tác từ thương hiệu ASUS ROG. Toàn bộ thiết kế tông màu xanh ngọc bích miku cực kỳ độc đáo và sang trọng.</p>
        <p>Hiệu năng hủy diệt với CPU AMD Ryzen 7 9800X3D - vi xử lý gaming mạnh mẽ nhất thế giới hiện tại kết hợp cùng card đồ họa thế hệ mới ASUS ROG Astral RTX 5080 16GB GDDR7 giúp đáp ứng mượt mà mọi tựa game AAA ở độ phân giải 4K 144Hz+.</p>
      </div>
    `
  },
  {
    id: 'pc-intel-i7-14700f',
    title: 'Bộ PC Đồ Họa Intel Core i7-14700F, RAM 32GB, RTX 4060 Ti 8GB',
    images: [pcJpg, cleanPcImg, rtxPng],
    price: '38.990.000đ',
    numericPrice: 38990000,
    marketPrice: '43.300.000đ',
    discountPercent: '-10%',
    badge: 'NEW',
    inStock: true,
    warrantyInfo: 'Bảo hành 36 tháng',
    rating: 5.0,
    reviewCount: 12,
    viewCount: 8400,
    commentCount: 4,
    purchaseCount: 18,
    promotions: [
      'Tặng gói bảo dưỡng miễn phí 2 năm.',
      'Giảm 10% khi mua kèm màn hình gaming.'
    ],
    specsTable: [
      { key: 'CPU', name: 'Intel Core i7-14700F (Up to 5.4GHz, 20 nhân 28 luồng)', warranty: '36TH' },
      { key: 'VGA', name: 'NVIDIA GeForce RTX 4060 Ti 8GB GDDR6', warranty: '36TH' },
      { key: 'RAM', name: '32GB DDR5 5600MHz', warranty: '36TH' },
      { key: 'SSD', name: '1TB NVMe PCIe Gen4', warranty: '36TH' }
    ],
    category: 'pc-do-hoa',
    categoryName: 'PC ĐỒ HỌA',
    brand: 'Intel'
  },
  {
    id: 'pc-intel-i5-14600k',
    title: 'Bộ PC Gaming Core i5-14600K, RAM 32GB, RTX 4070 Super 12GB',
    images: [rtxPng, cleanPcImg, pcJpg],
    price: '46.900.000đ',
    numericPrice: 46900000,
    marketPrice: '49.900.000đ',
    discountPercent: '-6%',
    badge: 'HOT',
    inStock: true,
    warrantyInfo: 'Bảo hành 36 tháng',
    rating: 4.8,
    reviewCount: 8,
    viewCount: 12100,
    commentCount: 2,
    purchaseCount: 14,
    promotions: ['Giao hàng hỏa tốc trong 2h tại Hà Nội & TP.HCM.'],
    specsTable: [
      { key: 'CPU', name: 'Intel Core i5-14600K', warranty: '36TH' },
      { key: 'VGA', name: 'RTX 4070 Super 12GB', warranty: '36TH' },
      { key: 'RAM', name: '32GB DDR5 6000MHz', warranty: '36TH' }
    ],
    category: 'pc-gaming',
    categoryName: 'PC GAMING',
    brand: 'Intel'
  },
  {
    id: 'pc-ultra-9-285k',
    title: 'Bộ PC Gaming Intel Core Ultra 9 285K, RAM 64GB, RTX 4090 24GB',
    images: [cleanPcImg, rtxPng, pcJpg],
    price: '109.990.000đ',
    numericPrice: 109990000,
    marketPrice: '118.000.000đ',
    discountPercent: '-7%',
    badge: 'NEW',
    inStock: true,
    warrantyInfo: 'Bảo hành 36 tháng chính hãng',
    rating: 5.0,
    reviewCount: 4,
    viewCount: 15400,
    commentCount: 1,
    purchaseCount: 3,
    promotions: ['Tặng tản nhiệt nước AIO 360mm cao cấp.'],
    specsTable: [
      { key: 'CPU', name: 'Intel Core Ultra 9 285K', warranty: '36TH' },
      { key: 'VGA', name: 'ROG Strix GeForce RTX 4090 24GB', warranty: '36TH' },
      { key: 'RAM', name: '64GB DDR5 7200MHz', warranty: '36TH' }
    ],
    category: 'pc-gaming',
    categoryName: 'PC GAMING',
    brand: 'Intel'
  },
  {
    id: 'pc-ryzen-9-9950x',
    title: 'Bộ PC Đồ Họa AMD Ryzen 9 9950X, RAM 64GB, RTX 4080 Super 16GB',
    images: [pcJpg, cleanPcImg, rtxPng],
    price: '89.990.000đ',
    numericPrice: 89990000,
    marketPrice: '95.000.000đ',
    discountPercent: '-5%',
    badge: 'HOT',
    inStock: true,
    warrantyInfo: 'Bảo hành theo linh kiện',
    rating: 4.9,
    reviewCount: 6,
    viewCount: 9200,
    commentCount: 3,
    purchaseCount: 5,
    promotions: ['Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng.'],
    specsTable: [
      { key: 'CPU', name: 'AMD Ryzen 9 9950X', warranty: '36TH' },
      { key: 'VGA', name: 'RTX 4080 Super 16GB', warranty: '36TH' },
      { key: 'RAM', name: '64GB DDR5 6400MHz', warranty: '36TH' }
    ],
    category: 'pc-do-hoa',
    categoryName: 'PC ĐỒ HỌA',
    brand: 'AMD'
  }
];

export const getProductById = (id?: string): Product => {
  if (!id) return mockProducts[0];
  const found = mockProducts.find(p => p.id === id);
  return found || mockProducts[0];
};
