import pcImg from "../assets/images/products/pc.jpg";
import rtxImg from "../assets/images/products/rtx.png";
import cleanPcImg from "../assets/images/products/clean_pc.png";
import khungSaleCpu from "../assets/images/khung-sale-cpu.png";

export interface BuilderProduct {
  id: string;
  slotIndex: number; // 1: CPU, 2: Main, 3: RAM, 4: VGA, 5: SSD, 6: HDD, 7: PSU, 8: Cooler, 9: Case, 10: Fan
  title: string;
  price: number;
  marketPrice?: number;
  discountPercent?: string;
  warranty: string;
  stockStatus: string;
  productCode: string;
  image: string;
  saleFrame?: string;
}

export const BUILDER_PRODUCTS: BuilderProduct[] = [
  // Slot 1: CPU
  {
    id: "cpu-1",
    slotIndex: 1,
    title: "CPU AMD Ryzen 5 5600X 3.7 GHz (4.6 GHz Turbo) / 36MB / 6 cores 12 threads / Socket AM4",
    price: 3690000,
    marketPrice: 4800000,
    discountPercent: "-23%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "CPU000560X",
    image: pcImg,
    saleFrame: khungSaleCpu,
  },
  {
    id: "cpu-2",
    slotIndex: 1,
    title: "CPU Intel Core i5 13400F / 2.5GHz Turbo 4.6GHz / 10 Nhân 16 Luồng / 20MB / LGA 1700",
    price: 4890000,
    marketPrice: 5990000,
    discountPercent: "-18%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "CPU013400F",
    image: pcImg,
    saleFrame: khungSaleCpu,
  },
  {
    id: "cpu-3",
    slotIndex: 1,
    title: "CPU Intel Core i7 13700K / 3.4GHz Turbo 5.4GHz / 16 Nhân 24 Luồng / 30MB / LGA 1700",
    price: 9990000,
    marketPrice: 11990000,
    discountPercent: "-17%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "CPU013700K",
    image: pcImg,
  },

  // Slot 2: Mainboard
  {
    id: "main-1",
    slotIndex: 2,
    title: "Bo Mạch Chủ ASUS TUF GAMING B760M-PLUS WIFI DDR4",
    price: 3890000,
    marketPrice: 4500000,
    discountPercent: "-14%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "MB00B760M",
    image: cleanPcImg,
  },
  {
    id: "main-2",
    slotIndex: 2,
    title: "Bo Mạch Chủ MSI MAG B650 TOMAHAWK WIFI AM5 DDR5",
    price: 5690000,
    marketPrice: 6500000,
    discountPercent: "-12%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "MB00B650T",
    image: cleanPcImg,
  },

  // Slot 3: RAM
  {
    id: "ram-1",
    slotIndex: 3,
    title: "RAM Kingston FURY Beast 16GB (2x8GB) DDR4 3200MHz",
    price: 1090000,
    marketPrice: 1450000,
    discountPercent: "-25%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "RAM16G3200",
    image: pcImg,
  },
  {
    id: "ram-2",
    slotIndex: 3,
    title: "RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 5600MHz",
    price: 2890000,
    marketPrice: 3500000,
    discountPercent: "-17%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "RAM32GD5",
    image: pcImg,
  },

  // Slot 4: VGA
  {
    id: "vga-1",
    slotIndex: 4,
    title: "Card Màn Hình MSI GeForce RTX 4060 VENTUS 2X BLACK 8G OC",
    price: 8190000,
    marketPrice: 9500000,
    discountPercent: "-14%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "VGA4060V",
    image: rtxImg,
    saleFrame: khungSaleCpu,
  },
  {
    id: "vga-2",
    slotIndex: 4,
    title: "Card Màn Hình ASUS TUF Gaming GeForce RTX 4070 SUPER 12GB GDDR6X",
    price: 18490000,
    marketPrice: 20990000,
    discountPercent: "-12%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "VGA4070S",
    image: rtxImg,
    saleFrame: khungSaleCpu,
  },

  // Slot 5: SSD
  {
    id: "ssd-1",
    slotIndex: 5,
    title: "Ổ Cứng SSD Kingston NV2 1TB PCIe 4.0 NVMe M.2 2280",
    price: 1590000,
    marketPrice: 1990000,
    discountPercent: "-20%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "SSD1TBKS",
    image: cleanPcImg,
  },
  {
    id: "ssd-2",
    slotIndex: 5,
    title: "Ổ Cứng SSD Samsung 980 PRO 1TB PCIe 4.0 NVMe M.2 2280",
    price: 2490000,
    marketPrice: 2990000,
    discountPercent: "-17%",
    warranty: "60 tháng",
    stockStatus: "Còn hàng",
    productCode: "SSD1TSS980",
    image: cleanPcImg,
  },

  // Slot 6: HDD
  {
    id: "hdd-1",
    slotIndex: 6,
    title: "Ổ Cứng HDD Western Digital Blue 1TB 3.5 inch SATA3 7200RPM",
    price: 1190000,
    marketPrice: 1390000,
    discountPercent: "-14%",
    warranty: "24 tháng",
    stockStatus: "Còn hàng",
    productCode: "HDD1TBWDB",
    image: pcImg,
  },
  {
    id: "hdd-2",
    slotIndex: 6,
    title: "Ổ Cứng HDD Seagate Barracuda 2TB 3.5 inch SATA3 256MB Cache",
    price: 1690000,
    marketPrice: 1990000,
    discountPercent: "-15%",
    warranty: "24 tháng",
    stockStatus: "Còn hàng",
    productCode: "HDD2TBST",
    image: pcImg,
  },

  // Slot 7: PSU
  {
    id: "psu-1",
    slotIndex: 7,
    title: "Nguồn Máy Tính Corsair CV650 650W - 80 Plus Bronze",
    price: 1390000,
    marketPrice: 1690000,
    discountPercent: "-18%",
    warranty: "36 tháng",
    stockStatus: "Còn hàng",
    productCode: "PSU650CV",
    image: pcImg,
  },
  {
    id: "psu-2",
    slotIndex: 7,
    title: "Nguồn Máy Tính MSI MAG A750GL PCIE5 750W - 80 Plus Gold",
    price: 2690000,
    marketPrice: 3100000,
    discountPercent: "-13%",
    warranty: "60 tháng",
    stockStatus: "Còn hàng",
    productCode: "PSU750MSI",
    image: pcImg,
  },

  // Slot 8: Cooler
  {
    id: "cooler-1",
    slotIndex: 8,
    title: "Tản Nhiệt Khí CPU Thermalright Peerless Assassin 120 SE ARGB",
    price: 890000,
    marketPrice: 1100000,
    discountPercent: "-19%",
    warranty: "24 tháng",
    stockStatus: "Còn hàng",
    productCode: "COOLPA120",
    image: cleanPcImg,
  },
  {
    id: "cooler-2",
    slotIndex: 8,
    title: "Tản Nhiệt Nước Deepcool Thermalright Aqua Elite 360 V3 ARGB Black",
    price: 1590000,
    marketPrice: 1890000,
    discountPercent: "-16%",
    warranty: "24 tháng",
    stockStatus: "Còn hàng",
    productCode: "COOL360AE",
    image: cleanPcImg,
  },

  // Slot 9: Case
  {
    id: "case-1",
    slotIndex: 9,
    title: "Vỏ Máy Tính Xigmatek Gaming X ARGB (3 Fan ARGB)",
    price: 790000,
    marketPrice: 950000,
    discountPercent: "-17%",
    warranty: "12 tháng",
    stockStatus: "Còn hàng",
    productCode: "CASEXIGGX",
    image: cleanPcImg,
  },
  {
    id: "case-2",
    slotIndex: 9,
    title: "Vỏ Máy Tính NZXT H5 Flow Black (2 Fan sẵn)",
    price: 2290000,
    marketPrice: 2690000,
    discountPercent: "-15%",
    warranty: "24 tháng",
    stockStatus: "Còn hàng",
    productCode: "CASENZXTH5",
    image: cleanPcImg,
  },

  // Slot 10: Fan
  {
    id: "fan-1",
    slotIndex: 10,
    title: "Bộ 3 Fan Tản Nhiệt Xigmatek Galaxy III Essential AX120 ARGB",
    price: 390000,
    marketPrice: 500000,
    discountPercent: "-22%",
    warranty: "12 tháng",
    stockStatus: "Còn hàng",
    productCode: "FANAX120",
    image: cleanPcImg,
  },
  {
    id: "fan-2",
    slotIndex: 10,
    title: "Bộ 3 Fan Tản Nhiệt Lian Li Uni Fan SL-Infinity 120 RGB Black",
    price: 2190000,
    marketPrice: 2590000,
    discountPercent: "-15%",
    warranty: "24 tháng",
    stockStatus: "Còn hàng",
    productCode: "FANSLINF120",
    image: cleanPcImg,
  },
];
