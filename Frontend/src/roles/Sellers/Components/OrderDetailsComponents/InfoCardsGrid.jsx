import React from 'react'
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

            <div className="group bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shrink-0">
                        <User className='transition-transform duration-700 ease-in-out 
            group-hover:-translate-y-1 
            group-hover:transform-[rotateY(180deg)]' size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-base md:text-lg truncate">معلومات العميل</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <p className="text-xs md:text-sm text-gray-400">اسم العميل</p>
                        <p className="font-semibold text-gray-700 text-sm md:text-base truncate">{orderData.customer.name}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-t border-gray-50 pt-3 sm:border-none sm:pt-0">
                        <p className="text-xs md:text-sm text-gray-400">رقم الجوال</p>
                        <p className="font-semibold text-gray-700 text-sm md:text-base dir-ltr inline-block">{orderData.customer.phone}</p>
                    </div>
                </div>
            </div>

            {/* Shipping Card */}
            <div className="group bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="p-3 bg-orange-50 text-[#ec4d18] rounded-lg group-hover:bg-[#ec4d18] group-hover:text-white transition-colors duration-500 shrink-0">
                        <MapPin className='transition-transform duration-700 ease-in-out 
            group-hover:-translate-y-1 
            group-hover:transform-[rotateY(180deg)]' size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-base md:text-lg truncate">عنوان الشحن</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                    <p className="font-semibold text-sm md:text-base leading-relaxed">{orderData.shipping.address}</p>
                    <p className="text-sm text-gray-500">{orderData.shipping.city}، {orderData.shipping.zip}</p>
                    <p className="text-sm text-gray-500">{orderData.shipping.country}</p>
                </div>
            </div>

            {/* Payment Card */}
            <div className="group bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-500 shrink-0">
                        <CreditCard className='transition-transform duration-700 ease-in-out 
            group-hover:-translate-y-1 
            group-hover:transform-[rotateY(180deg)]' size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-base md:text-lg truncate">حالة الدفع</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center gap-2">
                        <span className="text-xs md:text-sm text-gray-400">طريقة الدفع</span>
                        <span className="font-medium text-gray-700 text-xs md:text-sm text-left">{orderData.payment.method} - {orderData.payment.cardNumber}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2 border-t border-gray-50 pt-3">
                        <span className="text-xs md:text-sm text-gray-400">حالة الطلب</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap">
                            {orderData.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}