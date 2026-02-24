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
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-text-main">إضافة منتج جديد</h1>
        <p className="text-text-soft text-sm mt-1">قم بتعبئة تفاصيل منتجك الجديد لعرضه للعملاء</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Right Column: Text Info */}
        <div className="flex-1 space-y-6 bg-bg-main p-6 rounded-2xl border border-border-warm shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">اسم المنتج</label>
            <input 
              type="text" 
              className="w-full bg-bg-body  border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main placeholder-text-soft/50" 
              placeholder="مثال: حقيبة يدوية مطرزة" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">السعر (ج.م)</label>
              <input 
                type="number" 
                className="w-full bg-bg-body  border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main placeholder-text-soft/50" 
                placeholder="0.00" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">الكمية المتاحة (المخزون)</label>
              <input 
                type="number" 
                className="w-full bg-bg-body  border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main placeholder-text-soft/50" 
                placeholder="مثال: 10" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">التصنيف</label>
            <select className="w-full bg-bg-body  border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main appearance-none cursor-pointer">
              <option value="" className="bg-bg-main">اختر التصنيف...</option>
              <option value="1" className="bg-bg-main">أكلات بيتية</option>
              <option value="2" className="bg-bg-main">حقائب وإكسسوارات</option>
              <option value="3" className="bg-bg-main">ديكور منزلي</option>
              <option value="4" className="bg-bg-main">فخاريات</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">وصف المنتج</label>
            <textarea 
              rows="4" 
              className="w-full bg-bg-body  border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main placeholder-text-soft/50 resize-none" 
              placeholder="اكتب وصفاً جذاباً ومفصلاً لمنتجك..."
            ></textarea>
          </div>
        </div>

        {/* Left Column: Image Upload & Actions */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-bg-main p-6 rounded-2xl border border-border-warm shadow-sm">
            <h3 className="font-bold text-text-main mb-4">صورة المنتج</h3>
            <div className="border-2 border-dashed border-border-warm rounded-xl bg-bg-body  h-64 flex flex-col items-center justify-center text-center p-6 hover:bg-bg-subtle/80 hover:border-primary transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-bg-main rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="text-primary" size={32} />
              </div>
              <p className="font-bold text-text-main mb-1">اضغط أو اسحب الصورة هنا</p>
              <p className="text-xs text-text-soft">PNG, JPG, WEBP حتى 5MB</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="button" 
              className="flex-1 bg-transparent border border-border-warm text-text-main py-3.5 rounded-xl font-bold hover:bg-bg-subtle transition-colors duration-200 flex justify-center items-center gap-2"
            >
              <X size={20} /> إلغاء
            </button>
            <button 
              type="submit" 
              className="flex-2 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 flex justify-center items-center gap-2 active:scale-95"
            >
              <Save size={20} /> حفظ المنتج
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}