// InfoCardsGrid.jsx
import React from 'react';
import {
    User,
    MapPin,
    CreditCard,
} from 'lucide-react';

const orderData = {
    id: "ORD-8829#",
    date: "24 أكتوبر 2023 | 10:30 صباحاً",
    status: "قيد المعالجة",
    customer: {
        name: " نهى مصطفى محمد ",
        phone: "+20 108653324",
        email: "noha@example.com"
    },
    shipping: {
        address: " الباجور ",
        city: "المنوفية",
        zip: "12345",
        country: "مصر "
    },
    payment: {
        method: "بطاقة مدى",
        cardNumber: "**** 1234",
        total: "450.00"
    }
};

export default function InfoCardsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

            {/* Customer Card */}
            <div className="group bg-bg-main p-5 md:p-6 rounded-2xl shadow-sm border border-border-warm transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="p-3 bg-icon-bg-blue text-icon-blue rounded-lg group-hover:bg-hover-blue group-hover:text-white transition-colors duration-500 shrink-0">
                        <User className='transition-transform duration-700 ease-in-out group-hover:-translate-y-1 group-hover:transform-[rotateY(180deg)]' size={24} />
                    </div>
                    <h3 className="font-bold text-text-main text-base md:text-lg truncate">معلومات العميل</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <p className="text-xs md:text-sm text-text-soft">اسم العميل</p>
                        <p className="font-semibold text-text-main text-sm md:text-base truncate">{orderData.customer.name}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-t border-border-warm pt-3 sm:border-none sm:pt-0">
                        <p className="text-xs md:text-sm text-text-soft">رقم الجوال</p>
                        <p className="font-semibold text-text-main text-sm md:text-base dir-ltr inline-block">{orderData.customer.phone}</p>
                    </div>
                </div>
            </div>

            {/* Shipping Card */}
            <div className="group bg-bg-main p-5 md:p-6 rounded-2xl shadow-sm border border-border-warm transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="p-3 bg-icon-bg-orange text-icon-orange rounded-lg group-hover:bg-hover-orange group-hover:text-white transition-colors duration-500 shrink-0">
                        <MapPin className='transition-transform duration-700 ease-in-out group-hover:-translate-y-1 group-hover:transform-[rotateY(180deg)]' size={24} />
                    </div>
                    <h3 className="font-bold text-text-main text-base md:text-lg truncate">عنوان الشحن</h3>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold text-text-main text-sm md:text-base leading-relaxed">{orderData.shipping.address}</p>
                    <p className="text-sm text-text-soft">{orderData.shipping.city}، {orderData.shipping.zip}</p>
                    <p className="text-sm text-text-soft">{orderData.shipping.country}</p>
                </div>
            </div>

            {/* Payment Card */}
            <div className="group bg-bg-main p-5 md:p-6 rounded-2xl shadow-sm border border-border-warm transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="p-3 bg-icon-bg-green text-icon-green rounded-lg group-hover:bg-hover-green group-hover:text-white transition-colors duration-500 shrink-0">
                        <CreditCard className='transition-transform duration-700 ease-in-out group-hover:-translate-y-1 group-hover:transform-[rotateY(180deg)]' size={24} />
                    </div>
                    <h3 className="font-bold text-text-main text-base md:text-lg truncate">حالة الدفع</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center gap-2">
                        <span className="text-xs md:text-sm text-text-soft">طريقة الدفع</span>
                        <span className="font-medium text-text-main text-xs md:text-sm text-left">{orderData.payment.method} - {orderData.payment.cardNumber}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2 border-t border-border-warm pt-3">
                        <span className="text-xs md:text-sm text-text-soft">حالة الطلب</span>
                        <span className="px-3 py-1 bg-badge-bg text-badge-text rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap">
                            {orderData.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}