import React from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart, FiMessageSquare, FiMapPin, FiUser } from "react-icons/fi"; 
import { useTranslation } from "react-i18next";
import FavoriteButton from "./FavoriteButton";
import StarRating from "./StarRating";

export default function ProductCard({ product, onToggleFavorite, onOpenReview }) {
  const { t } = useTranslation();

  // ── Map API fields → display values ────────────────────────────────────────
  const displayPrice    = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount     = product.discountPrice > 0 && product.discountPrice < product.price;
  const mainImage       = product.images?.[0]?.url ?? "https://via.placeholder.com/400";
  const categoryName    = product.category?.name ?? "";
    const sellerName      = product.seller?.user?.fullName ?? "بائع";
  const sellerCity      = product.seller?.location?.city ?? "";

  return (
    <div className="bg-bg-main rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col h-full" dir="rtl">
      <NavLink
        to={`/customer/products/${product.slug ?? product._id}`}
        className="relative overflow-hidden block"
        style={{ height: 200 }}
      >
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.isFeatured && (
          <span className="absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-full bg-amber-500">
            {t("product.featured") || "مميز"}
          </span>
        )}

        <FavoriteButton
          active={product.isFavorite ?? false}
          onToggle={() => onToggleFavorite?.(product._id)}
        />
      </NavLink>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          {/* Category tag */}
          <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full w-fit capitalize">
            {categoryName}
          </span>

          {/* Add review button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onOpenReview?.(product);
            }}
            className="flex items-center gap-1 text-[10px] text-text-subtle hover:text-primary transition-colors font-medium"
          >
            <FiMessageSquare className="w-3 h-3" />
            <span>{t("product.add_review")}</span>
          </button>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-text-main leading-snug capitalize h-10 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex flex-col gap-1.5 border-t border-dashed border-border-main pt-2 mt-1">
          <p className="text-xs text-text-main font-medium flex items-center gap-1 capitalize">
            <FiUser className="w-3.5 h-3.5 text-primary" />
            <span>{sellerName}</span>
          </p>

          {/* موقع البائع (المدينة) */}
          {sellerCity && (
            <p className="text-[11px] text-text-subtle flex items-center gap-1">
              <FiMapPin className="w-3.5 h-3.5 text-text-subtle" />
              <span>{sellerCity}</span>
            </p>
          )}
        </div>
        {/* ─────────────────────────────────────────── */}

        {/* Rating */}
        <div className="mt-1">
          <StarRating rating={product.rating} reviews={product.numReviews} />
        </div>

        {/* Price + Cart */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-border-main">
          <button className="group w-8 h-8 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-white transition-all duration-300 shadow-md">
            <FiShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          </button>

          <div className="text-end">
            {hasDiscount && (
              <span className="text-[10px] text-text-subtle line-through ml-1">
                {product.price.toLocaleString()} ج.م
              </span>
            )}
            <span className="text-lg font-extrabold text-text-main">
              {displayPrice.toLocaleString()}
            </span>
            <span className="text-xs text-text-subtle mr-1">ج.م</span>
          </div>
        </div>
      </div>
    </div>
  );
}