import React from 'react'
import FavoriteButton from './FavoriteButton';
import StarRating from './StarRating';
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
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
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
export default function ProductCard({ product, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-full ${product.badgeColor}`}>
            {product.badge}
          </span>
        )}
        <FavoriteButton
          active={product.isFavorite}
          onToggle={() => onToggleFavorite(product.id)}
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2" dir="rtl">
        <span className="text-xs text-[#ec4d18] font-semibold bg-amber-50 px-2 py-0.5 rounded-full w-fit">
          {product.tag}
        </span>
        <h3 className="text-sm font-bold text-gray-800 leading-snug">{product.title}</h3>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {product.subtitle}
        </p>
        <StarRating rating={product.rating} />

        {/* Price + Cart */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
          <button className="w-8 h-8 rounded-full bg-[#ec4d18] hover:bg-amber-600 flex items-center justify-center text-white transition-colors shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          <div className="text-right">
            <span className="text-lg font-extrabold text-gray-900">{product.price.toLocaleString()}</span>
            <span className="text-xs text-gray-500 mr-1">{product.currency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}