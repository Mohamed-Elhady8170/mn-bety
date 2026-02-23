import React from 'react';
import { Camera, Save, Store } from 'lucide-react';

export default function StoreProfile() {
  return (
    <div className="p-4 md:p-8 bg-[#f8f9fa] min-h-screen font-cairo text-right" dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <Store className="text-[#ec4d18]" /> ملف المتجر
        </h1>
        <p className="text-gray-500 text-sm mt-1">خصص مظهر متجرك والمعلومات التي تظهر للعملاء</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-4xl">
        {/* Cover Photo */}
        <div className="h-48 bg-[#f3ece8] relative group cursor-pointer">
          <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <button className="bg-white/90 text-gray-900 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm backdrop-blur-sm">
              <Camera size={16} /> تغيير غلاف المتجر
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-10 relative">
          {/* Avatar Photo */}
          <div className="absolute -top-16 right-10">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md relative group cursor-pointer bg-white">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" alt="Store Avatar" className="w-full h-full rounded-full object-cover" />
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="text-white" size={24} />
              </div>
            </div>
          </div>

          <form className="mt-16 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">اسم المتجر</label>
                <input type="text" defaultValue="مشغل نورة" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">رقم التواصل للعملاء</label>
                <input type="tel" dir="ltr" defaultValue="+20 100 000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18] text-right" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900">نبذة عن المتجر (تظهر في صفحة البائع)</label>
              <textarea rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18] resize-none" defaultValue="متخصصة في إحياء التراث السعودي من خلال تطريز الحقائب والملابس بلمسة عصرية وحديثة. نعمل بشغف لتقديم أفضل جودة."></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900">عنوان المتجر / موقع الشحن</label>
              <input type="text" defaultValue="الرياض، المملكة العربية السعودية" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18]" />
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button type="submit" className="bg-[#ec4d18] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#d43d0a] transition-all shadow-lg shadow-[#ec4d18]/20 flex items-center gap-2 active:scale-95">
                <Save size={20} /> حفظ التغييرات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}