import React from 'react'
const CATEGORIES = [
  { label: "طالب بدوي", count: 42, active: true },
  { label: "المجوهرات", count: 33 },
  { label: "ديكور المنزل", count: 28 },
  { label: "هدايا", count: 15 },
];

const SELLERS = ["مصر", "المغرب", "تونس", "الكويت", "عُمان الكويت"];

export default function Sidebar({ priceRange, setPriceRange }) {
  return (
    <aside className="w-64 shrink-0" dir="rtl">
      {/* Categories */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          التصنيفات
        </h2>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li
              key={cat.label}
              className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-sm transition-all ${
                cat.active
                  ? "bg-amber-50 text-amber-700 font-bold"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  cat.active ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {cat.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <h2 className="text-sm font-bold text-gray-700 mb-4">نطاق السعر</h2>
        <input
          type="range"
          min={100}
          max={1000}
          value={priceRange}
          onChange={(e) => setPriceRange(+e.target.value)}
          className="w-full accent-amber-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>100 ر.م</span>
          <span className="font-bold text-amber-600">{priceRange} ر.م</span>
        </div>
      </div>

      {/* Seller Location */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-700 mb-4">موقع البائع</h2>
        <ul className="space-y-2">
          {SELLERS.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-amber-600 transition-colors">
              <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center text-xs">✓</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}