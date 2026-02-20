import React, { useState } from 'react';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  ShieldCheck, 
  BadgeCheck, 
  Store, 
  Wallet,
  ArrowRight
} from 'lucide-react';

export default function ProductDetails() {
  // State for the active image in the gallery
  const [activeImage, setActiveImage] = useState(0);

  // Mock Data (In a real app, this comes from an API or Props)
  const product = {
    title: "حقيبة يدوية مطرزة خيوط حرير",
    price: 450,
    currency: "SAR",
    rating: 5,
    reviews: 24,
    description: "هذه الحقيبة ليست مجرد منتج، بل هي لوحة فنية تجسد مهارة الأجيال. صنعت يدوياً بالكامل باستخدام خيوط الحرير الطبيعي المختارة بعناية. استغرق العمل على التطريز الدقيق أكثر من 40 ساعة من الفن اليدوي المخلص، مما يجعل كل قطعة فريدة من نوعها وغير متكررة.",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop", // Main
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "مشغل نورة",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
      bio: "نورة هي حرفية سعودية متخصصة في فن التطريز التراثي. تعمل من مشغلها المنزلي في الرياض على إحياء الأنماط التقليدية بلمسة عصرية."
    }
  };

  const relatedProducts = [
    { id: 1, title: "حقيبة كتف هندسية زرقاء", price: 320, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop" },
    { id: 2, title: "حقيبة صغيرة دائرية حرير", price: 190, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop" },
    { id: 3, title: "محفظة يد تراثية مخمل", price: 150, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop" },
    { id: 4, title: "حقيبة تسوق مطرزة بالورد", price: 280, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <section className="min-h-screen bg-[#FAFAFA] font-sans pb-20" dir="rtl">
      {/* Navbar Placeholder / Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex gap-2">
        <span>الرئيسية</span>
        <span>/</span>
        <span>حقائب يدوية</span>
        <span>/</span>
        <span className="text-[#D97706] font-medium">{product.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
        
        {/* RIGHT COLUMN: Image Gallery (Takes up 7 columns on large screens) */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {product.images.map((img, index) => (
              <button 
                key={index}
                onClick={() => setActiveImage(index)}
                className={`min-w-20 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? 'border-[#D97706]' : 'border-transparent hover:border-gray-200'}`}
              >
                <img src={img} alt={`view ${index}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1 bg-[#F3F4F6] rounded-3xl overflow-hidden h-100 lg:h-150 shadow-sm">
            <img 
              src={product.images[activeImage]} 
              alt={product.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* LEFT COLUMN: Product Details (Takes up 5 columns on large screens) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Badge */}
          <div className="inline-block bg-[#FFF7ED] text-[#D97706] px-3 py-1 rounded-full text-xs font-bold border border-[#FFEDD5]">
            صناعة يدوية فاخرة
          </div>

          {/* Title & Reviews */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#D97706]">{product.price} {product.currency}</span>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <div className="flex text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} تقييم)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Payment Note Box */}
          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#D97706] shadow-sm">
              <Wallet size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">الدفع عند الاستلام متاح</h4>
              <p className="text-xs text-gray-500">اشترِ الآن وادفع عند باب منزلك في جميع أنحاء المملكة</p>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-3">
                <img src={product.seller.avatar} alt={product.seller.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-1">
                    بواسطة: {product.seller.name}
                    {product.seller.verified && <BadgeCheck size={16} className="text-blue-500" fill="currentColor" />}
                  </h3>
                  <span className="text-xs text-[#D97706] font-medium bg-[#FFF7ED] px-2 py-0.5 rounded">حرفي معتمد</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{product.seller.bio}</p>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              زيارة المتجر
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 bg-[#D97706] hover:bg-[#B45309] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              إضافة للسلة
            </button>
            <button className="w-14 h-14 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
              <Heart size={24} />
            </button>
          </div>

          {/* Features - Small Icons */}
          <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <Truck size={16} className="text-[#D97706]" />
              <span>شحن خلال 3-5 أيام</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#D97706]" />
              <span>قطعة فنية فريدة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BadgeCheck size={16} className="text-[#D97706]" />
              <span>تسوق آمن 100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto px-4 mt-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900 relative pb-2">
            منتجات قد تعجبك
            <span className="absolute bottom-0 right-0 w-12 h-1 bg-[#D97706] rounded-full"></span>
          </h2>
          <button className="text-[#D97706] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            عرض الكل <ArrowRight size={16} className="rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl p-3 hover:shadow-xl transition-shadow border border-transparent hover:border-gray-100">
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-gray-100 mb-3">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                   <Heart size={16} />
                </button>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-[#D97706] font-bold text-sm">{item.price} SAR</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}