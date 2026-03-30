import React from 'react';
import { Printer, Calendar } from 'lucide-react';

export default function OrderHeader({ order }) {
    const orderId = order?._id ? `#${order._id.slice(-6).toUpperCase()}` : "---";
    
    // Better Date Formatting
    const date = order?.createdAt 
        ? new Date(order.createdAt).toLocaleDateString("ar-EG", { 
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
          }) 
        : "---";

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            {/* Right side - Order info */}
            <div className="text-right">
                <h1 className="text-2xl md:text-3xl font-black text-text-main flex flex-wrap items-center gap-2 md:gap-3">
                    <span>تفاصيل الطلب</span>
                    <span className="text-primary dir-ltr tracking-wider">{orderId}</span>
                </h1>
                <p className="text-text-soft flex items-center gap-2 mt-2 font-medium">
                    <Calendar size={18} className="shrink-0 text-primary" />
                    <span>تم استلام الطلب في {date}</span>
                </p>
            </div>

            {/* Left side - Action button */}
            {/* print:hidden ensures the button itself doesn't show up inside the downloaded PDF! */}
            <div className="flex items-center sm:justify-end print:hidden">
                <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-md hover:shadow-lg font-bold"
                >
                    <Printer size={20} />
                    <span>تحميل الفاتورة (PDF)</span>
                </button>
            </div>
        </div>
    );
}