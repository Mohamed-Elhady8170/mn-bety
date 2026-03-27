import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiShoppingCart,
  FiMessageSquare,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import FavoriteButton from "./FavoriteButton";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../../Features/wishlistThunks";
import { selectWishlistIds } from "../../Features/wishlistSlice";
import useEmailVerification from "../../../../hooks/useEmailVerification";
import { showSuccess, showError } from "../../../../lib/toast";

export default function ProductCard({ product, onOpenReview }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { checkVerified } = useEmailVerification();
  const wishlistIds = useSelector(selectWishlistIds);

  const mainImage =
    product.images?.[0]?.url ?? "https://via.placeholder.com/400";
  const categoryName = product.category?.name ?? "";
  const sellerName = product.seller?.userId?.fullName ?? "بائع";
  const sellerCity = product.seller?.location?.city ?? "";
  const hasDiscount = product.discountPrice > 0;
  const currentPrice = hasDiscount
    ? product.price - product.discountPrice
    : product.price;

  const isFavorite = wishlistIds.has(product._id?.toString());

  const handleToggleFavorite = async () => {
    const ok = await checkVerified();
    if (!ok) return;

    if (isFavorite) {
      const result = await dispatch(removeFromWishlistThunk(product._id));
      if (removeFromWishlistThunk.fulfilled.match(result)) {
        showSuccess("تم الحذف من المفضلة");
      } else {
        showError(result.payload || "حدث خطأ");
      }
    } else {
      const result = await dispatch(addToWishlistThunk(product._id));
      if (addToWishlistThunk.fulfilled.match(result)) {
        showSuccess("تمت الإضافة للمفضلة ❤️");
      } else {
        showError(result.payload || "حدث خطأ");
      }
    }
  };

  return (
    <div
      className="bg-bg-main rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col h-full"
      dir="rtl"
    >
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

        {product.isFeatured && (
          <span className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-1 rounded-full bg-amber-500">
            {t("product.featured") || "مميز"}
          </span>
        )}

        <FavoriteButton active={isFavorite} onToggle={handleToggleFavorite} />
      </NavLink>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full w-fit capitalize">
            {categoryName}
          </span>

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

        <h3 className="text-sm font-bold text-text-main leading-snug capitalize h-10 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between w-full border-t border-dashed border-border-main pt-2 mt-1">
          <p className="text-xs text-text-main font-medium flex items-center gap-1 capitalize">
            <FiUser className="w-3.5 h-3.5 text-primary" />
            <span>{sellerName}</span>
          </p>
          {sellerCity && (
            <p className="text-[11px] text-text-subtle flex items-center gap-1">
              <FiMapPin className="w-3.5 h-3.5 text-text-subtle" />
              <span>{sellerCity}</span>
            </p>
          )}
        </div>

        <div className="mt-1">
          <StarRating rating={product.rating} reviews={product.numReviews} />
        </div>

        <div className="mt-auto flex justify-between items-center pt-2 border-t border-border-main/50">
          <div className="flex flex-col text-right">
            {hasDiscount && (
              <span className="text-[10px] text-text-subtle line-through leading-none mb-1 opacity-70">
                {product.price.toLocaleString()} ج.م
              </span>
            )}

            <span className="text-sm font-black text-primary leading-none">
              {currentPrice.toLocaleString()}
              <small className="text-[10px] font-bold mr-1 text-text-subtle">
                ج.م
              </small>
            </span>
          </div>

          <button className="w-8 h-8 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-white transition-all shadow-sm active:scale-90">
            <FiShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}