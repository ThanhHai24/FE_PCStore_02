import { Search, X } from "lucide-react"
import GroupFilter from "./GroupFilter"
import ModalCard from "./ModalCard"

function Modal() {
    return (
        <div className="modal-popup w-[1100px]">
            <div className="mask-popup">
            </div>
            <div className="popup-select bg-white">
                <div className="header flex items-center justify-between bg-[#0f5b99] h-[60px]">
                    <h4 className="ml-4 w-3/10 text-white font-bold text-2xl">Chọn linh kiện</h4>
                    <form className="flex w-7/10 items-center justify-between mx-4">
                        <div className="w-[85%] bg-white rounded-[10px] h-[40px] flex items-center justify-between px-4">
                            <input type="text" placeholder="Tìm kiếm..." className="" />
                            <button><Search className="text-gray-400" size={24}></Search></button>
                        </div>

                        <button type="button"><X className="text-white font-bold" size={24}></X></button>
                    </form>
                </div>
                <div className="popup-main flex">
                    <div className="popup-main-filter w-3/10 pt-2 bg-[#f1f1f1] p-2">
                        <h4 className="text-md font-semibold text-[#464646] uppercase border border-[#b7b7b7] h-[40px] flex items-center justify-center mb-2">Lọc Sản phẩm theo</h4>
                        <div className="list-filter">
                            <GroupFilter></GroupFilter>
                            <GroupFilter></GroupFilter>
                            <GroupFilter></GroupFilter>
                            <GroupFilter></GroupFilter>
                        </div>

                    </div>
                    <div className="popup-main-content w-7/10">
                        <div className="sort-paging flex items-center justify-between px-2 bg-[#f8f8f8] py-2">
                            <div className="sort-block flex items-center gap-1">
                                <span className="text-sm font-bold text-[#464646]">Sắp xếp: </span>
                                <select name="select-sort" id="select-sort" className="h-[32px] ml-1 border border-black text-sm text-black">
                                    <option value="" className="text-sm">Tùy chọn</option>
                                    <option value="" className="text-sm">Giá tăng dần</option>
                                    <option value="" className="text-sm">Giá giảm dần</option>
                                    <option value="" className="text-sm">Mới nhất</option>
                                    <option value="" className="text-sm">Cũ nhất</option>
                                </select>
                            </div>
                            <div className="paging-block text-sm text-black flex">
                                <a href="" className="mr-3 w-[24px] h-[24px] text-sm text-center border border-[#b7b7b7] rounded-md text-black bg-gradient-to-b from-[#dfdfdf] to-[#767576] ">1</a>
                                <a href="" className="mr-3 w-[24px] h-[24px] text-sm text-center border border-[#b7b7b7] rounded-md text-black bg-gradient-to-b from-[#dfdfdf] to-[#767576] ">2</a>
                                <a href="" className="mr-3 w-[24px] h-[24px] text-sm text-center border border-[#b7b7b7] rounded-md text-black bg-gradient-to-b from-[#dfdfdf] to-[#767576] ">3</a>
                                <a href="" className="mr-3 w-[24px] h-[24px] text-sm text-center border border-[#b7b7b7] rounded-md text-black bg-gradient-to-b from-[#dfdfdf] to-[#767576] ">4</a>
                                <a href="" className="mr-3 w-[24px] h-[24px] text-sm text-center border border-[#b7b7b7] rounded-md text-black bg-gradient-to-b from-[#dfdfdf] to-[#767576] ">5</a>
                            </div>
                        </div>
                        <div className="list-product-select">
                            <ModalCard></ModalCard>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal