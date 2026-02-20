import React from 'react'
import FavoriteButton from './FavoriteButton';
import StarRating from './StarRating';
import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
const PRODUCTS = [
  {
    id: 1,
    title: "مقلادة كنز مطرزة يدوياً",
    subtitle: "منتج المغرب العربي",
    price: 450,
    currency: "ج.م",
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
    currency: "ج.م",
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
    currency: "ج.م",
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
    currency: "ج.م",
    rating: 4.6,
    reviews: 5,
    badge: null,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80",
    isFavorite: false,
    tag: "أواني نحاسية",
  },
  {
    id: 5,
    title: 'حقيبة جلد ',
    subtitle: "المنوفية",
    price: 890,
    currency: "ج.م",
    rating: 4.9,
    reviews: 20,
    badge: null,
    badgeColor: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    isFavorite: true,
    tag: "حقيبة جلد",
  },
  {
    id: 6,
    title: "سلة نسج منسوجة يدوياً",
    subtitle: "المنيا",
    price: 185,
    currency: "ج.م",
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
    <NavLink to={`/user/products/details`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col">
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
          <HiOutlineLocationMarker className="w-3.5 h-3.5 text-gray-400" />
          <span>{product.subtitle}</span>
        </p>
        <StarRating rating={product.rating} />

        {/* Price + Cart */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
          <button className="group w-8 h-8 rounded-full bg-[#ec4d18] hover:bg-amber-600 flex items-center justify-center text-white transition-all duration-300 shadow-md">
            <FiShoppingCart
              className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
          </button>
          <div className="text-right">
            <span className="text-lg font-extrabold text-gray-900">{product.price.toLocaleString()}</span>
            <span className="text-xs text-gray-500 mr-1">{product.currency}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}