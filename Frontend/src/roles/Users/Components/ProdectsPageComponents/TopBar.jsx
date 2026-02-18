import React from 'react'

export default function TopBar({ count, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6" dir="rtl">
      <div className="text-right">
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          المنتجات اليدوية المميزة
        </h1>
        <p className="text-[10px] md:text-xs text-gray-400 mt-1 max-w-xs md:max-w-none">
          اشتري فقط المنتجات الصناعية يدوياً من قبل أمهر الحرفيين في العالم العربي
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
        <span className="text-[10px] md:text-xs text-gray-500 shrink-0">
          عرض {count} من 160 منتج
        </span>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 md:px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white cursor-pointer"
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