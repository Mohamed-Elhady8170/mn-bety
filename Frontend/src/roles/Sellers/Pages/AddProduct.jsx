import React, { useState } from 'react';
import { UploadCloud, Save, X } from 'lucide-react';

export default function AddProduct() {
  const [formData] = useState({ name: '', price: '', category: '', stock: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product saved!", formData);
    // Add logic to save product
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8f9fa] min-h-screen font-cairo text-right" dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">إضافة منتج جديد</h1>
        <p className="text-gray-500 text-sm mt-1">قم بتعبئة تفاصيل منتجك الجديد لعرضه للعملاء</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Right Column: Text Info */}
        <div className="flex-1 space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">اسم المنتج</label>
            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18]" placeholder="مثال: حقيبة يدوية مطرزة" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900">السعر (ج.م)</label>
              <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18]" placeholder="0.00" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900">الكمية المتاحة (المخزون)</label>
              <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18]" placeholder="مثال: 10" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">التصنيف</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18] appearance-none cursor-pointer">
              <option value="">اختر التصنيف...</option>
              <option value="1">أكلات بيتية</option>
              <option value="2">حقائب وإكسسوارات</option>
              <option value="3">ديكور منزلي</option>
              <option value="4">فخاريات</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">وصف المنتج</label>
            <textarea rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ec4d18] focus:ring-1 focus:ring-[#ec4d18] resize-none" placeholder="اكتب وصفاً جذاباً ومفصلاً لمنتجك..."></textarea>
          </div>
        </div>

        {/* Left Column: Image Upload & Actions */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">صورة المنتج</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 h-64 flex flex-col items-center justify-center text-center p-6 hover:bg-gray-100 hover:border-[#ec4d18] transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="text-[#ec4d18]" size={32} />
              </div>
              <p className="font-bold text-gray-700 mb-1">اضغط أو اسحب الصورة هنا</p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP حتى 5MB</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" className="flex-1 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
              <X size={20} /> إلغاء
            </button>
            <button type="submit" className="flex-2 bg-[#ec4d18] text-white py-3.5 rounded-xl font-bold hover:bg-[#d43d0a] transition-all shadow-lg shadow-[#ec4d18]/20 flex justify-center items-center gap-2 active:scale-95">
              <Save size={20} /> حفظ المنتج
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}