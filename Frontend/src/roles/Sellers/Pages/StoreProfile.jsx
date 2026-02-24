import React, { useState } from 'react';
import { Camera, Save, Edit3, X, CheckCircle, Phone, MapPin } from 'lucide-react';

export default function StoreProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [storeData] = useState({
    name: "مشغل نورة للتطريز",
    phone: "+966 50 123 4567",
    bio: "نحن نهتم بأدق التفاصيل لنحيي التراث السعودي بلمسة عصرية. منتجاتنا مصنوعة يدوياً وبكل حب لتناسب ذوقكم الرفيع.",
    address: "المملكة العربية السعودية، الرياض، حي النخيل",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  });

  return (
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="bg-bg-main rounded-3xl md:rounded-[2.5rem] shadow-sm border border-border-warm overflow-hidden">
          
          {/* Cover Image */}
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
            
            {/* Avatar and Edit Button */}
            <div className="relative -mt-12 md:-mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
              <div className="w-32 h-32 rounded-full border-4 border-bg-main shadow-md relative group cursor-pointer bg-bg-main">
                <img 
                  src={storeData.avatar} 
                  className="w-full h-full rounded-full object-cover" 
                  alt="Avatar" 
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity rounded-full">
                    <Camera className="text-white" size={24} />
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl md:rounded-2xl font-bold transition-all duration-200 text-sm md:text-base ${
                  isEditing 
                    ? 'bg-bg-subtle text-text-soft hover:bg-bg-subtle/80' 
                    : 'bg-primary-10 text-primary hover:bg-primary-20'
                }`}
              >
                {isEditing ? <><X size={18} /> إلغاء التعديل</> : <><Edit3 size={18} /> تحديث الملف الشخصي</>}
              </button>
            </div>

            {/* Content Area */}
            <div className="mt-4 md:mt-8">
              {!isEditing ? (
                <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
                  <div className="text-center md:text-right">
                    <h2 className="text-xl md:text-2xl font-black text-text-main flex items-center justify-center md:justify-start gap-2">
                      {storeData.name}
                      <CheckCircle size={20} className="text-icon-blue shrink-0" />
                    </h2>
                    <p className="text-text-soft mt-3 leading-relaxed max-w-3xl text-sm md:text-lg">
                      {storeData.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {/* Phone Card */}
                    <div className="flex items-center gap-4 bg-bg-body p-4 rounded-2xl border border-border-warm/50">
                      <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center shadow-sm text-primary shrink-0">
                        <Phone size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-wider">رقم التواصل</p>
                        <p className="font-bold text-text-main text-sm md:text-base truncate" dir="ltr">{storeData.phone}</p>
                      </div>
                    </div>
                    
                    {/* Address Card */}
                    <div className="flex items-center gap-4 bg-bg-body p-4 rounded-2xl border border-border-warm/50">
                      <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center shadow-sm text-primary shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-wider">العنوان</p>
                        <p className="font-bold text-text-main text-sm md:text-base truncate">{storeData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit Form */
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-xs md:text-sm font-black text-text-main mr-1">اسم المتجر</label>
                    <input 
                      type="text" 
                      defaultValue={storeData.name} 
                      className="w-full bg-bg-body border-2 border-border-warm rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:border-primary outline-none font-bold text-sm md:text-base transition-colors duration-200 text-text-main" 
                    />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-xs md:text-sm font-black text-text-main mr-1">رقم التواصل</label>
                    <input 
                      type="tel" 
                      dir="ltr" 
                      defaultValue={storeData.phone} 
                      className="w-full bg-bg-body border-2 border-border-warm rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:border-primary outline-none font-bold text-right text-sm md:text-base transition-colors duration-200 text-text-main" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5 md:space-y-2">
                    <label className="text-xs md:text-sm font-black text-text-main mr-1">نبذة عن المتجر</label>
                    <textarea 
                      rows="4" 
                      defaultValue={storeData.bio} 
                      className="w-full bg-bg-body border-2 border-border-warm rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:border-primary outline-none font-medium resize-none text-sm md:text-base transition-colors duration-200 text-text-main" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5 md:space-y-2">
                    <label className="text-xs md:text-sm font-black text-text-main mr-1">المقر الرئيسي</label>
                    <input 
                      type="text" 
                      defaultValue={storeData.address} 
                      className="w-full bg-bg-body border-2 border-border-warm rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:border-primary outline-none font-bold text-sm md:text-base transition-colors duration-200 text-text-main" 
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end mt-2">
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)} 
                      className="w-full md:w-auto bg-primary text-white px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                    >
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