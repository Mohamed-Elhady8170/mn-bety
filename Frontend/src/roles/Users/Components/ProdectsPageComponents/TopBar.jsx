import React from 'react'

export default function TopBar({ count, sort, setSort }) {
  return (
    <div className="flex items-center justify-between mb-6" dir="rtl">
      <div>
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-1 flex items-center gap-1">
          <span className="hover:text-amber-600 cursor-pointer">الرئيسية</span>
          <span>/</span>
          <span className="hover:text-amber-600 cursor-pointer">المنتجات اليدوية</span>
          <span>/</span>
          <span className="text-amber-600 font-semibold">طالب بدوي</span>
        </nav>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          المنتجات اليدوية المميزة
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          اشتري فقط المنتجات الصناعية يدوياً من قبل أمهر الحرفيين في العالم العربي
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">عرض {count} من 160 منتج</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
        >
          <option value="latest">الأحدث</option>
          <option value="price_asc">السعر: من الأدنى</option>
          <option value="price_desc">السعر: من الأعلى</option>
          <option value="rating">الأعلى تقييماً</option>
        </select>
      </div>
    </div>
  );
}