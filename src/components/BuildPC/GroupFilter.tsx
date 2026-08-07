function GroupFilter() {
    return (
        <div className="gr-filter border-b border-[#d9d9d9] pb-2 mb-2">
            <h5 className="title-filter color-black font-bold text-sm mb-3">Khoảng giá</h5>
            <ul className="ul-filter grid grid-cols-2 gap-2 pl-2">
                <li>
                    <label className="flex gap-1">
                        <input type="checkbox" className="cb-filter border border-[#d9d9d9]" checked />
                        <span className="value-filter text-xs text-black">Dưới 1 triệu</span>
                    </label>
                </li>
                <li>
                    <label className="flex gap-1">
                        <input type="checkbox" className="cb-filter border border-[#d9d9d9]" />
                        <span className="value-filter text-xs text-black">Dưới 2 triệu</span>
                    </label>
                </li>
                <li>
                    <label className="flex gap-1">
                        <input type="checkbox" className="cb-filter border border-[#d9d9d9]" />
                        <span className="value-filter text-xs text-black">Dưới 3 triệu</span>
                    </label>
                </li>
            </ul>
        </div>
    )
}

export default GroupFilter
