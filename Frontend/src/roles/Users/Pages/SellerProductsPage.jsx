import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector }      from "react-redux";
import {
  ShoppingCart, ArrowRight, ShoppingBag,
  ImageOff, MapPin, BadgeCheck, Star,
} from "lucide-react";
import {
  fetchPublicSellerProfile,
  clearCurrentSeller,
  selectCurrentSeller,
  selectCurrentSellerLoading,
  selectCurrentSellerError,
} from "../Features/Sellerslice";
import {
  fetchSellerProducts,
  selectSellerProducts,
  selectSellerProductsLoading,
} from "../Features/productSlice";

const ProductImage = ({ src, alt }) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-bg-subtle p-4">
        <ImageOff size={48} className="text-text-muted mb-2 opacity-50" />
        <span className="text-sm text-text-muted text-center">الصورة غير متوفرة</span>
      </div>
    );
  }
  return (
    <img src={src} alt={alt}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      onError={() => setError(true)} />
  );
};

const ProductSkeleton = () => (
  <div className="bg-bg-main border border-border-main rounded-3xl overflow-hidden animate-pulse">
    <div className="aspect-square bg-bg-subtle" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-bg-subtle rounded w-3/4" />
      <div className="flex justify-between pt-3">
        <div className="h-6 bg-bg-subtle rounded w-1/3" />
        <div className="w-11 h-11 bg-bg-subtle rounded-2xl" />
      </div>
    </div>
  </div>
);

export default function SellerProductsPage() {
  const { id: sellerId } = useParams();
  const dispatch         = useDispatch();
  const navigate         = useNavigate();

  const seller          = useSelector(selectCurrentSeller);
  const sellerLoading   = useSelector(selectCurrentSellerLoading);
  const sellerError     = useSelector(selectCurrentSellerError);
  const products        = useSelector(selectSellerProducts);
  const productsLoading = useSelector(selectSellerProductsLoading);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchPublicSellerProfile(sellerId));
      dispatch(fetchSellerProducts(sellerId));
    }
    return () => { dispatch(clearCurrentSeller()); };
  }, [dispatch, sellerId]);

  const sellerName     = seller?.userId?.fullName ?? "البائع";
  const sellerLogo     = seller?.logo?.url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(sellerName)}&background=f3ece8&color=956b50`;
  const sellerLocation = [seller?.location?.city, seller?.location?.country]
    .filter(Boolean).join("، ");

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-body transition-colors duration-300" dir="rtl">

      {/* ── Seller Header ─────────────────────────────────────────────────── */}
      <div className="bg-bg-subtle border-b border-border-main">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:gap-4 transition-all w-fit font-bold mb-6">
            <ArrowRight size={20} />
            <span>العودة لجميع الحرفيين</span>
          </button>

          {/* Loading */}
          {sellerLoading && (
            <div className="flex gap-6 animate-pulse">
              <div className="w-24 h-24 rounded-2xl bg-bg-main shrink-0" />
              <div className="space-y-3 flex-1 py-1">
                <div className="h-5 bg-bg-main rounded w-1/4" />
                <div className="h-3 bg-bg-main rounded w-1/3" />
                <div className="h-3 bg-bg-main rounded w-1/2" />
              </div>
            </div>
          )}

          {sellerError && <p className="text-red-500 text-sm">{sellerError}</p>}

          {/* Seller profile */}
          {!sellerLoading && seller && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img src={sellerLogo} alt={sellerName}
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(sellerName)}&background=f3ece8&color=956b50`; }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-border-main shrink-0" />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-black text-text-main">{sellerName}</h1>
                  {seller.isApproved && <BadgeCheck size={22} className="text-primary fill-current" />}
                </div>

                {sellerLocation && (
                  <p className="flex items-center gap-1 text-sm text-text-subtle mb-1">
                    <MapPin size={14} className="text-primary" /> {sellerLocation}
                  </p>
                )}

                <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm mb-2">
                  <Star size={16} fill="currentColor" />
                  <span>{seller.rating?.toFixed(1) ?? "0.0"}</span>
                  <span className="text-text-subtle font-normal mr-1">تقييم البائع</span>
                </div>

                {seller.description && (
                  <p className="text-sm text-text-subtle max-w-xl">{seller.description}</p>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-center shrink-0">
                <div>
                  <p className="text-2xl font-black text-primary">{products.length}</p>
                  <p className="text-xs text-text-subtle">منتج</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-primary">{seller.totalSales ?? 0}</p>
                  <p className="text-xs text-text-subtle">مبيعة</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Products ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <header className="mb-8">
          <h2 className="text-2xl font-black border-r-4 border-primary pr-4">معرض المنتجات</h2>
          {!productsLoading && products.length > 0 && (
            <p className="text-sm text-text-subtle mt-1 pr-5">{products.length} منتج متاح</p>
          )}
        </header>

        {productsLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        )}

        {!productsLoading && products.length === 0 && (
          <div className="text-center py-32 bg-bg-subtle/30 rounded-[3rem] border-2 border-dashed border-border-main">
            <ShoppingBag size={48} className="mx-auto text-text-muted mb-4 opacity-30" />
            <p className="text-text-muted text-xl font-bold">هذا الحرفي لم يضف منتجات بعد.</p>
            <Link to="/user/contact" className="mt-4 inline-block text-primary hover:text-primary/80 transition-colors">
              اكتشف مبدعين آخرين
            </Link>
          </div>
        )}

        {!productsLoading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const image        = product.images?.[0]?.url ?? null;
              const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
              const hasDiscount  = product.discountPrice > 0 && product.discountPrice < product.price;

              return (
                <div key={product._id}
                  onClick={() => navigate(`/user/products/${product.slug ?? product._id}`)}
                  className="group bg-bg-main border border-border-main rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">

                  <div className="aspect-square overflow-hidden bg-bg-subtle relative border-b border-border-main">
                    <ProductImage src={image} alt={product.name} />
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1 text-text-main group-hover:text-primary transition-colors capitalize">
                      {product.name}
                    </h3>
                    <p className="text-xs text-text-subtle capitalize mb-4">{product.category?.name ?? ""}</p>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-black text-primary">
                          {displayPrice.toLocaleString()}
                          <span className="text-xs mr-1 font-medium text-text-subtle">ج.م</span>
                        </span>
                        {hasDiscount && (
                          <span className="block text-xs text-text-subtle line-through">
                            {product.price.toLocaleString()} ج.م
                          </span>
                        )}
                      </div>

                      <button onClick={(e) => { e.stopPropagation(); }}
                        className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-90 transition-all">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}