import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { addToCartThunk } from "../Features/cartSlice";
import toast from "react-hot-toast";


const ProductImage = ({ src, alt }) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-bg-subtle p-4">
        <ImageOff size={32} className="text-text-muted mb-2 opacity-40" />
        <span className="text-xs text-text-muted text-center">الصورة غير متوفرة</span>
      </div>
    );
  }
  return (
    <img src={src} alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      onError={() => setError(true)} />
  );
};

const ProductSkeleton = () => (
  <div className="bg-bg-main border border-border-main rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-square bg-bg-subtle" />
    <div className="p-4 space-y-2">
      <div className="h-3 bg-bg-subtle rounded w-3/4" />
      <div className="flex justify-between pt-2">
        <div className="h-5 bg-bg-subtle rounded w-1/4" />
        <div className="w-8 h-8 bg-bg-subtle rounded-lg" />
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

  const handleAddToCart = async (productId) => {
    if (!productId) return;
        dispatch(addToCartThunk({ productId, quantity: 1 }))
          .unwrap()
          .then(() => toast.success("تمت الإضافة للسلة بنجاح"))
          .catch((err) => toast.error(err || "حدث خطأ أثناء الإضافة للسلة"));
    // showSuccess('تمت الإضافة للسلة');
  };

  if (sellerLoading && !seller) {
    return <div className="min-h-screen bg-bg-main flex items-center justify-center text-sm font-medium">جاري التحميل...</div>;
  }

  if (sellerError) {
    return (
      <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-500 text-sm mb-4">{sellerError}</p>
        <button onClick={() => navigate(-1)} className="bg-primary text-white px-5 py-2 rounded-lg text-sm">العودة</button>
      </div>
    );
  }

  const sellerName = seller?.userId?.fullName ?? "الحرفي";
  const sellerLogo = seller?.logo?.url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(sellerName)}&background=f3ece8&color=956b50&size=128`;
  const sellerLocation = [seller?.location?.city, seller?.location?.country]
    .filter(Boolean).join("، ");

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-body pb-12" dir="rtl">

      {/* ── Header ── */}
      <div className="relative bg-bg-main border-b border-border-main pb-4">
        <div className="h-32 md:h-48 w-full bg-linear-to-r from-primary/30 via-primary/10 to-bg-subtle relative overflow-hidden shadow-inner border-b border-border-main">
        <button 
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-bg-main/80 backdrop-blur-md border border-border-main rounded-xl text-text-main hover:bg-primary hover:text-white transition-all shadow-sm group"
          >
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage: `radial-gradient(circle at 1.5px 1.5px, var(--color-primary) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-primary/15 rounded-full blur-3xl opacity-80" />
          <div className="absolute bottom-[-30%] left-[15%] w-60 h-60 bg-primary/10 rounded-full blur-2xl opacity-60" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="relative -mt-12 md:-mt-16 flex flex-col md:flex-row items-end md:items-center gap-4">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl p-1 bg-bg-main shadow-lg border border-border-main overflow-hidden">
                <img
                  src={sellerLogo}
                  alt={sellerName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {seller?.isApproved && (
                <div className="absolute -bottom-1 -left-1 bg-primary text-white p-1 rounded-lg border-2 border-bg-main shadow">
                  <BadgeCheck size={14} className="fill-current" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-right">
              <h1 className="text-xl md:text-3xl font-black text-text-main flex items-center gap-2">
                {sellerName}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                {sellerLocation && (
                  <span className="flex items-center gap-1 text-text-subtle font-bold bg-bg-subtle px-3 py-1 rounded-lg border border-border-main text-[15px]">
                    <MapPin size={12} className="text-primary" /> {sellerLocation}
                  </span>
                )}
                <span className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100 text-[15px]">
                  <Star size={12} fill="currentColor" /> {seller?.rating?.toFixed(1) ?? "0.0"}
                </span>
              </div>

              {seller?.description && (
                <p className="text-text-subtle mt-2 max-w-xl leading-relaxed text-sm line-clamp-2">
                  {seller.description}
                </p>
              )}
            </div>

            {/* Stats & Actions */}
            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex gap-2">
                <div className="bg-bg-subtle border border-border-main rounded-xl px-4 py-2 text-center">
                  <p className="text-sm font-black text-primary leading-none">{products.length}</p>
                  <p className="text-[9px] font-bold text-text-muted mt-1">منتج</p>
                </div>
                <div className="bg-bg-subtle border border-border-main rounded-xl px-4 py-2 text-center">
                  <p className="text-sm font-black text-primary leading-none">{seller?.totalSales ?? 0}</p>
                  <p className="text-[9px] font-bold text-text-muted mt-1">مبيعة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-black border-r-4 border-primary pr-3 uppercase tracking-wide text-text-main">معرض الأعمال</h2>
          {!productsLoading && <span className="text-[10px] font-bold text-text-muted bg-bg-subtle px-2 py-1 rounded border border-border-main">{products.length} قطعة</span>}
        </header>

        {productsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-bg-subtle/20 rounded-2xl border-2 border-dashed border-border-main">
            <p className="text-text-muted text-sm font-medium">لا توجد منتجات حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product._id}
                onClick={() => navigate(`/customer/products/${product.slug ?? product._id}`)}
                className="group bg-bg-main border border-border-main rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col h-full relative"
              >
                {/* ── Stock Badge (جديد) ── */}
                <div className="absolute top-2 right-2 z-10">
                  {product.stock <= 0 ? (
                    <span className="bg-red-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                      نفذت الكمية
                    </span>
                  ) : product.stock <= 3 ? (
                    <span className="bg-orange-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-lg shadow-sm animate-pulse">
                      باقي {product.stock} فقط!
                    </span>
                  ) : (
                    <span className="bg-green-500/80 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                      متوفر
                    </span>
                  )}
                </div>

                {/* Image Section */}
                <div className="aspect-square overflow-hidden bg-bg-subtle relative">
                  <ProductImage src={product.images?.[0]?.url} alt={product.name} />
                </div>

                {/* Info Section */}
                <div className="p-3 flex flex-col flex-1">
                  {/* Category & Rating (جديد) */}
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] text-text-subtle font-medium uppercase tracking-tighter">
                      {product.category?.name}
                    </p>

                    {/* النجوم */}
                    <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded-md border border-yellow-100">
                      <Star size={10} className="text-yellow-500 fill-current" />
                      <span className="text-[10px] font-black text-yellow-700">
                        {product.rating > 0 ? product.rating.toFixed(1) : "جديد"}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm mb-2 line-clamp-1 group-hover:text-primary transition-colors text-text-main">
                    {product.name}
                  </h3>

                  {/* Price & Action */}
                  <div className="mt-auto flex justify-between items-center pt-2 border-t border-border-main/50">
                    <div className="flex flex-col">
                      {product.discountPrice > 0 && (
                        <span className="text-[10px] text-text-muted line-through leading-none mb-1">
                          {product.price.toLocaleString()} ج.م
                        </span>
                      )}

                      <span className="text-sm font-black text-primary leading-none">
                        {(product.discountPrice > 0
                          ? (product.price - product.discountPrice)
                          : product.price
                        ).toLocaleString()}
                        <small className="text-[10px] font-bold mr-1 text-text-subtle">ج.م</small>
                      </span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product._id); }}
                      disabled={product.stock <= 0}
                      className={`p-2 rounded-lg transition-all shadow-sm ${product.stock <= 0
                          ? "bg-bg-subtle text-text-muted cursor-not-allowed"
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                        }`}
                    >
                      <ShoppingCart size={14} />
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