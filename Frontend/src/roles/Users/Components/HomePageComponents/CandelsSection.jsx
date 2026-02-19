import React from 'react'
import { FaArrowRight , FaArrowLeft } from 'react-icons/fa';

export default function Candels() {
   const subCategories = [
    { id: 1, title: " شموع صويا", count: "15 منتج", img: "https://i.pinimg.com/736x/36/d4/4d/36d44d2a77473b9aef36b5000149cf6f.jpg" },
    { id: 2, title: " شموع مناسبات ", count: "12 منتج", img: "https://i.pinimg.com/1200x/c9/0e/56/c90e5662c9d3572e4c71b98fc2f44c4a.jpg" },
    { id: 3, title: " شموع ديكور", count: "20 منتج", img: "https://i.pinimg.com/1200x/7a/c6/d1/7ac6d1407a299e12e2cdaf6161d0758f.jpg" },
    { id: 4, title: "شموع معطرة ", count: "10 منتجات", img: "https://i.pinimg.com/736x/25/a6/22/25a62278e9f4f0b4f0dca5f748d72eed.jpg" },
  ];

  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="relative">
            <h2 className="text-4xl font-black text-gray-600 flex flex-col items-center md:items-start tracking-tight">
             شموع معطرة  
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
