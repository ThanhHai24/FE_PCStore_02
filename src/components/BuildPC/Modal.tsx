import { useState } from "react"
import { CheckCircle2, Search, SlidersHorizontal, X } from "lucide-react"
import GroupFilter from "./GroupFilter"
import ModalCard from "./ModalCard"
import type { BuilderProduct } from "../../data/builderProducts"
import { getIncompatibilityReason } from "../../utils/pcBuilderValidator"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    categoryTitle?: string
    products?: BuilderProduct[]
    activeSlotIndex?: number | null
    selectedItems?: Record<number, { product: BuilderProduct; quantity: number }>
    onSelectProduct: (product: BuilderProduct) => void
}

function Modal({
    isOpen,
    onClose,
    categoryTitle = "Chọn linh kiện",
    products = [],
    activeSlotIndex = null,
    selectedItems = {},
    onSelectProduct
}: ModalProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOption, setSortOption] = useState("")
    const [onlyCompatible, setOnlyCompatible] = useState(true)

    if (!isOpen) return null

    // Pre-evaluate compatibility for each product in candidate list
    const evaluatedProducts = products.map((p) => {
        const incompatibilityReason = activeSlotIndex !== null
            ? getIncompatibilityReason(p, activeSlotIndex, selectedItems)
            : null;
        return {
            product: p,
            incompatibilityReason,
            isCompatible: incompatibilityReason === null,
        }
    })

    // Count compatible vs total
    const compatibleCount = evaluatedProducts.filter((item) => item.isCompatible).length
    const totalCount = products.length

    // Filter products by search term & compatibility toggle
    const filteredProducts = evaluatedProducts.filter(({ product, isCompatible }) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productCode.toLowerCase().includes(searchTerm.toLowerCase())

        if (!matchesSearch) return false
        if (onlyCompatible && !isCompatible) return false

        return true
    })

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "price-asc") {
            return a.product.price - b.product.price
        } else if (sortOption === "price-desc") {
            return b.product.price - a.product.price
        } else if (sortOption === "name-asc") {
            return a.product.title.localeCompare(b.product.title)
        }
        return 0
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
            {/* Backdrop click to close */}
            <div className="fixed inset-0" onClick={onClose} />

            {/* Modal Dialog Container */}
            <div className="relative z-10 w-full max-w-[1100px] bg-white rounded-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="header flex items-center justify-between bg-[#0f5b99] h-[60px] px-4 shrink-0">
                    <h4 className="text-white font-bold text-xl truncate max-w-[350px]">
                        {categoryTitle}
                    </h4>
                    <div className="flex items-center justify-between gap-4 flex-1 max-w-[650px] ml-4">
                        <div className="flex-1 bg-white rounded-[10px] h-[40px] flex items-center px-4">
                            <input
                                type="text"
                                placeholder="Tìm kiếm tên, mã sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full text-sm outline-none bg-transparent"
                            />
                            <Search className="text-gray-400 shrink-0 cursor-pointer" size={20} />
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white hover:opacity-80 transition-opacity p-1 cursor-pointer"
                        >
                            <X size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="popup-main flex flex-1 min-h-0 overflow-hidden">
                    {/* Left Sidebar Filter */}
                    <div className="popup-main-filter w-1/4 pt-2 bg-[#f1f1f1] p-3 overflow-y-auto hidden md:block">
                        <h4 className="text-sm font-semibold text-[#464646] uppercase border border-[#b7b7b7] h-[36px] flex items-center justify-center mb-3 bg-white">
                            Lọc Sản phẩm theo
                        </h4>

                        {/* Smart Compatibility Filter Switch */}
                        <div className="bg-white p-3 border border-[#b7b7b7] rounded mb-3">
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs font-bold text-[#333] flex items-center gap-1.5">
                                    <CheckCircle2 size={16} className="text-emerald-600" />
                                    Chỉ hiện tương thích
                                </span>
                                <input
                                    type="checkbox"
                                    checked={onlyCompatible}
                                    onChange={(e) => setOnlyCompatible(e.target.checked)}
                                    className="w-4 h-4 accent-[#0f5b99] cursor-pointer"
                                />
                            </label>
                            <div className="text-[11px] text-gray-500 mt-1">
                                Hiển thị {compatibleCount}/{totalCount} sản phẩm phù hợp
                            </div>
                        </div>

                        <div className="list-filter space-y-2">
                            <GroupFilter />
                        </div>
                    </div>

                    {/* Right Product List Area */}
                    <div className="popup-main-content w-full md:w-3/4 flex flex-col flex-1 min-h-0">
                        {/* Sort & Pagination Bar */}
                        <div className="sort-paging flex flex-wrap items-center justify-between px-4 bg-[#f8f8f8] py-2 border-b border-[#e5e5e5] shrink-0 gap-2">
                            <div className="sort-block flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-bold text-[#464646]">Sắp xếp: </span>
                                    <select
                                        name="select-sort"
                                        id="select-sort"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="h-[32px] px-2 border border-gray-300 rounded text-sm text-black bg-white focus:outline-none focus:border-[#0f5b99]"
                                    >
                                        <option value="">Tùy chọn</option>
                                        <option value="price-asc">Giá tăng dần</option>
                                        <option value="price-desc">Giá giảm dần</option>
                                        <option value="name-asc">Tên A-Z</option>
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOnlyCompatible(!onlyCompatible)}
                                    className={`md:hidden text-xs font-semibold px-2.5 py-1 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                                        onlyCompatible
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                            : "bg-gray-100 text-gray-700 border-gray-300"
                                    }`}
                                >
                                    <SlidersHorizontal size={13} />
                                    Chỉ tương thích ({compatibleCount})
                                </button>
                            </div>
                            <div className="text-xs text-gray-500 font-medium">
                                Hiển thị {sortedProducts.length} sản phẩm
                            </div>
                        </div>

                        {/* Product List Scrollable */}
                        <div className="list-product-select flex-1 overflow-y-auto divide-y divide-[#e5e5e5]">
                            {sortedProducts.length > 0 ? (
                                sortedProducts.map(({ product, incompatibilityReason }) => (
                                    <ModalCard
                                        key={product.id}
                                        product={product}
                                        incompatibilityReason={incompatibilityReason}
                                        onSelect={() => {
                                            onSelectProduct(product)
                                            onClose()
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500 text-sm space-y-2">
                                    <p>Không tìm thấy sản phẩm phù hợp.</p>
                                    {onlyCompatible && compatibleCount === 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setOnlyCompatible(false)}
                                            className="text-xs text-[#0f5b99] underline hover:opacity-80"
                                        >
                                            Tắt bộ lọc tương thích để xem tất cả ({totalCount} sản phẩm)
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
