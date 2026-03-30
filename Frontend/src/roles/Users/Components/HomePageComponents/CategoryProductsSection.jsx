// src/roles/Users/Components/HomePageComponents/CategoryProductsSection.jsx
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { setSelectedCategory, setSelectedSub } from '../../Features/Categoryslice';

const getImageUrl = (item) => {
  if (!item) return '';
  if (typeof item.image === 'string') return item.image;
  return (
    item.image?.url ||
    item.image?.secure_url ||
    item.imageUrl ||
    item.thumbnail?.url ||
    ''
  );
};

export default function CategoryProductsSection({ category, index }) {
  const navigate = useNavigate();
  const dispatch  = useDispatch();

  // alternate bg color زي الـ sections القديمة
  const bgColor = index % 2 === 0 ? 'bg-bg-main' : 'bg-bg-light';

  // الـ subcategories جوه الـ category object
  const subcategories = useMemo(
    () => category.children ?? category.subcategories ?? [],
    [category.children, category.subcategories]
  );
  const ITEMS_PER_VIEW = 4;
  const [startIndex, setStartIndex] = useState(0);

  const canPaginate = subcategories.length > ITEMS_PER_VIEW;
  const maxStartIndex = Math.max(0, subcategories.length - ITEMS_PER_VIEW);

  const visibleSubcategories = useMemo(() => {
    if (!canPaginate) return subcategories;
    return subcategories.slice(startIndex, startIndex + ITEMS_PER_VIEW);
  }, [subcategories, startIndex, canPaginate]);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  // لو مفيش subcategories → متعرضش الـ section دي
  if (subcategories.length === 0) return null;

  const handleSubcategoryClick = (sub) => {
    // 1. حط الـ category والـ sub في Redux
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedSub(sub));
    // 2. روح لصفحة المنتجات مع الـ query param
    navigate(`/customer/products?category=${sub._id}`);
  };

  const handleViewAll = () => {
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedSub(null));
    navigate(`/customer/products?category=${category._id}`);
  };

  return (
    <section className={`py-16 md:py-20 ${bgColor}`}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
          <div className="relative text-center md:text-start">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-text-main tracking-tight capitalize">
              {category.name}
            </h2>
            {/* عدد المنتجات لو موجود */}
            <p className="text-text-subtle mt-1 md:mt-2 text-xs md:text-sm lg:text-base max-w-md">
              {subcategories.length} تصنيف فرعي
            </p>
          </div>

          <button
            onClick={handleViewAll}
            className="group flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-all text-sm md:text-base border-2 border-primary/20 hover:border-primary/40 px-4 md:px-5 py-2 rounded-full"
          >
            عرض الكل
            <FaArrowLeft className="text-xs md:text-sm group-hover:-translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Grid — max 4 subcategories */}
        <div className="relative">
          {canPaginate && (
            <>
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-bg-main/90 border border-border-main shadow-md text-text-main disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="السابق"
              >
                <FaChevronRight size={14} />
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex >= maxStartIndex}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-bg-main/90 border border-border-main shadow-md text-text-main disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="التالي"
              >
                <FaChevronLeft size={14} />
              </button>
            </>
          )}

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-8 lg:px-12 ${
            visibleSubcategories.length === 1 ? 'lg:grid-cols-1 max-w-xs' :
            visibleSubcategories.length === 2 ? 'lg:grid-cols-2' :
            visibleSubcategories.length === 3 ? 'lg:grid-cols-3' :
            'lg:grid-cols-4'
          }`}>
            {visibleSubcategories.map((sub) => {
            const imgUrl = getImageUrl(sub);

            return (
              <div
                key={sub._id}
                onClick={() => handleSubcategoryClick(sub)}
                className="group relative h-80 md:h-96 lg:h-112 overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500"
                style={{ border: '6px solid var(--color-image-border)' }}
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={sub.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-bg-subtle" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-8 text-center flex flex-col items-center">
                  <span className="bg-primary text-white text-xs md:text-sm font-bold py-1 px-3 md:py-1.5 md:px-4 rounded-full mb-2 md:mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    عرض المنتجات
                  </span>
                  <h3 className="text-white font-black text-lg md:text-xl lg:text-2xl drop-shadow-lg capitalize">
                    {sub.name}
                  </h3>
                </div>

                {/* Border hover effect */}
                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-2xl md:rounded-3xl lg:rounded-[2.5rem]" />
              </div>
            );
          })}
          </div>

          {canPaginate && (
            <div className="mt-5 flex items-center justify-center gap-3 lg:hidden">
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="w-9 h-9 rounded-full border border-border-main bg-bg-main text-text-main flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="السابق"
              >
                <FaChevronRight size={12} />
              </button>
              <span className="text-xs text-text-subtle font-bold">
                {startIndex + 1} / {maxStartIndex + 1}
              </span>
              <button
                onClick={handleNext}
                disabled={startIndex >= maxStartIndex}
                className="w-9 h-9 rounded-full border border-border-main bg-bg-main text-text-main flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="التالي"
              >
                <FaChevronLeft size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile view all */}
        <div className="flex justify-center mt-8 md:hidden">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 text-primary font-bold border-2 border-primary/30 px-5 py-2.5 rounded-full text-sm"
          >
            عرض المزيد
            <FaArrowLeft className="text-xs" />
          </button>
        </div>
      </div>
    </section>
  );
}