import { getProducts } from '../services/productService';
import { getImageUrl } from '../services/api';
import type { ApiProduct } from '../types/apiProduct';
import type { BuilderProduct } from '../data/builderProducts';

export function mapApiProductToBuilderProduct(p: ApiProduct): BuilderProduct {
  const catName = p.category?.name || '';
  const catSlug = p.category?.slug || '';
  const title = p.name;
  const lowerTitle = title.toLowerCase();
  const lowerCat = (catName + ' ' + catSlug).toLowerCase();

  // Skip prebuilt PC bundles
  if (catSlug === 'pc-gaming' || lowerTitle.startsWith('bộ pc')) {
    return {
      id: p.id,
      slotIndex: 0,
      title: p.name,
      price: p.price,
      stockStatus: 'Hết hàng',
      productCode: p.sku || `PROD-${p.id}`,
      image: p.image ? getImageUrl(p.image) : '',
    };
  }

  let slotIndex = 0;
  if (catSlug.includes('tan-nhiet') || lowerCat.includes('tản nhiệt')) {
    slotIndex = 8; // Cooler
  } else if (catSlug.includes('fan') || lowerCat.includes('fan')) {
    slotIndex = 10; // Fan
  } else if (catSlug.includes('cpu') || lowerCat.includes('cpu') || lowerCat.includes('vi xử lý')) {
    slotIndex = 1; // CPU
  } else if (catSlug.includes('mainboard') || lowerCat.includes('mainboard') || lowerCat.includes('bo mạch')) {
    slotIndex = 2; // Mainboard
  } else if (catSlug.includes('ram') || lowerCat.includes('ram') || lowerCat.includes('bộ nhớ trong')) {
    slotIndex = 3; // RAM
  } else if (catSlug.includes('vga') || lowerCat.includes('vga') || lowerCat.includes('card đồ họa') || lowerCat.includes('card màn hình')) {
    slotIndex = 4; // VGA
  } else if (catSlug.includes('o-cung') || lowerCat.includes('ổ cứng')) {
    if (lowerTitle.includes('hdd')) slotIndex = 6; // HDD
    else slotIndex = 5; // SSD
  } else if (catSlug.includes('psu') || lowerCat.includes('psu') || lowerCat.includes('nguồn')) {
    slotIndex = 7; // PSU
  } else if (catSlug.includes('case') || lowerCat.includes('case') || lowerCat.includes('vỏ')) {
    slotIndex = 9; // Case
  }

  // Parse raw specifications dictionary
  const rawSpecs: Record<string, string> = {};
  if (Array.isArray(p.specifications)) {
    p.specifications.forEach((s) => {
      if (s.key && s.value) {
        rawSpecs[s.key.toLowerCase().trim()] = String(s.value).trim();
      }
    });
  } else if (p.specifications && typeof p.specifications === 'object') {
    Object.entries(p.specifications).forEach(([k, v]) => {
      rawSpecs[k.toLowerCase().trim()] = String(v).trim();
    });
  }

  const getSpecVal = (...keys: string[]): string | undefined => {
    for (const key of keys) {
      for (const [k, v] of Object.entries(rawSpecs)) {
        if (k.includes(key.toLowerCase())) return v;
      }
    }
    return undefined;
  };

  // Socket
  let socket = getSpecVal('socket cpu', 'socket hỗ trợ', 'socket');
  if (socket) {
    if (socket.includes('1700')) socket = 'LGA 1700';
    else if (socket.toLowerCase().includes('am5')) socket = 'AM5';
    else if (socket.toLowerCase().includes('am4')) socket = 'AM4';
  } else {
    if (lowerTitle.includes('lga1700') || lowerTitle.includes('lga 1700')) socket = 'LGA 1700';
    else if (lowerTitle.includes('am5')) socket = 'AM5';
    else if (lowerTitle.includes('am4')) socket = 'AM4';
  }

  // RAM Type
  let ramType = getSpecVal('loại ram hỗ trợ', 'loại ram', 'chuẩn ram', 'ramtype');
  if (ramType) {
    if (ramType.toUpperCase().includes('DDR5')) ramType = 'DDR5';
    else if (ramType.toUpperCase().includes('DDR4')) ramType = 'DDR4';
  } else {
    if (lowerTitle.includes('ddr5')) ramType = 'DDR5';
    else if (lowerTitle.includes('ddr4')) ramType = 'DDR4';
  }

  // Form Factor
  let formFactor = getSpecVal('form factor (chuẩn kích thước)', 'form factor mainboard hỗ trợ', 'form factor', 'kích thước');
  if (formFactor) {
    const fUpper = formFactor.toUpperCase();
    if (fUpper.includes('MICRO') || fUpper.includes('MATX') || fUpper.includes('M-ATX')) formFactor = 'Micro-ATX';
    else if (fUpper.includes('MINI') || fUpper.includes('ITX')) formFactor = 'Mini-ITX';
    else if (fUpper.includes('ATX')) formFactor = 'ATX';
  } else {
    if (lowerTitle.includes('micro-atx') || lowerTitle.includes('matx') || lowerTitle.includes('m-atx')) formFactor = 'Micro-ATX';
    else if (lowerTitle.includes('mini-itx') || lowerTitle.includes('itx')) formFactor = 'Mini-ITX';
    else if (lowerTitle.includes('atx')) formFactor = 'ATX';
  }

  // Cooler type
  let coolerType: 'AIR' | 'AIO' | undefined;
  if (slotIndex === 8) {
    const typeStr = getSpecVal('loại tản nhiệt');
    if (typeStr && (typeStr.toLowerCase().includes('nước') || typeStr.toLowerCase().includes('aio'))) {
      coolerType = 'AIO';
    } else if (lowerTitle.includes('nước') || lowerTitle.includes('aio') || lowerTitle.includes('rad') || lowerTitle.includes('liquid')) {
      coolerType = 'AIO';
    } else {
      coolerType = 'AIR';
    }
  }

  // Wattage & Recommended PSU
  let wattage: number | undefined;
  let recommendedPsu: number | undefined;

  const wattStr = getSpecVal('công suất nguồn', 'công suất thực', 'công suất', 'tdp được hỗ trợ', 'tdp', 'wattage');
  if (wattStr) {
    const match = wattStr.match(/(\d+)/);
    if (match) {
      const val = parseInt(match[1], 10);
      if (val >= 100 && val <= 3000) wattage = val;
    }
  }
  if (!wattage && slotIndex === 7) {
    const match = lowerTitle.match(/(\d{3,4})\s*w/i) || lowerTitle.match(/(\d{3,4})/i);
    if (match) {
      const val = parseInt(match[1], 10);
      if (val >= 250 && val <= 2500) wattage = val;
    }
  }

  const recPsuStr = getSpecVal('nguồn đề xuất', 'psu đề xuất', 'công suất nguồn đề xuất', 'công suất nguồn khuyên dùng', 'recommended psu');
  if (recPsuStr) {
    const match = recPsuStr.match(/(\d+)/);
    if (match) recommendedPsu = parseInt(match[1], 10);
  }

  // TDP calculation per slot (only read spec TDP for CPU and VGA; coolers specify thermal capacity, not power consumption)
  let tdp: number | undefined;
  if (slotIndex === 1 || slotIndex === 4) {
    const tdpStr = getSpecVal('công suất tiêu thụ', 'điện năng tiêu thụ', 'tdp');
    if (tdpStr) {
      const match = tdpStr.match(/(\d+)/);
      if (match) tdp = parseInt(match[1], 10);
    }
  }

  if (slotIndex === 1) { // CPU
    if (!tdp) {
      if (/i9|ryzen\s*9/i.test(lowerTitle)) tdp = 150;
      else if (/i7|ryzen\s*7/i.test(lowerTitle)) tdp = 105;
      else tdp = 65;
    }
  } else if (slotIndex === 2) { // Mainboard
    tdp = 30;
  } else if (slotIndex === 3) { // RAM
    tdp = 5;
  } else if (slotIndex === 4) { // VGA
    if (!tdp) {
      if (/4090/i.test(lowerTitle)) tdp = 450;
      else if (/4080|7900/i.test(lowerTitle)) tdp = 320;
      else if (/4070|7800/i.test(lowerTitle)) tdp = 220;
      else if (/4060|3060|6700|7600/i.test(lowerTitle)) tdp = 115;
      else tdp = 150;
    }
    if (!recommendedPsu) {
      if (/4090/i.test(lowerTitle)) recommendedPsu = 850;
      else if (/4080|7900/i.test(lowerTitle)) recommendedPsu = 750;
      else if (/4070|7800/i.test(lowerTitle)) recommendedPsu = 650;
      else if (/4060|3060|6700|7600/i.test(lowerTitle)) recommendedPsu = 550;
      else recommendedPsu = 500;
    }
  } else if (slotIndex === 5 || slotIndex === 6) { // SSD / HDD
    tdp = 5;
  } else if (slotIndex === 8) { // Cooler (electrical power is fan/pump ~10-15W)
    tdp = coolerType === 'AIO' ? 15 : 10;
  } else if (slotIndex === 10) { // Fan
    tdp = 5;
  } else if (slotIndex === 7 || slotIndex === 9) { // PSU or Case
    tdp = 0;
  }

  return {
    id: p.id,
    slotIndex,
    title: p.name,
    price: p.price,
    marketPrice: p.originalPrice || undefined,
    discountPercent: p.originalPrice && p.originalPrice > p.price
      ? `-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%`
      : undefined,
    warranty: p.warranty ? `${p.warranty} tháng` : '36 tháng',
    stockStatus: (p.stock ?? 1) > 0 ? 'Còn hàng' : 'Hết hàng',
    productCode: p.sku || `PROD-${p.id}`,
    image: p.image ? getImageUrl(p.image) : '',
    specs: {
      socket,
      ramType,
      formFactor,
      wattage,
      recommendedPsu,
      coolerType,
      tdp: tdp ?? 0,
    },
  };
}

export async function fetchApiBuilderProducts(): Promise<BuilderProduct[]> {
  try {
    const res = await getProducts({ limit: 500 });
    if (res.products && res.products.length > 0) {
      return res.products
        .map(mapApiProductToBuilderProduct)
        .filter((p) => p.slotIndex > 0);
    }
  } catch (error) {
    console.error('Error fetching builder products from API:', error);
  }
  return [];
}
