import React, { useState } from 'react';
import { Camera, Save, Store, MapPin, Phone, Info, Edit3, X, CheckCircle } from 'lucide-react';

export default function StoreProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [storeData, setStoreData] = useState({
    name: "مشغل نورة للتطريز",
    phone: "+966 50 123 4567",
    bio: "نحن نهتم بأدق التفاصيل لنحيي التراث السعودي بلمسة عصرية. منتجاتنا مصنوعة يدوياً وبكل حب لتناسب ذوقكم الرفيع.",
    address: "المملكة العربية السعودية، الرياض، حي النخيل",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  });

  return (
    <div className="p-4 md:p-8 bg-[#fdfdfd] min-h-screen font-cairo text-right" dir="rtl">
  <div className="max-w-5xl mx-auto">
    <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      
      <div className="h-40 md:h-64 relative group">
        <img
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop"
          className="w-full h-full object-cover"
          alt="Cover"
        />
        {isEditing && (
          <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold gap-2 transition-all backdrop-blur-[2px]">
            <Camera size={20} /> <span className="text-sm md:text-base">تغيير الغلاف</span>
          </button>
        )}
      </div>

      <div className="px-4 md:px-12 pb-8 md:pb-12 relative">
        
        <div className="relative -mt-12 md:-mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-md relative group cursor-pointer bg-white">
            <img src={storeData.avatar} className="w-full h-full rounded-full object-cover" alt="Avatar" />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            )}
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl md:rounded-2xl font-bold transition-all text-sm md:text-base ${
              isEditing ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-[#ec4d18]/10 text-[#ec4d18] hover:bg-[#ec4d18]/20'
            }`}
          >
            {isEditing ? <><X size={18} /> إلغاء التعديل</> : <><Edit3 size={18} /> تحديث الملف الشخصي</>}
          </button>
        </div>

        <div className="mt-4 md:mt-8">
          {!isEditing ? (
            <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <div className="text-center md:text-right">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 flex items-center justify-center md:justify-start gap-2">
                  {storeData.name}
                  <CheckCircle size={20} className="text-blue-500 shrink-0" />
                </h2>
                <p className="text-gray-500 mt-3 leading-relaxed max-w-3xl text-sm md:text-lg">
                  {storeData.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#ec4d18] shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">رقم التواصل</p>
                    <p className="font-bold text-gray-700 text-sm md:text-base truncate" dir="ltr">{storeData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#ec4d18] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">العنوان</p>
                    <p className="font-bold text-gray-700 text-sm md:text-base truncate">{storeData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-black text-gray-700 mr-1">اسم المتجر</label>
                <input type="text" defaultValue={storeData.name} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:border-[#ec4d18] outline-none font-bold text-sm md:text-base transition-colors" />
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-black text-gray-700 mr-1">رقم التواصل</label>
                <input type="tel" dir="ltr" defaultValue={storeData.phone} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:border-[#ec4d18] outline-none font-bold text-right text-sm md:text-base transition-colors" />
              </div>
              <div className="md:col-span-2 space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-black text-gray-700 mr-1">نبذة عن المتجر</label>
                <textarea rows="4" defaultValue={storeData.bio} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:border-[#ec4d18] outline-none font-medium resize-none text-sm md:text-base transition-colors" />
              </div>
              <div className="md:col-span-2 space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-black text-gray-700 mr-1">المقر الرئيسي</label>
                <input type="text" defaultValue={storeData.address} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:border-[#ec4d18] outline-none font-bold text-sm md:text-base transition-colors" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button type="button" onClick={() => setIsEditing(false)} className="w-full md:w-auto bg-[#ec4d18] text-white px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black shadow-lg shadow-orange-200/50 hover:bg-[#d43d0a] transition-all flex items-center justify-center gap-2">
                  <Save size={20} /> حفظ التغييرات
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
}