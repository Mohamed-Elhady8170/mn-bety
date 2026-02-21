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
    <div className="min-h-screen bg-[#f8f7f6] py-12 px-4 md:px-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e7d5cf]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#ec4d18]">
              <Heart className="fill-current w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">قائمة المفضلة</h1>
              <p className="text-[#956b50] text-sm mt-1">
                {wishlistItems.length} {wishlistItems.length <= 10 && wishlistItems.length >= 3 ? 'منتجات' : 'منتج'} محفوظ
              </p>
            </div>
          </div>
        </div>

        {/* Conditional Rendering: Empty State vs Grid */}
        {wishlistItems.length === 0 ? (
          
          /* --- EMPTY STATE --- */
          <div className="bg-white rounded-3xl border border-[#e7d5cf] p-12 text-center flex flex-col items-center justify-center min-h-[400px] shadow-sm">
            <div className="w-24 h-24 bg-[#fee2e2] rounded-full flex items-center justify-center mb-6 text-[#ef4444]">
              <HeartCrack size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">قائمتك فارغة حالياً</h2>
            <p className="text-[#956b50] max-w-md mx-auto mb-8">
              يبدو أنك لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد. تصفح منتجاتنا المميزة واكتشف ما يعجبك!
            </p>
            <Link 
              to="/user/products" 
              className="bg-[#ec4d18] hover:bg-[#d43d0a] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-[#ec4d18]/20 flex items-center gap-2 hover:-translate-x-1"
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
                className="bg-white rounded-2xl p-4 border border-[#e7d5cf] hover:shadow-xl hover:border-[#ec4d18]/30 transition-all duration-300 group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#f3ece8] mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Remove Button (Floating Top Left) */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm z-10"
                    title="حذف من المفضلة"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Out of Stock Overlay */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-0">
                      <span className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                        نفذت الكمية
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1" title={item.title}>
                    {item.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mb-4 mt-auto">
                    <span className="text-lg font-black text-[#ec4d18]">{item.price} <span className="text-sm font-medium">{item.currency}</span></span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span className="font-bold text-gray-700">{item.rating}</span>
                      <Star size={14} className="text-[#F59E0B] fill-current" />
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock}
                    className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      item.inStock 
                        ? 'bg-[#ec4d18]/10 text-[#ec4d18] hover:bg-[#ec4d18] hover:text-white border border-transparent hover:shadow-lg hover:shadow-[#ec4d18]/20' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
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