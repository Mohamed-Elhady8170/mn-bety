import React from 'react'
import { FaArrowRight , FaArrowLeft } from 'react-icons/fa';

export default function DecoreSection() {
   const subCategories = [
    { id: 1, title: " لوحات", count: "15 منتج", img: "https://i.pinimg.com/736x/af/5d/5e/af5d5e37ac00c764daf917bd9526ff2e.jpg" },
    { id: 2, title: " فازات ", count: "12 منتج", img: "https://i.pinimg.com/1200x/a4/76/75/a47675dfbe3a66f6da98a00e6c1ac6d3.jpg" },
    { id: 3, title: "مفارش ", count: "20 منتج", img: "https://i.pinimg.com/736x/0b/ea/bc/0beabcfee9be3db72e2c9412cba5d649.jpg" },
    { id: 4, title: "بوكسات هدايا ", count: "10 منتجات", img: "https://i.pinimg.com/1200x/b9/e1/6d/b9e16db82665d7d6bb08ba729c1641fb.jpg" },
  ];

  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="relative">
            <h2 className="text-4xl font-black text-gray-600 flex flex-col items-center md:items-start tracking-tight">
             ديكور منزلي
            </h2>
          </div>
          <a href="#" className="group flex items-center gap-2 text-orange-600 font-bold hover:text-orange-500 transition-all text-lg">
            عرض كل الأقسام <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subCategories.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-[450px] overflow-hidden rounded-[2.5rem] cursor-pointer shadow-xl border-8 border-white"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 text-center flex flex-col items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {item.count}
                </span>
                <h3 className="text-white font-black text-2xl md:text-3xl mb-4 drop-shadow-lg">
                  {item.title}
                </h3>
              </div>

              <div className="absolute inset-0  group-hover:border-[12px] border-white/10 transition-all duration-500 rounded-[2.5rem]"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
