import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedSub,
  selectSubcategories,
  selectSubLoading,
  selectSelectedSub,
  selectSelectedCategory,
} from "../../Features/Categoryslice";

export default function TopBar({ count }) {
  const { t } = useTranslation();
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
   
    >
      {/* ── Title block ── */}
      <div className="text-start">
        <h1 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight">
          {t('products_page.title')}
        </h1>
        <p className="text-[10px] md:text-xs text-text-subtle mt-1 max-w-xs md:max-w-none">
          {t('products_page.subtitle')}
        </p>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-border-main">
        <span className="text-[10px] md:text-xs text-text-subtle shrink-0">
          {t('products_page.showing')} {count} {t('products_page.of')} 160 {t('products_page.products')}
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
              <option>{t('products_page.no_subcategories')}</option>
            </select>
          )
        )}
      </div>
    </div>
  );
}