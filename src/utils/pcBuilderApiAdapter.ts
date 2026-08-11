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

  const isFanCase =
    catSlug.includes('fan-case') ||
    catSlug === 'fan' ||
    catSlug.includes('quat') ||
    lowerCat.includes('fan case') ||
    lowerCat.includes('quạt case') ||
    lowerCat.includes('quạt làm mát') ||
    lowerTitle.includes('fan case') ||
    lowerTitle.includes('quạt case') ||
    lowerTitle.includes('kit fan') ||
    lowerTitle.includes('bộ fan') ||
    lowerTitle.includes('bộ 3 fan') ||
    lowerTitle.includes('bộ 4 fan') ||
    lowerTitle.includes('bộ 5 fan') ||
    lowerTitle.includes('bộ 6 fan') ||
    lowerTitle.startsWith('fan ') ||
    (lowerTitle.includes('fan') && !lowerTitle.includes('tản nhiệt cpu') && !lowerTitle.includes('tản cpu') && !lowerTitle.includes('aio') && !lowerTitle.includes('khí cpu') && !lowerTitle.includes('tháp'));

  const isCpuCooler =
    catSlug.includes('tan-nhiet-cpu') ||
    catSlug.includes('cpu-cooler') ||
    lowerCat.includes('tản nhiệt cpu') ||
    lowerCat.includes('tản nhiệt khí') ||
    lowerCat.includes('tản nhiệt nước') ||
    lowerTitle.includes('tản nhiệt cpu') ||
    lowerTitle.includes('tản cpu') ||
    lowerTitle.includes('tản nhiệt khí cpu') ||
    lowerTitle.includes('tản nhiệt nước') ||
    lowerTitle.includes('tản tháp') ||
    lowerTitle.includes('aio') ||
    lowerTitle.includes('peerless assassin') ||
    lowerTitle.includes('aqua elite') ||
    lowerTitle.includes('masterliquid') ||
    lowerTitle.includes('kraken');

  if (isCpuCooler) {
    slotIndex = 8; // Tản Nhiệt CPU
  } else if (isFanCase) {
    slotIndex = 10; // Fan Case / Quạt làm mát
  } else if (catSlug.includes('tan-nhiet') || lowerCat.includes('tản nhiệt')) {
    slotIndex = 8; // Default Tản Nhiệt CPU
  } else if (catSlug.includes('fan') || lowerCat.includes('fan') || lowerCat.includes('quạt')) {
    slotIndex = 10; // Default Fan Case
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

  // Wattage
  let wattage: number | undefined;
  const wattStr = getSpecVal('công suất', 'tdp được hỗ trợ', 'tdp');
  if (wattStr) {
    const match = wattStr.match(/(\d+)\s*w/i);
    if (match) wattage = parseInt(match[1], 10);
  }
  if (!wattage) {
    const match = lowerTitle.match(/(\d{3,4})\s*w/i);
    if (match) wattage = parseInt(match[1], 10);
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
      coolerType,
      tdp: 65,
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
