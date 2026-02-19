

import React, { useState, useRef } from 'react';
import { 
  MdEdit, MdCalendarToday, MdPerson, MdHistory, MdShoppingBag, 
  MdInventory2, MdLocalShipping, MdCheckCircle, MdPending, 
  MdChevronLeft, MdDelete 
} from "react-icons/md";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info');
  
  // نظام عرض الطلبات (عرض 3 في كل مرة)
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(3);
  
  const nameInputRef = useRef(null);

  // مصفوفة بيانات طلبات كبيرة للتجربة
  const allOrdersData = [
    { id: "77421", date: "24 أكتوبر 2023", items: "3", price: "450.00", status: "delivered" },
    { id: "88210", date: "02 نوفمبر 2023", items: "1", price: "125.50", status: "pending" },
    { id: "65129", date: "15 سبتمبر 2023", items: "5", price: "890.00", status: "delivered" },
    { id: "99201", date: "10 أغسطس 2023", items: "2", price: "210.00", status: "delivered" },
    { id: "11204", date: "05 أغسطس 2023", items: "1", price: "55.00", status: "pending" },
    { id: "44302", date: "01 يوليو 2023", items: "4", price: "600.00", status: "delivered" },
    { id: "55603", date: "20 يونيو 2023", items: "2", price: "320.00", status: "delivered" },
    { id: "22109", date: "10 مايو 2023", items: "1", price: "150.00", status: "pending" },
    { id: "33405", date: "05 أبريل 2023", items: "3", price: "420.00", status: "delivered" },
  ];

  const handleEditClick = () => {
    setActiveTab('info');
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  };

  const loadMoreOrders = () => {
    setVisibleOrdersCount(prev => prev + 3);
  };

  const showLessOrders = () => {
    setVisibleOrdersCount(prev => prev - 3);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f6] py-8 px-4 md:px-20 lg:px-40 text-right" dir="rtl">
      <div className="max-w-[960] mx-auto">
        
        {/* Header Section */}
        <section className="bg-white rounded-xl p-6 mb-8 border border-[#e6d9d1] shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div 
                className="h-32 w-32 rounded-full bg-cover bg-center border-4 border-[#d2631e]/10 shadow-lg"
                style={{ backgroundImage: '' }}
              ></div>
              <div className="text-center sm:text-right">
                <h1 className="text-2xl font-bold mb-1">محمد الهادي</h1>
                <p className="text-[#956b50] text-base flex items-center justify-center sm:justify-start gap-1">
                  <MdCalendarToday className="text-sm" />
                  عضو منذ يناير 2026
                </p>
                <div className="mt-2 flex justify-center sm:justify-start">
                  <span className="bg-[#d2631e]/10 text-[#d2631e] text-xs font-bold px-3 py-1 rounded-full">عميل متميز</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleEditClick}
              className="flex min-w-[140] items-center justify-center gap-2 rounded-xl bg-[#f3ece8] px-6 py-3 text-sm font-bold hover:bg-[#d2631e] hover:text-white transition-all active:scale-95"
            >
              <MdEdit /> تعديل الملف الشخصي
            </button>
          </div>
        </section>

        {/* Tabs and Content */}
        <div className="bg-white rounded-xl border border-[#e6d9d1] shadow-sm overflow-hidden mb-8">
          <div className="flex border-b border-[#e6d9d1] px-6">
            <button 
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 py-5 px-4 font-bold transition-all ${activeTab === 'info' ? 'text-[#d2631e] border-b-4 border-[#d2631e]' : 'text-[#956b50]'}`}
            >
              <MdPerson className="text-xl" /> معلوماتي
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 py-5 px-4 font-bold transition-all ${activeTab === 'orders' ? 'text-[#d2631e] border-b-4 border-[#d2631e]' : 'text-[#956b50]'}`}
            >
              <MdHistory className="text-xl" /> سجل الطلبات
            </button>
          </div>

          <div className="p-6 lg:p-10">
            {activeTab === 'info' ? (
              /* رجوع كل التفاصيل لتبويب معلوماتي */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main block">الاسم الكامل</label>
                  <input ref={nameInputRef} className="w-full rounded-xl border-[#e6d9d1] bg-[#f8f7f6] p-4 outline-none focus:ring-2 focus:ring-[#d2631e]" defaultValue="محمد الهادي" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main block">البريد الإلكتروني</label>
                  <input className="w-full rounded-xl border-[#e6d9d1] bg-[#f8f7f6] p-4 outline-none focus:ring-1 focus:ring-[#d2631e]" type="email" defaultValue="hadyyyy@email.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main block">رقم الهاتف</label>
                  <input className="w-full rounded-xl border-[#e6d9d1] bg-[#f8f7f6] p-4 outline-none focus:ring-1 focus:ring-[#d2631e]" dir="ltr" defaultValue="+20 1245698710" />
                </div>

                <div className="space-y-2 text-right">
                  <label className="text-sm font-bold text-text-main block">المدينة</label>
                  <select className="w-full rounded-xl border-[#e6d9d1] bg-[#f8f7f6] p-4 outline-none focus:ring-1 focus:ring-[#d2631e] appearance-none">
                     <option>المنوفيه</option>
                   <option>القاهره</option>
                   <option>الدقهليه</option>
                   <option>الغربيه</option>
                   <option>اسكندريه</option>
                   <option>الشرقيه</option>
                   <option>شمال سيناء</option>
                   <option>جنوب سيناء</option>
                   <option>البحر الاحمر</option>
                   <option>المنيا</option>
                   <option>اسوان</option>
                   <option>اسيوط</option>
                  <option >قنا</option>
                   <option>سوهاج</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2 text-right">
                  <label className="text-sm font-bold text-text-main block">عنوان التوصيل</label>
                  <textarea className="w-full rounded-xl border-[#e6d9d1] bg-[#f8f7f6] p-4 outline-none focus:ring-1 focus:ring-[#d2631e]" rows="3" defaultValue="قويسنا- برج الاطباء-المنوفيه-جمهورية مصر العربية" />
                </div>

                <div className="md:col-span-2 flex justify-end mt-4">
                  <button className="bg-[#d2631e] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#d2631e]/90 transition-all shadow-md active:scale-95">
                    حفظ التغييرات
                  </button>
                </div>
              </div>
            ) : (
              /* تبويب سجل الطلبات بنظام الـ Load More */
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MdShoppingBag className="text-[#d2631e]" /> سجل الطلبات
                </h3>
                
                {allOrdersData.slice(0, visibleOrdersCount).map((order) => (
                  <OrderItem key={order.id} {...order} />
                ))}

                <div className="mt-8 flex flex-col items-center gap-4">
                  {visibleOrdersCount < allOrdersData.length ? (
                    <button 
                      onClick={loadMoreOrders}
                      className="text-[#d2631e] font-bold text-sm hover:underline flex items-center gap-1"
                    >
                      عرض المزيد من الطلبات 
                    </button>
                  ) : (
                    <p className="text-gray-400 text-sm italic">لا توجد طلبات أخرى للعرض</p>
                  )}

                  {visibleOrdersCount > 3 && (
                    <button 
                      onClick={showLessOrders}
                      className="text-gray-500 font-bold text-sm hover:underline"
                    >
                      عرض أقل
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="text-red-600 text-sm font-medium hover:underline flex items-center justify-center gap-1 mx-auto py-4">
          <MdDelete className="text-lg" /> حذف الحساب نهائياً
        </button>
      </div>
    </div>
  );
};

// مكون عنصر الطلب (OrderItem)
const OrderItem = ({ id, date, items, price, status }) => {
  const isDelivered = status === 'delivered';
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 border border-[#e6d9d1] rounded-xl hover:bg-[#f8f7f6] transition-colors group">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-[#f3ece8] rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
          {isDelivered ? <MdInventory2 className="text-[#d2631e] text-2xl" /> : <MdLocalShipping className="text-[#d2631e] text-2xl" />}
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">طلب #{id}</p>
          <p className="text-[#956b50] text-sm">{date} • {items} منتجات</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex flex-row-reverse md:flex-row items-center gap-6 w-full md:w-auto justify-between md:justify-end">
        <div className="text-left md:text-right">
          <p className="font-bold text-lg text-[#d2631e]">{price} ج.مصري</p>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${isDelivered ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
            {isDelivered ? <MdCheckCircle /> : <MdPending />}
            {isDelivered ? 'تم التوصيل' : 'قيد المعالجة'}
          </span>
        </div>
        <button className="p-2 text-[#956b50] hover:text-[#d2631e]">
          <MdChevronLeft className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;