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
    { key: 'Dòng sản phẩm (Series)', label: 'Dòng sản phẩm (Series)', type: 'text', placeholder: 'VD: Core Ultra 9, Ryzen 9, Core i9', group: 'Thông tin sản phẩm' },
    { key: 'Tên Model / Mã sản phẩm (Model / SKU)', label: 'Tên Model / Mã sản phẩm (Model / SKU)', type: 'text', placeholder: 'VD: Core i9-14900K, Ryzen 9 9950X', required: true },
    { key: 'Socket CPU (CPU Socket)', label: 'Socket CPU (CPU Socket)', type: 'select', options: OPT_CPU_SOCKET, required: true },
    { key: 'Tổng số nhân / Lõi (Total Cores)', label: 'Tổng số nhân / Lõi (Total Cores)', type: 'number', placeholder: 'VD: 24', unit: 'nhân', group: 'Hiệu năng' },
    { key: 'Số nhân hiệu năng cao (P-core) (Performance Cores)', label: 'Số nhân hiệu năng cao (P-core) (Performance Cores)', type: 'number', placeholder: 'VD: 8', unit: 'nhân' },
    { key: 'Số nhân tiết kiệm điện (E-core) (Efficient Cores)', label: 'Số nhân tiết kiệm điện (E-core) (Efficient Cores)', type: 'number', placeholder: 'VD: 16', unit: 'nhân' },
    { key: 'Số nhân tiết kiệm điện năng thấp (LPE-core) (Low-Power Efficient Cores)', label: 'Số nhân tiết kiệm điện năng thấp (LPE-core)', type: 'number', placeholder: 'VD: 2', unit: 'nhân' },
    { key: 'Tổng số luồng (Total Threads)', label: 'Tổng số luồng (Total Threads)', type: 'number', placeholder: 'VD: 32', unit: 'luồng' },
    { key: 'Xung nhịp cơ bản (Base Clock)', label: 'Xung nhịp cơ bản (Base Clock)', type: 'text', placeholder: 'VD: 3.2 GHz' },
    { key: 'Xung nhịp cơ bản P-core (P-core Base Clock)', label: 'Xung nhịp cơ bản P-core', type: 'text', placeholder: 'VD: 3.2 GHz' },
    { key: 'Xung nhịp cơ bản E-core (E-core Base Clock)', label: 'Xung nhịp cơ bản E-core', type: 'text', placeholder: 'VD: 2.4 GHz' },
    { key: 'Xung nhịp tăng tốc tối đa (Max Boost / Turbo Frequency)', label: 'Xung nhịp tăng tốc tối đa (Max Boost / Turbo)', type: 'text', placeholder: 'VD: 6.0 GHz' },
    { key: 'Xung nhịp Turbo tối đa P-core (P-core Max Turbo Frequency)', label: 'Xung nhịp Turbo tối đa P-core', type: 'text', placeholder: 'VD: 5.8 GHz' },
    { key: 'Xung nhịp Turbo tối đa E-core (E-core Max Turbo Frequency)', label: 'Xung nhịp Turbo tối đa E-core', type: 'text', placeholder: 'VD: 4.4 GHz' },
    { key: 'Công nghệ tăng tốc xung nhịp (Boost / Turbo Technologies)', label: 'Công nghệ tăng tốc xung nhịp', type: 'text', placeholder: 'VD: Intel Thermal Velocity Boost, Turbo Boost Max 3.0' },
    { key: 'Bộ nhớ đệm L1 (L1 Cache)', label: 'Bộ nhớ đệm L1 (L1 Cache)', type: 'text', placeholder: 'VD: 2MB' },
    { key: 'Bộ nhớ đệm L2 (L2 Cache)', label: 'Bộ nhớ đệm L2 (L2 Cache)', type: 'text', placeholder: 'VD: 32MB' },
    { key: 'Bộ nhớ đệm L3 / Smart Cache (L3 / Smart Cache)', label: 'Bộ nhớ đệm L3 / Smart Cache', type: 'text', placeholder: 'VD: 36MB', unit: 'MB' },
    { key: 'Loại RAM hỗ trợ (Supported Memory Types)', label: 'Loại RAM hỗ trợ (Supported Memory Types)', type: 'select', options: OPT_RAM_TYPE, group: 'Bộ nhớ & Giao tiếp' },
    { key: 'Tốc độ / Bus RAM hỗ trợ (Max Memory Speed)', label: 'Tốc độ / Bus RAM hỗ trợ (Max Memory Speed)', type: 'text', placeholder: 'VD: DDR5-5600 MHz' },
    { key: 'Số kênh bộ nhớ hỗ trợ (Memory Channels)', label: 'Số kênh bộ nhớ hỗ trợ (Memory Channels)', type: 'select', options: OPT_RAM_CHANNEL },
    { key: 'Khả năng ép xung (Overclocking Support)', label: 'Khả năng ép xung (Overclocking Support)', type: 'select', options: OPT_OVERCLOCKING },
    { key: 'Phiên bản PCI Express (PCI Express Version)', label: 'Phiên bản PCI Express (PCI Express Version)', type: 'select', options: OPT_PCIE_VER },
    { key: 'Công suất cơ bản / TDP mặc định (Base Power / Default TDP)', label: 'Công suất cơ bản / TDP mặc định', type: 'text', placeholder: 'VD: 125W', unit: 'W', group: 'Điện & Sản xuất' },
    { key: 'Công suất tối đa (Turbo Power / MTP) (Maximum Turbo Power)', label: 'Công suất tối đa (Turbo Power / MTP)', type: 'text', placeholder: 'VD: 253W', unit: 'W' },
    { key: 'Tiến trình sản xuất nhân CPU (CPU Core Process Node)', label: 'Tiến trình sản xuất nhân CPU', type: 'text', placeholder: 'VD: Intel 4 (7nm), TSMC 4nm' },
    { key: 'Tiến trình I/O Die (I/O Die Process Node)', label: 'Tiến trình I/O Die (I/O Die Process Node)', type: 'text', placeholder: 'VD: TSMC 6nm' },
    { key: 'Đồ họa tích hợp (iGPU) (Integrated Graphics)', label: 'Đồ họa tích hợp (iGPU) (Integrated Graphics)', type: 'select', options: OPT_IGPU },
    { key: 'Công nghệ / Nền tảng AI hỗ trợ (Supported AI Features / Platforms)', label: 'Công nghệ / Nền tảng AI hỗ trợ', type: 'text', placeholder: 'VD: Intel Deep Learning Boost, NPU' },
  ],

  /** ── Mainboard ── */
  Mainboard: [
    { key: 'Nhà sản xuất / Thương hiệu (Brand / Manufacturer)', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: ASUS, MSI, Gigabyte, ASRock', group: 'Thông tin sản phẩm' },
    { key: 'Tên Model / Mã sản phẩm (Model Name / SKU)', label: 'Tên Model / Mã sản phẩm', type: 'text', placeholder: 'VD: ROG MAXIMUS Z890 EXTREME', required: true },
    { key: 'Kích thước / Chuẩn bo mạch (Form Factor / PCB Info)', label: 'Kích thước / Chuẩn bo mạch (Form Factor)', type: 'select', options: OPT_MB_FORMFACTOR, required: true },
    { key: 'Chipset (Chipset)', label: 'Chipset (Chipset)', type: 'text', placeholder: 'VD: Intel Z890, AMD X870E', required: true },
    { key: 'Socket CPU (CPU Socket)', label: 'Socket CPU (CPU Socket)', type: 'select', options: OPT_CPU_SOCKET, required: true },
    { key: 'Loại CPU hỗ trợ (CPU Support / Processor Compatibility)', label: 'Loại CPU hỗ trợ', type: 'text', placeholder: 'VD: Intel Core Ultra Processors (Series 2)' },
    { key: 'Loại RAM hỗ trợ (Supported Memory Types)', label: 'Loại RAM hỗ trợ', type: 'select', options: OPT_RAM_TYPE, group: 'Bộ nhớ' },
    { key: 'Số khe cắm RAM (Memory Slots / DIMM Slots)', label: 'Số khe cắm RAM (DIMM Slots)', type: 'select', options: OPT_MB_DIMM },
    { key: 'Dung lượng RAM tối đa (Maximum Memory Capacity)', label: 'Dung lượng RAM tối đa', type: 'select', options: OPT_MB_MAXRAM },
    { key: 'Tốc độ / Xung nhịp RAM hỗ trợ (Supported Memory Speed / Overclocking Frequencies)', label: 'Tốc độ / Xung nhịp RAM hỗ trợ', type: 'text', placeholder: 'VD: DDR5-9400+(OC)' },
    { key: 'Kiến trúc bộ nhớ (Memory Architecture / Channel Mode)', label: 'Kiến trúc bộ nhớ', type: 'select', options: OPT_RAM_CHANNEL },
    { key: 'Chuẩn ép xung RAM hỗ trợ (Memory Profile Support - XMP / EXPO / AEMP)', label: 'Chuẩn ép xung RAM hỗ trợ (XMP / EXPO)', type: 'select', options: OPT_XMP },
    { key: 'Hỗ trợ tính năng RAM nâng cao (ECC / Non-ECC / Memory Fit Features)', label: 'Hỗ trợ tính năng RAM nâng cao', type: 'select', options: OPT_ECC },
    { key: 'Khe cắm mở rộng PCIe (PCI Express Expansion Slots - Quantity & Speed)', label: 'Khe cắm mở rộng PCIe', type: 'text', placeholder: 'VD: 2x PCIe 5.0 x16, 1x PCIe 4.0 x4', group: 'Lưu trữ & Mở rộng' },
    { key: 'Số khe M.2 NVMe (M.2 Slots Count & PCIe Generation)', label: 'Số khe M.2 NVMe', type: 'text', placeholder: 'VD: 5x M.2 (2x PCIe 5.0, 3x PCIe 4.0)' },
    { key: 'Số cổng SATA (SATA Ports Count & Speed)', label: 'Số cổng SATA', type: 'text', placeholder: 'VD: 4x SATA 6Gb/s' },
    { key: 'Hỗ trợ RAID (SATA / NVMe RAID Support)', label: 'Hỗ trợ RAID (SATA / NVMe)', type: 'text', placeholder: 'VD: RAID 0, 1, 5, 10' },
    { key: 'Lưu ý / Ràng buộc băng thông ổ cứng (Storage Allocation / Lane Sharing Notes)', label: 'Lưu ý băng thông ổ cứng', type: 'text', placeholder: 'VD: M.2_1 chia sẻ băng thông với PCIe 5.0 x16_1' },
    { key: 'Cổng xuất hình (Back Panel) (Display Output Ports - HDMI, DisplayPort)', label: 'Cổng xuất hình (Back Panel)', type: 'text', placeholder: 'VD: 1x HDMI 2.1, 2x Thunderbolt 4', group: 'Kết nối' },
    { key: 'Cổng USB phía sau (Back Panel USB) (Rear USB Ports - Type-A / Type-C / Speed / Power Delivery)', label: 'Cổng USB phía sau', type: 'text', placeholder: 'VD: 6x USB 10Gbps, 2x Thunderbolt 4' },
    { key: 'Cổng USB nội bộ (Internal USB Headers) (Internal USB Headers - Type-A / Type-C / Speed)', label: 'Cổng USB nội bộ', type: 'text', placeholder: 'VD: 1x USB 20Gbps Type-C, 2x USB 3.2 Gen1' },
    { key: 'Chip xử lý âm thanh (Audio Codec / Audio Feature)', label: 'Chip xử lý âm thanh', type: 'text', placeholder: 'VD: ROG SupremeFX ALC4082' },
    { key: 'Số kênh âm thanh & Cổng Audio (Audio Channels & Output Jacks / Optical S/PDIF)', label: 'Số kênh âm thanh & Cổng Audio', type: 'text', placeholder: 'VD: 7.1 Surround, Gold-plated jacks, S/PDIF' },
    { key: 'Cổng mạng LAN (Ethernet) (LAN Controller & Speed)', label: 'Cổng mạng LAN (Ethernet)', type: 'select', options: OPT_MB_LAN },
    { key: 'Kết nối Không dây / Bluetooth (Wi-Fi Standard / Bandwidth & Bluetooth Version)', label: 'Kết nối Không dây / Bluetooth', type: 'select', options: OPT_WIFI },
    { key: 'Đầu cắm nguồn (Power Connectors) (ATX Main Power & CPU Power Connectors)', label: 'Đầu cắm nguồn', type: 'text', placeholder: 'VD: 1x 24-pin, 2x 8-pin 12V' },
    { key: 'Đầu cắm quạt & tản nhiệt (Fan & Cooling Headers) (CPU Fan, Pump Fan, System Chassis Fans)', label: 'Đầu cắm quạt & tản nhiệt', type: 'text', placeholder: 'VD: 1x CPU Fan, 1x AIO Pump, 4x Chassis Fan' },
    { key: 'Đầu cắm đèn LED (RGB Headers) (RGB & Addressable ARGB Headers)', label: 'Đầu cắm đèn LED (RGB)', type: 'select', options: OPT_RGB },
    { key: 'Nút bấm & Đầu cắm tính năng đặc biệt (Buttons & Special Headers) (BIOS FlashBack, Clear CMOS, Start Button, TPM Header, Chassis Intrusion, Thermal Sensor)', label: 'Nút bấm & Đầu cắm đặc biệt', type: 'text', placeholder: 'VD: BIOS FlashBack, Clear CMOS, Start Button' },
    { key: 'Đèn LED báo lỗi (Diagnostic LEDs) (EZ Debug LED / Q-LED)', label: 'Đèn LED báo lỗi (Diagnostic)', type: 'text', placeholder: 'VD: Q-LED (CPU, DRAM, VGA, BOOT), Q-Code LED' },
    { key: 'Hệ điều hành hỗ trợ (Supported Operating Systems)', label: 'Hệ điều hành hỗ trợ', type: 'text', placeholder: 'VD: Windows 11 64-bit' },
  ],

  /** ── RAM ── */
  RAM: [
    { key: 'Dòng sản phẩm (RAM Series)', label: 'Dòng sản phẩm (RAM Series)', type: 'text', placeholder: 'VD: Trident Z5 RGB, Vengeance RGB', group: 'Thông tin sản phẩm' },
    { key: 'Tên Model / Mã sản phẩm (Model Name / Part Number / SKU)', label: 'Tên Model / Mã sản phẩm', type: 'text', placeholder: 'VD: F5-6000J3040G16GX2-TZ5RK', required: true },
    { key: 'Mô hình / Thiết bị áp dụng (Form Factor / Device Support - Desktop DIMM, Laptop SO-DIMM)', label: 'Chuẩn thiết bị (Form Factor)', type: 'select', options: OPT_RAM_FF, required: true },
    { key: 'Chuẩn / Loại bộ nhớ (Memory Type / Generation - DDR4, DDR5)', label: 'Loại bộ nhớ (Memory Type)', type: 'select', options: OPT_RAM_TYPE, required: true },
    { key: 'Tổng dung lượng (Total Capacity - 8GB, 16GB, 32GB,...)', label: 'Tổng dung lượng', type: 'select', options: OPT_RAM_CAP, required: true },
    { key: 'Quy cách đóng gói / Cấu hình Kit (Kit Configuration - Single Channel, Dual Channel 2x8GB, 2x16GB,...)', label: 'Cấu hình Kit', type: 'select', options: OPT_RAM_KIT },
    { key: 'Tốc độ Bus / Xung nhịp tối đa (Tested Speed / Bus Speed - MHz / MT/s)', label: 'Tốc độ Bus / Xung nhịp tối đa', type: 'text', placeholder: 'VD: 6000 MHz', required: true, group: 'Hiệu năng' },
    { key: 'Tốc độ Bus mặc định (SPD Speed) (SPD Speed - MHz / MT/s)', label: 'Tốc độ Bus mặc định (SPD)', type: 'text', placeholder: 'VD: 4800 MHz' },
    { key: 'Độ trễ / Timings (CAS Latency / Timings - CL, tRCD, tRP, tRAS)', label: 'Độ trễ / Timings (CAS)', type: 'text', placeholder: 'VD: CL30-36-36-96' },
    { key: 'Điện áp hoạt động tối đa (Tested Voltage)', label: 'Điện áp hoạt động tối đa', type: 'text', placeholder: 'VD: 1.35V' },
    { key: 'Điện áp mặc định (SPD Voltage) (SPD Voltage)', label: 'Điện áp mặc định (SPD)', type: 'text', placeholder: 'VD: 1.1V' },
    { key: 'Chuẩn ép xung tự động hỗ trợ (Overclocking Profile Support - Intel XMP 2.0/3.0, AMD EXPO)', label: 'Chuẩn ép xung tự động (XMP/EXPO)', type: 'select', options: OPT_XMP },
    { key: 'Sửa lỗi bộ nhớ (ECC) (ECC Support - Non-ECC, On-Die ECC, ECC Registered)', label: 'Sửa lỗi bộ nhớ (ECC)', type: 'select', options: OPT_ECC, group: 'Tính năng' },
    { key: 'Chuẩn đệm bộ nhớ (Registered / Buffer - Unbuffered / Registered)', label: 'Chuẩn đệm bộ nhớ', type: 'select', options: OPT_RAM_BUFFER },
    { key: 'Tản nhiệt (Heatsink / Heat Spreader - Có / Không, loại tản nhiệt cao / thấp)', label: 'Tản nhiệt (Heatsink)', type: 'select', options: OPT_HEATSINK },
    { key: 'Đèn LED / Đèn RGB (RGB Lighting - Có / Không, hệ thống đồng bộ hỗ trợ)', label: 'Đèn LED / RGB', type: 'select', options: OPT_RGB },
    { key: 'Quạt tản nhiệt đi kèm (Included Fan - Có / Không)', label: 'Quạt tản nhiệt đi kèm', type: 'select', options: OPT_YES_NO },
    { key: 'Chiều cao thanh RAM (RAM Height / Profile - mm)', label: 'Chiều cao thanh RAM', type: 'text', placeholder: 'VD: 44.5mm', unit: 'mm' },
  ],

  /** ── VGA ── */
  VGA: [
    { key: 'Nhà sản xuất / Thương hiệu VGA (Brand / Manufacturer)', label: 'Nhà sản xuất / Thương hiệu VGA', type: 'text', placeholder: 'VD: ASUS, MSI, Gigabyte, Zotac', group: 'Thông tin sản phẩm' },
    { key: 'Bộ xử lý đồ họa (GPU / Chipset) (Graphics Engine / GPU Model)', label: 'Bộ xử lý đồ họa (GPU)', type: 'text', placeholder: 'VD: NVIDIA GeForce RTX 4090', required: true },
    { key: 'Kiến trúc GPU (GPU Architecture)', label: 'Kiến trúc GPU', type: 'text', placeholder: 'VD: Ada Lovelace, RDNA 3' },
    { key: 'Chuẩn giao tiếp Bus (Bus Standard / PCI Express Revision - PCIe 4.0, PCIe 5.0)', label: 'Chuẩn giao tiếp Bus', type: 'select', options: OPT_PCIE_VER },
    { key: 'Số nhân xử lý đồ họa (CUDA Cores / Stream Processors / Execution Units)', label: 'Số nhân xử lý đồ họa (CUDA/Stream)', type: 'number', placeholder: 'VD: 16384', group: 'Hiệu năng' },
    { key: 'Xung nhịp nhân / Engine Clock (Core Clock / Boost Clock / Game Clock - MHz)', label: 'Xung nhịp nhân (Boost Clock)', type: 'text', placeholder: 'VD: 2520 MHz' },
    { key: 'Tốc độ bộ nhớ (Memory Speed) (Memory Speed / Memory Data Rate - Gbps)', label: 'Tốc độ bộ nhớ', type: 'text', placeholder: 'VD: 21 Gbps' },
    { key: 'Dung lượng bộ nhớ (Memory Size) (Memory Size - GB)', label: 'Dung lượng VRAM', type: 'select', options: OPT_VGA_MEMSIZE, required: true },
    { key: 'Loại bộ nhớ (Memory Type) (Memory Type - GDDR6, GDDR6X, GDDR7)', label: 'Loại bộ nhớ (VRAM Type)', type: 'select', options: OPT_VGA_MEMTYPE, required: true },
    { key: 'Băng thông / Bề rộng bus bộ nhớ (Memory Bus Width - 128-bit, 256-bit, 512-bit)', label: 'Bề rộng Bus bộ nhớ', type: 'select', options: OPT_VGA_MEMBUS },
    { key: 'Độ phân giải kỹ thuật số tối đa (Digital Max Resolution - e.g. 7680 x 4320)', label: 'Độ phân giải kỹ thuật số tối đa', type: 'text', placeholder: 'VD: 7680 x 4320' },
    { key: 'Hỗ trợ hiển thị nhiều màn hình (Multi-view) (Multi-Display Support / Max Displays)', label: 'Số màn hình hỗ trợ tối đa', type: 'text', placeholder: 'VD: 4 màn hình' },
    { key: 'Chuẩn đồ họa API hỗ trợ (DirectX / OpenGL / Vulkan Support)', label: 'Chuẩn đồ họa API hỗ trợ', type: 'text', placeholder: 'VD: DirectX 12 Ultimate, OpenGL 4.6' },
    { key: 'Cổng xuất hình (Output Connectors) (Native HDMI Version & Quantity, Native DisplayPort Version & Quantity)', label: 'Cổng xuất hình (Outputs)', type: 'text', placeholder: 'VD: 2x HDMI 2.1a, 3x DisplayPort 1.4a', group: 'Kết nối & Thiết kế' },
    { key: 'Hỗ trợ chuẩn mã hóa HDCP (HDCP Support Version)', label: 'Hỗ trợ chuẩn mã hóa HDCP', type: 'text', placeholder: 'VD: HDCP 2.3' },
    { key: 'Kích thước Card (Dài x Rộng x Cao) (Card Dimensions - L x W x H mm)', label: 'Kích thước Card (D x R x C)', type: 'text', placeholder: 'VD: 357 x 149 x 77 mm' },
    { key: 'Độ dày khe cắm (Slot Occupied) (Slot Width - e.g. 2 Slot, 3.6 Slot)', label: 'Độ dày khe cắm (Slot)', type: 'select', options: OPT_VGA_SLOT },
    { key: 'Chuẩn kích thước PCB (PCB Form Factor - ATX, ITX)', label: 'Chuẩn kích thước PCB', type: 'text', placeholder: 'VD: ATX' },
    { key: 'Số lượng & Loại đầu cắm nguồn phụ (Power Connectors - 8-pin, 16-pin 12VHPWR / 12V-2x6)', label: 'Đầu cắm nguồn phụ', type: 'text', placeholder: 'VD: 1x 16-pin 12VHPWR' },
    { key: 'Công suất nguồn đề xuất (Recommended PSU) (Recommended PSU Power - W)', label: 'Công suất nguồn đề xuất (PSU)', type: 'select', options: OPT_VGA_PSU_REQ },
    { key: 'Công nghệ đồng bộ hình ảnh / Tính năng đặc biệt (Supported Technologies - Ray Tracing, DLSS / FSR, Anti-Lag,...)', label: 'Công nghệ hỗ trợ đặc biệt', type: 'text', placeholder: 'VD: DLSS 3.5, Ray Tracing, Reflex' },
    { key: 'Hệ thống tản nhiệt (Cooling System - Dual Fan, Triple Fan, Liquid Cooling)', label: 'Hệ thống tản nhiệt', type: 'select', options: OPT_VGA_COOLING, group: 'Tính năng' },
    { key: 'Đèn LED / Hệ thống chiếu sáng (RGB / ARGB Lighting)', label: 'Đèn LED / Hệ thống chiếu sáng', type: 'select', options: OPT_RGB },
    { key: 'Thời gian bảo hành (Warranty Period)', label: 'Thời gian bảo hành', type: 'text', placeholder: 'VD: 36 tháng' },
  ],

  /** ── SSD ── */
  SSD: [
    { key: 'Nhà sản xuất / Thương hiệu (Brand / Manufacturer)', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: Samsung, WD, Crucial, Kingston', group: 'Thông tin sản phẩm' },
    { key: 'Dòng sản phẩm (SSD Series)', label: 'Dòng sản phẩm (SSD Series)', type: 'text', placeholder: 'VD: 990 Pro, SN850X, KC3000' },
    { key: 'Tên Model / Mã sản phẩm (Model Name / Part Number / SKU)', label: 'Tên Model / Mã sản phẩm', type: 'text', placeholder: 'VD: MZ-V9P1T0BW', required: true },
    { key: 'Loại ổ cứng / Chuẩn kích thước (Form Factor - M.2 2280, 2.5 inch, mSATA,...)', label: 'Chuẩn kích thước (Form Factor)', type: 'select', options: OPT_SSD_FF, required: true },
    { key: 'Dung lượng lưu trữ (Capacity - 240GB, 512GB, 1TB, 2TB,...)', label: 'Dung lượng lưu trữ', type: 'select', options: OPT_SSD_CAP, required: true },
    { key: 'Chuẩn giao tiếp / Kết nối (Interface - SATA III 6Gb/s, PCIe Gen 3.0 x4, PCIe Gen 4.0 x4, PCIe Gen 5.0 x4 NVMe)', label: 'Chuẩn giao tiếp / Kết nối', type: 'select', options: OPT_SSD_IFACE, required: true },
    { key: 'Loại chip nhớ FLASH (NAND Flash Type - 3D NAND, TLC, QLC, BiCS FLASH,...)', label: 'Loại chip nhớ FLASH (NAND)', type: 'select', options: OPT_SSD_NAND },
    { key: 'Bộ nhớ đệm DRAM Cache (DRAM Cache - Có DRAM / HMB / Dramless)', label: 'Bộ nhớ đệm DRAM Cache', type: 'select', options: OPT_SSD_DRAM },
    { key: 'Tốc độ đọc tuần tự (Sequential Read Speed - MB/s)', label: 'Tốc độ đọc tuần tự (MB/s)', type: 'text', placeholder: 'VD: 7450 MB/s', unit: 'MB/s', group: 'Hiệu năng' },
    { key: 'Tốc độ ghi tuần tự (Sequential Write Speed - MB/s)', label: 'Tốc độ ghi tuần tự (MB/s)', type: 'text', placeholder: 'VD: 6900 MB/s', unit: 'MB/s' },
    { key: 'Tốc độ đọc ngẫu nhiên (Random Read 4K - IOPS)', label: 'Tốc độ đọc ngẫu nhiên (Random Read 4K)', type: 'text', placeholder: 'VD: 1.4M IOPS', unit: 'IOPS' },
    { key: 'Tốc độ ghi ngẫu nhiên (Random Write 4K - IOPS)', label: 'Tốc độ ghi ngẫu nhiên (Random Write 4K)', type: 'text', placeholder: 'VD: 1.4M IOPS', unit: 'IOPS' },
    { key: 'Độ bền ghi chép tổng số (TBW) (Terabytes Written / Endurance - TBW)', label: 'Độ bền ghi chép (TBW)', type: 'text', placeholder: 'VD: 600 TBW', unit: 'TBW', group: 'Độ bền & Nguồn' },
    { key: 'Thời gian trung bình giữa các lỗi (MTBF) (Mean Time Between Failures - Giờ)', label: 'Thời gian giữa các lỗi (MTBF)', type: 'text', placeholder: 'VD: 1.5 triệu giờ' },
    { key: 'Kích thước sản phẩm (Dài x Rộng x Cao) (Product Dimensions - L x W x H mm)', label: 'Kích thước sản phẩm', type: 'text', placeholder: 'VD: 80 x 22 x 2.3 mm' },
    { key: 'Trọng lượng / Khối lượng (Weight - g)', label: 'Trọng lượng (g)', type: 'text', placeholder: 'VD: 9g', unit: 'g' },
    { key: 'Điện áp hoạt động (Operating Voltage - V)', label: 'Điện áp hoạt động (V)', type: 'text', placeholder: 'VD: 3.3V ± 5%' },
    { key: 'Công suất tiêu thụ hoạt động (Active Power Consumption - W)', label: 'Công suất tiêu thụ hoạt động', type: 'text', placeholder: 'VD: 5.5W' },
    { key: 'Công suất tiêu thụ ở chế độ chờ (Idle Power Consumption - W)', label: 'Công suất tiêu thụ ở chế độ chờ', type: 'text', placeholder: 'VD: 50mW' },
    { key: 'Nhiệt độ hoạt động (Operating Temperature - °C)', label: 'Nhiệt độ hoạt động (°C)', type: 'text', placeholder: 'VD: 0°C đến 70°C' },
    { key: 'Khả năng chống sốc / Chống rung (Shock Resistance - G / ms)', label: 'Khả năng chống sốc / Chống rung', type: 'text', placeholder: 'VD: 1500G / 0.5ms' },
    { key: 'Các công nghệ hỗ trợ tích hợp (Supported Technologies - TRIM, ECC, S.M.A.R.T, SLC Caching, Garbage Collection, NCQ, RAID Ready,...)', label: 'Công nghệ hỗ trợ tích hợp', type: 'text', placeholder: 'VD: TRIM, S.M.A.R.T, AES 256-bit Encryption' },
    { key: 'Phần mềm quản lý đi kèm (Management Software Support)', label: 'Phần mềm quản lý đi kèm', type: 'text', placeholder: 'VD: Samsung Magician' },
    { key: 'Tản nhiệt đi kèm (Heatsink Included - Có / Không)', label: 'Tản nhiệt đi kèm', type: 'select', options: ['Không có', 'Có tản nhiệt kèm theo'] },
    { key: 'Chế độ bảo hành (Warranty Period & Conditions - Tháng / TBW)', label: 'Chế độ bảo hành', type: 'text', placeholder: 'VD: 60 tháng hoặc 600 TBW' },
  ],

  /** ── HDD ── */
  HDD: [
    { key: 'Nhà sản xuất / Thương hiệu (Brand / Manufacturer)', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: Seagate, WD, Toshiba', group: 'Thông tin sản phẩm' },
    { key: 'Dòng sản phẩm (HDD Series / Product Line - Barracuda, P300, IronWolf, WD Blue,...)', label: 'Dòng sản phẩm (HDD Series)', type: 'text', placeholder: 'VD: BarraCuda, WD Blue, IronWolf' },
    { key: 'Tên Model / Mã sản phẩm (P/N) (Model Name / Part Number / SKU)', label: 'Tên Model / Mã sản phẩm (P/N)', type: 'text', placeholder: 'VD: ST2000DM008', required: true },
    { key: 'Loại ổ cứng (Drive Type - HDD / Ổ cứng cơ)', label: 'Loại ổ cứng', type: 'text', placeholder: 'VD: HDD (Ổ cứng cơ)' },
    { key: 'Dung lượng lưu trữ (Capacity - 1TB, 2TB, 4TB, 8TB,...)', label: 'Dung lượng lưu trữ', type: 'select', options: OPT_HDD_CAP, required: true },
    { key: 'Chuẩn kích thước (Form Factor - 3.5 inch, 2.5 inch)', label: 'Chuẩn kích thước (Form Factor)', type: 'select', options: OPT_HDD_FF, required: true },
    { key: 'Chuẩn giao tiếp / Kết nối (Interface - SATA 3 6Gb/s, SAS,...)', label: 'Chuẩn giao tiếp / Kết nối', type: 'select', options: OPT_HDD_IFACE, required: true },
    { key: 'Tốc độ truyền dữ liệu tối đa (Data Transfer Rate - Gb/s, MB/s)', label: 'Tốc độ truyền dữ liệu tối đa', type: 'text', placeholder: 'VD: 220 MB/s', group: 'Hiệu năng' },
    { key: 'Tốc độ vòng quay (Rotational Speed / Spindle Speed - 5400 RPM, 7200 RPM)', label: 'Tốc độ vòng quay (RPM)', type: 'select', options: OPT_HDD_RPM },
    { key: 'Bộ nhớ đệm (Cache) (Cache Buffer Size - 64MB, 128MB, 256MB, 512MB)', label: 'Bộ nhớ đệm (Cache)', type: 'select', options: OPT_HDD_CACHE },
    { key: 'Công nghệ ghi dữ liệu (Recording Technology - CMR / SMR)', label: 'Công nghệ ghi dữ liệu', type: 'select', options: OPT_HDD_TECH },
    { key: 'Mục đích sử dụng / Thiết bị tương thích (Intended Usage / Device Compatibility - PC Desktop, Laptop, NAS, Surveillance / Đầu ghi hình)', label: 'Mục đích sử dụng', type: 'select', options: OPT_HDD_USE },
    { key: 'Số lượng khay ổ cắm hỗ trợ (Cho dòng NAS) (Supported Drive Bays)', label: 'Số lượng khay ổ cắm hỗ trợ', type: 'text', placeholder: 'VD: 1 đến 8 khay' },
    { key: 'Tải trọng làm việc hàng năm (Workload Rate Limit) (Workload Rating - TB/Year)', label: 'Tải trọng làm việc hàng năm', type: 'text', placeholder: 'VD: 180 TB/năm' },
    { key: 'Số chu kỳ cắm/Rút cơ học (Load/Unload Cycles) (Load/Unload Cycles)', label: 'Số chu kỳ cắm/rút cơ học', type: 'text', placeholder: 'VD: 600.000 chu kỳ' },
    { key: 'Thời gian trung bình giữa các lỗi (MTBF) (Mean Time Between Failures - Giờ)', label: 'Thời gian giữa các lỗi (MTBF)', type: 'text', placeholder: 'VD: 1.000.000 giờ', group: 'Độ bền' },
    { key: 'Điện áp & Công suất tiêu thụ (Power Consumption - Active, Idle, Standby - W)', label: 'Công suất tiêu thụ', type: 'text', placeholder: 'VD: 5.3W (Active), 3.4W (Idle)' },
    { key: 'Độ ồn khi hoạt động / Chờ (Acoustics / Noise Level - dBA)', label: 'Độ ồn khi hoạt động / Chờ', type: 'text', placeholder: 'VD: 28 dBA' },
    { key: 'Kích thước sản phẩm (Dài x Rộng x Cao) (Product Dimensions - L x W x H mm)', label: 'Kích thước sản phẩm', type: 'text', placeholder: 'VD: 147 x 101.6 x 26.1 mm' },
    { key: 'Trọng lượng / Khối lượng (Weight - g)', label: 'Trọng lượng (g)', type: 'text', placeholder: 'VD: 610g', unit: 'g' },
    { key: 'Nhiệt độ hoạt động (Operating Temperature - °C)', label: 'Nhiệt độ hoạt động', type: 'text', placeholder: 'VD: 0°C đến 60°C' },
    { key: 'Khả năng chống sốc (Shock Resistance - Operating / Non-Operating G)', label: 'Khả năng chống sốc', type: 'text', placeholder: 'VD: 70G / 2ms' },
    { key: 'Thời gian bảo hành (Warranty Period)', label: 'Thời gian bảo hành', type: 'text', placeholder: 'VD: 36 tháng' },
  ],

  /** ── PSU ── */
  PSU: [
    { key: 'Nhà sản xuất / Thương hiệu (Brand / Manufacturer)', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: Seasonic, Corsair, be quiet!, EVGA', group: 'Thông tin sản phẩm' },
    { key: 'Dòng sản phẩm (PSU Series / Model)', label: 'Dòng sản phẩm (PSU Series)', type: 'text', placeholder: 'VD: Focus GX, RM Series, PRIME' },
    { key: 'Mã sản phẩm / SKU (Part Number / SKU)', label: 'Mã sản phẩm / SKU', type: 'text', required: true },
    { key: 'Công suất danh định / Công suất tối đa (Rated Power / Max Power Output - W)', label: 'Công suất danh định / Tối đa', type: 'select', options: OPT_PSU_WATT, required: true },
    { key: 'Kích thước & Hình dáng (Form Factor / Dimension - ATX, SFX, SFX-L)', label: 'Kích thước & Hình dáng', type: 'select', options: OPT_PSU_FF, required: true },
    { key: 'Chuẩn nguồn ATX (ATX Spec Standard - ATX 2.0, ATX 3.0, PCIe Gen5 / 12VHPWR)', label: 'Chuẩn nguồn ATX', type: 'select', options: OPT_PSU_ATX },
    { key: 'Chứng chỉ hiệu suất 80 PLUS (80 PLUS Certification - Bronze, Gold, Platinum, Titanium)', label: 'Chứng chỉ 80 PLUS', type: 'select', options: OPT_PSU_80PLUS },
    { key: 'Hiệu suất chuyển đổi (Efficiency Rating - %)', label: 'Hiệu suất chuyển đổi (%)', type: 'text', placeholder: 'VD: 90% ở mức tải 50%' },
    { key: 'Kiểu cáp nguồn (Modular Type - Non-Modular, Semi-Modular, Full-Modular)', label: 'Kiểu cáp nguồn (Modular)', type: 'select', options: OPT_PSU_MODULAR },
    { key: 'Điện áp đầu vào (Input Voltage - VAC)', label: 'Điện áp đầu vào (VAC)', type: 'text', placeholder: 'VD: 100-240 VAC' },
    { key: 'Dòng điện đầu vào (Input Current - Amperes)', label: 'Dòng điện đầu vào (A)', type: 'text', placeholder: 'VD: 10A - 5A' },
    { key: 'Tần số dòng điện vào (Input Frequency - Hz)', label: 'Tần số dòng điện vào (Hz)', type: 'text', placeholder: 'VD: 50Hz - 60Hz' },
    { key: 'Mạch hiệu chỉnh hệ số công suất (PFC Type - Active PFC / Passive PFC)', label: 'Mạch hiệu chỉnh PFC', type: 'text', placeholder: 'VD: Active PFC (PF > 0.99)' },
    { key: 'Kích thước quạt làm mát (Fan Size - mm)', label: 'Kích thước quạt làm mát', type: 'select', options: OPT_PSU_FAN, group: 'Làm mát & Kích thước' },
    { key: 'Công nghệ / Loại ổ trục quạt (Fan Bearing Type - FDB, Silence, Sleeve Bearing,...)', label: 'Công nghệ ổ trục quạt', type: 'select', options: OPT_COOLER_BEARING },
    { key: 'Kích thước nguồn (Dài x Rộng x Cao) (Dimensions - L x W x H mm)', label: 'Kích thước nguồn (D x R x C)', type: 'text', placeholder: 'VD: 150 x 140 x 86 mm' },
    { key: 'Màu sắc (Color - Đen, Trắng)', label: 'Màu sắc (Color)', type: 'select', options: OPT_CASE_COLOR },
    { key: 'Các tính năng bảo vệ mạch (Protection Features - OCP, OVP, UVP, OPP, SCP, OTP, NLO)', label: 'Tính năng bảo vệ mạch', type: 'text', placeholder: 'VD: OCP, OVP, UVP, OPP, SCP, OTP' },
    { key: 'Tín hiệu Power Good (Power Good Signal - ms)', label: 'Tín hiệu Power Good', type: 'text', placeholder: 'VD: 100-500 ms' },
    { key: 'Số lượng đầu cấp nguồn Mainboard (Mainboard Connector - 24/20+4 Pin)', label: 'Đầu cấp nguồn Mainboard', type: 'text', placeholder: 'VD: 1x 24/20+4 Pin', group: 'Đầu cắm' },
    { key: 'Số lượng đầu cấp nguồn CPU (EPS/ATX12V) (CPU Connectors - 8/4+4 Pin)', label: 'Đầu cấp nguồn CPU (EPS)', type: 'text', placeholder: 'VD: 2x 8/4+4 Pin' },
    { key: 'Số lượng đầu cấp nguồn Card đồ họa (PCI-E) (PCIe Connectors - 6+2 Pin, 12VHPWR / 12V-2x6)', label: 'Đầu cấp nguồn Card đồ họa', type: 'text', placeholder: 'VD: 4x 6+2-pin, 1x 16-pin 12VHPWR' },
    { key: 'Số lượng đầu cắm SATA (Ổ cứng/SSD/Fan hub) (SATA Connectors)', label: 'Số lượng đầu cắm SATA', type: 'number', placeholder: 'VD: 8', unit: 'cổng' },
    { key: 'Số lượng đầu cắm Peripheral (Molex 4-pin) (Molex Connectors)', label: 'Số lượng đầu cắm Molex 4-pin', type: 'number', placeholder: 'VD: 3', unit: 'cổng' },
    { key: 'Số lượng đầu cắm FDD (Floppy) (Floppy Connectors)', label: 'Số lượng đầu cắm FDD', type: 'number', placeholder: 'VD: 1', unit: 'cổng' },
    { key: 'Thời gian bảo hành (Warranty Period)', label: 'Thời gian bảo hành', type: 'text', placeholder: 'VD: 120 tháng' },
  ],

  /** ── Case ── */
  Case: [
    { key: 'Nhà sản xuất / Thương hiệu (Brand / Manufacturer)', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: NZXT, Fractal, Lian Li, ASUS', group: 'Thông tin sản phẩm' },
    { key: 'Tên Model / Mã sản phẩm (Model Name / SKU)', label: 'Tên Model / Mã sản phẩm', type: 'text', required: true },
    { key: 'Màu sắc (Color)', label: 'Màu sắc (Color)', type: 'select', options: OPT_CASE_COLOR },
    { key: 'Loại Case / Chuẩn kích thước (Case Type / Form Factor - Mid Tower, Full Tower, Mini-ITX,...)', label: 'Loại Case / Chuẩn kích thước', type: 'select', options: OPT_CASE_TYPE, required: true },
    { key: 'Kích thước sản phẩm (Dài x Rộng x Cao) (Product Dimensions - D x W x H mm)', label: 'Kích thước sản phẩm', type: 'text', placeholder: 'VD: 495 x 235 x 495 mm' },
    { key: 'Trọng lượng thực (Net Weight) (Net Weight - kg)', label: 'Trọng lượng thực (kg)', type: 'text', placeholder: 'VD: 7.5 kg', unit: 'kg' },
    { key: 'Trọng lượng đóng gói (Gross Weight) (Gross Weight - kg)', label: 'Trọng lượng đóng gói (kg)', type: 'text', placeholder: 'VD: 8.8 kg', unit: 'kg' },
    { key: 'Chất liệu cấu tạo (Materials - SPCC Steel, Aluminum, Plastic, Glass)', label: 'Chất liệu cấu tạo', type: 'text', placeholder: 'VD: SPCC Steel, Tempered Glass' },
    { key: 'Mặt hông / Tấm che hông (Side Panel - Tempered Glass, Mesh, Steel)', label: 'Mặt hông (Side Panel)', type: 'select', options: OPT_CASE_PANEL },
    { key: 'Chuẩn Bo mạch chủ hỗ trợ (Mainboard Support - E-ATX, ATX, Micro-ATX, Mini-ITX)', label: 'Chuẩn Bo mạch chủ hỗ trợ', type: 'select', options: OPT_CASE_MB },
    { key: 'Cổng kết nối mặt trước / I/O Panel (Front Access & Controls - USB 2.0, USB 3.0, Type-C, HD-Audio, Power, LED Button)', label: 'Cổng kết nối mặt trước (I/O)', type: 'text', placeholder: 'VD: 2x USB 3.0, 1x Type-C, HD-Audio' },
    { key: 'Số khe cắm mở rộng PCI (Expansion Slots - Standard & Vertical Mount)', label: 'Số khe cắm mở rộng PCI', type: 'number', placeholder: 'VD: 7', unit: 'khe', group: 'Dung lượng & Khay lắp' },
    { key: 'Khay lắp ổ cứng 3.5" HDD (3.5" Drive Bays)', label: 'Khay lắp ổ cứng 3.5" HDD', type: 'number', placeholder: 'VD: 2', unit: 'khay' },
    { key: 'Khay lắp ổ cứng 2.5" SSD (2.5" Drive Bays)', label: 'Khay lắp ổ cứng 2.5" SSD', type: 'number', placeholder: 'VD: 3', unit: 'khay' },
    { key: 'Hỗ trợ quạt mặt trước (Front Fan Support)', label: 'Hỗ trợ quạt mặt trước', type: 'text', placeholder: 'VD: 3x 120mm / 2x 140mm', group: 'Quạt & Tản nhiệt' },
    { key: 'Hỗ trợ quạt mặt trên (Top Fan Support)', label: 'Hỗ trợ quạt mặt trên', type: 'text', placeholder: 'VD: 3x 120mm / 2x 140mm' },
    { key: 'Hỗ trợ quạt mặt sau (Rear Fan Support)', label: 'Hỗ trợ quạt mặt sau', type: 'text', placeholder: 'VD: 1x 120mm / 1x 140mm' },
    { key: 'Hỗ trợ quạt mặt bên / Khay Mainboard (MB Tray / Side Fan Support)', label: 'Hỗ trợ quạt mặt bên', type: 'text', placeholder: 'VD: 2x 120mm' },
    { key: 'Hỗ trợ quạt mặt đáy / Khoang nguồn (Bottom / PSU Shroud Fan Support)', label: 'Hỗ trợ quạt mặt đáy', type: 'text', placeholder: 'VD: 2x 120mm' },
    { key: 'Quạt đi kèm (Included Fans - Quantity, Size & RGB/LED Feature)', label: 'Quạt đi kèm', type: 'text', placeholder: 'VD: 3x 120mm ARGB' },
    { key: 'Hỗ trợ tản nhiệt nước mặt trước (Front Radiator Support - 120mm, 240mm, 360mm,...)', label: 'Hỗ trợ Radiator mặt trước', type: 'text', placeholder: 'VD: 120 / 240 / 360mm' },
    { key: 'Hỗ trợ tản nhiệt nước mặt trên (Top Radiator Support)', label: 'Hỗ trợ Radiator mặt trên', type: 'text', placeholder: 'VD: 120 / 240 / 360mm' },
    { key: 'Hỗ trợ tản nhiệt nước mặt sau (Rear Radiator Support)', label: 'Hỗ trợ Radiator mặt sau', type: 'text', placeholder: 'VD: 120mm' },
    { key: 'Hỗ trợ tản nhiệt nước mặt bên (Side Radiator Support)', label: 'Hỗ trợ Radiator mặt bên', type: 'text', placeholder: 'VD: 240mm' },
    { key: 'Chiều dài Card đồ họa (VGA) tối đa (Max GPU Length Clearance - mm)', label: 'Chiều dài VGA tối đa', type: 'text', placeholder: 'VD: 400mm', unit: 'mm' },
    { key: 'Chiều cao tản nhiệt CPU tối đa (Max CPU Cooler Height Clearance - mm)', label: 'Chiều cao Tản nhiệt CPU tối đa', type: 'text', placeholder: 'VD: 165mm', unit: 'mm' },
    { key: 'Chiều dài nguồn (PSU) tối đa (Max PSU Length Clearance - mm)', label: 'Chiều dài Nguồn (PSU) tối đa', type: 'text', placeholder: 'VD: 210mm', unit: 'mm' },
    { key: 'Lưới lọc bụi (Dust Filters Position - Top, Bottom, Front)', label: 'Lưới lọc bụi', type: 'text', placeholder: 'VD: Mặt trên, Mặt đáy' },
    { key: 'Thời gian bảo hành (Warranty Period)', label: 'Thời gian bảo hành', type: 'text', placeholder: 'VD: 24 tháng' },
  ],

  /** ── Cooler (Tản nhiệt) ── */
  Cooler: [
    { key: 'Nhà sản xuất / Thương hiệu (Brand / Manufacturer)', label: 'Nhà sản xuất / Thương hiệu', type: 'text', placeholder: 'VD: Noctua, NZXT, Lian Li, DeepCool', group: 'Thông tin sản phẩm' },
    { key: 'Tên Model / Mã sản phẩm (Model Name / SKU)', label: 'Tên Model / Mã sản phẩm', type: 'text', required: true },
    { key: 'Mã EAN / Barcode (EAN / Barcode)', label: 'Mã EAN / Barcode', type: 'text' },
    { key: 'Loại tản nhiệt (Cooler Type - Tản nhiệt nước AIO / Tản nhiệt khí)', label: 'Loại tản nhiệt (Cooler Type)', type: 'select', options: OPT_COOLER_TYPE, required: true },
    { key: 'Công suất tản nhiệt tối đa (TDP) (Max TDP Rating - W)', label: 'Công suất tản nhiệt tối đa (TDP)', type: 'text', placeholder: 'VD: 250W', unit: 'W' },
    { key: 'Socket CPU hỗ trợ (Socket Compatibility - Intel LGA1851/1700/1200/115x, AMD AM5/AM4,...)', label: 'Socket CPU hỗ trợ', type: 'text', placeholder: 'VD: Intel LGA1851/1700, AMD AM5/AM4' },
    { key: 'Kích thước tổng thể (Dài x Rộng x Cao) (Overall Dimensions - L x W x H mm)', label: 'Kích thước tổng thể', type: 'text', placeholder: 'VD: 120 x 27 x 394 mm' },
    { key: 'Trọng lượng tổng thể (Total Weight - g / kg)', label: 'Trọng lượng tổng thể', type: 'text', placeholder: 'VD: 1.35kg' },
    { key: 'Chất liệu bề mặt tiếp xúc CPU (CPU Base Material - Mặt đồng / Copper Base)', label: 'Chất liệu bề mặt tiếp xúc CPU', type: 'text', placeholder: 'VD: Mặt đồng (Copper)' },
    { key: 'Cấu trúc / Chất liệu tản nhiệt (Heatsink / Radiator Construction)', label: 'Cấu trúc / Chất liệu tản nhiệt', type: 'text', placeholder: 'VD: Aluminum Radiator' },
    { key: 'Tản khí: Số lượng & Đường kính ống đồng (Heatpipes - e.g. 6 x 6mm) + Lá tản nhiệt nhôm (Aluminum Fins)', label: 'Tản khí: Số ống đồng & Lá nhôm', type: 'text', placeholder: 'VD: 6x 6mm Heatpipes' },
    { key: 'Tản nước: Kích thước Radiator (Radiator Dimensions) + Chất liệu Radiator (Aluminum)', label: 'Tản nước: Kích thước Radiator', type: 'text', placeholder: 'VD: 360mm Aluminum' },
    { key: 'Kích thước Block nước (AIO) (Water Block Dimensions - L x W x H mm)', label: 'Kích thước Block nước (AIO)', type: 'text', placeholder: 'VD: 80 x 80 x 60 mm' },
    { key: 'Chất liệu & Chiều dài dây dẫn nước (AIO) (Tube Material & Length - Sleeved Rubber, mm)', label: 'Chất liệu & Chiều dài dây dẫn nước', type: 'text', placeholder: 'VD: Sleeved Rubber 400mm' },
    { key: 'Số lượng quạt đi kèm (Included Fans Quantity)', label: 'Số lượng quạt đi kèm', type: 'number', placeholder: 'VD: 3', unit: 'quạt', group: 'Quạt & Hiệu năng' },
    { key: 'Kích thước quạt (Fan Dimensions - L x W x H mm)', label: 'Kích thước quạt', type: 'select', options: OPT_COOLER_FAN_SIZE },
    { key: 'Tốc độ quay của quạt (Fan Speed - RPM)', label: 'Tốc độ quay của quạt (RPM)', type: 'text', placeholder: 'VD: 500-2000 RPM' },
    { key: 'Lưu lượng không khí tối đa (Max Air Flow - CFM)', label: 'Lưu lượng không khí tối đa (CFM)', type: 'text', placeholder: 'VD: 78.1 CFM' },
    { key: 'Áp suất không khí / Áp suất tĩnh tối đa (Max Static Pressure - mmH2O)', label: 'Áp suất tĩnh tối đa (mmH2O)', type: 'text', placeholder: 'VD: 2.6 mmH2O' },
    { key: 'Độ ồn tối đa (Max Noise Level - dBA)', label: 'Độ ồn tối đa (dBA)', type: 'text', placeholder: 'VD: 32 dBA' },
    { key: 'Chế độ điều khiển quạt / Chuẩn cắm (Fan Connector / Control Mode - 4-Pin PWM / DC)', label: 'Chế độ điều khiển quạt', type: 'select', options: OPT_COOLER_CONNECTOR },
    { key: 'Loại ổ trục quạt (Fan Bearing Type - Hydraulic, FDB, Dual Ball,...)', label: 'Loại ổ trục quạt', type: 'select', options: OPT_COOLER_BEARING },
    { key: 'Thông số điện áp & Công suất quạt (Fan Electrical Specs - Điện áp định mức, Điện áp khởi chạy, Cường độ dòng điện, Công suất tiêu thụ W)', label: 'Thông số điện áp quạt', type: 'text', placeholder: 'VD: 12V DC, 0.2A, 2.4W' },
    { key: 'Công nghệ / Chuẩn đèn LED hỗ trợ (RGB / ARGB Lighting & Sync - ASUS AURA Sync, MSI Mystic Light,...)', label: 'Chuẩn đèn LED / Sync', type: 'select', options: OPT_RGB, group: 'Tính năng' },
    { key: 'Phụ kiện đi kèm (Package Contents - Keo tản nhiệt, Khung / Gông socket, Sách hướng dẫn)', label: 'Phụ kiện đi kèm', type: 'text', placeholder: 'VD: Keo tản nhiệt, Khung gông Intel/AMD' },
    { key: 'Thời gian bảo hành (Warranty Period)', label: 'Thời gian bảo hành', type: 'text', placeholder: 'VD: 36 tháng' },
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
  { key: 'cpu', label: 'CPU', keywords: ['cpu', 'bộ xử lý', 'processor'] },
  { key: 'vga', label: 'VGA', keywords: ['vga', 'card màn hình', 'gpu', 'card đồ họa'] },
  { key: 'ram', label: 'RAM', keywords: ['ram', 'bộ nhớ'] },
  { key: 'ssd', label: 'SSD', keywords: ['ssd'] },
  { key: 'mainboard', label: 'MAINBOARD', keywords: ['mainboard', 'bo mạch', 'main', 'motherboard'] },
  { key: 'psu', label: 'PSU', keywords: ['psu', 'nguồn', 'power supply'] },
  { key: 'case', label: 'CASE', keywords: ['case', 'vỏ máy', 'thùng máy'] },
  { key: 'cooler', label: 'TẢN NHIỆT', keywords: ['tản nhiệt', 'cooler', 'cooling', 'tan nhiet'] },
  { key: 'fan', label: 'FAN', keywords: ['fan', 'quạt', 'quat'] },
] as const;

export type PcComponentKey = typeof PC_COMPONENT_TYPES[number]['key'];

/** Map category name (lowercase) → CategoryType for spec template selection */
export function detectCategoryType(categoryName: string): CategoryType {
  const n = categoryName.toLowerCase();
  if (n.includes('pc') || n.includes('nguyên bộ') || n.includes('nguyen bo') || n.includes('máy tính nguyên bộ')) return 'PC';
  if (n.includes('tản nhiệt') || n.includes('cooler') || n.includes('cooling')) return 'Cooler';
  if (n.includes('cpu') || n.includes('bộ xử lý') || n.includes('processor')) return 'CPU';
  if (n.includes('mainboard') || n.includes('bo mạch') || n.includes('motherboard')) return 'Mainboard';
  if (n.includes('ram') || (n.includes('bộ nhớ') && !n.includes('ssd'))) return 'RAM';
  if (n.includes('vga') || n.includes('card màn hình') || n.includes('gpu') || n.includes('card đồ họa')) return 'VGA';
  if (n.includes('ssd')) return 'SSD';
  if (n.includes('hdd') || n.includes('ổ cứng cơ')) return 'HDD';
  if (n.includes('psu') || (n.includes('nguồn') && !n.includes('sản phẩm'))) return 'PSU';
  if (n.includes('case') || n.includes('vỏ máy') || n.includes('thùng máy')) return 'Case';
  return 'Generic';
}

/** Re-orders a specifications object to match the exact field sequence in SPEC_TEMPLATES */
export function orderSpecifications(specs: Record<string, string>, categoryName: string): Record<string, string> {
  if (!specs || typeof specs !== 'object') return {};

  const catType = detectCategoryType(categoryName);
  const ordered: Record<string, string> = {};
  const processedKeys = new Set<string>();

  if (catType === 'PC') {
    for (const comp of PC_COMPONENT_TYPES) {
      const targetLabel = comp.label;
      const foundKey = Object.keys(specs).find(
        (k) => !processedKeys.has(k) && (k.toLowerCase() === targetLabel.toLowerCase() || k.toLowerCase() === comp.key.toLowerCase())
      );
      if (foundKey && specs[foundKey] !== undefined && specs[foundKey] !== '') {
        ordered[targetLabel] = specs[foundKey];
        processedKeys.add(foundKey);
      }
    }
  } else {
    const template = SPEC_TEMPLATES[catType] ?? SPEC_TEMPLATES.Generic;

    for (const field of template) {
      const shortKey = field.key.split(' (')[0];
      let matchedKey: string | undefined = undefined;

      if (specs[field.key] !== undefined && specs[field.key] !== '') {
        matchedKey = field.key;
      } else if (specs[field.label] !== undefined && specs[field.label] !== '') {
        matchedKey = field.label;
      } else if (specs[shortKey] !== undefined && specs[shortKey] !== '') {
        matchedKey = shortKey;
      } else {
        matchedKey = Object.keys(specs).find((k) => {
          if (processedKeys.has(k) || k === 'importPrice' || specs[k] === undefined || specs[k] === '') return false;
          return shortKey.includes(k) || k.includes(shortKey) || field.label.includes(k);
        });
      }

      if (matchedKey !== undefined && specs[matchedKey] !== undefined && specs[matchedKey] !== '') {
        const finalKey = field.key;
        ordered[finalKey] = specs[matchedKey];
        processedKeys.add(matchedKey);
      }
    }
  }

  // Preserve any remaining custom or unmapped keys at the end
  for (const [k, v] of Object.entries(specs)) {
    if (!processedKeys.has(k) && v !== undefined && v !== '') {
      ordered[k] = v;
    }
  }

  return ordered;
}

