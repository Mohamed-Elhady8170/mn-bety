import React from 'react';
import {
    Printer,
    Truck,
    Calendar,
    ChevronRight,
} from 'lucide-react';

const orderData = {
    id: "ORD-8829#",
    date: "24 أكتوبر 2023 | 10:30 صباحاً",
    status: "قيد المعالجة",
    customer: {
        name: "أحمد محمد عبد الله",
        phone: "+966 50 123 4567",
        email: "ahmed@example.com"
    },
    shipping: {
        address: "حي النخيل، طريق الملك فهد",
        city: "الرياض",
        zip: "12345",
        country: "المملكة العربية السعودية"
    },
    payment: {
        method: "بطاقة مدى",
        cardNumber: "**** 1234",
        total: "450.00"
    }
};

export default function OrderHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            {/* Right side - Order info */}
            <div className="text-right">
                <h1 className="text-xl md:text-2xl font-bold text-text-main flex flex-wrap items-center gap-2 md:gap-3">
                    <span>تفاصيل الطلب</span>
                    <span className="text-primary dir-ltr text-lg md:text-2xl">{orderData.id}</span>
                </h1>

                <p className="text-text-soft flex items-center gap-2 mt-2 text-xs md:text-sm leading-relaxed">
                    <Calendar size={16} className="shrink-0 text-primary" />
                    <span>تم استلام الطلب في {orderData.date}</span>
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