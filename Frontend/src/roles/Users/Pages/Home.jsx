// src/roles/Users/Pages/Home.jsx
import React, { useEffect }         from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection       from '../Components/HomePageComponents/Hero';
import CategorySection   from '../Components/HomePageComponents/Categories';
import CategoryProductsSection from '../Components/HomePageComponents/CategoryProductsSection';
import {
  fetchCategoryTree,
  selectHomeCategorySections,
  selectTreeLoading,
} from '../Features/Categoryslice';

export default function Home() {
  const dispatch    = useDispatch();
  const categories  = useSelector(selectHomeCategorySections);
  const treeLoading = useSelector(selectTreeLoading);

  useEffect(() => {
    dispatch(fetchCategoryTree());
  }, [dispatch]);

  return (
    <>
      <HeroSection />

      {/* Main categories carousel */}
      <CategorySection />

      {/* Dynamic sections — one per main category that has subcategories */}
      {treeLoading ? (
        // Loading skeletons
        <div className="py-16 space-y-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="container mx-auto px-6">
              <div className="h-8 bg-bg-subtle rounded w-48 mb-8 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-80 bg-bg-subtle rounded-3xl animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        categories
          .filter((cat) => cat.children && cat.children.length > 0)
          .map((cat, index) => (
            <CategoryProductsSection
              key={cat._id}
              category={cat}
              index={index}
            />
          ))
      )}
    </>
  );
}