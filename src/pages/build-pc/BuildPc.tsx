import { useState } from 'react';
import Modal from '../../components/BuildPC/Modal';
import ItemDrive from '../../components/BuildPC/ItemDrive';
import { AlertTriangle, CheckCircle2, Image, Printer, RotateCcw, Sheet, ShoppingCart, Zap } from 'lucide-react';
import { BUILDER_PRODUCTS, type BuilderProduct } from '../../data/builderProducts';
import {
  calculateRecommendedPsu,
  calculateTotalTdp,
  validatePcBuild,
} from '../../utils/pcBuilderValidator';

const driveItems = [
  { index: 1, title: 'CPU - Bộ Vi Xử Lý', description: 'Chọn CPU - Bộ Vi Xử Lý', specialOffer: 'Sale CPU sập sàn' },
  { index: 2, title: 'Main - Bo Mạch Chủ', description: 'Chọn Main- Bo Mạch Chủ' },
  { index: 3, title: 'RAM - Bộ Nhớ Trong', description: 'Chọn RAM - Bộ Nhớ Trong' },
  { index: 4, title: 'VGA - Card Màn Hình', description: 'Chọn VGA - Card Màn Hình', specialOffer: 'Giảm đến 57%' },
  { index: 5, title: 'SSD - Ổ Cứng SSD', description: 'Chọn SSD - Ổ Cứng SSD' },
  { index: 6, title: 'HDD - Ổ Cứng HDD', description: 'Chọn HDD - Ổ Cứng HDD' },
  { index: 7, title: 'PSU - Nguồn Máy Tính', description: 'Chọn PSU - Nguồn Máy Tính' },
  { index: 8, title: 'Tản Nhiệt CPU', description: 'Chọn Tản Nhiệt CPU' },
  { index: 9, title: 'Case - Vỏ Máy Tính', description: 'Chọn Case - Vỏ Máy Tính' },
  { index: 10, title: 'Fan Tản nhiệt', description: 'Chọn Fan Tản nhiệt' },
];

export const BuildPc: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<
    Record<number, { product: BuilderProduct; quantity: number }>
  >({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);

  const handleOpenModal = (slotIndex: number) => {
    setActiveSlotIndex(slotIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveSlotIndex(null);
  };

  const handleSelectProduct = (product: BuilderProduct) => {
    if (activeSlotIndex !== null) {
      setSelectedItems((prev) => ({
        ...prev,
        [activeSlotIndex]: {
          product,
          quantity: prev[activeSlotIndex]?.quantity || 1,
        },
      }));
    }
  };

  const handleUpdateQuantity = (slotIndex: number, quantity: number) => {
    setSelectedItems((prev) => {
      if (!prev[slotIndex]) return prev;
      return {
        ...prev,
        [slotIndex]: {
          ...prev[slotIndex],
          quantity,
        },
      };
    });
  };

  const handleRemoveItem = (slotIndex: number) => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      delete next[slotIndex];
      return next;
    });
  };

  const handleReset = () => {
    setSelectedItems({});
  };

  const totalCost = Object.values(selectedItems).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Validate hardware compatibility
  const compatibilityIssues = validatePcBuild(selectedItems);
  const totalTdp = calculateTotalTdp(selectedItems);
  const recommendedPsu = calculateRecommendedPsu(selectedItems);

  // Group issues by slotIndex for ItemDrive mapping
  const slotIssuesMap: Record<number, string[]> = {};
  compatibilityIssues.forEach((issue) => {
    issue.affectedSlots.forEach((slot) => {
      if (!slotIssuesMap[slot]) slotIssuesMap[slot] = [];
      if (!slotIssuesMap[slot].includes(issue.message)) {
        slotIssuesMap[slot].push(issue.message);
      }
    });
  });

  const activeSlot = driveItems.find((item) => item.index === activeSlotIndex);
  const filteredProducts = activeSlotIndex
    ? BUILDER_PRODUCTS.filter((p) => p.slotIndex === activeSlotIndex)
    : [];

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-6 space-y-6">
      <div className="build-pc-content text-[#464646]">
        <div className="banner-swiper">
          <div className="swiper-wrapper">
            <div className="item">
              <a href="">
                <img src="src/assets/images/builderbanner/1.jpg" alt="" />
              </a>
            </div>
            <div className="item">
              <a href="">
                <img src="src/assets/images/builderbanner/2.jpg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <h1 className="text-[30px] mb-[10px] leading-[36px] text-center font-[500]">
          Build PC - Xây dựng cấu hình máy tính PC giá rẻ dễ dàng
        </h1>
        <h2 className="text-[26px] leading-[30px] mb-[10px] font-[500]">
          Chọn linh kiện xây dựng cấu hình - Tự build PC
        </h2>
        <ul className="list-btn-action flex flex-wrap gap-[5px] mb-4">
          <li className="text-[16px] text-white font-bold text-center py-0.5">
            <span className="bg-[#ff9f00] block uppercase leading-[40px] text-[14px] px-[20px] rounded-sm cursor-pointer">
              Cấu hình 1
            </span>
          </li>
          <li className="text-[16px] text-white font-bold text-center py-0.5">
            <span className="bg-[#0f5b99] block uppercase leading-[40px] text-[14px] px-[20px] rounded-sm cursor-pointer">
              Cấu hình 2
            </span>
          </li>
          <li className="text-[16px] text-white font-bold text-center py-0.5">
            <span className="bg-[#0f5b99] block uppercase leading-[40px] text-[14px] px-[20px] rounded-sm cursor-pointer">
              Cấu hình 3
            </span>
          </li>
          <li className="text-[16px] text-white font-bold text-center py-0.5">
            <span className="bg-[#0f5b99] block uppercase leading-[40px] text-[14px] px-[20px] rounded-sm cursor-pointer">
              Cấu hình 4
            </span>
          </li>
          <li className="text-[16px] text-white font-bold text-center py-0.5">
            <span className="bg-[#0f5b99] block uppercase leading-[40px] text-[14px] px-[20px] rounded-sm cursor-pointer">
              Cấu hình 5
            </span>
          </li>
        </ul>
        <ul className="actions flex gap-[5px] mb-4">
          <li className="text-[16px] text-white font-bold text-center py-0.5">
            <span
              onClick={handleReset}
              className="bg-[#0f5b99] hover:bg-[#0c4a7d] transition-colors block uppercase leading-[40px] text-[14px] px-[20px] rounded-sm cursor-pointer flex items-center gap-1"
            >
              Làm mới <RotateCcw size={19} />
            </span>
          </li>
        </ul>

        {/* System Power & Compatibility Status Bar */}
        <div className="mb-4 space-y-2">
          {/* Compatibility Alert Banner */}
          {compatibilityIssues.length > 0 ? (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded shadow-sm">
              <div className="flex items-center gap-2 text-red-800 font-bold text-base mb-1">
                <AlertTriangle size={20} className="text-red-600 shrink-0" />
                <span>Cảnh báo không tương thích ({compatibilityIssues.length} lỗi):</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1 text-sm text-red-700 font-medium">
                {compatibilityIssues.map((issue) => (
                  <li key={issue.id}>
                    <span className="font-bold text-red-800">[{issue.ruleName}]:</span> {issue.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : Object.keys(selectedItems).length > 0 ? (
            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded text-emerald-800 flex items-center gap-2 font-medium text-sm">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>Cấu hình hoàn toàn tương thích! Các linh kiện hoạt động tốt cùng nhau.</span>
            </div>
          ) : null}

          {/* Stats Bar */}
          {Object.keys(selectedItems).length > 0 && (
            <div className="bg-gray-100 p-3 rounded border border-gray-300 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-700">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Zap size={16} className="text-amber-500" />
                  Tổng công suất tiêu thụ (TDP): <strong className="text-black text-sm">{totalTdp}W</strong>
                </span>
                <span className="text-gray-400">|</span>
                <span>
                  Công suất nguồn đề xuất: <strong className="text-[#0f5b99] text-sm">≥ {recommendedPsu}W</strong>
                </span>
              </div>
              <div className="text-gray-500">
                Đã chọn: <span className="font-bold text-black">{Object.keys(selectedItems).length}</span> linh kiện
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mb-4">
          <p className="text-[18px] text-[#d00] font-semibold">
            Chi phí dự tính: <span>{totalCost.toLocaleString('vi-VN')} đ</span>
          </p>
        </div>

        <div className="list-drive list-none border border-[#e1e1e1] clear-both">
          {driveItems.map((item) => (
            <ItemDrive
              key={item.index}
              index={item.index}
              title={item.title}
              description={item.description}
              specialOffer={item.specialOffer}
              selectedProduct={selectedItems[item.index]?.product}
              quantity={selectedItems[item.index]?.quantity}
              issues={slotIssuesMap[item.index] || []}
              onOpenModal={() => handleOpenModal(item.index)}
              onUpdateQuantity={(qty) => handleUpdateQuantity(item.index, qty)}
              onRemoveItem={() => handleRemoveItem(item.index)}
            />
          ))}
        </div>

        <div className="flex justify-end my-4">
          <p className="text-[18px] text-[#d00] font-semibold">
            Chi phí dự tính: <span>{totalCost.toLocaleString('vi-VN')} đ</span>
          </p>
        </div>

        <ul className="list-btn-action flex flex-wrap gap-3">
          <li>
            <span className="flex items-center gap-2 bg-[#0f5b99] text-white py-2 px-4 rounded text-sm font-semibold cursor-pointer">
              Tải ảnh cấu hình
              <Image size={18} />
            </span>
          </li>
          <li>
            <span className="flex items-center gap-2 bg-[#0f5b99] text-white py-2 px-4 rounded text-sm font-semibold cursor-pointer">
              Tải file Excel cấu hình
              <Sheet size={18} />
            </span>
          </li>
          <li>
            <span className="flex items-center gap-2 bg-[#0f5b99] text-white py-2 px-4 rounded text-sm font-semibold cursor-pointer">
              Xem & In
              <Printer size={18} />
            </span>
          </li>
          <li>
            <span className="flex items-center gap-2 bg-[#d00] text-white py-2 px-4 rounded text-sm font-semibold cursor-pointer">
              Thêm vào giỏ hàng
              <ShoppingCart size={18} />
            </span>
          </li>
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        categoryTitle={activeSlot ? activeSlot.description : 'Chọn linh kiện'}
        products={filteredProducts}
        activeSlotIndex={activeSlotIndex}
        selectedItems={selectedItems}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
};

export default BuildPc;


