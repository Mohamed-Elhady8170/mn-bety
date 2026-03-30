// src/roles/Users/Components/HomePageComponents/Categories.jsx
import React, { useState, useEffect } from 'react';
// import { useTranslation }              from 'react-i18next';
import { useDispatch, useSelector }    from 'react-redux';
import { useNavigate }                 from 'react-router-dom';
import {
  fetchRootCategories,
  setSelectedCategory,
  setSelectedSub,
  selectRootCategories,
  selectRootLoading,
} from '../../Features/Categoryslice';

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

const CategorySection = () => {
  const dispatch    = useDispatch();
  const navigate    = useNavigate();
//   const { t }       = useTranslation();

  const categories  = useSelector(selectRootCategories);
  const loading     = useSelector(selectRootLoading);

  const [currentIndex,  setCurrentIndex]  = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(5);

  // Fetch on mount
  useEffect(() => {
    dispatch(fetchRootCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if      (w < 640)  setSlidesPerView(2);
      else if (w < 768)  setSlidesPerView(3);
      else if (w < 1024) setSlidesPerView(4);
      else               setSlidesPerView(5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (slidesPerView === 5 || categories.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % categories.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, slidesPerView, categories.length]);

  const getVisibleItems = () => {
    if (categories.length === 0) return [];
    const items = [];
    for (let i = 0; i < slidesPerView; i++) {
      items.push(categories[(currentIndex + i) % categories.length]);
    }
    return items;
  };

  const handleCategoryClick = (cat) => {
    dispatch(setSelectedCategory(cat));
    dispatch(setSelectedSub(null));
    navigate(`/customer/products?category=${cat._id}`);
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="bg-bg-light py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full bg-bg-subtle animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="bg-bg-light py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden">
          <div className="flex justify-center gap-4 md:gap-6" key={currentIndex}>
              {getVisibleItems().map((cat, idx) => {
                const imgUrl = getImageUrl(cat);

                return (
                  <button
                    key={`${currentIndex}-${idx}`}
                    onClick={() => handleCategoryClick(cat)}
                    className="group relative overflow-hidden
                      w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48
                      border-2 border-border-main
                      flex flex-col items-center justify-center transition-all duration-500 ease-in-out
                      rounded-[100%_60%_60%_100%/_100%_100%_60%_60%]
                      hover:rounded-full hover:shadow-xl"
                  >
                    {imgUrl ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${imgUrl})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-bg-subtle" />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                    <h6 className="relative z-10 text-white text-sm sm:text-base md:text-lg font-bold px-2 text-center leading-[1.3] w-full truncate drop-shadow-md capitalize">
                      {cat.name}
                    </h6>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;