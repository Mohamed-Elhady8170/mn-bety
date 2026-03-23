import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function Candels() {
  const { t } = useTranslation();
  const categories = t('home.candles.categories', { returnObjects: true });
  
  const images = [
    "https://i.pinimg.com/736x/36/d4/4d/36d44d2a77473b9aef36b5000149cf6f.jpg",
    "https://i.pinimg.com/1200x/c9/0e/56/c90e5662c9d3572e4c71b98fc2f44c4a.jpg",
    "https://i.pinimg.com/1200x/7a/c6/d1/7ac6d1407a299e12e2cdaf6161d0758f.jpg",
    "https://i.pinimg.com/736x/25/a6/22/25a62278e9f4f0b4f0dca5f748d72eed.jpg"
  ];

  return (
    <section className="py-16 md:py-20 bg-bg-light">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
          <div className="relative text-center md:text-start">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-text-main tracking-tight">
              {t('home.candles.title')}
            </h2>
            <p className="text-text-subtle mt-1 md:mt-2 text-xs md:text-sm lg:text-base max-w-md">
              {t('home.candles.subtitle')}
            </p>
          </div>
          
          <a 
            href="#" 
            className="group flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-all text-sm md:text-base border-2 border-primary/20 hover:border-primary/40 px-4 md:px-5 py-2 rounded-full"
          >
            {t('home.candles.view_all_btn')}
            <FaArrowLeft className="text-xs md:text-sm group-hover:-translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {categories.map((item, index) => (
            <div 
              key={index} 
              className="group relative h-80 md:h-96 lg:h-112 overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500"
              style={{ border: '6px solid var(--color-image-border)' }}
            >
              <img 
                src={images[index]} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-8 text-center flex flex-col items-center">
                <span className="bg-primary text-white text-xs md:text-sm font-bold py-1 px-3 md:py-1.5 md:px-4 rounded-full mb-2 md:mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {item.count}
                </span>
                <h3 className="text-white font-black text-lg md:text-xl lg:text-2xl drop-shadow-lg">
                  {item.title}
                </h3>
              </div>

              <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-2xl md:rounded-3xl lg:rounded-[2.5rem]"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary font-bold border-2 border-primary/30 px-5 py-2.5 rounded-full text-sm"
          >
            {t('home.candles.view_more_btn')}
            <FaArrowLeft className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}