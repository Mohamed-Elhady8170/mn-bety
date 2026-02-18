import Pagination from '../Components/ProdectsPageComponents/Pagination';
import ProductGrid from '../Components/ProdectsPageComponents/ProductGrid';
import Sidebar from '../Components/ProdectsPageComponents/Sidebar';
import TopBar from '../Components/ProdectsPageComponents/TopBar';

import React from 'react';
import { useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    title: "مقلادة كنز مطرزة يدوياً",
    subtitle: "منتج المغرب العربي",
    price: 450,
    currency: "ر.م",
    rating: 4.9,
    reviews: 0,
    badge: "شحن مجاني",
    badgeColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bef0a0?w=400&q=80",
    isFavorite: false,
    tag: "حقيبة يدوية",
  },
  {
    id: 2,
    title: "إناء فخاري تصميم ريفي",
    subtitle: "من تونس",
    price: 280,
    currency: "ر.م",
    rating: 5.0,
    reviews: 12,
    badge: "الأكثر مبيعاً",
    badgeColor: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
    isFavorite: true,
    tag: "فخار",
  },
  {
    id: 3,
    title: "قلادة لتناسب مع الجروز",
    subtitle: "من مصر",
    price: 120,
    currency: "ر.م",
    rating: 4.7,
    reviews: 8,
    badge: null,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    isFavorite: false,
    tag: "مجوهرات",
  },
  {
    id: 4,
    title: "طبق نحاسي مطروق يدوياً",
    subtitle: "من المغرب",
    price: 720,
    currency: "ر.م",
    rating: 4.6,
    reviews: 5,
    badge: null,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80",
    isFavorite: false,
    tag: "أواني نحاسية",
  },
  {
    id: 5,
    title: 'حقيبة "لوك" جلدية فاخرة',
    subtitle: "من البادية الإبداعية",
    price: 890,
    currency: "ر.م",
    rating: 4.9,
    reviews: 20,
    badge: "طالب بدوي",
    badgeColor: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    isFavorite: true,
    tag: "حقيبة جلد",
  },
  {
    id: 6,
    title: "سلة نسج منسوجة يدوياً",
    subtitle: "ديزي",
    price: 185,
    currency: "ر.م",
    rating: 4.8,
    reviews: 3,
    badge: null,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
    isFavorite: false,
    tag: "سلال",
  },
];

const CATEGORIES = [
  { label: "طالب بدوي", count: 42, active: true },
  { label: "المجوهرات", count: 33 },
  { label: "ديكور المنزل", count: 28 },
  { label: "هدايا", count: 15 },
];

const SELLERS = ["مصر", "المغرب", "تونس", "الكويت", "عُمان الكويت"];


export default function ProductPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [priceRange, setPriceRange] = useState(900);
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const handleToggleFavorite = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const sorted = [...products]
    .filter((p) => p.price <= priceRange)
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg,#fdf8f2 0%,#fef3e2 100%)", fontFamily: "'Cairo', 'Tajawal', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');`}</style>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <Sidebar priceRange={priceRange} setPriceRange={setPriceRange} />

          {/* Main */}
          <main className="flex-1">
            <TopBar count={sorted.length} sort={sort} setSort={setSort} />
            <ProductGrid products={sorted} onToggleFavorite={handleToggleFavorite} />
            <Pagination current={page} total={5} onChange={setPage} />
          </main>
        </div>
      </div>
    </div>
  );
}