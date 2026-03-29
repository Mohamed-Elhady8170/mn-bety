import React from 'react';
import {
    Printer,
    Truck,
    Calendar,
    ChevronRight,
} from 'lucide-react';


export default function OrderHeader({ order }) {
    const orderId = order?._id ? `#${order._id.slice(-6).toUpperCase()}` : "---";
    const date = order?.createdAt ? new Date(order.createdAt).toLocaleDateString("ar-EG") : "---";
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            {/* Right side - Order info */}
            <div className="text-right">
                <h1 className="text-xl md:text-2xl font-bold text-text-main flex flex-wrap items-center gap-2 md:gap-3">
                    <span>تفاصيل الطلب</span>
                    <span className="text-primary dir-ltr text-lg md:text-2xl">{orderId}</span>
                </h1>

                <p className="text-text-soft flex items-center gap-2 mt-2 text-xs md:text-sm leading-relaxed">
                    <Calendar size={16} className="shrink-0 text-primary" />
                    <span>تم استلام الطلب في {date}</span>
                </p>
            </div>

            {/* Left side - Action button */}
            <div className="flex items-center sm:justify-end">
                <button
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-md hover:shadow-lg text-sm md:text-base font-medium"
                >
                    <Printer size={18} />
                    <span>تحميل PDF</span>
                </button>
            </div>
        </div>
    );
}