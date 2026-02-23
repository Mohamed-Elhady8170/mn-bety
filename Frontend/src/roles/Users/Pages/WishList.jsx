import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Star, ArrowRight, HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data for the Wishlist
const INITIAL_WISHLIST = [
  {
    id: 1,
    title: "حقيبة يدوية مطرزة خيوط حرير",
    price: 450,
    currency: "SAR",
    rating: 5.0,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop",
    inStock: true
  },
  {
    id: 2,
    title: "إناء فخاري تصميم ريفي",
    price: 280,
    currency: "SAR",
    rating: 4.8,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop",
    inStock: true
  },
  {
    id: 3,
    title: "محفظة يد تراثية مخمل",
    price: 150,
    currency: "SAR",
    rating: 4.9,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop",
    inStock: false
  }
];

export default function WishList() {
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST);

  // Function to handle removing an item
  const handleRemoveItem = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  // Function to handle adding to cart (Mock)
  const handleAddToCart = (id) => {
    console.log(`Product ${id} added to cart!`);
    // In a real app, you'd dispatch to Redux here and maybe remove from wishlist
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
                {wishlistItems.length} {wishlistItems.length <= 10 && wishlistItems.length >= 3 ? 'منتجات' : 'منتج'} محفوظ
              </p>
            </div>
          </div>
        </div>

        {/* Conditional Rendering: Empty State vs Grid */}
        {wishlistItems.length === 0 ? (
          
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
              to="/user/products" 
              className="bg-primary hover:bg-primary/80 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 hover:-translate-x-1"
            >
              تسوق الآن
              <ArrowRight size={20} className="rotate-180" />
            </Link>
          </div>

        ) : (

          /* --- WISHLIST GRID --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-bg-main rounded-2xl p-4 border border-border-warm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-bg-subtle mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Remove Button (Floating Top Left) */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-3 left-3 w-9 h-9 bg-bg-main/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-subtle hover:text-red-text hover:bg-red-soft transition-colors shadow-sm z-10"
                    title="حذف من المفضلة"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Out of Stock Overlay */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-bg-main/60 backdrop-blur-[2px] flex items-center justify-center z-0">
                      <span className="bg-bg-dark text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                        نفذت الكمية
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col grow">
                  <h3 className="font-bold text-text-main text-base mb-1 line-clamp-1" title={item.title}>
                    {item.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mb-4 mt-auto">
                    <span className="text-lg font-black text-primary">{item.price} <span className="text-sm font-medium text-text-subtle">{item.currency}</span></span>
                    <div className="flex items-center gap-1 text-sm text-text-subtle">
                      <span className="font-bold text-text-main">{item.rating}</span>
                      <Star size={14} className="text-yellow-500 fill-current" />
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock}
                    className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      item.inStock 
                        ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white border border-transparent hover:shadow-lg hover:shadow-primary/20' 
                        : 'bg-bg-subtle text-text-subtle cursor-not-allowed border border-border-main'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {item.inStock ? 'إضافة للسلة' : 'غير متوفر'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}