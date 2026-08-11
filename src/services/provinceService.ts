export interface ProvinceItem {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
}

export interface WardItem {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  province_code: number;
}

const BASE_URL = 'https://provinces.open-api.vn/api/v2';

/** Fetch list of all provinces/cities in Vietnam */
export async function fetchProvinces(): Promise<ProvinceItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/`);
    if (!res.ok) throw new Error('Failed to fetch provinces');
    return await res.json();
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
}

/** Fetch list of wards for a specific province by province code */
export async function fetchWardsByProvince(provinceCode: number): Promise<WardItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
    if (!res.ok) throw new Error('Failed to fetch wards');
    const data = await res.json();
    return data.wards || [];
  } catch (error) {
    console.error('Error fetching wards:', error);
    return [];
  }
}

/** Fetch list of all wards in Vietnam */
export async function fetchAllWards(): Promise<WardItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/w/`);
    if (!res.ok) throw new Error('Failed to fetch all wards');
    return await res.json();
  } catch (error) {
    console.error('Error fetching all wards:', error);
    return [];
  }
}
