// import React from 'react';
// import { Star, MapPin, BadgeCheck, ArrowRight, Store, Sparkles } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // Mock Data for Sellers
// const MOCK_SELLERS = [
//   {
//     id: 1,
//     name: "مشغل نورة للتطريز",
//     location: "الرياض",
//     rating: 4.9,
//     reviews: 128,
//     verified: true,
//     bio: "متخصصة في إحياء التراث السعودي من خلال تطريز الحقائب والملابس بلمسة عصرية وحديثة.",
//     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
//     topProducts: [
//       "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1614179924047-e1ab49a05e33?q=80&w=200&auto=format&fit=crop"
//     ]
//   },
//   {
//     id: 2,
//     name: "فخاريات الأمل",
//     location: "الأحساء",
//     rating: 4.6,
//     reviews: 85,
//     verified: false,
//     bio: "نصنع الفخار يدوياً من طين الأحساء الطبيعي، قطع فريدة لتزيين منزلك ومطبخك.",
//     avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
//     topProducts: [
//       "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=200&auto=format&fit=crop"
//     ]
//   },
//   {
//     id: 3,
//     name: "مجوهرات ياقوت",
//     location: "جدة",
//     rating: 5.0,
//     reviews: 210,
//     verified: true,
//     bio: "صياغة المجوهرات الفضية وتطعيمها بالأحجار الكريمة بطرق تقليدية متوارثة عبر الأجيال.",
//     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
//     topProducts: [
//       "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1599643478514-4a11011c7769?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&auto=format&fit=crop"
//     ]
//   },
//   {
//     id: 4,
//     name: "ورشة الأخشاب العتيقة",
//     location: "الدمام",
//     rating: 4.4,
//     reviews: 42,
//     verified: true,
//     bio: "نحول الأخشاب المعاد تدويرها إلى تحف فنية وديكورات منزلية مستدامة وصديقة للبيئة.",
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
//     topProducts: [
//       "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=200&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=200&auto=format&fit=crop"
//     ]
//   }
// ];

// export default function SellersPage() {
//   // Sort sellers by rating (highest first)
//   const sortedSellers = [...MOCK_SELLERS].sort((a, b) => b.rating - a.rating);

//   return (
//     <div className="min-h-screen bg-bg-light py-12 px-4 md:px-20 font-cairo" dir="rtl">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <div className="text-center max-w-2xl mx-auto mb-16">
//           <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4 border border-primary/20">
//             <Sparkles size={16} />
//             <span>نخبة الحرفيين</span>
//           </div>
//           <h1 className="text-3xl md:text-5xl font-black text-text-main mb-4 leading-tight">
//             تعرف على المبدعين خلف المنتجات
//           </h1>
//           <p className="text-text-subtle text-lg leading-relaxed">
//             مجموعة من أمهر الحرفيين والمبدعين الموثوقين. تم ترتيبهم بناءً على تقييمات العملاء لضمان أفضل تجربة تسوق لك.
//           </p>
//         </div>

//         {/* Sellers Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {sortedSellers.map((seller, index) => (
//             <div key={seller.id} className="bg-bg-main rounded-3xl p-6 border border-border-warm hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
              
//               {/* Ranking Badge (1st, 2nd, 3rd get special colors) */}
//               <div className={`absolute top-0 right-0 w-12 h-12 flex items-center justify-center font-black text-lg rounded-bl-3xl z-10 ${
//                 index === 0 ? 'bg-yellow-500 text-white' : 
//                 index === 1 ? 'bg-gray-300 text-gray-700' : 
//                 index === 2 ? 'bg-primary/30 text-primary' : 
//                 'bg-bg-subtle text-text-subtle'
//               }`}>
//                 #{index + 1}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-6">
                
//                 {/* Avatar & Basic Info */}
//                 <div className="flex flex-col items-center sm:items-start sm:w-1/3">
//                   <div className="relative w-24 h-24 mb-4">
//                     <img src={seller.avatar} alt={seller.name} className="w-full h-full rounded-full object-cover border-4 border-bg-subtle shadow-sm" />
//                     {seller.verified && (
//                       <div className="absolute bottom-0 left-0 bg-bg-main rounded-full p-0.5 shadow-sm">
//                         <BadgeCheck className="text-blue-500 w-6 h-6 fill-current" />
//                       </div>
//                     )}
//                   </div>
                  
//                   <h3 className="font-bold text-text-main text-lg text-center sm:text-right mb-1">{seller.name}</h3>
//                   <div className="flex items-center gap-1 text-sm text-text-subtle mb-2">
//                     <MapPin size={14} className="text-primary" />
//                     <span>{seller.location}</span>
//                   </div>

//                   {/* Rating Badge */}
//                   <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
//                     <span className="font-black text-primary">{seller.rating}</span>
//                     <Star size={14} className="text-yellow-500 fill-current" />
//                     <span className="text-xs text-text-subtle">({seller.reviews})</span>
//                   </div>
//                 </div>

//                 {/* Bio & Products */}
//                 <div className="sm:w-2/3 flex flex-col justify-between">
//                   <div>
//                     <p className="text-text-subtle text-sm leading-relaxed mb-4 text-center sm:text-right">
//                       "{seller.bio}"
//                     </p>
                    
//                     {/* Mini Gallery */}
//                     <div className="flex gap-2 mb-6 justify-center sm:justify-start">
//                       {seller.topProducts.map((img, i) => (
//                         <div key={i} className="w-16 h-16 rounded-xl overflow-hidden bg-bg-subtle border border-border-main">
//                           <img src={img} alt="Product preview" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <button className="w-full sm:w-auto bg-bg-main border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn">
//                     <Store size={18} />
//                     <span>زيارة المتجر</span>
//                     <ArrowRight size={18} className="rotate-180 transition-transform group-hover/btn:-translate-x-1" />
//                   </button>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Star, MapPin, BadgeCheck, ChevronLeft, Sparkles, Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode'; 

const MOCK_SELLERS = [
   { id: 1, name: "مشغل نورة", location: "القاهرة", rating: 4.9, reviews: 128, verified: true, specialty: "تطريز يدوي وتراث", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" },
   { id: 2, name: "مجوهرات ياقوت", location: "المنوفية", rating: 5.0, reviews: 210, verified: true, specialty: "فضيات وأحجار كريمة", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" },
   { id: 3, name: "فخاريات الأمل", location: "الدقهلية", rating: 4.8, reviews: 95, verified: false, specialty: "خزف وفخار يدوي", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" },
   { id: 4, name: "خشب عتيق", location: "دمياط", rating: 4.7, reviews: 64, verified: true, specialty: "نحت وتجارة أخشاب", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
   { id: 5, name: "نسيج الجنوب", location: "أسوان", rating: 4.6, reviews: 88, verified: true, specialty: "سدو وحياكة", image: null },
   { id: 6, name: "عطور اللافندر", location: "إسكندرية", rating: 4.5, reviews: 120, verified: false, specialty: "زيوت عطرية طبيعية", image: null },
   { id: 7, name: "فن الزجاج", location: "بورسعيد", rating: 4.4, reviews: 42, verified: true, specialty: "زجاج معشق ومزخرف", image: null },
   { id: 8, name: "جلود الأصالة", location: "المنيا", rating: 4.3, reviews: 55, verified: true, specialty: "مصنوعات جلدية", image: null },
];

export default function SellersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  useDarkMode(); 

  const filteredSellers = MOCK_SELLERS
    .sort((a, b) => b.rating - a.rating)
    .filter(s => s.name.includes(searchTerm) || s.specialty.includes(searchTerm));

  return (
    <div className="min-h-screen bg-bg-main text-text-main py-12 px-4 md:px-20 font-body transition-colors duration-300" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
        {/* Header من غير Theme Toggle */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles size={18} />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">قائمة المبدعين</span>
          </div>
          <h1 className="text-4xl font-black mb-4">اكتشف الحرفيين</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="ابحث عن بائع أو تخصص..." 
            className="w-full py-5 pr-14 text-lg rounded-xl border border-border-main bg-bg-subtle text-text-main placeholder:text-text-subtle focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sellers Grid */}
        <div className="grid gap-6">
          {filteredSellers.map((seller) => (
            <Link 
              key={seller.id}
              to={`/user/seller-products/${seller.id}`} 
              className="bg-bg-main p-6 border border-border-main rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex items-center gap-6 w-full md:w-auto"> 
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-border-main group-hover:border-primary/50 transition-colors shrink-0">
                  <img 
                    src={seller.image || `https://ui-avatars.com/api/?name=${seller.name}&background=f3ece8&color=956b50`} 
                    alt={seller.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-bold text-xl text-text-main group-hover:text-primary transition-colors">{seller.name}</h3>
                    {seller.verified && <BadgeCheck size={20} className="text-primary fill-current" />}
                  </div>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                    <span className="flex items-center gap-1 text-text-subtle">
                      <MapPin size={14} className="text-primary" /> {seller.location}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-primary-10 text-primary flex items-center gap-1">
                      <ShoppingBag size={12} />
                      {seller.specialty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 mt-6 md:mt-0 w-full md:w-auto justify-between border-t md:border-t-0 border-border-main pt-4 md:pt-0">
                <div className="flex flex-col items-center md:items-end">
                  <div className="flex items-center gap-1.5 text-yellow-500 font-black text-lg">
                    <span>{seller.rating.toFixed(1)}</span>
                    <Star size={18} fill="currentColor" />
                  </div>
                  <span className="text-xs text-text-muted">{seller.reviews} تقييم</span>
                </div>
                
                <button className="px-5 py-2 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                  <span>معرفة المزيد</span>
                  <ChevronLeft size={18} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}