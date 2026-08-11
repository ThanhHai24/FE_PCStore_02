import type { ApiProduct } from '../../types/apiProduct';

export interface FilterCriteria {
  key: string;
  title: string;
  options: string[];
}

export interface CategoryFilterConfig {
  categorySlugKeys: string[];
  categoryName: string;
  criteria: FilterCriteria[];
}

export const categoryFilterConfigs: CategoryFilterConfig[] = [
  // 1. CPU - Bộ vi xử lý
  {
    categorySlugKeys: ['cpu', 'cpu-bo-vi-xu-ly', 'bo-vi-xu-ly'],
    categoryName: 'CPU - Bộ Vi Xử Lý',
    criteria: [
      { key: 'cpuLine', title: 'Dòng CPU', options: ['Core i3', 'Core i5', 'Core i7', 'Core i9', 'Core Ultra 7', 'Core Ultra 9', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9'] },
      { key: 'socket', title: 'Loại Socket', options: ['LGA1700', 'LGA1851', 'AM4', 'AM5'] },
      { key: 'cores', title: 'Số nhân CPU', options: ['4 Nhân', '6 Nhân', '8 Nhân', '12 Nhân', '14 Nhân', '16 Nhân', '20 Nhân', '24 Nhân'] },
      { key: 'power', title: 'TDP / Công suất', options: ['65W', '125W', '180W+'] },
    ],
  },
  // 2. VGA - Card màn hình
  {
    categorySlugKeys: ['vga', 'vga-card-do-hoa', 'card-man-hinh', 'card-do-hoa'],
    categoryName: 'VGA - Card Đồ Họa',
    criteria: [
      { key: 'gpu', title: 'Dòng Chipset VGA', options: ['RTX 3050', 'RTX 4060', 'RTX 4060 Ti', 'RTX 4070', 'RTX 4070 Super', 'RTX 4080 Super', 'RTX 4090', 'RX 6600', 'RX 7600'] },
      { key: 'vram', title: 'Dung lượng VRAM', options: ['4GB', '6GB', '8GB', '12GB', '16GB', '24GB'] },
      { key: 'series', title: 'Dòng sản phẩm', options: ['ROG Strix', 'TUF Gaming', 'Gaming X', 'VENTUS', 'Dual', 'Eagle'] },
    ],
  },
  // 3. RAM - Bộ nhớ trong
  {
    categorySlugKeys: ['ram', 'ram-bo-nho-trong', 'bo-nho-trong'],
    categoryName: 'RAM - Bộ Nhớ Trong',
    criteria: [
      { key: 'ramType', title: 'Loại RAM', options: ['DDR4', 'DDR5'] },
      { key: 'ramSize', title: 'Dung lượng RAM', options: ['8GB', '16GB', '32GB', '64GB', '128GB'] },
      { key: 'ramBus', title: 'Tốc độ Bus RAM', options: ['3200MHz', '3600MHz', '4800MHz', '5200MHz', '5600MHz', '6000MHz'] },
    ],
  },
  // 4. Mainboard - Bo mạch chủ
  {
    categorySlugKeys: ['mainboard', 'mainboard-bo-mach-chu', 'bo-mach-chu', 'main'],
    categoryName: 'Mainboard - Bo Mạch Chủ',
    criteria: [
      { key: 'chipset', title: 'Mainboard Chipset', options: ['Z790', 'B760', 'H610', 'Z890', 'X870E', 'B650', 'X670', 'A620'] },
      { key: 'socket', title: 'Loại Socket', options: ['LGA1700', 'LGA1851', 'AM5', 'AM4'] },
      { key: 'formFactor', title: 'Chuẩn Kích Thước', options: ['ATX', 'Micro-ATX', 'Mini-ITX'] },
      { key: 'ramType', title: 'Chuẩn RAM Hỗ Trợ', options: ['DDR4', 'DDR5'] },
    ],
  },
  // 5. Ổ cứng HDD / SSD
  {
    categorySlugKeys: ['storage', 'o-cung-hdd-ssd', 'ssd', 'hdd', 'o-cung'],
    categoryName: 'Ổ Cứng - SSD / HDD',
    criteria: [
      { key: 'storageType', title: 'Loại Ổ Cứng', options: ['SSD M.2 NVMe', 'SSD SATA', 'HDD 3.5"'] },
      { key: 'capacity', title: 'Dung Lượng', options: ['256GB', '512GB', '1TB', '2TB', '4TB'] },
      { key: 'interface', title: 'Chuẩn Giao Tiếp', options: ['PCIe Gen 3', 'PCIe Gen 4', 'PCIe Gen 5', 'SATA 3'] },
    ],
  },
  // 6. PSU - Nguồn máy tính
  {
    categorySlugKeys: ['psu', 'psu-nguon-may-tinh', 'nguon-may-tinh', 'nguon'],
    categoryName: 'PSU - Nguồn Máy Tính',
    criteria: [
      { key: 'power', title: 'Công Suất Nguồn', options: ['450W - 550W', '600W - 750W', '800W - 1000W', 'Trên 1000W'] },
      { key: 'efficiency', title: 'Chuẩn Hiệu Suất', options: ['80 Plus Bronze', '80 Plus Gold', '80 Plus Platinum', '80 Plus Titanium'] },
      { key: 'modularity', title: 'Kiểu Dây', options: ['Full Modular', 'Semi Modular', 'Cáp liền (Non-Modular)'] },
    ],
  },
  // 7. Case - Vỏ máy tính
  {
    categorySlugKeys: ['case', 'case-vo-may-tinh', 'vo-may-tinh'],
    categoryName: 'Case - Vỏ Máy Tính',
    criteria: [
      { key: 'caseSize', title: 'Kích Thước Case', options: ['Mid Tower', 'Full Tower', 'Mini ITX', 'Bể kính 2 mặt'] },
      { key: 'color', title: 'Màu Sắc', options: ['Đen', 'Trắng', 'Hồng'] },
      { key: 'motherboardSupport', title: 'Hỗ Trợ Mainboard', options: ['E-ATX', 'ATX', 'Micro-ATX', 'ITX'] },
    ],
  },
  // 8. Tản nhiệt CPU
  {
    categorySlugKeys: ['tan-nhiet-cpu', 'cooling', 'quat-tan-nhiet'],
    categoryName: 'Tản Nhiệt PC',
    criteria: [
      { key: 'coolingType', title: 'Loại Tản Nhiệt', options: ['Tản nhiệt nước AIO', 'Tản nhiệt khí', 'Quạt tản nhiệt Case', 'Tản nhiệt Custom'] },
      { key: 'radSize', title: 'Kích Thước Radiator', options: ['120mm', '240mm', '280mm', '360mm'] },
    ],
  },
  // 9. Laptop
  {
    categorySlugKeys: ['laptop', 'laptop-gaming', 'laptop-van-phong', 'laptop-do-hoa'],
    categoryName: 'Laptop',
    criteria: [
      { key: 'cpuLine', title: 'Dòng CPU Laptop', options: ['Core i5', 'Core i7', 'Core i9', 'Core Ultra', 'Ryzen 5', 'Ryzen 7', 'Apple M'] },
      { key: 'screenSize', title: 'Kích Thước Màn Hình', options: ['13.3 inch', '14.0 inch', '15.6 inch', '16.0 inch', '17.3 inch'] },
      { key: 'gpu', title: 'Card Đồ Họa', options: ['RTX 3050', 'RTX 4050', 'RTX 4060', 'RTX 4070', 'Card tích hợp'] },
      { key: 'ramSize', title: 'Dung Lượng RAM', options: ['8GB', '16GB', '32GB', '64GB'] },
    ],
  },
  // 10. Màn hình
  {
    categorySlugKeys: ['man-hinh', 'monitor'],
    categoryName: 'Màn Hình Máy Tính',
    criteria: [
      { key: 'screenSize', title: 'Kích Thước Màn Hình', options: ['24 inch', '27 inch', '32 inch', 'Ultrawide / Cong'] },
      { key: 'refreshRate', title: 'Tần Số Quét', options: ['75Hz', '100Hz', '144Hz - 180Hz', '240Hz+'] },
      { key: 'resolution', title: 'Độ Phân Giải', options: ['FHD (1080p)', '2K QHD (1440p)', '4K UHD (2160p)'] },
      { key: 'panel', title: 'Tấm Nền', options: ['IPS', 'VA', 'OLED', 'TN'] },
    ],
  },
  // 11. Phụ kiện & Thiết bị ngoại vi
  {
    categorySlugKeys: ['thiet-bi-ngoai-vi', 'ban-phim', 'chuot', 'tai-nghe', 'phu-kien-cap'],
    categoryName: 'Thiết Bị Ngoại Vi',
    criteria: [
      { key: 'deviceType', title: 'Loại Thiết Bị', options: ['Bàn phím cơ', 'Chuột Gaming', 'Chuột không dây', 'Tai nghe Gaming', 'Loa computer'] },
      { key: 'connection', title: 'Kiểu Kết Nối', options: ['Không dây (Wireless / Bluetooth)', 'Có dây (USB)'] },
    ],
  },
  // 12. PC (PC Gaming, PC Đồ Họa, PC Văn Phòng, Mini PC, PC AI)
  {
    categorySlugKeys: ['pc', 'pc-gaming', 'pc-do-hoa', 'pc-van-phong', 'mini-pc', 'pc-ai'],
    categoryName: 'Máy Tính Nguyên Bộ PC',
    criteria: [
      { key: 'pcPurpose', title: 'Nhu Cầu Sử Dụng', options: ['PC Gaming', 'PC Đồ Họa - Render', 'PC Văn Phòng', 'PC AI Workstation'] },
      { key: 'cpuLine', title: 'Dòng CPU', options: ['Core i3', 'Core i5', 'Core i7', 'Core i9', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9'] },
      { key: 'gpu', title: 'Card Đồ Họa VGA', options: ['RTX 3060', 'RTX 4060', 'RTX 4070', 'RTX 4080', 'Card tích hợp'] },
      { key: 'ramSize', title: 'Dung Lượng RAM', options: ['16GB', '32GB', '64GB'] },
    ],
  },
];

export const defaultCategoryFilterConfig: CategoryFilterConfig = {
  categorySlugKeys: [],
  categoryName: 'Tất Cả Sản Phẩm',
  criteria: [
    { key: 'cpuLine', title: 'Dòng CPU', options: ['Core i5', 'Core i7', 'Core Ultra', 'Ryzen 7', 'Ryzen 9'] },
    { key: 'gpu', title: 'VGA / Card đồ họa', options: ['RTX 4060', 'RTX 4070 Super', 'RTX 4080 Super', 'RTX 4090'] },
    { key: 'ramSize', title: 'Dung lượng RAM', options: ['16GB', '32GB', '64GB'] },
    { key: 'storage', title: 'Ổ cứng SSD', options: ['512GB SSD', '1TB NVMe', '2TB NVMe'] },
  ],
};

export function getCategoryFilterConfig(categoryKey?: string | null): CategoryFilterConfig {
  if (!categoryKey) return defaultCategoryFilterConfig;

  const normalized = categoryKey.toLowerCase().trim();

  for (const config of categoryFilterConfigs) {
    if (config.categorySlugKeys.some((k) => normalized.includes(k) || k.includes(normalized))) {
      return config;
    }
  }

  return defaultCategoryFilterConfig;
}

export function checkProductMatchesFilter(product: ApiProduct, filterKey: string, filterValue: string): boolean {
  if (!filterValue) return true;

  const filterValLower = filterValue.toLowerCase().trim();
  const prodNameLower = (product.name || '').toLowerCase();
  const shortDescLower = (product.shortDescription || '').toLowerCase();

  let specsText = '';
  if (Array.isArray(product.specifications)) {
    specsText = product.specifications.map((s) => `${s.key || ''} ${s.value || ''}`).join(' ').toLowerCase();
  } else if (typeof product.specifications === 'object' && product.specifications !== null) {
    specsText = JSON.stringify(product.specifications).toLowerCase();
  }

  const fullSearchText = `${prodNameLower} ${shortDescLower} ${specsText}`;

  if (filterKey === 'cpuLine') {
    if (filterValLower.includes('i3')) return fullSearchText.includes('i3');
    if (filterValLower.includes('i5')) return fullSearchText.includes('i5');
    if (filterValLower.includes('i7')) return fullSearchText.includes('i7');
    if (filterValLower.includes('i9')) return fullSearchText.includes('i9');
    if (filterValLower.includes('ultra')) return fullSearchText.includes('ultra');
    if (filterValLower.includes('ryzen 5')) return fullSearchText.includes('ryzen 5') || fullSearchText.includes('r5');
    if (filterValLower.includes('ryzen 7')) return fullSearchText.includes('ryzen 7') || fullSearchText.includes('r7');
    if (filterValLower.includes('ryzen 9')) return fullSearchText.includes('ryzen 9') || fullSearchText.includes('r9');
  }

  if (filterKey === 'ramSize' || filterKey === 'vram') {
    const digits = filterValLower.replace(/\D/g, '');
    if (digits) {
      return fullSearchText.includes(`${digits}gb`) || fullSearchText.includes(`${digits} gb`) || fullSearchText.includes(`${digits}g`);
    }
  }

  if (filterKey === 'capacity' || filterKey === 'storageCapacity') {
    const isTb = filterValLower.includes('tb');
    const digits = filterValLower.replace(/\D/g, '');
    if (isTb) {
      return fullSearchText.includes(`${digits}tb`) || fullSearchText.includes(`${digits} tb`);
    } else if (digits) {
      return fullSearchText.includes(`${digits}gb`) || fullSearchText.includes(`${digits} gb`);
    }
  }

  if (filterKey === 'gpu') {
    const digits = filterValLower.replace(/[^0-9]/g, '');
    if (digits && digits.length >= 4) {
      return fullSearchText.includes(digits);
    }
  }

  if (filterKey === 'screenSize') {
    const digits = filterValLower.split(' ')[0];
    if (digits) return fullSearchText.includes(digits);
  }

  const cleanedVal = filterValLower
    .replace(/(nhân|luồng|bộ vi xử lý|card|màn hình|chuẩn|loại|dung lượng|dòng)/gi, '')
    .trim();

  if (cleanedVal.length > 0) {
    return fullSearchText.includes(cleanedVal);
  }

  return fullSearchText.includes(filterValLower);
}
