import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const seller = useSelector(selectCurrentSeller);
  const sellerLoading = useSelector(selectCurrentSellerLoading);
  const sellerError = useSelector(selectCurrentSellerError);
  const products = useSelector(selectSellerProducts);
  const productsLoading = useSelector(selectSellerProductsLoading);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchPublicSellerProfile(sellerId));
      dispatch(fetchSellerProducts(sellerId));
    }
    return () => { dispatch(clearCurrentSeller()); };
  }, [dispatch, sellerId]);

  // ── Protection Against Null ──────────────────────────────────────────
  if (sellerLoading && !seller) {
    return <div className="min-h-screen bg-bg-main flex items-center justify-center font-bold">جاري تحميل ملف المبدع...</div>;
  }

  if (sellerError) {
    return (
      <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-500 font-bold mb-4">{sellerError}</p>
        <button onClick={() => navigate(-1)} className="bg-primary text-white px-6 py-2 rounded-xl">العودة للخلف</button>
      </div>
    );
  }

  const sellerName = seller?.userId?.fullName ?? "الحرفي";
  const sellerLogo = seller?.logo?.url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(sellerName)}&background=f3ece8&color=956b50&size=256`;
  const sellerLocation = [seller?.location?.city, seller?.location?.country]
    .filter(Boolean).join("، ");

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-body transition-colors duration-300 pb-20" dir="rtl">

      {/* ── Facebook Style Header ────────────────────────────────────────── */}
      <div className="relative bg-bg-main border-b border-border-main pb-6">
        {/* Cover Photo Area */}
        <div className="h-48 md:h-72 w-full bg-linear-to-r from-primary/20 via-primary/5 to-bg-subtle relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`, backgroundSize: '24px 24px' }}>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative -mt-16 md:-mt-24 flex flex-col md:flex-row items-end md:items-center gap-6 pb-6">

            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] p-1.5 bg-bg-main shadow-2xl border border-border-main overflow-hidden transform transition-transform hover:scale-[1.02]">
                <img
                  src={sellerLogo}
                  alt={sellerName}
                  className="w-full h-full object-cover rounded-[2.2rem]"
                />
              </div>
              {seller?.isApproved && (
                <div className="absolute bottom-3 left-3 bg-primary text-white p-2 rounded-2xl border-4 border-bg-main shadow-lg">
                  <BadgeCheck size={22} className="fill-current" />
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 text-right mb-2">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight flex items-center gap-3">
                  {sellerName}
                </h1>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3">
                  {sellerLocation && (
                    <span className="flex items-center gap-1.5 text-text-subtle font-bold bg-bg-subtle px-4 py-2 rounded-2xl border border-border-main text-sm">
                      <MapPin size={16} className="text-primary" /> {sellerLocation}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-yellow-600 font-bold bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-100 text-sm">
                    <Star size={16} fill="currentColor" /> {seller?.rating?.toFixed(1) ?? "0.0"}
                    <span className="text-yellow-700/60 font-normal mr-1 text-xs">تقييم</span>
                  </span>
                </div>

                {seller?.description && (
                  <p className="text-text-subtle mt-4 max-w-2xl leading-relaxed font-medium text-lg">
                    {seller.description}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons & Stats */}
            <div className="flex flex-col items-center md:items-end gap-5 shrink-0 w-full md:w-auto mt-6 md:mt-0">
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="bg-bg-subtle border border-border-main rounded-3xl px-6 py-4 min-w-27.5 text-center shadow-sm">
                  <p className="text-2xl font-black text-primary leading-none">{products.length}</p>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-text-muted mt-2">منتجاً</p>
                </div>
                <div className="bg-bg-subtle border border-border-main rounded-3xl px-6 py-4 min-w-27.5 text-center shadow-sm">
                  <p className="text-2xl font-black text-primary leading-none">{seller?.totalSales ?? 0}</p>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-text-muted mt-2">مبيعة</p>
                </div>
              </div>
              
              <button className="w-full md:w-auto px-10 py-4 bg-primary text-white font-black rounded-3xl shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg">
                <ShoppingBag size={22} />
                <span>متابعة المتجر</span>
              </button>
            </div>

          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 z-10 p-3 bg-bg-main/80 backdrop-blur-md border border-border-main rounded-2xl text-text-main hover:text-primary transition-all shadow-xl group"
        >
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* ── Products Display ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <header className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-black border-r-8 border-primary pr-5">معرض الأعمال</h2>
          {!productsLoading && <span className="bg-bg-subtle px-4 py-2 rounded-xl text-sm font-bold border border-border-main">{products.length} قطعة</span>}
        </header>

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-bg-subtle/30 rounded-[3rem] border-2 border-dashed border-border-main">
            <ShoppingBag size={64} className="mx-auto text-text-muted mb-6 opacity-20" />
            <p className="text-text-muted text-2xl font-bold italic">المعرض فارغ حالياً...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} 
                onClick={() => navigate(`/user/products/${product.slug ?? product._id}`)}
                className="group bg-bg-main border border-border-main rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full"
              >
                <div className="aspect-square overflow-hidden bg-bg-subtle relative">
                  <ProductImage src={product.images?.[0]?.url} alt={product.name} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-black text-xl mb-1 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-text-subtle mb-4">{product.category?.name}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-2xl font-black text-primary">{(product.discountPrice > 0 ? product.discountPrice : product.price).toLocaleString()} <small className="text-xs">ج.م</small></span>
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-4 rounded-2xl bg-primary text-white shadow-lg hover:rotate-6 transition-transform">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}