import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  BadgeCheck,
  Store,
  Wallet,
} from "lucide-react";

// ── Product slice ─────────────────────────────────────────────────────────────
import {
  fetchProductByIdOrSlug,
  selectCurrentProduct,
  selectCurrentProductLoading,
} from "../Features/productSlice";

// ── Cart slice (dispatch add to cart) ─────────────────────────────────────────
// import { addToCartThunk } from "../../Features/cartSlice"; // ← wire up when ready

export default function ProductDetails() {
  const { idOrSlug }   = useParams();           // /user/products/:idOrSlug
  const dispatch       = useDispatch();
  const navigate       = useNavigate();

  const product        = useSelector(selectCurrentProduct);
  const loading        = useSelector(selectCurrentProductLoading);

  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite,  setIsFavorite]  = useState(false);

  // ── Fetch on mount / when slug changes ──────────────────────────────────────
  useEffect(() => {
    if (idOrSlug) {
      dispatch(fetchProductByIdOrSlug(idOrSlug));
      setActiveImage(0); // reset gallery when navigating between products
    }
  }, [dispatch, idOrSlug]);

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loading || !product) {
    return (
      <section className="min-h-screen bg-bg-light pb-20 animate-pulse" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="h-4 bg-bg-subtle rounded w-64 mb-8" />
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
          {/* Image skeleton */}
          <div className="lg:col-span-7 flex gap-4">
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 rounded-xl bg-bg-subtle" />
              ))}
            </div>
            <div className="flex-1 rounded-3xl bg-bg-subtle h-[400px]" />
          </div>
          {/* Info skeleton */}
          <div className="lg:col-span-5 space-y-5">
            <div className="h-5 bg-bg-subtle rounded w-32" />
            <div className="h-8 bg-bg-subtle rounded w-3/4" />
            <div className="h-6 bg-bg-subtle rounded w-1/3" />
            <div className="space-y-2">
              <div className="h-3 bg-bg-subtle rounded" />
              <div className="h-3 bg-bg-subtle rounded" />
              <div className="h-3 bg-bg-subtle rounded w-4/5" />
            </div>
            <div className="h-24 bg-bg-subtle rounded-xl" />
            <div className="h-28 bg-bg-subtle rounded-2xl" />
            <div className="h-14 bg-bg-subtle rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  // ── Derived display values ───────────────────────────────────────────────────
  const images         = product.images ?? [];
  const mainImage      = images[activeImage]?.url ?? "https://via.placeholder.com/800";
  const displayPrice   = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount    = product.discountPrice > 0 && product.discountPrice < product.price;
  const categoryName   = product.category?.name  ?? "";
  const seller         = product.seller ?? {};

  return (
    <section className="min-h-screen bg-bg-light font-sans pb-20" dir="rtl">

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-text-subtle flex gap-2">
        <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
          الرئيسية
        </button>
        <span>/</span>
        <button
          onClick={() => navigate("/user/products")}
          className="hover:text-primary transition-colors capitalize"
        >
          {categoryName}
        </button>
        <span>/</span>
        <span className="text-primary font-medium capitalize">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">

        {/* ── RIGHT COLUMN: Image Gallery ─────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`min-w-20 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-border-main"
                }`}
              >
                <img
                  src={img.url}
                  alt={`view ${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 bg-bg-subtle rounded-3xl overflow-hidden h-[350px] lg:h-[520px] shadow-sm">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* ── LEFT COLUMN: Product Details ────────────────────────────────── */}
        <div className="lg:col-span-5 space-y-6">

          {/* Category badge */}
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20 capitalize">
            {categoryName}
          </div>

          {/* Title & price & reviews */}
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2 leading-tight capitalize">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {displayPrice.toLocaleString()} ج.م
                </span>
                {hasDiscount && (
                  <span className="text-sm text-text-subtle line-through">
                    {product.price.toLocaleString()} ج.م
                  </span>
                )}
              </div>
              <div className="h-6 w-px bg-border-main" />
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                      strokeWidth={i < Math.round(product.rating) ? 0 : 1.5}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-subtle">
                  ({product.numReviews} تقييم)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-subtle leading-relaxed">{product.description}</p>

          {/* Stock warning */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 font-medium">
              ⚠️ باقي {product.stock} قطعة فقط في المخزون!
            </div>
          )}
          {product.stock === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 font-medium">
              ❌ هذا المنتج غير متاح حالياً
            </div>
          )}

          {/* Payment note */}
          <div className="bg-red-soft border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center text-primary shadow-sm">
              <Wallet size={20} />
            </div>
            <div>
              <h4 className="font-bold text-text-main text-sm">الدفع عند الاستلام متاح</h4>
              <p className="text-xs text-text-subtle">
                اشترِ الآن وادفع عند باب منزلك
              </p>
            </div>
          </div>

          {/* Seller card */}
          <div className="bg-bg-main border border-border-main rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {seller.storeName?.[0]?.toUpperCase() ?? "S"}
                </div>
                <div>
                  <h3 className="font-bold text-text-main flex items-center gap-1">
                    بواسطة: {seller.storeName ?? "البائع"}
                    <BadgeCheck size={16} className="text-blue-500" fill="currentColor" />
                  </h3>
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
                    حرفي معتمد
                  </span>
                </div>
              </div>
            </div>
            {seller.bio && (
              <p className="text-sm text-text-subtle mb-4">{seller.bio}</p>
            )}
            <button
              onClick={() => navigate(`/user/products?seller=${seller._id}`)}
              className="w-full border border-border-main text-text-main py-2 rounded-lg text-sm font-medium hover:bg-bg-subtle transition-colors"
            >
              زيارة المتجر
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              disabled={product.stock === 0}
              onClick={() => {
                // dispatch(addToCartThunk({ productId: product._id, quantity: 1 }));
              }}
              className="flex-1 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              {product.stock === 0 ? "غير متاح" : "إضافة للسلة"}
            </button>
            <button
              onClick={() => setIsFavorite((prev) => !prev)}
              className={`w-14 h-14 flex items-center justify-center bg-bg-main border rounded-xl transition-colors ${
                isFavorite
                  ? "border-red-300 text-red-500"
                  : "border-border-main text-text-subtle hover:text-red-400 hover:border-red-200"
              }`}
            >
              <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Features */}
          <div className="flex justify-between items-center text-xs text-text-subtle pt-4 border-t border-border-main">
            <div className="flex items-center gap-1.5">
              <Truck size={16} className="text-primary" />
              <span>شحن خلال 3-5 أيام</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-primary" />
              <span>قطعة فريدة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BadgeCheck size={16} className="text-primary" />
              <span>تسوق آمن 100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}