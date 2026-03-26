import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Star, ShoppingCart, Heart,
  Truck, ShieldCheck, BadgeCheck,
  Wallet, MessageSquare,
  AlertTriangle, PackageX
} from "lucide-react";
import {
  fetchProductByIdOrSlug,
  selectCurrentProduct,
  selectCurrentProductLoading,
} from "../Features/productSlice";
import {
  fetchProductReviews,
  deleteReview,
  setReviewPage,
  clearReviews,
  selectReviews,
  selectReviewsTotal,
  selectReviewsPage,
  selectReviewsPages,
  selectReviewsLoading,
  selectDeleting,
} from "../Features/reviewSlice";
import { ReviewModal } from "../Components/ProdectsPageComponents/ReviewModal";

export default function ProductDetails() {
  const { idOrSlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(selectCurrentProduct);
  const productLoading = useSelector(selectCurrentProductLoading);
  const reviews = useSelector(selectReviews);
  const reviewsTotal = useSelector(selectReviewsTotal);
  const reviewsPage = useSelector(selectReviewsPage);
  const reviewsPages = useSelector(selectReviewsPages);
  const reviewsLoading = useSelector(selectReviewsLoading);
  const deleting = useSelector(selectDeleting);

  // swap with: useSelector(state => state.auth.userId)
  const currentUserId = null;

  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Fetch product
  useEffect(() => {
    if (idOrSlug) {
      dispatch(fetchProductByIdOrSlug(idOrSlug));
      setActiveImage(0);
    }
    return () => { dispatch(clearReviews()); };
  }, [dispatch, idOrSlug]);

  // Fetch reviews whenever product loads or page changes
  useEffect(() => {
    if (product?._id) {
      dispatch(fetchProductReviews({ productId: product._id, page: reviewsPage, limit: 5 }));
    }
  }, [dispatch, product?._id, reviewsPage]);

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (productLoading || !product) {
    return (
      <section className="min-h-screen bg-bg-light pb-20 animate-pulse" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="h-4 bg-bg-subtle rounded w-64 mb-8" />
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
          <div className="lg:col-span-7 flex gap-4">
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, i) => <div key={i} className="w-20 h-20 rounded-xl bg-bg-subtle" />)}
            </div>
            <div className="flex-1 rounded-3xl bg-bg-subtle h-100" />
          </div>
          <div className="lg:col-span-5 space-y-5">
            {[...Array(6)].map((_, i) => <div key={i} className="h-8 bg-bg-subtle rounded" />)}
          </div>
        </div>
      </section>
    );
  }

  const images = product.images ?? [];
  const mainImage = images[activeImage]?.url ?? "https://via.placeholder.com/800";
  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
  const categoryName = product.category?.name ?? "";
  const seller = product.seller ?? {};

  return (
    <section className="min-h-screen bg-bg-light font-sans pb-20" dir="rtl">

      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-text-subtle flex gap-2">
        {/* <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">الرئيسية</button>
        <span>/</span>
        <button onClick={() => navigate("/user/products")} className="hover:text-primary transition-colors capitalize">{categoryName}</button>
        <span>/</span>
        <span className="text-primary font-medium capitalize">{product.name}</span> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">

        {/* Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)}
                className={`min-w-20 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-primary" : "border-transparent hover:border-border-main"}`}>
                <img src={img.url} alt={`view ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-bg-subtle rounded-3xl overflow-hidden h-87.5 lg:h-130 shadow-sm">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20 capitalize">
            {categoryName}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2 leading-tight capitalize">{product.name}</h1>
            <p className="text-text-subtle leading-relaxed">{product.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{displayPrice.toLocaleString()} ج.م</span>
                {hasDiscount && <span className="text-sm text-text-subtle line-through">{product.price.toLocaleString()} ج.م</span>}
              </div>
              <div className="h-6 w-px bg-border-main" />
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.round(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.round(product.rating) ? 0 : 1.5} />
                  ))}
                </div>
                <span className="text-sm text-text-subtle">({product.numReviews} تقييم)</span>
              </div>
            </div>
          </div>


          {product.stock <= 5 && product.stock > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 font-medium flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500 shrink-0" />
              <span>باقي {product.stock} قطعة فقط في المخزون!</span>
            </div>
          )}

          {product.stock === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 font-medium flex items-center gap-2">
              <PackageX size={16} className="text-red-500 shrink-0" />
              <span>هذا المنتج غير متاح حالياً</span>
            </div>
          )}

          <div className="bg-red-soft border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center text-primary shadow-sm">
              <Wallet size={20} />
            </div>
            <div>
              <h4 className="font-bold text-text-main text-sm">الدفع عند الاستلام متاح</h4>
              <p className="text-xs text-text-subtle">اشترِ الآن وادفع عند باب منزلك</p>
            </div>
          </div>

          {/* Seller */}
          <div className="bg-bg-main border border-border-main rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              {seller.logo?.url ? (
                <img src={seller.logo.url} alt="seller" className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {seller.userId?.fullName?.[0]?.toUpperCase() ?? "S"}
                </div>
              )}
              <div>
                <h3 className="font-bold text-text-main flex items-center gap-1 capitalize">
                  بواسطة: {seller.userId?.fullName ?? "البائع"}
                  <BadgeCheck size={16} className="text-blue-500" fill="currentColor" />
                </h3>
                <p className="text-xs text-text-subtle">{seller.location?.address ?? ""}</p>
                <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">حرفي معتمد</span>
              </div>
            </div>
            {seller.description && <p className="text-sm text-text-subtle mb-4">{seller.description}</p>}
            <button onClick={() => navigate(`/user/products?seller=${seller._id}`)}
              className="w-full border border-border-main text-text-main py-2 rounded-lg text-sm font-medium hover:bg-bg-subtle transition-colors">
              زيارة المتجر
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button disabled={product.stock === 0}
              className="flex-1 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              {product.stock === 0 ? "غير متاح" : "إضافة للسلة"}
            </button>
            <button onClick={() => setIsFavorite(p => !p)}
              className={`w-14 h-14 flex items-center justify-center bg-bg-main border rounded-xl transition-colors ${isFavorite ? "border-red-300 text-red-500" : "border-border-main text-text-subtle hover:text-red-400 hover:border-red-200"}`}>
              <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex justify-between items-center text-xs text-text-subtle pt-4 border-t border-border-main">
            <div className="flex items-center gap-1.5"><Truck size={16} className="text-primary" /><span>شحن خلال 3-5 أيام</span></div>
            <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary" /><span>قطعة فريدة</span></div>
            <div className="flex items-center gap-1.5"><BadgeCheck size={16} className="text-primary" /><span>تسوق آمن 100%</span></div>
          </div>
        </div>
      </div>

      {/* ── Reviews Section ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 mt-16" dir="rtl">
        <hr className="border-border-main mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Summary */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
              <MessageSquare size={24} className="text-primary" />
              آراء وتقييمات العملاء
            </h2>
            <div className="bg-bg-main border border-border-main rounded-2xl p-6 shadow-sm flex flex-col items-center gap-2">
              <span className="text-5xl font-extrabold text-text-main">
                {product.rating ? product.rating.toFixed(1) : "0.0"}
              </span>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20}
                    fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                    strokeWidth={i < Math.round(product.rating) ? 0 : 1.5} />
                ))}
              </div>
              <span className="text-sm text-text-subtle">بناءً على {product.numReviews} تقييم</span>
            </div>
            <button onClick={() => setIsReviewOpen(true)}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/80 transition-all flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              اكتب تقييمك
            </button>
          </div>

          {/* List */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-lg font-bold text-text-main">
              أحدث التقييمات {reviewsTotal > 0 && <span className="text-text-subtle font-normal text-sm">({reviewsTotal})</span>}
            </h3>

            {reviewsLoading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-bg-main border border-border-main rounded-2xl p-5 animate-pulse space-y-3">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-bg-subtle" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 bg-bg-subtle rounded w-1/4" />
                        <div className="h-3 bg-bg-subtle rounded w-1/3" />
                      </div>
                    </div>
                    <div className="h-3 bg-bg-subtle rounded" />
                    <div className="h-3 bg-bg-subtle rounded w-4/5" />
                  </div>
                ))}
              </div>
            )}

            {!reviewsLoading && reviews.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-text-subtle text-sm">لا توجد تقييمات لهذا المنتج بعد. كن أول من يقيّم!</p>
              </div>
            )}

            {!reviewsLoading && reviews.length > 0 && (
              <div className="space-y-5">
                {reviews.map((review) => (
                  <div key={review._id} className="bg-bg-main border border-border-main rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {review.user?.fullName?.[0]?.toUpperCase() ?? "U"}
                        </div>
                        <div>
                          <h4 className="font-bold text-text-main text-sm capitalize">
                            {review.user?.fullName ?? "مستخدم"}
                          </h4>
                          <span className="text-xs text-text-subtle">
                            {new Date(review.createdAt).toLocaleDateString("ar-EG")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14}
                              fill={i < review.rating ? "currentColor" : "none"}
                              strokeWidth={i < review.rating ? 0 : 1.5} />
                          ))}
                        </div>
                        {currentUserId && review.user?._id === currentUserId && (
                          <button disabled={deleting}
                            onClick={() => dispatch(deleteReview(review._id))}
                            className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50">
                            حذف
                          </button>
                        )}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-text-main leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {reviewsPages > 1 && (
              <div className="flex justify-center gap-2 pt-4" dir="ltr">
                {[...Array(reviewsPages)].map((_, i) => (
                  <button key={i} onClick={() => dispatch(setReviewPage(i + 1))}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${reviewsPage === i + 1 ? "bg-primary text-white" : "border border-border-main text-text-main hover:bg-primary/10"
                      }`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} product={product} />
    </section>
  );
}