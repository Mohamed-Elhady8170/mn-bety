import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedSub,
  selectSubcategories,
  selectSubLoading,
  selectSelectedSub,
  selectSelectedCategory,
} from "../../Features/Categoryslice";

export default function TopBar({ count, sort, setSort }) {
  const dispatch          = useDispatch();
  const subcategories     = useSelector(selectSubcategories);
  const subLoading        = useSelector(selectSubLoading);
  const selectedSub       = useSelector(selectSelectedSub);
  const selectedCategory  = useSelector(selectSelectedCategory);

  const handleSubChange = (e) => {
    const sub = subcategories.find((s) => s._id === e.target.value) ?? null;
    dispatch(setSelectedSub(sub));
  };

  return (
    <div
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
      dir="rtl"
    >
      {/* ── Title block ── */}
      <div className="text-right">
        <h1 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">
          المنتجات اليدوية المميزة
        </h1>
        <p className="text-[10px] md:text-xs text-text-subtle mt-1 max-w-xs md:max-w-none">
          اشتري فقط المنتجات الصناعية يدوياً من قبل أمهر الحرفيين في العالم العربي
        </p>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-border-main">
        <span className="text-[10px] md:text-xs text-text-subtle shrink-0">
          عرض {count} من 160 منتج
        </span>

        {/* Subcategory dropdown — driven by selected main category */}
        {subLoading ? (
          <div className="w-28 h-8 rounded-lg bg-bg-subtle animate-pulse" />
        ) : subcategories.length > 0 ? (
          <select
            value={selectedSub?._id ?? ""}
            onChange={handleSubChange}
            className="text-xs border border-border-main rounded-lg px-2 md:px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary bg-bg-main cursor-pointer"
          >
            {subcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        ) : (
          // Show a disabled placeholder when the selected category has no children
          selectedCategory && (
            <select
              disabled
              className="text-xs border border-border-main rounded-lg px-2 md:px-3 py-2 text-text-subtle bg-bg-subtle cursor-not-allowed opacity-60"
            >
              <option>لا توجد أقسام فرعية</option>
            </select>
          )
        )}
      </div>
    </div>
  );
}