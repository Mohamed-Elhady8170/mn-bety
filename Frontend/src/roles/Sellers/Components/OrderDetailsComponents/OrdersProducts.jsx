import React from 'react'

export default function OrdersProducts() {
    return (
        <>
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10 max-w-full overflow-hidden">

                <div className="p-4 md:p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-base md:text-lg">منتجات الطلب</h3>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium">
                        عدد العناصر: 1
                    </span>
                </div>

                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                    <table className="w-full text-right border-collapse">
                        <thead className="bg-gray-50 text-gray-500 text-xs md:text-sm">
                            <tr>
                                <th className="p-3 md:p-4 font-semibold min-w-37.5 md:min-w-auto">المنتج</th>
                                <th className="p-3 md:p-4 font-semibold whitespace-nowrap">السعر الفرعي</th>
                                <th className="p-3 md:p-4 font-semibold text-center whitespace-nowrap">الكمية</th>
                                <th className="p-3 md:p-4 font-semibold whitespace-nowrap">الإجمالي</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs md:text-sm">
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-3 md:p-4">
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                                            <img
                                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                                                alt="Product"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-gray-800 leading-tight truncate max-w-30 md:max-w-none">
                                                حذاء - الإصدار العاشر
                                            </h4>
                                            <p className="text-[10px] text-gray-400 mt-0.5">مقاس: 42</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-3 md:p-4 text-gray-600 whitespace-nowrap">450.00 ج.م</td>
                                <td className="p-3 md:p-4 text-center">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-bold">01</span>
                                </td>
                                <td className="p-3 md:p-4 font-bold text-[#ec4d18] whitespace-nowrap">450.00 ج.م</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-start mt-6">
                <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm w-full md:max-w-md">
                    <div className="space-y-4">

                        <div className="flex justify-between items-center text-gray-600">
                            <span className=" text-sm md:text-base order-2 md:order-1">:المجموع الفرعي</span>
                            <div className="flex items-center gap-1  text-gray-800 order-1 md:order-2">
                                <span className="text-sm md:text-base">700.00</span>
                                <span className="text-[10px] md:text-xs">ج.م</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-gray-600">
                            <span className=" text-sm md:text-base order-2 md:order-1">:رسوم الشحن</span>
                            <div className="flex items-center gap-1  text-gray-800 order-1 md:order-2">
                                <span className="text-sm md:text-base">35.00</span>
                                <span className="text-[10px] md:text-xs">ج.م</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-gray-600 pb-4 border-b border-gray-50 md:border-none md:pb-0">
                            <span className=" text-sm md:text-base order-2 md:order-1">:(%15) ضريبة القيمة المضافة</span>
                            <div className="flex items-center gap-1  text-gray-800 order-1 md:order-2">
                                <span className="text-sm md:text-base">110.25</span>
                                <span className="text-[10px] md:text-xs">ج.م</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900 text-sm md:text-lg order-2 md:order-1">:الإجمالي النهائي</span>
                                <div className="flex items-center gap-1 font-medium text-[#ec4d18] text-lg md:text-xl order-1 md:order-2">
                                    <span>845.25</span>
                                    <span className="text-sm">ج.م</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
