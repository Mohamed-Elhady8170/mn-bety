import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  BadgeCheck,
  Wallet,
  MessageSquare,
  AlertTriangle,
  MapPin,
  Pencil,
  Trash2,
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
  selectReviewsPage,
  selectReviewsPages,
  selectReviewsLoading,
  selectDeleting,
} from "../Features/reviewSlice";
import { ReviewModal } from "../Components/ProdectsPageComponents/ReviewModal";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../Features/wishlistThunks";
import { selectWishlistIds } from "../Features/wishlistSlice";
import useEmailVerification from "../../../hooks/useEmailVerification";
import { showSuccess, showError } from "../../../lib/toast";
import { addToCartThunk } from "../Features/cartSlice";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { idOrSlug } = useParams();
  const dispatch     = useDispatch();
  const navigate     = useNavigate();
  const { checkVerified } = useEmailVerification();

  const [quantity, setQuantity] = useState(1);

  // ── Redux State ──────────────────────────────────────────────────────────────
  const product        = useSelector(selectCurrentProduct);
  const productLoading = useSelector(selectCurrentProductLoading);
  const reviews        = useSelector(selectReviews);
  const reviewsPage    = useSelector(selectReviewsPage);
  const reviewsPages   = useSelector(selectReviewsPages);
  const reviewsLoading = useSelector(selectReviewsLoading);
  const deleting       = useSelector(selectDeleting);
  const wishlistIds    = useSelector(selectWishlistIds);

  // ── Current logged-in user id ─────────────────────────────────────────────
  const currentUserId = useSelector(
    (state) => state.auth?.user?.userId ?? state.auth?.user?._id ?? null
  );

  const isFavorite = wishlistIds.has(product?._id?.toString());

  const [activeImage,    setActiveImage]    = useState(0);
  const [isReviewOpen,   setIsReviewOpen]   = useState(false);
  const [editingReview,  setEditingReview]  = useState(null);

  // ── Effects ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (idOrSlug) {
      dispatch(fetchProductByIdOrSlug(idOrSlug));
    }
    return () => { dispatch(clearReviews()); };
  }, [dispatch, idOrSlug]);

  useEffect(() => {
    if (product?._id) {
      dispatch(fetchProductReviews({ productId: product._id, page: reviewsPage, limit: 5 }));
    }
  }, [dispatch, product?._id, reviewsPage]);

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCartThunk({ productId: product._id, quantity }))
      .unwrap()
      .then(() => toast.success("تمت الإضافة للسلة بنجاح"))
      .catch((err) => toast.error(err || "حدث خطأ أثناء الإضافة للسلة"));
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity((p) => p + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((p) => p - 1);
  };

  const handleToggleFavorite = async () => {
    const ok = await checkVerified();
    if (!ok) return;
    if (isFavorite) {
      const result = await dispatch(removeFromWishlistThunk(product._id));
      if (removeFromWishlistThunk.fulfilled.match(result)) showSuccess("تم الحذف من المفضلة");
      else showError(result.payload || "حدث خطأ");
    } else {
      const result = await dispatch(addToWishlistThunk(product._id));
      if (addToWishlistThunk.fulfilled.match(result)) showSuccess("تمت الإضافة للمفضلة ❤️");
      else showError(result.payload || "حدث خطأ");
    }
  };

  const isReviewOwner = (review) => {
    if (!currentUserId || !review) return false;

    const ownerId =
      review.user?._id ?? review.user?.userId ?? review.user ?? null;

    return ownerId?.toString() === currentUserId?.toString();
  };

  const handleDeleteReview = (review) => {
    if (!isReviewOwner(review)) {
      showError("لا يمكنك حذف مراجعة مستخدم آخر");
      return;
    }

    dispatch(deleteReview(review._id));
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────────
  if (productLoading || !product) {
    return (
      <section className="min-h-screen bg-bg-light pb-20 animate-pulse" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 h-96 bg-bg-subtle rounded-3xl" />
            <div className="lg:col-span-5 space-y-6">
              <div className="h-8 bg-bg-subtle rounded w-3/4" />
              <div className="h-4 bg-bg-subtle rounded w-full" />
              <div className="h-12 bg-bg-subtle rounded w-1/2" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Derived values ────────────────────────────────────────────────────────────
  const images       = product.images ?? [];
  const mainImage    = images[activeImage]?.url ?? "https://via.placeholder.com/800";
  const hasDiscount  = product.discountPrice > 0;
  const finalPrice   = hasDiscount ? product.price - product.discountPrice : product.price;
  const categoryName = product.category?.name ?? "";
  const seller       = product.seller ?? {};

  return (
    <section className="min-h-screen bg-bg-light font-sans pb-20 text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-4" />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* ── 1. Gallery ────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)}
                className={`min-w-16 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all
                  ${activeImage === i ? "border-primary" : "border-transparent hover:border-border-main"}`}>
                <img src={img.url} alt={`view ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-bg-subtle rounded-2xl overflow-hidden h-80 lg:h-125 shadow-sm border border-border-main/50">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ── 2. Details ────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 space-y-5">

          {/* Category tag */}
          <div className="inline-block bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-primary/20 uppercase">
            {categoryName}
          </div>

          {/* Title + description + price */}
          <div>
            <h1 className="text-xl font-bold text-text-main mb-1.5 leading-tight">{product.name}</h1>
            <p className="text-xs text-text-subtle leading-relaxed mb-4 line-clamp-3">{product.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                {hasDiscount && (
                  <span className="text-[11px] text-text-subtle line-through leading-none mb-1 opacity-70">
                    {product.price.toLocaleString()} ج.م
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-primary leading-none">
                    {finalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-text-subtle">ج.م</span>
                </div>
              </div>

              <div className="h-8 w-px bg-border-main" />

              <div className="flex flex-col gap-1">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12}
                      fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                      strokeWidth={1.5} />
                  ))}
                </div>
                <span className="text-[10px] text-text-subtle font-medium">
                  ({product.numReviews} تقييم)
                </span>
              </div>
            </div>
          </div>

          {/* Stock alert */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-[11px] text-amber-700 flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-500 shrink-0" />
              <span>تنبيه: متوفر {product.stock} قطع فقط!</span>
            </div>
          )}

          {/* Payment box */}
          <div className="bg-green-50/40 border border-green-100 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm border border-green-50">
              <Wallet size={16} />
            </div>
            <div>
              <h4 className="font-bold text-text-main text-[11px]">متاح الدفع عند الاستلام</h4>
              <p className="text-[10px] text-text-subtle opacity-80">عاين المنتج وادفع عند الاستلام</p>
            </div>
          </div>

          {/* Seller card */}
          <div className="bg-bg-main border border-border-main rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {seller.logo?.url ? (
                  <img src={seller.logo.url} alt="seller"
                    className="w-9 h-9 rounded-full object-cover border border-border-main" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {seller.userId?.fullName?.[0]?.toUpperCase() ?? "S"}
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-bold text-text-main flex items-center gap-1">
                    {seller.userId?.fullName ?? "البائع"}
                    <BadgeCheck size={14} className="text-blue-500" fill="currentColor" />
                  </h3>
                  <p className="text-[10px] text-text-subtle flex items-center gap-1">
                    <MapPin size={10} /> {seller.location?.city ?? "مصر"}
                  </p>
                </div>
              </div>
              <span className="text-[9px] text-primary font-bold bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                حرفي معتمد
              </span>
            </div>
            <button
              onClick={() => navigate(`/customer/seller-products/${seller?._id}`)}
              className="w-full border border-border-main text-text-main py-1.5 rounded-lg text-[11px] font-semibold hover:bg-bg-subtle transition-colors"
            >
              زيارة المتجر
            </button>
          </div>

          {/* Cart + Favorite + Quantity */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center bg-bg-subtle border border-border-main rounded-xl h-12 px-1">
              <button onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center text-text-main hover:bg-bg-main rounded-lg transition-colors">
                -
              </button>
              <span className="w-8 text-center font-bold text-sm">{quantity}</span>
              <button onClick={handleIncrease} disabled={quantity >= product.stock}
                className="w-8 h-8 flex items-center justify-center text-text-main hover:bg-bg-main rounded-lg transition-colors disabled:opacity-50">
                +
              </button>
            </div>

            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white h-12 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              {product.stock === 0 ? "غير متوفر" : "إضافة للسلة"}
            </button>

            <button onClick={handleToggleFavorite}
              className={`w-12 h-12 shrink-0 flex items-center justify-center bg-bg-main border rounded-xl transition-colors
                ${isFavorite ? "border-red-200 text-red-500" : "border-border-main text-text-subtle hover:text-red-400"}`}>
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Features strip */}
          <div className="flex justify-between items-center text-[10px] text-text-subtle pt-4 border-t border-border-main/50">
            <div className="flex items-center gap-1"><Truck size={14} className="text-primary" /><span>شحن سريع</span></div>
            <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-primary" /><span>قطعة يدوية</span></div>
            <div className="flex items-center gap-1"><BadgeCheck size={14} className="text-primary" /><span>أصلي 100%</span></div>
          </div>
        </div>
      </div>

      {/* ── 3. Reviews Section ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <hr className="border-border-main/50 mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Summary + write button */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
              <MessageSquare size={20} className="text-primary" />
              آراء وتقييمات العملاء
            </h2>
            <div className="bg-bg-main border border-border-main rounded-2xl p-6 flex flex-col items-center gap-1 shadow-sm">
              <span className="text-4xl font-black text-text-main">
                {product.rating?.toFixed(1) || "0.0"}
              </span>
              <div className="flex text-yellow-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16}
                    fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                    strokeWidth={1} />
                ))}
              </div>
              <span className="text-[11px] text-text-subtle font-medium opacity-70">
                بناءً على {product.numReviews} تقييم
              </span>
            </div>
            <button onClick={() => setIsReviewOpen(true)}
              className="w-full bg-white border border-primary text-primary font-bold py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all text-xs">
              اكتب مراجعتك للمنتج
            </button>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-sm font-bold text-text-main mb-4 uppercase tracking-wider">
              أحدث المراجعات
            </h3>

            {reviewsLoading && (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 border border-border-main/60 rounded-xl animate-pulse bg-bg-subtle h-20" />
                ))}
              </div>
            )}

            {!reviewsLoading && reviews.length === 0 && (
              <p className="text-xs text-text-subtle opacity-60">لا توجد مراجعات لهذا المنتج بعد.</p>
            )}

            {!reviewsLoading && reviews.length > 0 && (
              <div className="space-y-4">
                {reviews.map((review) => {
                  const isOwner = isReviewOwner(review);

                  return (
                    <div key={review._id}
                      className="p-4 bg-bg-main border border-border-main/60 rounded-xl shadow-sm">

                      <div className="flex justify-between items-start mb-2">
                        {/* User info */}
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-text-main">
                            {review.user?.fullName}
                          </span>
                          <span className="text-[9px] text-text-subtle">
                            {new Date(review.createdAt).toLocaleDateString("ar-EG")}
                          </span>
                        </div>

                        {/* Stars + owner actions */}
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-500 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10}
                                fill={i < review.rating ? "currentColor" : "none"}
                                strokeWidth={1} />
                            ))}
                          </div>

                          {/* ✅ Only visible to the owner of this review */}
                          {isOwner && (
                            <div className="flex items-center gap-1 border-r border-border-main/40 pr-2 mr-1">
                              {/* Edit */}
                              <button
                                onClick={() => {
                                  if (!isReviewOwner(review)) {
                                    showError("لا يمكنك تعديل مراجعة مستخدم آخر");
                                    return;
                                  }
                                  setEditingReview(review);
                                }}
                                className="p-1 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                title="تعديل المراجعة"
                              >
                                <Pencil size={12} />
                              </button>
                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteReview(review)}
                                disabled={deleting}
                                className="p-1 rounded-lg hover:bg-red-50 text-red-400 transition-colors disabled:opacity-50"
                                title="حذف المراجعة"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] text-text-subtle leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {reviewsPages > 1 && (
              <div className="flex justify-center gap-2 pt-4" dir="ltr">
                {[...Array(reviewsPages)].map((_, i) => (
                  <button key={i} onClick={() => dispatch(setReviewPage(i + 1))}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all
                      ${reviewsPage === i + 1
                        ? "bg-primary text-white"
                        : "border border-border-main text-text-main hover:bg-primary/10"}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Review Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        product={product}
      />

      {/* Edit Review Modal — reuse ReviewModal with pre-filled data */}
      {editingReview && isReviewOwner(editingReview) && (
        <ReviewModal
          isOpen={!!editingReview}
          onClose={() => setEditingReview(null)}
          product={product}
          existingReview={editingReview}
        />
      )}
    </section>
  );
}