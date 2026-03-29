import React from 'react';

export default function OrdersProducts({ order }) {
    // 1. Get items (filtered for this seller by the backend)
    const items = order?.items || [];
    
    // 2. Calculate the total dynamically based on the seller's items
    const subTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingFee = 0; // Update this if your backend tracks shipping per seller
    const finalTotal = subTotal + shippingFee; 

    return (
        <>
            <div className="mt-8 bg-bg-main rounded-2xl border border-border-warm shadow-sm mb-10 max-w-full overflow-hidden">

                <div className="p-4 md:p-6 border-b border-border-warm flex justify-between items-center">
                    <h3 className="font-bold text-text-main text-base md:text-lg">منتجات الطلب</h3>
                    <span className="bg-bg-subtle text-text-soft px-3 py-1 rounded-lg text-xs font-medium">
                        عدد العناصر: {items.length}
                    </span>
                </div>

                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border-warm">
                    <table className="w-full text-right border-collapse">
                        <thead className="bg-bg-subtle text-text-soft text-xs md:text-sm">
                            <tr>
                                <th className="p-3 md:p-4 font-semibold min-w-37.5 md:min-w-auto">المنتج</th>
                                <th className="p-3 md:p-4 font-semibold whitespace-nowrap">السعر الفرعي</th>
                                <th className="p-3 md:p-4 font-semibold text-center whitespace-nowrap">الكمية</th>
                                <th className="p-3 md:p-4 font-semibold whitespace-nowrap">الإجمالي</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-warm text-xs md:text-sm">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-text-soft">
                                        لا توجد منتجات لعرضها.
                                    </td>
                                </tr>
                            ) : (
                                items.map((item, index) => {
                                    // Fallback to placeholder if product wasn't populated properly
                                    const image = item.product?.images?.[0]?.url || "https://via.placeholder.com/150";
                                    const itemTotalPrice = item.price * item.quantity;

                                    return (
                                        <tr key={item._id || index} className="hover:bg-bg-subtle/50 transition-colors">
                                            <td className="p-3 md:p-4">
                                                <div className="flex items-center gap-2 md:gap-4">
                                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden border border-border-warm shrink-0">
                                                        <img
                                                            src={image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-text-main leading-tight truncate max-w-30 md:max-w-none">
                                                            {item.name}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 md:p-4 text-text-soft whitespace-nowrap">
                                                {item.price?.toLocaleString()} ج.م
                                            </td>
                                            <td className="p-3 md:p-4 text-center">
                                                <span className="bg-bg-subtle px-2 py-1 rounded text-text-main font-bold">
                                                    {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                                                </span>
                                            </td>
                                            <td className="p-3 md:p-4 font-bold text-primary whitespace-nowrap">
                                                {itemTotalPrice.toLocaleString()} ج.م
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-start mt-6">
                <div className="bg-bg-main p-5 md:p-6 rounded-3xl border border-border-warm shadow-sm w-full md:max-w-md">
                    <div className="space-y-4">

                        <div className="flex justify-between items-center text-text-soft">
                            <span className="text-sm md:text-base order-2 md:order-1">:المجموع الفرعي</span>
                            <div className="flex items-center gap-1 text-text-main order-1 md:order-2">
                                <span className="text-sm md:text-base">{subTotal.toLocaleString()}</span>
                                <span className="text-[10px] md:text-xs">ج.م</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-text-soft">
                            <span className="text-sm md:text-base order-2 md:order-1">:رسوم الشحن</span>
                            <div className="flex items-center gap-1 text-text-main order-1 md:order-2">
                                <span className="text-sm md:text-base">{shippingFee}</span>
                                <span className="text-[10px] md:text-xs">ج.م</span>
                            </div>
                        </div>

                        {/* Optional: Add Tax dynamically if needed later, currently omitted or you can uncomment and adjust logic */}
                        {/* <div className="flex justify-between items-center text-text-soft pb-4 border-b border-border-warm md:border-none md:pb-0">
                            <span className="text-sm md:text-base order-2 md:order-1">:(%15) ضريبة القيمة المضافة</span>
                            <div className="flex items-center gap-1 text-text-main order-1 md:order-2">
                                <span className="text-sm md:text-base">{(subTotal * 0.15).toFixed(2)}</span>
                                <span className="text-[10px] md:text-xs">ج.م</span>
                            </div>
                        </div> */}

                        <div className="border-t border-border-warm pt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-text-main text-sm md:text-lg order-2 md:order-1">:الإجمالي النهائي</span>
                                <div className="flex items-center gap-1 font-medium text-primary text-lg md:text-xl order-1 md:order-2">
                                    <span>{finalTotal.toLocaleString()}</span>
                                    <span className="text-sm">ج.م</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}