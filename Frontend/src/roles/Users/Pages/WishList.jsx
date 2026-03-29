import React from 'react';
import { Heart, ShoppingCart, Trash2, Star, ArrowRight, HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWishlistThunk, removeFromWishlistThunk } from '../Features/wishlistThunks';
import { selectWishlistProducts, selectWishlistLoading } from '../Features/wishlistSlice';
import { showSuccess, showError } from '../../../lib/toast';
import useEmailVerification from '../../../hooks/useEmailVerification';

export default function WishList() {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector(selectWishlistProducts);
  const isLoading = useSelector(selectWishlistLoading);
  const { checkVerified } = useEmailVerification();

  // fetch wishlist on mount
  useEffect(() => {
    dispatch(fetchWishlistThunk());
  }, [dispatch]);

  const handleRemoveItem = async (productId) => {
    const result = await dispatch(removeFromWishlistThunk(productId));
    if (removeFromWishlistThunk.fulfilled.match(result)) {
      showSuccess('تم الحذف من المفضلة');
    } else {
      showError(result.payload || 'حدث خطأ');
    }
  };

  const handleAddToCart = async () => {
    const ok = await checkVerified();
    if (!ok) return;
    
    // TODO: Implement add to cart logic
    showSuccess('تمت الإضافة للسلة');
  };

  // حساب السعر النهائي (بعد الخصم)
  const getFinalPrice = (product) => {
    const price = product.price || 0;
    const discountPrice = product.discountPrice || 0;
    return discountPrice > 0 ? discountPrice : price;
  };

  // التحقق من أن المنتج لديه البيانات المطلوبة
  const isValidProduct = (product) => {
    return product && typeof product === 'object' && product._id;
  };

  return (
    <div className="min-h-screen bg-bg-light py-12 px-4 md:px-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-warm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-bg-main rounded-full flex items-center justify-center shadow-sm text-primary">
              <Heart className="fill-current w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-text-main">قائمة المفضلة</h1>
              <p className="text-text-subtle text-sm mt-1">
                {wishlistProducts.length} {wishlistProducts.length <= 10 && wishlistProducts.length >= 3 ? 'منتجات' : 'منتج'} محفوظ
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Conditional Rendering: Empty State vs Grid */}
        {!isLoading && wishlistProducts.length === 0 ? (
          
          /* --- EMPTY STATE --- */
          <div className="bg-bg-main rounded-3xl border border-border-warm p-12 text-center flex flex-col items-center justify-center min-h-100 shadow-sm">
            <div className="w-24 h-24 bg-red-soft rounded-full flex items-center justify-center mb-6 text-red-text">
              <HeartCrack size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-text-main mb-2">قائمتك فارغة حالياً</h2>
            <p className="text-text-subtle max-w-md mx-auto mb-8">
              يبدو أنك لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد. تصفح منتجاتنا المميزة واكتشف ما يعجبك!
            </p>
            <Link 
              to="/customer/products" 
              className="bg-primary hover:bg-primary/80 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 hover:-translate-x-1"
            >
              تسوق الآن
              <ArrowRight size={20} className="rotate-180" />
            </Link>
          </div>

        ) : !isLoading && wishlistProducts.length > 0 ? (

          /* --- WISHLIST GRID --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => {
              // التأكد من وجود المنتج والبيانات المطلوبة
              if (!isValidProduct(product)) {
                console.warn('Invalid product in wishlist:', product);
                return null; // تخطي هذا المنتج إذا كان غير صالح
              }

              // استخراج البيانات مع قيم افتراضية آمنة
              const productId = product._id;
              const productName = product.name || 'منتج غير معروف';
              const productPrice = product.price || 0;
              const productStock = product.stock ?? 0; // استخدام ?? بدلاً من || للسماح بـ 0
              const productRating = product.rating || 0;
              const productImages = product.images || [];
              const productSlug = product.slug || productId;
              
              // التحقق من توفر المنتج
              const isInStock = productStock > 0;
              const finalPrice = getFinalPrice(product);
              const hasDiscount = (product.discountPrice || 0) > 0 && (product.discountPrice || 0) < productPrice;
              const productImage = productImages[0]?.url || "https://via.placeholder.com/400";
              
              return (
                <Link
                  key={productId} 
                  to={`/customer/products/${productSlug}`}
                  className="bg-bg-main rounded-2xl p-4 border border-border-warm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-bg-subtle mb-4">
                    <img 
                      src={productImage} 
                      alt={productName} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Remove Button (Floating Top Left) */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveItem(productId);
                      }}
                      className="absolute top-3 left-3 w-9 h-9 bg-bg-main/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-subtle hover:text-red-text hover:bg-red-soft transition-colors shadow-sm z-10"
                      title="حذف من المفضلة"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Out of Stock Overlay */}
                    {!isInStock && (
                      <div className="absolute inset-0 bg-bg-main/60 backdrop-blur-[2px] flex items-center justify-center z-0">
                        <span className="bg-bg-dark text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                          نفذت الكمية
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col grow">
                    <h3 className="font-bold text-text-main text-base mb-1 line-clamp-1" title={productName}>
                      {productName}
                    </h3>
                    
                    <div className="flex justify-between items-center mb-4 mt-auto">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-black text-primary">
                          {finalPrice.toLocaleString()} 
                          <span className="text-sm font-medium text-text-subtle mr-1">ج.م</span>
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-text-subtle line-through">
                            {productPrice.toLocaleString()} ج.م
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-text-subtle">
                        <span className="font-bold text-text-main">{productRating}</span>
                        <Star size={14} className="text-yellow-500 fill-current" />
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInStock) {
                          handleAddToCart(productId);
                        }
                      }}
                      disabled={!isInStock}
                      className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        isInStock 
                          ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white border border-transparent hover:shadow-lg hover:shadow-primary/20' 
                          : 'bg-bg-subtle text-text-subtle cursor-not-allowed border border-border-main'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      {isInStock ? 'إضافة للسلة' : 'غير متوفر'}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}