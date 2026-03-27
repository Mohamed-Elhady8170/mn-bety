import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRootCategories,
  fetchSubcategories,
  setSelectedCategory,
  selectRootCategories,
  selectRootLoading,
  selectRootError,
  selectSelectedCategory,
  selectSubcountFor,
} from "../../Features/Categoryslice";

// استيراد السليكتور الخاص بإجمالي عدد المنتجات من سلايس المنتجات
import { selectProductsTotal } from "../../Features/productSlice";

function CategoryItem({ cat, isActive, onSelect }) {
  const subCount = useSelector(selectSubcountFor(cat._id));

  return (
    <li
      onClick={() => onSelect(cat)}
      className={`flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer text-xs sm:text-sm transition-all ${
        isActive
          ? "bg-primary/10 text-primary font-bold"
          : "hover:bg-bg-subtle text-text-main"
      }`}
    >
      <span className="truncate">{cat.name}</span>
      <span
        className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${
          isActive
            ? "bg-primary text-white"
            : "bg-bg-subtle text-text-subtle"
        }`}
      >
        {subCount}
      </span>
    </li>
  );
}

export default function Sidebar({ priceRange, setPriceRange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const rootCategories = useSelector(selectRootCategories);
  const loading = useSelector(selectRootLoading);
  const error = useSelector(selectRootError);
  const selectedCategory = useSelector(selectSelectedCategory);
  
  // جلب إجمالي عدد المنتجات من الـ State
  const allProductsCount = useSelector(selectProductsTotal);

  useEffect(() => {
    dispatch(fetchRootCategories());
    
    // لجعل تاب All تعمل تلقائياً عند الدخول لأول مرة
    // نقوم بضبط التصنيف المختار على null
    dispatch(setSelectedCategory(null));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory?._id) {
      dispatch(fetchSubcategories(selectedCategory._id));
    }
  }, [selectedCategory?._id, dispatch]);

  const handleSelect = (cat) => {
    // إذا كان cat هو null (All) أو تصنيف مختلف، قم بالتحديث
    if (cat?._id === selectedCategory?._id) return;
    dispatch(setSelectedCategory(cat)); 
  };

  return (
    <aside
      className="w-full bg-bg-main p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-sm lg:w-64 shrink-0 space-y-3 sm:space-y-4 lg:sticky lg:top-4"
      dir="rtl"
    >
      <div className="w-full">
        <h2 className="text-sm font-bold text-text-main mb-3 sm:mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          {t('sidebar.categories')}
        </h2>

        {loading && (
          <ul className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <li key={i} className="h-9 rounded-xl bg-bg-subtle animate-pulse" />
            ))}
          </ul>
        )}

        {error && !loading && (
          <p className="text-xs text-red-500 text-center py-2">{error}</p>
        )}

        {!loading && !error && (
          <ul className="space-y-1.5 sm:space-y-2">
            {/* تاب All المعدلة */}
            <li
              onClick={() => handleSelect(null)}
              className={`flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer text-xs sm:text-sm transition-all ${
                selectedCategory === null
                  ? "bg-primary/10 text-primary font-bold"
                  : "hover:bg-bg-subtle text-text-main"
              }`}
            >
              <span>all</span>
              <span
                className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${
                  selectedCategory === null
                    ? "bg-primary text-white"
                    : "bg-bg-subtle text-text-subtle"
                }`}
              >
                {allProductsCount}
              </span>
            </li>

            {rootCategories.map((cat) => (
              <CategoryItem
                key={cat._id}
                cat={cat}
                isActive={cat._id === selectedCategory?._id}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        )}
      </div>
      
      {/* Price Range */}
      <div className="w-full bg-bg-main rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-border-main/50 mt-4">
        <h2 className="text-sm font-bold text-text-main mb-3 sm:mb-4">{t('sidebar.price_range')}</h2>
        <input
          type="range"
          min={100}
          max={1000}
          value={priceRange}
          onChange={(e) => setPriceRange(+e.target.value)}
          className="w-full accent-primary h-1.5 bg-bg-subtle rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] sm:text-xs text-text-subtle mt-1 font-bold">
          <span>100 ج.م</span>
          <span className="text-primary">{priceRange} ج.م</span>
        </div>
      </div>
    </aside>
  );
}