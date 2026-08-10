/** Field types for dynamic spec forms */
export type SpecInputType = 'text' | 'select' | 'number';

export interface SpecField {
  key: string;          // internal key (used as spec name)
  label: string;        // Vietnamese display label
  type: SpecInputType;
  options?: string[];   // for select type
  placeholder?: string;
  unit?: string;        // appended to placeholder
  required?: boolean;
  group?: string;       // visual grouping header
}

/* ─────────────────── Common select options ─────────────────── */

export const OPT_CPU_SOCKET = [
  'Intel LGA1851', 'Intel LGA1700', 'Intel LGA1200', 'Intel LGA1151',
  'Intel LGA1150', 'Intel LGA2011', 'Intel LGA4677',
  'AMD AM5', 'AMD AM4', 'AMD AM3+', 'AMD sTRX50', 'AMD sTRX40', 'AMD SP5',
];

export const OPT_RAM_TYPE = ['DDR4', 'DDR5', 'DDR4 / DDR5', 'DDR3', 'LPDDR5', 'LPDDR4X'];

export const OPT_RAM_CHANNEL = ['Single Channel', 'Dual Channel', 'Quad Channel'];

export const OPT_PCIE_VER = ['PCIe 3.0', 'PCIe 4.0', 'PCIe 5.0', 'PCIe 3.0 / 4.0'];

export const OPT_XMP = ['Không hỗ trợ', 'Intel XMP 2.0', 'Intel XMP 3.0', 'AMD EXPO', 'Intel XMP 3.0 / AMD EXPO'];

export const OPT_MB_FORMFACTOR = ['ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX', 'SSI-EEB', 'SSI-CEB'];

export const OPT_MB_DIMM = ['2', '4', '6', '8'];

export const OPT_MB_MAXRAM = ['32GB', '64GB', '128GB', '192GB', '256GB', '512GB'];

export const OPT_MB_LAN = ['1GbE', '2.5GbE', '2x 2.5GbE', '5GbE', '10GbE', '2x 10GbE'];

export const OPT_WIFI = ['Không có', 'Wi-Fi 5 (802.11ac)', 'Wi-Fi 6 (802.11ax)', 'Wi-Fi 6E (802.11ax)', 'Wi-Fi 7 (802.11be)'];

export const OPT_ECC = ['Non-ECC', 'ECC', 'On-Die ECC', 'ECC Registered (RDIMMs)'];

export const OPT_RAM_BUFFER = ['Unbuffered (UDIMM)', 'Registered (RDIMM)', 'Load-Reduced (LRDIMM)'];

export const OPT_RAM_FF = ['Desktop DIMM', 'Laptop SO-DIMM'];

export const OPT_RAM_CAP = ['4GB', '8GB', '16GB', '24GB', '32GB', '48GB', '64GB', '96GB', '128GB', '192GB', '256GB'];

export const OPT_RAM_KIT = [
  '1x 4GB', '1x 8GB', '1x 16GB', '1x 32GB', '1x 48GB', '1x 64GB',
  '2x 4GB', '2x 8GB', '2x 16GB', '2x 24GB', '2x 32GB', '2x 48GB', '2x 64GB',
  '4x 8GB', '4x 16GB', '4x 32GB', '4x 64GB',
];

export const OPT_VGA_MEMTYPE = ['GDDR6', 'GDDR6X', 'GDDR7', 'HBM2e', 'HBM3'];

export const OPT_VGA_MEMSIZE = ['2GB', '4GB', '6GB', '8GB', '10GB', '12GB', '16GB', '20GB', '24GB', '32GB', '48GB'];

export const OPT_VGA_MEMBUS = ['64-bit', '96-bit', '128-bit', '160-bit', '192-bit', '256-bit', '320-bit', '384-bit', '512-bit'];

export const OPT_VGA_SLOT = ['1.5 Slot', '2 Slot', '2.5 Slot', '3 Slot', '3.5 Slot', '4 Slot'];

export const OPT_VGA_COOLING = ['Single Fan', 'Dual Fan', 'Triple Fan', 'Quad Fan', 'Liquid Cooling'];

export const OPT_VGA_PSU_REQ = ['350W', '450W', '550W', '600W', '650W', '700W', '750W', '850W', '1000W', '1200W', '1600W'];

export const OPT_SSD_FF = ['M.2 2280', 'M.2 2242', 'M.2 22110', '2.5 inch', 'mSATA', 'PCIe Add-In-Card (AIC)'];

export const OPT_SSD_IFACE = [
  'SATA III 6Gb/s',
  'PCIe 3.0 x4 NVMe',
  'PCIe 4.0 x4 NVMe',
  'PCIe 5.0 x4 NVMe',
  'PCIe 3.0 x2 NVMe',
  'USB 3.2 Gen 2x2',
];

export const OPT_SSD_NAND = ['3D TLC NAND', '3D QLC NAND', '3D MLC NAND', 'BiCS FLASH TLC', 'BiCS FLASH QLC', 'SLC NAND'];

export const OPT_SSD_DRAM = ['Có DRAM Cache', 'HMB (Host Memory Buffer)', 'Không có DRAM (DRAMless)'];

export const OPT_SSD_CAP = [
  '120GB', '240GB', '250GB', '256GB', '480GB', '500GB', '512GB',
  '1TB', '1.5TB', '2TB', '4TB', '8TB',
];

export const OPT_HDD_FF = ['3.5 inch', '2.5 inch'];

export const OPT_HDD_IFACE = ['SATA 3 6Gb/s', 'SAS 12Gb/s', 'USB 3.0'];

export const OPT_HDD_RPM = ['5400 RPM', '5700 RPM', '5900 RPM', '7200 RPM'];

export const OPT_HDD_CACHE = ['32MB', '64MB', '128MB', '256MB', '512MB'];

export const OPT_HDD_TECH = ['CMR (Conventional Magnetic Recording)', 'SMR (Shingled Magnetic Recording)'];

export const OPT_HDD_USE = ['PC Desktop', 'Laptop', 'NAS', 'Surveillance / Camera', 'Enterprise'];

export const OPT_HDD_CAP = [
  '500GB', '1TB', '2TB', '3TB', '4TB', '6TB', '8TB', '10TB', '12TB', '14TB', '16TB', '18TB', '20TB',
];

export const OPT_PSU_WATT = ['300W', '400W', '450W', '500W', '550W', '600W', '650W', '700W', '750W', '800W', '850W', '1000W', '1200W', '1600W', '2000W'];

export const OPT_PSU_FF = ['ATX', 'SFX', 'SFX-L', 'TFX', 'Flex ATX'];

export const OPT_PSU_ATX = ['ATX 2.0 (PCIe 3.0)', 'ATX 3.0 (PCIe 5.0 / 12VHPWR)', 'ATX 3.1 (12V-2x6)'];

export const OPT_PSU_80PLUS = ['Không chứng nhận', '80 PLUS White', '80 PLUS Bronze', '80 PLUS Silver', '80 PLUS Gold', '80 PLUS Platinum', '80 PLUS Titanium'];

export const OPT_PSU_MODULAR = ['Non-Modular', 'Semi-Modular', 'Full-Modular'];

export const OPT_PSU_FAN = ['80mm', '92mm', '120mm', '135mm', '140mm', 'Không có quạt (Fanless)'];

export const OPT_CASE_TYPE = ['Mini-ITX', 'Micro-ATX', 'Mid Tower', 'Full Tower', 'HTPC', 'Open Frame'];

export const OPT_CASE_PANEL = ['Tempered Glass', 'Mesh + Tempered Glass', 'Mesh', 'Thép (SPCC)', 'Nhôm', 'Acrylic'];

export const OPT_CASE_MB = ['Mini-ITX', 'Micro-ATX', 'ATX', 'E-ATX', 'ATX / Micro-ATX / Mini-ITX', 'E-ATX / ATX / Micro-ATX / Mini-ITX'];

export const OPT_CASE_COLOR = ['Đen', 'Trắng', 'Trắng / Đen', 'Xám', 'Bạc', 'Đỏ', 'Xanh dương'];

export const OPT_COOLER_TYPE = [
  'Tản nhiệt khí (Air Cooler)',
  'Tản nhiệt nước AIO 120mm',
  'Tản nhiệt nước AIO 240mm',
  'Tản nhiệt nước AIO 280mm',
  'Tản nhiệt nước AIO 360mm',
  'Tản nhiệt nước AIO 420mm',
  'Tản nhiệt nước Custom Loop',
];

export const OPT_COOLER_FAN_SIZE = ['80mm', '92mm', '120mm x1', '120mm x2', '120mm x3', '140mm x1', '140mm x2', '140mm x3'];

export const OPT_COOLER_BEARING = ['Hydraulic Bearing', 'FDB (Fluid Dynamic Bearing)', 'Dual Ball Bearing', 'Sleeve Bearing', 'Magnetic Levitation'];

export const OPT_COOLER_CONNECTOR = ['3-Pin DC', '4-Pin PWM', '4-Pin PWM + 3-Pin ARGB'];

export const OPT_RGB = ['Không có', 'RGB', 'ARGB (3-Pin 5V)', 'ARGB + RGB', 'ARGB tương thích ASUS AURA / MSI Mystic Light / Gigabyte Fusion'];

export const OPT_HEATSINK = ['Không có tản nhiệt', 'Tản nhiệt thấp (Low Profile)', 'Tản nhiệt chuẩn', 'Tản nhiệt cao (High Profile)'];

export const OPT_YES_NO = ['Có', 'Không'];

export const OPT_OVERCLOCKING = ['Có (Unlocked)', 'Không (Locked)'];

export const OPT_IGPU = ['Không có iGPU', 'Intel UHD Graphics', 'Intel Iris Xe Graphics', 'Intel Arc Graphics', 'AMD Radeon Graphics', 'AMD RDNA 2', 'AMD RDNA 3'];

/* ─────────────────── Spec field definitions per category ─────────────────── */

export type CategoryType = 'CPU' | 'Mainboard' | 'RAM' | 'VGA' | 'SSD' | 'HDD' | 'PSU' | 'Case' | 'Cooler' | 'PC' | 'Monitor' | 'Keyboard' | 'Mouse' | 'Headset' | 'Generic';

export const SPEC_TEMPLATES: Record<CategoryType, SpecField[]> = {

  /** ── CPU ── */
  CPU: [
    { key: 'Dòng sản phẩm', label: 'Dòng sản phẩm (Series)', type: 'text', placeholder: 'VD: Core Ultra 9, Ryzen 9, Core i9', group: 'Thông tin sản phẩm' },
    { key: 'Model / SKU', label: 'Tên Model / Mã sản phẩm', type: 'text', placeholder: 'VD: Core i9-14900K, Ryzen 9 9950X', required: true },
    { key: 'Socket CPU', label: 'Socket CPU', type: 'select', options: OPT_CPU_SOCKET, required: true },
    { key: 'Tổng số nhân', label: 'Tổng số nhân / Lõi', type: 'number', placeholder: 'VD: 24', unit: 'nhân', group: 'Hiệu năng' },
    { key: 'Số nhân P-core', label: 'Số nhân P-core (Hiệu năng cao)', type: 'number', placeholder: 'VD: 8', unit: 'nhân' },
    { key: 'Số nhân E-core', label: 'Số nhân E-core (Tiết kiệm điện)', type: 'number', placeholder: 'VD: 16', unit: 'nhân' },
    { key: 'Tổng số luồng', label: 'Tổng số luồng (Threads)', type: 'number', placeholder: 'VD: 32', unit: 'luồng' },
    { key: 'Xung nhịp cơ bản', label: 'Xung nhịp cơ bản (Base Clock)', type: 'text', placeholder: 'VD: 3.2 GHz' },
    { key: 'Xung nhịp Turbo', label: 'Xung nhịp Turbo tối đa', type: 'text', placeholder: 'VD: 6.0 GHz' },
    { key: 'Cache L3', label: 'Bộ nhớ đệm L3 / Smart Cache', type: 'text', placeholder: 'VD: 36MB', unit: 'MB' },
    { key: 'Loại RAM hỗ trợ', label: 'Loại RAM hỗ trợ', type: 'select', options: OPT_RAM_TYPE, group: 'Bộ nhớ & Giao tiếp' },
    { key: 'Tốc độ RAM hỗ trợ', label: 'Tốc độ RAM hỗ trợ tối đa', type: 'text', placeholder: 'VD: DDR5-5600 MHz' },
    { key: 'Số kênh bộ nhớ', label: 'Số kênh bộ nhớ', type: 'select', options: OPT_RAM_CHANNEL },
    { key: 'Ép xung', label: 'Khả năng ép xung', type: 'select', options: OPT_OVERCLOCKING },
    { key: 'Phiên bản PCIe', label: 'Phiên bản PCI Express', type: 'select', options: OPT_PCIE_VER },
    { key: 'TDP cơ bản', label: 'TDP / Công suất cơ bản', type: 'text', placeholder: 'VD: 125W', unit: 'W', group: 'Điện & Sản xuất' },
    { key: 'TDP tối đa', label: 'Công suất tối đa (MTP)', type: 'text', placeholder: 'VD: 253W', unit: 'W' },
    { key: 'Tiến trình', label: 'Tiến trình sản xuất', type: 'text', placeholder: 'VD: Intel 4 (7nm), TSMC 4nm' },
    { key: 'Đồ họa tích hợp', label: 'Đồ họa tích hợp (iGPU)', type: 'select', options: OPT_IGPU },
  ],

  /** ── Mainboard ── */
  Mainboard: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: ASUS, MSI, Gigabyte, ASRock', group: 'Thông tin sản phẩm' },
    { key: 'Model / SKU', label: 'Tên Model / Mã sản phẩm', type: 'text', placeholder: 'VD: ROG MAXIMUS Z890 EXTREME', required: true },
    { key: 'Form Factor', label: 'Chuẩn bo mạch (Form Factor)', type: 'select', options: OPT_MB_FORMFACTOR, required: true },
    { key: 'Chipset', label: 'Chipset', type: 'text', placeholder: 'VD: Intel Z890, AMD X870E', required: true },
    { key: 'Socket CPU', label: 'Socket CPU', type: 'select', options: OPT_CPU_SOCKET, required: true },
    { key: 'Loại RAM', label: 'Loại RAM hỗ trợ', type: 'select', options: OPT_RAM_TYPE, group: 'Bộ nhớ' },
    { key: 'Số khe RAM', label: 'Số khe cắm RAM (DIMM)', type: 'select', options: OPT_MB_DIMM },
    { key: 'RAM tối đa', label: 'Dung lượng RAM tối đa', type: 'select', options: OPT_MB_MAXRAM },
    { key: 'Tốc độ RAM', label: 'Tốc độ RAM hỗ trợ', type: 'text', placeholder: 'VD: DDR5-9400+(OC)' },
    { key: 'Chuẩn XMP/EXPO', label: 'Chuẩn ép xung RAM (XMP/EXPO)', type: 'select', options: OPT_XMP },
    { key: 'Số khe M.2', label: 'Số khe M.2 NVMe', type: 'number', placeholder: 'VD: 4', unit: 'khe', group: 'Lưu trữ' },
    { key: 'Số cổng SATA', label: 'Số cổng SATA', type: 'number', placeholder: 'VD: 6', unit: 'cổng' },
    { key: 'Cổng LAN', label: 'Cổng mạng LAN', type: 'select', options: OPT_MB_LAN, group: 'Kết nối' },
    { key: 'Wi-Fi / Bluetooth', label: 'Wi-Fi / Bluetooth', type: 'select', options: OPT_WIFI },
    { key: 'Cổng USB sau', label: 'Cổng USB phía sau (Back Panel)', type: 'text', placeholder: 'VD: 4x USB-A 3.2 Gen2, 2x USB-C 3.2 Gen2x2' },
    { key: 'Cổng xuất hình', label: 'Cổng xuất hình (Display Output)', type: 'text', placeholder: 'VD: 1x HDMI 2.1, 1x DisplayPort 2.1' },
    { key: 'Chip âm thanh', label: 'Chip xử lý âm thanh (Audio Codec)', type: 'text', placeholder: 'VD: Realtek ALC4082, ALC1220' },
    { key: 'Đầu cắm nguồn CPU', label: 'Đầu cắm nguồn CPU (EPS)', type: 'text', placeholder: 'VD: 2x 8-pin (16-pin tổng)' },
    { key: 'Đèn LED lỗi', label: 'Đèn LED báo lỗi', type: 'text', placeholder: 'VD: EZ Debug LED (CPU, DRAM, VGA, BOOT)' },
  ],

  /** ── RAM ── */
  RAM: [
    { key: 'Dòng sản phẩm', label: 'Dòng sản phẩm (Series)', type: 'text', placeholder: 'VD: Trident Z5 RGB, Vengeance RGB', group: 'Thông tin sản phẩm' },
    { key: 'Model / SKU', label: 'Tên Model / Mã sản phẩm', type: 'text', placeholder: 'VD: F5-6000J3040G16GX2-TZ5RK', required: true },
    { key: 'Form Factor', label: 'Chuẩn (Form Factor)', type: 'select', options: OPT_RAM_FF, required: true },
    { key: 'Loại bộ nhớ', label: 'Loại bộ nhớ (Memory Type)', type: 'select', options: OPT_RAM_TYPE, required: true },
    { key: 'Tổng dung lượng', label: 'Tổng dung lượng', type: 'select', options: OPT_RAM_CAP, required: true },
    { key: 'Cấu hình Kit', label: 'Cấu hình Kit', type: 'select', options: OPT_RAM_KIT },
    { key: 'Tốc độ Bus', label: 'Tốc độ Bus (MHz)', type: 'text', placeholder: 'VD: DDR5-6000 / 6000 MHz', required: true, group: 'Hiệu năng' },
    { key: 'Latency / Timing', label: 'Độ trễ / Timings', type: 'text', placeholder: 'VD: CL30-36-36-96' },
    { key: 'Điện áp', label: 'Điện áp hoạt động', type: 'text', placeholder: 'VD: 1.35V' },
    { key: 'XMP / EXPO', label: 'Chuẩn ép xung (XMP/EXPO)', type: 'select', options: OPT_XMP },
    { key: 'ECC', label: 'Sửa lỗi bộ nhớ (ECC)', type: 'select', options: OPT_ECC, group: 'Tính năng' },
    { key: 'Chuẩn đệm', label: 'Chuẩn đệm bộ nhớ', type: 'select', options: OPT_RAM_BUFFER },
    { key: 'Tản nhiệt', label: 'Tản nhiệt (Heatsink)', type: 'select', options: OPT_HEATSINK },
    { key: 'RGB', label: 'Đèn LED / RGB', type: 'select', options: OPT_RGB },
    { key: 'Chiều cao', label: 'Chiều cao thanh RAM', type: 'text', placeholder: 'VD: 44.5mm', unit: 'mm' },
  ],

  /** ── VGA ── */
  VGA: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu VGA', type: 'text', placeholder: 'VD: ASUS, MSI, Gigabyte, Zotac', group: 'Thông tin sản phẩm' },
    { key: 'GPU / Chipset', label: 'Bộ xử lý đồ họa (GPU)', type: 'text', placeholder: 'VD: NVIDIA GeForce RTX 4090', required: true },
    { key: 'Kiến trúc GPU', label: 'Kiến trúc GPU', type: 'text', placeholder: 'VD: Ada Lovelace, RDNA 4' },
    { key: 'Phiên bản Bus', label: 'Chuẩn giao tiếp Bus', type: 'select', options: OPT_PCIE_VER },
    { key: 'Số nhân CUDA', label: 'Số nhân xử lý (CUDA / Shaders)', type: 'number', placeholder: 'VD: 16384', group: 'Hiệu năng' },
    { key: 'Xung nhịp Boost', label: 'Xung nhịp Boost tối đa', type: 'text', placeholder: 'VD: 2520 MHz' },
    { key: 'Dung lượng VRAM', label: 'Dung lượng bộ nhớ (VRAM)', type: 'select', options: OPT_VGA_MEMSIZE, required: true },
    { key: 'Loại VRAM', label: 'Loại bộ nhớ (Memory Type)', type: 'select', options: OPT_VGA_MEMTYPE, required: true },
    { key: 'Memory Bus', label: 'Băng thông bộ nhớ (Memory Bus)', type: 'select', options: OPT_VGA_MEMBUS },
    { key: 'Tốc độ bộ nhớ', label: 'Tốc độ bộ nhớ', type: 'text', placeholder: 'VD: 21 Gbps' },
    { key: 'Cổng HDMI', label: 'Cổng HDMI', type: 'text', placeholder: 'VD: 2x HDMI 2.1a', group: 'Kết nối & Kích thước' },
    { key: 'Cổng DisplayPort', label: 'Cổng DisplayPort', type: 'text', placeholder: 'VD: 3x DisplayPort 1.4a' },
    { key: 'Độ dày khe cắm', label: 'Độ dày (Slot)', type: 'select', options: OPT_VGA_SLOT },
    { key: 'Kích thước card', label: 'Kích thước Card (Dài x Rộng x Cao)', type: 'text', placeholder: 'VD: 357 x 149 x 77 mm' },
    { key: 'Đầu cắm nguồn phụ', label: 'Đầu cắm nguồn phụ (Power Connector)', type: 'text', placeholder: 'VD: 1x 16-pin 12VHPWR, 3x 8-pin' },
    { key: 'PSU đề xuất', label: 'Công suất PSU đề xuất', type: 'select', options: OPT_VGA_PSU_REQ },
    { key: 'Hệ thống làm mát', label: 'Hệ thống làm mát', type: 'select', options: OPT_VGA_COOLING, group: 'Tính năng' },
    { key: 'RGB', label: 'Đèn LED / RGB', type: 'select', options: OPT_RGB },
    { key: 'Công nghệ hỗ trợ', label: 'Công nghệ đặc biệt (DLSS/FSR/Ray Tracing)', type: 'text', placeholder: 'VD: DLSS 3, Ray Tracing, Reflex, HDCP 2.3' },
  ],

  /** ── SSD ── */
  SSD: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: Samsung, WD, Crucial, Kingston', group: 'Thông tin sản phẩm' },
    { key: 'Dòng sản phẩm', label: 'Dòng sản phẩm (Series)', type: 'text', placeholder: 'VD: 990 Pro, SN850X, T500, KC3000' },
    { key: 'Model / SKU', label: 'Tên Model / Mã sản phẩm', type: 'text', placeholder: 'VD: MZ-V9P1T0BW', required: true },
    { key: 'Form Factor', label: 'Chuẩn kích thước (Form Factor)', type: 'select', options: OPT_SSD_FF, required: true },
    { key: 'Dung lượng', label: 'Dung lượng lưu trữ', type: 'select', options: OPT_SSD_CAP, required: true },
    { key: 'Chuẩn giao tiếp', label: 'Chuẩn giao tiếp / Interface', type: 'select', options: OPT_SSD_IFACE, required: true },
    { key: 'Loại NAND', label: 'Loại chip nhớ FLASH (NAND)', type: 'select', options: OPT_SSD_NAND },
    { key: 'DRAM Cache', label: 'Bộ nhớ đệm DRAM Cache', type: 'select', options: OPT_SSD_DRAM },
    { key: 'Tốc độ đọc', label: 'Tốc độ đọc tuần tự', type: 'text', placeholder: 'VD: 7450 MB/s', unit: 'MB/s', group: 'Hiệu năng' },
    { key: 'Tốc độ ghi', label: 'Tốc độ ghi tuần tự', type: 'text', placeholder: 'VD: 6900 MB/s', unit: 'MB/s' },
    { key: 'Đọc ngẫu nhiên 4K', label: 'Tốc độ đọc ngẫu nhiên 4K', type: 'text', placeholder: 'VD: 1.4M IOPS', unit: 'IOPS' },
    { key: 'Ghi ngẫu nhiên 4K', label: 'Tốc độ ghi ngẫu nhiên 4K', type: 'text', placeholder: 'VD: 1.4M IOPS', unit: 'IOPS' },
    { key: 'TBW', label: 'Độ bền (TBW)', type: 'text', placeholder: 'VD: 600 TBW', unit: 'TBW', group: 'Độ bền & Bảo hành' },
    { key: 'MTBF', label: 'Thời gian giữa lỗi (MTBF)', type: 'text', placeholder: 'VD: 1.5 triệu giờ' },
    { key: 'Tản nhiệt', label: 'Tản nhiệt đi kèm', type: 'select', options: ['Không có', 'Có tản nhiệt kèm theo'] },
  ],

  /** ── HDD ── */
  HDD: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: Seagate, WD, Toshiba', group: 'Thông tin sản phẩm' },
    { key: 'Dòng sản phẩm', label: 'Dòng sản phẩm (Series)', type: 'text', placeholder: 'VD: BarraCuda, WD Blue, P300' },
    { key: 'Model / SKU', label: 'Tên Model / Mã sản phẩm', type: 'text', placeholder: 'VD: ST2000DM008', required: true },
    { key: 'Dung lượng', label: 'Dung lượng lưu trữ', type: 'select', options: OPT_HDD_CAP, required: true },
    { key: 'Form Factor', label: 'Chuẩn kích thước (Form Factor)', type: 'select', options: OPT_HDD_FF, required: true },
    { key: 'Chuẩn giao tiếp', label: 'Chuẩn giao tiếp / Interface', type: 'select', options: OPT_HDD_IFACE, required: true },
    { key: 'Tốc độ vòng quay', label: 'Tốc độ vòng quay (RPM)', type: 'select', options: OPT_HDD_RPM },
    { key: 'Bộ nhớ đệm Cache', label: 'Bộ nhớ đệm Cache', type: 'select', options: OPT_HDD_CACHE },
    { key: 'Công nghệ ghi', label: 'Công nghệ ghi dữ liệu', type: 'select', options: OPT_HDD_TECH },
    { key: 'Mục đích sử dụng', label: 'Mục đích sử dụng', type: 'select', options: OPT_HDD_USE },
    { key: 'MTBF', label: 'Thời gian giữa lỗi (MTBF)', type: 'text', placeholder: 'VD: 1.000.000 giờ', group: 'Độ bền' },
    { key: 'Tốc độ truyền', label: 'Tốc độ truyền dữ liệu tối đa', type: 'text', placeholder: 'VD: 220 MB/s' },
  ],

  /** ── PSU ── */
  PSU: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: Seasonic, Corsair, be quiet!, EVGA', group: 'Thông tin sản phẩm' },
    { key: 'Dòng sản phẩm', label: 'Dòng sản phẩm (Series)', type: 'text', placeholder: 'VD: Focus GX, RM Series, PRIME' },
    { key: 'Model / SKU', label: 'Mã sản phẩm / SKU', type: 'text', required: true },
    { key: 'Công suất', label: 'Công suất danh định', type: 'select', options: OPT_PSU_WATT, required: true },
    { key: 'Form Factor', label: 'Kích thước (Form Factor)', type: 'select', options: OPT_PSU_FF, required: true },
    { key: 'Chuẩn ATX', label: 'Chuẩn nguồn ATX', type: 'select', options: OPT_PSU_ATX },
    { key: '80 PLUS', label: 'Chứng chỉ 80 PLUS', type: 'select', options: OPT_PSU_80PLUS },
    { key: 'Kiểu cáp', label: 'Kiểu cáp nguồn (Modular)', type: 'select', options: OPT_PSU_MODULAR },
    { key: 'Kích thước quạt', label: 'Kích thước quạt làm mát', type: 'select', options: OPT_PSU_FAN, group: 'Làm mát' },
    { key: 'Loại ổ trục quạt', label: 'Loại ổ trục quạt', type: 'select', options: OPT_COOLER_BEARING },
    { key: 'Đầu nối MB', label: 'Đầu cắm nguồn Mainboard', type: 'text', placeholder: 'VD: 1x 24/20+4 Pin', group: 'Đầu nối' },
    { key: 'Đầu nối CPU', label: 'Đầu cắm nguồn CPU (EPS)', type: 'text', placeholder: 'VD: 2x 4+4-pin' },
    { key: 'Đầu nối PCIe', label: 'Đầu cắm PCIe (VGA)', type: 'text', placeholder: 'VD: 4x 6+2-pin, 1x 16-pin 12VHPWR' },
    { key: 'Đầu nối SATA', label: 'Đầu cắm SATA', type: 'number', placeholder: 'VD: 6', unit: 'cổng' },
    { key: 'Tính năng bảo vệ', label: 'Tính năng bảo vệ mạch', type: 'text', placeholder: 'VD: OCP, OVP, UVP, OPP, SCP, OTP' },
  ],

  /** ── Case ── */
  Case: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: NZXT, Fractal, Lian Li, ASUS', group: 'Thông tin sản phẩm' },
    { key: 'Model / SKU', label: 'Tên Model / Mã sản phẩm', type: 'text', required: true },
    { key: 'Màu sắc', label: 'Màu sắc', type: 'select', options: OPT_CASE_COLOR },
    { key: 'Loại Case', label: 'Loại Case (Form Factor)', type: 'select', options: OPT_CASE_TYPE, required: true },
    { key: 'Chất liệu', label: 'Chất liệu cấu tạo', type: 'text', placeholder: 'VD: SPCC Steel, Aluminum, Tempered Glass' },
    { key: 'Mặt hông', label: 'Tấm hông (Side Panel)', type: 'select', options: OPT_CASE_PANEL },
    { key: 'Bo mạch hỗ trợ', label: 'Chuẩn Bo mạch hỗ trợ', type: 'select', options: OPT_CASE_MB },
    { key: 'I/O Panel', label: 'Cổng kết nối mặt trước (I/O)', type: 'text', placeholder: 'VD: 2x USB-A 3.0, 1x USB-C 3.2, HD-Audio' },
    { key: 'Khe PCI', label: 'Số khe cắm mở rộng PCI', type: 'number', placeholder: 'VD: 7', unit: 'khe', group: 'Dung lượng' },
    { key: 'Khay 3.5" HDD', label: 'Khay lắp 3.5" HDD', type: 'number', placeholder: 'VD: 2', unit: 'khay' },
    { key: 'Khay 2.5" SSD', label: 'Khay lắp 2.5" SSD', type: 'number', placeholder: 'VD: 3', unit: 'khay' },
    { key: 'Quạt mặt trước', label: 'Hỗ trợ quạt mặt trước', type: 'text', placeholder: 'VD: 3x 120mm / 2x 140mm', group: 'Quạt & Tản nhiệt' },
    { key: 'Quạt mặt trên', label: 'Hỗ trợ quạt mặt trên', type: 'text', placeholder: 'VD: 3x 120mm / 2x 140mm' },
    { key: 'Quạt mặt sau', label: 'Hỗ trợ quạt mặt sau', type: 'text', placeholder: 'VD: 1x 120mm / 1x 140mm' },
    { key: 'Quạt đi kèm', label: 'Quạt đi kèm', type: 'text', placeholder: 'VD: 3x 120mm ARGB' },
    { key: 'Radiator mặt trước', label: 'Hỗ trợ Radiator mặt trước', type: 'text', placeholder: 'VD: 120 / 240 / 280 / 360mm' },
    { key: 'Radiator mặt trên', label: 'Hỗ trợ Radiator mặt trên', type: 'text', placeholder: 'VD: 240 / 280 / 360mm' },
    { key: 'Dài VGA tối đa', label: 'Chiều dài VGA tối đa', type: 'text', placeholder: 'VD: 400mm', unit: 'mm' },
    { key: 'Cao CPU tối đa', label: 'Chiều cao Cooler CPU tối đa', type: 'text', placeholder: 'VD: 165mm', unit: 'mm' },
    { key: 'Dài PSU tối đa', label: 'Chiều dài PSU tối đa', type: 'text', placeholder: 'VD: 210mm', unit: 'mm' },
    { key: 'Kích thước', label: 'Kích thước (Dài x Rộng x Cao)', type: 'text', placeholder: 'VD: 495 x 235 x 495 mm' },
    { key: 'Trọng lượng', label: 'Trọng lượng', type: 'text', placeholder: 'VD: 7.5kg', unit: 'kg' },
  ],

  /** ── Cooler (Tản nhiệt) ── */
  Cooler: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: Noctua, NZXT, Lian Li, DeepCool', group: 'Thông tin sản phẩm' },
    { key: 'Model / SKU', label: 'Tên Model / Mã sản phẩm', type: 'text', required: true },
    { key: 'Loại tản nhiệt', label: 'Loại tản nhiệt', type: 'select', options: OPT_COOLER_TYPE, required: true },
    { key: 'TDP tối đa', label: 'Công suất tản nhiệt tối đa (TDP)', type: 'text', placeholder: 'VD: 250W', unit: 'W' },
    { key: 'Socket hỗ trợ', label: 'Socket CPU hỗ trợ', type: 'text', placeholder: 'VD: Intel LGA1851/1700, AMD AM5/AM4' },
    { key: 'Số quạt', label: 'Số lượng quạt đi kèm', type: 'number', placeholder: 'VD: 3', unit: 'quạt', group: 'Quạt' },
    { key: 'Kích thước quạt', label: 'Kích thước quạt', type: 'select', options: OPT_COOLER_FAN_SIZE },
    { key: 'Tốc độ quạt', label: 'Tốc độ quạt (RPM)', type: 'text', placeholder: 'VD: 300-2000 RPM' },
    { key: 'Độ ồn tối đa', label: 'Độ ồn tối đa', type: 'text', placeholder: 'VD: 38 dBA', unit: 'dBA' },
    { key: 'Loại quạt connector', label: 'Chế độ điều khiển quạt', type: 'select', options: OPT_COOLER_CONNECTOR },
    { key: 'Loại ổ trục', label: 'Loại ổ trục quạt', type: 'select', options: OPT_COOLER_BEARING },
    { key: 'RGB', label: 'Đèn LED / RGB', type: 'select', options: OPT_RGB, group: 'Tính năng' },
    { key: 'Keo tản nhiệt', label: 'Keo tản nhiệt đi kèm', type: 'select', options: OPT_YES_NO },
    { key: 'Kích thước tổng thể', label: 'Kích thước tổng thể', type: 'text', placeholder: 'VD: 120 x 27 x 394 mm (AIO Radiator)' },
    { key: 'Trọng lượng', label: 'Trọng lượng', type: 'text', placeholder: 'VD: 1.35kg', unit: 'kg' },
  ],

  /** ── PC Nguyên Bộ ── special: component selector, no manual specs */
  PC: [],

  /** ── Monitor ── */
  Monitor: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: LG, Samsung, Dell, ASUS', group: 'Thông tin sản phẩm' },
    { key: 'Model', label: 'Model / Mã sản phẩm', type: 'text', required: true },
    { key: 'Kích thước màn hình', label: 'Kích thước màn hình', type: 'text', placeholder: 'VD: 27 inch', unit: 'inch', required: true },
    { key: 'Độ phân giải', label: 'Độ phân giải (Resolution)', type: 'select', options: ['1920x1080 (Full HD)', '2560x1440 (2K/QHD)', '3840x2160 (4K/UHD)', '5120x1440 (5K/DQHD)', '7680x4320 (8K)', '2560x1080 (UWFHD)', '3440x1440 (UWQHD)'], required: true },
    { key: 'Tấm nền', label: 'Loại tấm nền (Panel)', type: 'select', options: ['IPS', 'VA', 'TN', 'OLED', 'QD-OLED', 'Mini-LED IPS', 'Fast IPS', 'Nano IPS'], required: true },
    { key: 'Tần số quét', label: 'Tần số quét (Refresh Rate)', type: 'select', options: ['60Hz', '75Hz', '100Hz', '120Hz', '144Hz', '165Hz', '240Hz', '280Hz', '360Hz', '500Hz'], required: true },
    { key: 'Thời gian phản hồi', label: 'Thời gian phản hồi (Response Time)', type: 'text', placeholder: 'VD: 1ms GtG, 0.5ms GtG' },
    { key: 'Độ sáng', label: 'Độ sáng tối đa (Brightness)', type: 'text', placeholder: 'VD: 400 cd/m²' },
    { key: 'Độ tương phản', label: 'Tỷ lệ tương phản', type: 'text', placeholder: 'VD: 1000:1, 1.000.000:1 (OLED)' },
    { key: 'Màu sắc', label: 'Độ phủ màu sắc', type: 'text', placeholder: 'VD: 99% sRGB, 95% DCI-P3' },
    { key: 'HDR', label: 'Hỗ trợ HDR', type: 'select', options: ['Không hỗ trợ', 'HDR10', 'HDR400', 'HDR600', 'HDR1000', 'HDR True Black 400', 'DisplayHDR 1400', 'Dolby Vision'] },
    { key: 'Sync', label: 'Công nghệ đồng bộ (Sync)', type: 'select', options: ['Không có', 'FreeSync', 'FreeSync Premium', 'FreeSync Premium Pro', 'G-Sync', 'G-Sync Compatible', 'G-Sync Ultimate'] },
    { key: 'Cổng kết nối', label: 'Cổng kết nối', type: 'text', placeholder: 'VD: 2x HDMI 2.1, 2x DP 1.4, 1x USB-C' },
  ],

  /** ── Keyboard ── */
  Keyboard: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', required: true, group: 'Thông tin sản phẩm' },
    { key: 'Model', label: 'Model / SKU', type: 'text', required: true },
    { key: 'Loại switch', label: 'Loại Switch', type: 'select', options: ['Cherry MX Red', 'Cherry MX Brown', 'Cherry MX Blue', 'Cherry MX Speed Silver', 'Gateron Red', 'Gateron Yellow', 'Gateron Brown', 'Razer Red', 'Razer Green', 'Optical Switch', 'Topre', 'Membrane', 'Scissor Switch'] },
    { key: 'Layout', label: 'Bố cục phím (Layout)', type: 'select', options: ['Full-size (100%)', 'TKL (80%)', '75%', '65%', '60%', '40%', 'Numpad riêng'] },
    { key: 'Kết nối', label: 'Kiểu kết nối', type: 'select', options: ['USB (Có dây)', 'Bluetooth 5.0', 'USB + Bluetooth', 'USB + 2.4GHz', 'USB + Bluetooth + 2.4GHz (Triple Mode)'] },
    { key: 'Đèn RGB', label: 'Hệ thống đèn (RGB)', type: 'select', options: OPT_RGB },
    { key: 'Hotswap', label: 'Hỗ trợ Hot-swap', type: 'select', options: OPT_YES_NO },
    { key: 'Chất liệu', label: 'Chất liệu vỏ', type: 'select', options: ['Nhựa ABS', 'Nhôm (Aluminum)', 'POM', 'Polycarbonate'] },
  ],

  /** ── Mouse ── */
  Mouse: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', required: true, group: 'Thông tin sản phẩm' },
    { key: 'Model', label: 'Model / SKU', type: 'text', required: true },
    { key: 'Sensor', label: 'Cảm biến (Sensor)', type: 'text', placeholder: 'VD: PixArt PAW3395, Razer Focus Pro' },
    { key: 'DPI tối đa', label: 'DPI tối đa', type: 'text', placeholder: 'VD: 26000 DPI', unit: 'DPI' },
    { key: 'Polling rate', label: 'Tần số polling (Hz)', type: 'select', options: ['125Hz', '250Hz', '500Hz', '1000Hz', '2000Hz', '4000Hz', '8000Hz'] },
    { key: 'Switch', label: 'Loại switch nút bấm', type: 'text', placeholder: 'VD: Razer Optical Gen-3, Omron D2FC-F-7N' },
    { key: 'Kết nối', label: 'Kiểu kết nối', type: 'select', options: ['USB (Có dây)', 'Bluetooth 5.0', 'USB + 2.4GHz', 'USB + Bluetooth + 2.4GHz'] },
    { key: 'RGB', label: 'Đèn LED / RGB', type: 'select', options: OPT_RGB },
    { key: 'Trọng lượng', label: 'Trọng lượng', type: 'text', placeholder: 'VD: 59g (không dây)', unit: 'g' },
  ],

  /** ── Headset ── */
  Headset: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', required: true, group: 'Thông tin sản phẩm' },
    { key: 'Model', label: 'Model / SKU', type: 'text', required: true },
    { key: 'Driver size', label: 'Kích thước driver', type: 'text', placeholder: 'VD: 40mm', unit: 'mm' },
    { key: 'Dải tần', label: 'Dải tần số (Hz)', type: 'text', placeholder: 'VD: 20Hz - 20kHz' },
    { key: 'Microphone', label: 'Microphone', type: 'select', options: ['Không có', 'Flip-to-mute', 'Detachable', 'Retractable', 'Boom mic'] },
    { key: 'Kết nối', label: 'Kiểu kết nối', type: 'select', options: ['3.5mm Jack', 'USB-A', 'USB-C', 'Bluetooth 5.0', 'USB + Bluetooth', '2.4GHz Wireless', 'Multi-platform'] },
    { key: 'Tiêu chuẩn âm thanh', label: 'Tiêu chuẩn âm thanh', type: 'select', options: ['Stereo', 'DTS 7.1', 'Dolby Atmos', 'THX Spatial Audio', '7.1 Surround Sound'] },
    { key: 'RGB', label: 'Đèn LED / RGB', type: 'select', options: OPT_RGB },
  ],

  /** ── Generic fallback ── */
  Generic: [
    { key: 'Thương hiệu', label: 'Nhà sản xuất / Thương hiệu', type: 'text', group: 'Thông tin sản phẩm' },
    { key: 'Model', label: 'Model / Mã sản phẩm', type: 'text' },
    { key: 'Kích thước', label: 'Kích thước (Dài x Rộng x Cao)', type: 'text' },
    { key: 'Trọng lượng', label: 'Trọng lượng', type: 'text', unit: 'g' },
    { key: 'Màu sắc', label: 'Màu sắc', type: 'text' },
    { key: 'Chất liệu', label: 'Chất liệu', type: 'text' },
    { key: 'Kết nối', label: 'Chuẩn kết nối', type: 'text' },
    { key: 'Bảo hành', label: 'Thời gian bảo hành', type: 'text', placeholder: 'VD: 12 tháng' },
  ],
};

/** PC component types and their search category keywords */
export const PC_COMPONENT_TYPES = [
  { key: 'cpu',      label: 'CPU / Bộ xử lý',     keywords: ['cpu', 'bộ xử lý', 'processor'] },
  { key: 'vga',      label: 'Card màn hình (VGA)', keywords: ['vga', 'card màn hình', 'gpu', 'card đồ họa'] },
  { key: 'ram',      label: 'RAM',                  keywords: ['ram', 'bộ nhớ'] },
  { key: 'ssd',      label: 'Ổ cứng SSD',           keywords: ['ssd'] },
  { key: 'hdd',      label: 'Ổ cứng HDD',           keywords: ['hdd', 'ổ cứng cơ'] },
  { key: 'mainboard', label: 'Bo mạch chủ',          keywords: ['mainboard', 'bo mạch', 'main', 'motherboard'] },
  { key: 'psu',      label: 'Nguồn (PSU)',          keywords: ['psu', 'nguồn', 'power supply'] },
  { key: 'case',     label: 'Vỏ case',              keywords: ['case', 'vỏ máy', 'thùng máy'] },
  { key: 'cooler',   label: 'Tản nhiệt CPU',        keywords: ['tản nhiệt', 'cooler', 'cooling', 'tan nhiet'] },
] as const;

export type PcComponentKey = typeof PC_COMPONENT_TYPES[number]['key'];

/** Map category name (lowercase) → CategoryType for spec template selection */
export function detectCategoryType(categoryName: string): CategoryType {
  const n = categoryName.toLowerCase();
  if (n.includes('pc') && (n.includes('nguyên bộ') || n.includes('nguyen bo') || n.includes('bộ pc'))) return 'PC';
  if (n.includes('cpu') || n.includes('bộ xử lý') || n.includes('processor')) return 'CPU';
  if (n.includes('mainboard') || n.includes('bo mạch') || n.includes('motherboard')) return 'Mainboard';
  if (n.includes('ram') || (n.includes('bộ nhớ') && !n.includes('ssd'))) return 'RAM';
  if (n.includes('vga') || n.includes('card màn hình') || n.includes('gpu') || n.includes('card đồ họa')) return 'VGA';
  if (n.includes('ssd')) return 'SSD';
  if (n.includes('hdd') || n.includes('ổ cứng cơ')) return 'HDD';
  if (n.includes('psu') || (n.includes('nguồn') && !n.includes('sản phẩm'))) return 'PSU';
  if (n.includes('case') || n.includes('vỏ máy') || n.includes('thùng máy')) return 'Case';
  if (n.includes('tản nhiệt') || n.includes('cooler') || n.includes('cooling')) return 'Cooler';
  if (n.includes('màn hình') || n.includes('monitor')) return 'Monitor';
  if (n.includes('bàn phím') || n.includes('keyboard')) return 'Keyboard';
  if (n.includes('chuột') || n.includes('mouse')) return 'Mouse';
  if (n.includes('tai nghe') || n.includes('headset') || n.includes('headphone')) return 'Headset';
  return 'Generic';
}
