import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const CookingSection = () => {
  const subCategories = [
    { id: 1, title: "مخللات بيتي", count: "15 منتج", img: "https://i.pinimg.com/736x/70/a7/8d/70a78d1ae378fd2b98b3fdd7c67a9768.jpg" },
    { id: 2, title: "مشاوى", count: "12 منتج", img: "https://i.pinimg.com/736x/26/5f/1d/265f1d79294516575df55567867bc3b9.jpg" },
    { id: 3, title: "منتجات دايت", count: "20 منتج", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop" },
    { id: 4, title: "حلويات وتورتات", count: "10 منتجات", img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1888&auto=format&fit=crop" },
  ];

  return (
    <section className="py-16 md:py-20 bg-bg-main" dir="rtl">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Header with better spacing */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
          <div className="relative text-center md:text-right">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-text-main tracking-tight">
              أكلات بيتي <span className="text-primary">طازجة</span>
            </h2>
            <p className="text-text-subtle mt-1 md:mt-2 text-xs md:text-sm lg:text-base max-w-md">
              أشهى الأطباق المنزلية المحضرة بحب وجودة عالية
            </p>
          </div>
          
          {/* More stylish button */}
          <a 
            href="#" 
            className="group flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-all text-sm md:text-base border-2 border-primary/20 hover:border-primary/40 px-4 md:px-5 py-2 rounded-full"
          >
            عرض كل الأقسام 
            <FaArrowLeft className="text-xs md:text-sm group-hover:-translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Cards grid with better proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {subCategories.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-80 md:h-96 lg:h-112 overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500"
              style={{ border: '6px solid var(--color-image-border)' }}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                loading="lazy"
              />
              
              {/* Gradient overlay - more subtle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Content - better positioned */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-8 text-center flex flex-col items-center">
                <span className="bg-primary text-white text-xs md:text-sm font-bold py-1 px-3 md:py-1.5 md:px-4 rounded-full mb-2 md:mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {item.count}
                </span>
                <h3 className="text-white font-black text-lg md:text-xl lg:text-2xl drop-shadow-lg">
                  {item.title}
                </h3>
              </div>

              {/* Hover border effect - more elegant */}
              <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-2xl md:rounded-3xl lg:rounded-[2.5rem]"></div>
            </div>
          ))}
        </div>

        {/* Optional: Add view more button for mobile */}
        <div className="flex justify-center mt-8 md:hidden">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary font-bold border-2 border-primary/30 px-5 py-2.5 rounded-full text-sm"
          >
            عرض المزيد
            <FaArrowLeft className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CookingSection;