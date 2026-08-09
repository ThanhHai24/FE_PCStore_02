import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Save,
  AlertTriangle,
  Package
} from 'lucide-react';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductItem {
  id: string;
  sku?: string;
  name: string;
  category: string;
  brand?: string;
  distributor?: string;
  warranty?: string;
  shortDescription?: string;
  description?: string;
  marketPrice?: string;
  sellPrice?: string;
  price: string;
  stock: number;
  minStockAlert?: number;
  importPrice?: string;
  discountPrice?: string;
  profitMargin?: string;
  status: 'In Stock' | 'Out of Stock' | 'Low Stock';
  coverImage?: string;
  productImages?: string[];
  image: string;
  specs?: ProductSpec[];
}

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Initial Product List State
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'PROD-001',
      sku: 'PC-AAA-4090',
      name: 'PC Gaming Ultra RTX 4090 i9-14900K',
      category: 'PC Nguyên Bộ',
      brand: 'ASUS',
      distributor: 'Phong Vũ Tech',
      warranty: '36 Tháng',
      shortDescription: 'Cấu hình khủng chiến game 4K',
      description: '<p>Cấu hình khủng nhất 2026, chiến mọi tựa game AAA ở độ phân giải 4K 144Hz.</p>',
      marketPrice: '95.000.000 ₫',
      sellPrice: '89.990.000 ₫',
      price: '89.990.000 ₫',
      stock: 12,
      minStockAlert: 5,
      importPrice: '80.000.000 ₫',
      status: 'In Stock',
      coverImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      productImages: [
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80'
      ],
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80',
      specs: [
        { name: 'CPU', value: 'Intel Core i9-14900K' },
        { name: 'VGA', value: 'NVIDIA RTX 4090 24GB' },
        { name: 'RAM', value: '64GB DDR5 6000MHz' },
        { name: 'SSD', value: '2TB NVMe PCIe 4.0' }
      ]
    },
    {
      id: 'PROD-002',
      sku: 'MON-DELL-U2723',
      name: 'Màn hình Dell UltraSharp U2723QE 27" 4K',
      category: 'Màn Hình',
      brand: 'Dell',
      distributor: 'Synnex FPT',
      warranty: '36 Tháng',
      shortDescription: 'Màn hình chuẩn màu đồ họa 4K IPS',
      description: '<p>Màn hình chuẩn màu đồ họa 4K IPS, độ phủ màu 100% sRGB & DCI-P3.</p>',
      marketPrice: '16.000.000 ₫',
      sellPrice: '14.250.000 ₫',
      price: '14.250.000 ₫',
      stock: 3,
      minStockAlert: 2,
      status: 'Low Stock',
      coverImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80',
      productImages: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80'],
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80',
      specs: [
        { name: 'Kích thước', value: '27 inch' },
        { name: 'Độ phân giải', value: '4K (3840 x 2160)' },
        { name: 'Tấm nền', value: 'IPS Black' }
      ]
    },
    {
      id: 'PROD-003',
      sku: 'VGA-ROG-4080S',
      name: 'Card màn hình ASUS ROG Strix RTX 4080 Super',
      category: 'Linh Kiện PC',
      brand: 'ASUS',
      distributor: 'Vĩnh Xuân',
      warranty: '36 Tháng',
      shortDescription: 'VGA tản nhiệt 3 quạt hầm hố',
      description: '<p>VGA tản nhiệt 3 quạt hầm hố, LED RGB Aura Sync, 16GB GDDR6X.</p>',
      marketPrice: '37.000.000 ₫',
      sellPrice: '34.500.000 ₫',
      price: '34.500.000 ₫',
      stock: 0,
      minStockAlert: 3,
      status: 'Out of Stock',
      coverImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80',
      productImages: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80'],
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=200&q=80',
      specs: [
        { name: 'Dung lượng VRAM', value: '16GB GDDR6X' },
        { name: 'Cổng giao tiếp', value: 'HDMI 2.1a, DisplayPort 1.4a' }
      ]
    }
  ]);

  // Available Master Data Lists
  const brandOptions = ['ASUS', 'MSI', 'Gigabyte', 'Dell', 'Logitech', 'Razer', 'Corsair', 'Kingston'];
  const distributorOptions = ['Synnex FPT', 'Phong Vũ Tech', 'Vĩnh Xuân (SPC)', 'Viễn Sơn', 'Thủy Linh (TLC)'];
  const warrantyOptions = ['12 Tháng', '24 Tháng', '36 Tháng', '60 Tháng'];
  const specKeyOptions = ['CPU', 'VGA / Card màn hình', 'RAM', 'Ổ cứng SSD/HDD', 'Kích thước màn hình', 'Độ phân giải', 'Tấm nền', 'Trọng lượng', 'Kết nối', 'Bảo hành'];

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<{
    sku: string;
    name: string;
    category: string;
    brand: string;
    distributor: string;
    warranty: string;
    shortDescription: string;
    description: string;
    marketPrice: string;
    sellPrice: string;
    importPrice: string;
    discountPrice: string;
    profitMargin: string;
    stock: number;
    minStockAlert: number;
    coverImage: string;
    productImages: string[];
    specs: ProductSpec[];
  }>({
    sku: '',
    name: '',
    category: 'PC Nguyên Bộ',
    brand: 'ASUS',
    distributor: 'Synnex FPT',
    warranty: '36 Tháng',
    shortDescription: '',
    description: '',
    marketPrice: '',
    sellPrice: '',
    importPrice: '',
    discountPrice: '',
    profitMargin: '',
    stock: 10,
    minStockAlert: 5,
    coverImage: '',
    productImages: [],
    specs: [{ name: 'CPU', value: '' }]
  });

  // Editor toolbar handler simulation
  const formatText = (command: string, val?: string) => {
    document.execCommand(command, false, val);
  };

  // Specs Form Handlers
  const handleAddSpecRow = () => {
    setFormData(prev => ({
      ...prev,
      specs: [...prev.specs, { name: specKeyOptions[0], value: '' }]
    }));
  };

  const handleRemoveSpecRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const handleSpecChange = (index: number, field: 'name' | 'value', val: string) => {
    setFormData(prev => {
      const newSpecs = [...prev.specs];
      newSpecs[index][field] = val;
      return { ...prev, specs: newSpecs };
    });
  };

  // Image Upload Handlers (Simulation with File Reader)
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, coverImage: url }));
    }
  };

  const handleMultipleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        productImages: [...prev.productImages, ...newUrls]
      }));
    }
  };

  const handleRemoveProductImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index)
    }));
  };

  // Auto Profit Margin Calculation
  const calculateMargin = (sellStr: string, importStr: string) => {
    const sell = parseFloat(sellStr.replace(/[^0-9]/g, ''));
    const imp = parseFloat(importStr.replace(/[^0-9]/g, ''));
    if (sell > 0 && imp > 0 && sell > imp) {
      const margin = (((sell - imp) / sell) * 100).toFixed(1);
      return `${margin}% (${(sell - imp).toLocaleString('vi-VN')} ₫)`;
    }
    return '';
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setFormData({
      sku: `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      name: '',
      category: 'PC Nguyên Bộ',
      brand: 'ASUS',
      distributor: 'Synnex FPT',
      warranty: '36 Tháng',
      shortDescription: '',
      description: '',
      marketPrice: '',
      sellPrice: '',
      importPrice: '',
      discountPrice: '',
      profitMargin: '',
      stock: 10,
      minStockAlert: 5,
      coverImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      productImages: [],
      specs: [
        { name: 'CPU', value: '' },
        { name: 'RAM', value: '' }
      ]
    });
    setIsAddModalOpen(true);
  };

  // Submit Add Product
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedSellPrice = formData.sellPrice.includes('₫') 
      ? formData.sellPrice 
      : formData.sellPrice ? `${Number(formData.sellPrice.replace(/[^0-9]/g, '')).toLocaleString('vi-VN')} ₫` : '0 ₫';
    
    const formattedMarketPrice = formData.marketPrice.includes('₫') 
      ? formData.marketPrice 
      : formData.marketPrice ? `${Number(formData.marketPrice.replace(/[^0-9]/g, '')).toLocaleString('vi-VN')} ₫` : '';

    const newProduct: ProductItem = {
      id: `PROD-00${products.length + 1}`,
      sku: formData.sku,
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      distributor: formData.distributor,
      warranty: formData.warranty,
      shortDescription: formData.shortDescription,
      description: formData.description,
      marketPrice: formattedMarketPrice,
      sellPrice: formattedSellPrice,
      price: formattedSellPrice,
      stock: Number(formData.stock),
      minStockAlert: Number(formData.minStockAlert),
      importPrice: formData.importPrice,
      discountPrice: formData.discountPrice,
      profitMargin: formData.profitMargin,
      status: Number(formData.stock) === 0 ? 'Out of Stock' : Number(formData.stock) <= 5 ? 'Low Stock' : 'In Stock',
      coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      productImages: formData.productImages.length > 0 ? formData.productImages : [formData.coverImage],
      image: formData.coverImage || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80',
      specs: formData.specs.filter(s => s.name && s.value)
    };

    setProducts([newProduct, ...products]);
    setIsAddModalOpen(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setFormData({
      sku: product.sku || product.id,
      name: product.name,
      category: product.category,
      brand: product.brand || 'ASUS',
      distributor: product.distributor || 'Synnex FPT',
      warranty: product.warranty || '36 Tháng',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      marketPrice: product.marketPrice || '',
      sellPrice: product.sellPrice || product.price,
      importPrice: product.importPrice || '',
      discountPrice: product.discountPrice || '',
      profitMargin: product.profitMargin || '',
      stock: product.stock,
      minStockAlert: product.minStockAlert || 5,
      coverImage: product.coverImage || product.image,
      productImages: product.productImages || [product.image],
      specs: product.specs && product.specs.length > 0 ? product.specs : [{ name: 'CPU', value: '' }]
    });
    setIsEditModalOpen(true);
  };

  // Submit Edit Product
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formattedSellPrice = formData.sellPrice.includes('₫') 
      ? formData.sellPrice 
      : formData.sellPrice ? `${Number(formData.sellPrice.replace(/[^0-9]/g, '')).toLocaleString('vi-VN')} ₫` : selectedProduct.price;

    const formattedMarketPrice = formData.marketPrice.includes('₫') 
      ? formData.marketPrice 
      : formData.marketPrice ? `${Number(formData.marketPrice.replace(/[^0-9]/g, '')).toLocaleString('vi-VN')} ₫` : '';

    const updatedProducts = products.map((prod) => {
      if (prod.id === selectedProduct.id) {
        return {
          ...prod,
          sku: formData.sku,
          name: formData.name,
          category: formData.category,
          brand: formData.brand,
          distributor: formData.distributor,
          warranty: formData.warranty,
          shortDescription: formData.shortDescription,
          description: formData.description,
          marketPrice: formattedMarketPrice,
          sellPrice: formattedSellPrice,
          price: formattedSellPrice,
          stock: Number(formData.stock),
          minStockAlert: Number(formData.minStockAlert),
          importPrice: formData.importPrice,
          discountPrice: formData.discountPrice,
          profitMargin: formData.profitMargin,
          status: (Number(formData.stock) === 0 ? 'Out of Stock' : Number(formData.stock) <= 5 ? 'Low Stock' : 'In Stock') as 'In Stock' | 'Out of Stock' | 'Low Stock',
          coverImage: formData.coverImage,
          productImages: formData.productImages,
          image: formData.coverImage || prod.image,
          specs: formData.specs.filter(s => s.name && s.value)
        };
      }
      return prod;
    });

    setProducts(updatedProducts);
    setIsEditModalOpen(false);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
    }
  };

  // Open View Modal
  const handleOpenViewModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  // Filter Products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prod.sku && prod.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản Lý Sản Phẩm</h1>
          <p className="text-xs text-gray-500 mt-1">Danh sách sản phẩm, giá bán, tồn kho và thông số kỹ thuật</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Sản Phẩm Mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, mã SKU hoặc ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 py-2 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700"
          >
            <option value="All">Tất cả danh mục</option>
            <option value="PC Nguyên Bộ">PC Nguyên Bộ</option>
            <option value="Linh Kiện PC">Linh Kiện PC</option>
            <option value="Màn Hình">Màn Hình</option>
            <option value="Phụ Kiện">Phụ Kiện</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold uppercase text-gray-500 tracking-wider">
                <th className="px-4 py-3.5">Sản Phẩm</th>
                <th className="px-4 py-3.5">Danh Mục & Thương Hiệu</th>
                <th className="px-4 py-3.5">Giá Niêm Yết / Bán</th>
                <th className="px-4 py-3.5 text-center">Tồn Kho</th>
                <th className="px-4 py-3.5">Trạng Thái</th>
                <th className="px-4 py-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.coverImage || prod.image}
                        alt={prod.name}
                        className="w-11 h-11 rounded-xl object-cover border border-gray-100 shadow-xs flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate max-w-xs">{prod.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Mã: {prod.sku || prod.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-700 rounded-md">
                      {prod.category}
                    </span>
                    {prod.brand && (
                      <p className="text-[10px] text-blue-600 font-bold mt-1">TH: {prod.brand}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {prod.marketPrice && (
                      <p className="text-[10px] text-gray-400 line-through">{prod.marketPrice}</p>
                    )}
                    <p className="font-extrabold text-blue-600">{prod.sellPrice || prod.price}</p>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-gray-800">{prod.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        prod.status === 'In Stock'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : prod.status === 'Low Stock'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                      }`}
                    >
                      {prod.status === 'In Stock' ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      ) : prod.status === 'Low Stock' ? (
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                      ) : (
                        <XCircle className="w-3 h-3 text-rose-600" />
                      )}
                      {prod.status === 'In Stock'
                        ? 'Còn hàng'
                        : prod.status === 'Low Stock'
                        ? 'Sắp hết'
                        : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleOpenViewModal(prod)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleOpenEditModal(prod)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleOpenDeleteModal(prod)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RENDER FORM UI COMPONENT */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-gray-50 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl space-y-6 my-auto max-h-[92vh] overflow-y-auto border border-gray-200 animate-in fade-in zoom-in-95">
            {/* Header Modal */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 bg-white -mx-6 -mt-6 p-6 rounded-t-2xl sticky top-0 z-10 shadow-xs">
              <div>
                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  {isAddModalOpen ? (
                    <>
                      <Plus className="w-5 h-5 text-blue-600" /> Thêm sản phẩm mới
                    </>
                  ) : (
                    <>
                      <Edit className="w-5 h-5 text-indigo-600" /> Sửa sản phẩm ({selectedProduct?.id})
                    </>
                  )}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Hệ quản trị &rarr; Danh mục sản phẩm &rarr; {isAddModalOpen ? 'Thêm mới' : 'Chỉnh sửa'}</p>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit} className="space-y-6">
              
              {/* KHỐI 1: THÔNG TIN CƠ BẢN */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Thông tin cơ bản</h3>
                  <span className="text-[11px] text-rose-500 font-medium">* Bắt buộc</span>
                </div>

                {/* Tên sản phẩm */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tên sản phẩm *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="VD: iPhone 15 Pro Max 256GB / Laptop Gaming ROG Strix"
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* SKU & Danh mục */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">SKU / Mã sản phẩm *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="Mã sản phẩm sẽ được tự động thêm."
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Danh mục *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium"
                    >
                      <option value="PC Nguyên Bộ">-- Chọn danh mục --</option>
                      <option value="PC Nguyên Bộ">PC Nguyên Bộ</option>
                      <option value="Linh Kiện PC">Linh Kiện PC</option>
                      <option value="Màn Hình">Màn Hình</option>
                      <option value="Phụ Kiện">Phụ Kiện</option>
                    </select>
                  </div>
                </div>

                {/* Thương hiệu & Nhà phân phối */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Thương hiệu *</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium"
                    >
                      <option value="">-- Chọn Thương hiệu --</option>
                      {brandOptions.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nhà phân phối *</label>
                    <select
                      value={formData.distributor}
                      onChange={(e) => setFormData({ ...formData, distributor: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium"
                    >
                      <option value="">-- Chọn nhà phân phối --</option>
                      {distributorOptions.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mô tả ngắn & Bảo hành */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Mô tả ngắn gọn về sản phẩm, hiển thị trên danh sách"
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Bảo hành</label>
                    <select
                      value={formData.warranty}
                      onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium"
                    >
                      <option value="">-- Chọn thời gian bảo hành --</option>
                      {warrantyOptions.map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* MÔ TẢ CHI TIẾT */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả chi tiết</label>
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500">
                    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-50 border-b border-gray-200 text-gray-700 text-xs">
                      <button type="button" onClick={() => formatText('undo')} className="p-1 hover:bg-gray-200 rounded" title="Undo">&larr;</button>
                      <button type="button" onClick={() => formatText('redo')} className="p-1 hover:bg-gray-200 rounded" title="Redo">&rarr;</button>
                      <div className="h-4 w-px bg-gray-300 mx-1"></div>
                      <select onChange={(e) => formatText('formatBlock', e.target.value)} className="bg-transparent border border-gray-200 text-[11px] rounded px-1.5 py-0.5">
                        <option value="P">Paragraph</option>
                        <option value="H1">Heading 1</option>
                        <option value="H2">Heading 2</option>
                        <option value="H3">Heading 3</option>
                      </select>
                      <div className="h-4 w-px bg-gray-300 mx-1"></div>
                      <button type="button" onClick={() => formatText('bold')} className="px-2 py-0.5 font-bold hover:bg-gray-200 rounded" title="Bold">B</button>
                      <button type="button" onClick={() => formatText('italic')} className="px-2 py-0.5 italic hover:bg-gray-200 rounded" title="Italic">I</button>
                      <button type="button" onClick={() => formatText('underline')} className="px-2 py-0.5 underline hover:bg-gray-200 rounded" title="Underline">U</button>
                      <button type="button" onClick={() => formatText('strikeThrough')} className="px-2 py-0.5 line-through hover:bg-gray-200 rounded" title="Strikethrough">S</button>
                      <div className="h-4 w-px bg-gray-300 mx-1"></div>
                      <button type="button" onClick={() => formatText('insertUnorderedList')} className="px-1.5 py-0.5 hover:bg-gray-200 rounded" title="Bullet List">• List</button>
                      <button type="button" onClick={() => formatText('insertOrderedList')} className="px-1.5 py-0.5 hover:bg-gray-200 rounded" title="Numbered List">1. List</button>
                    </div>
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onInput={(e) => setFormData({ ...formData, description: e.currentTarget.innerHTML })}
                      dangerouslySetInnerHTML={{ __html: formData.description || 'Type or paste your content here!' }}
                      className="p-3 min-h-[130px] text-xs text-gray-800 focus:outline-none prose max-w-none"
                    />
                  </div>
                </div>

              </div>

              {/* KHỐI 2: ẢNH BÌA */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-900">Ảnh bìa sản phẩm</h3>
                  <span className="text-[10px] text-gray-400">1 ảnh • tối đa 5MB</span>
                </div>
                <div className="border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/20 p-6 text-center hover:bg-blue-50/50 transition-colors relative cursor-pointer group">
                  <input type="file" accept="image/*" onChange={handleCoverUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {formData.coverImage ? (
                    <div className="flex items-center justify-center gap-4">
                      <img src={formData.coverImage} alt="Cover Preview" className="w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-gray-800">Ảnh bìa đã chọn</p>
                        <p className="text-[10px] text-blue-600 mt-1 hover:underline">Click hoặc kéo thả để đổi ảnh khác</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto">🖼️</div>
                      <p className="text-xs font-bold text-gray-700">Kéo thả hoặc click để tải ảnh bìa</p>
                    </div>
                  )}
                </div>
              </div>

              {/* KHỐI 3: ẢNH SẢN PHẨM (GALLERY) */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-900">Ảnh sản phẩm</h3>
                  <span className="text-[10px] text-gray-400">Nhiều ảnh • tối đa 5MB/ảnh</span>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 p-6 text-center hover:bg-gray-100/50 transition-colors relative cursor-pointer">
                  <input type="file" multiple accept="image/*" onChange={handleMultipleImagesUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mx-auto">📷</div>
                    <p className="text-xs font-bold text-gray-700">Click hoặc kéo thả ảnh vào đây</p>
                  </div>
                </div>

                {formData.productImages.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2">
                    {formData.productImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-xs aspect-square bg-gray-100">
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => handleRemoveProductImage(idx)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* KHỐI 4: THÔNG SỐ */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Thông số kỹ thuật</h3>
                  <button type="button" onClick={handleAddSpecRow} className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl transition-colors">+ Thêm thông số</button>
                </div>
                <div className="space-y-3">
                  {formData.specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <select value={spec.name} onChange={(e) => handleSpecChange(index, 'name', e.target.value)} className="w-1/3 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value="">-- Chọn thông số --</option>
                        {specKeyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <input type="text" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} placeholder="Giá trị..." className="flex-1 text-xs px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      <button type="button" onClick={() => handleRemoveSpecRow(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* KHỐI 5: GIÁ BÁN & TỒN KHO */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">Giá bán & Tồn kho</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Giá niêm yết (Market Price) *</label>
                    <input type="text" value={formData.marketPrice} onChange={(e) => setFormData({ ...formData, marketPrice: e.target.value })} placeholder="VD: 39.990.000" className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Giá bán thực tế (Sell Price) *</label>
                    <input type="text" required value={formData.sellPrice} onChange={(e) => { const val = e.target.value; const margin = calculateMargin(val, formData.importPrice); setFormData({ ...formData, sellPrice: val, profitMargin: margin }); }} placeholder="VD: 34.990.000" className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all font-bold text-blue-600" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Giá nhập (đ) *</label>
                    <input type="text" value={formData.importPrice} onChange={(e) => { const val = e.target.value; const margin = calculateMargin(formData.sellPrice, val); setFormData({ ...formData, importPrice: val, profitMargin: margin }); }} placeholder="VD: 20000000" className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Biên lợi nhuận</label>
                    <input type="text" readOnly value={formData.profitMargin || 'Tự động tính từ Giá bán - Giá nhập'} className="w-full text-xs px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Số lượng tồn kho *</label>
                    <input type="number" required min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} placeholder="VD: 100" className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Ngưỡng cảnh báo hết hàng</label>
                    <input type="number" value={formData.minStockAlert} onChange={(e) => setFormData({ ...formData, minStockAlert: Number(e.target.value) })} placeholder="VD: 10" className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all" />
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="pt-3 flex justify-end gap-3 border-t border-gray-200 sticky bottom-0 bg-white -mx-6 -mb-6 p-4 rounded-b-2xl shadow-lg">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Hủy bỏ</button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold bg-[linear-gradient(180deg,#2E9BFB_0%,#1D52E7_100%)] text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>{isAddModalOpen ? 'Lưu Sản Phẩm' : 'Cập Nhật Sản Phẩm'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: XÓA */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto"><AlertTriangle className="w-6 h-6" /></div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa Sản Phẩm Này?</h2>
              <p className="text-xs text-gray-500 mt-1">Bạn có chắc chắn muốn xóa "{selectedProduct.name}" không?</p>
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl">Hủy</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-xl shadow">Xác Nhận Xóa</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: XEM CHI TIẾT */}
      {isViewModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" /> Chi Tiết Sản Phẩm ({selectedProduct.id})
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img src={selectedProduct.coverImage || selectedProduct.image} alt={selectedProduct.name} className="w-20 h-20 rounded-xl object-cover border border-gray-200" />
              <div>
                <h3 className="font-bold text-sm text-gray-900">{selectedProduct.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {selectedProduct.marketPrice && <span className="text-xs text-gray-400 line-through">{selectedProduct.marketPrice}</span>}
                  <span className="text-sm text-blue-600 font-black">{selectedProduct.sellPrice || selectedProduct.price}</span>
                </div>
                <div className="flex gap-2 text-[11px] text-gray-500 mt-1">
                  <span>DM: <strong className="text-gray-700">{selectedProduct.category}</strong></span>
                  {selectedProduct.brand && <span>| TH: <strong className="text-blue-600">{selectedProduct.brand}</strong></span>}
                </div>
              </div>
            </div>
            {selectedProduct.specs && selectedProduct.specs.length > 0 && (
              <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="font-bold text-xs text-gray-900 mb-1">Thông số kỹ thuật:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedProduct.specs.map((s, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-lg border border-gray-200/60">
                      <span className="text-gray-400 block text-[10px]">{s.name}</span>
                      <span className="font-semibold text-gray-800 text-xs">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2 text-xs text-gray-700">
              <p><span className="font-semibold text-gray-900">Nhà phân phối:</span> {selectedProduct.distributor || 'Chưa cập nhật'}</p>
              <p><span className="font-semibold text-gray-900">Bảo hành:</span> {selectedProduct.warranty || 'Chưa cập nhật'}</p>
              <p><span className="font-semibold text-gray-900">Tồn kho:</span> {selectedProduct.stock} sản phẩm</p>
              <p><span className="font-semibold text-gray-900">Mô tả ngắn:</span> {selectedProduct.shortDescription || 'Chưa có mô tả ngắn'}</p>
            </div>
            <div className="pt-3 flex justify-end border-t border-gray-100">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
