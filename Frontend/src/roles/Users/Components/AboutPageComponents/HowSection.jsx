import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartHandshake, ShieldCheck, TrendingUp } from 'lucide-react';

export default function HowSection() {
  const { t } = useTranslation();
  
  const icons = [HeartHandshake, ShieldCheck, TrendingUp];
  const numbers = ['01', '02', '03'];
  
  return (
    <>
      <section className="py-32 bg-primary/5 relative overflow-hidden text-center" >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-24 text-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-text-main mb-6">
                <span className="text-primary">{t('how_section.title_part1')}</span> {t('how_section.title_highlight')}
              </h2>
              <p className="text-xl text-text-subtle leading-relaxed">
                {t('how_section.subtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[0, 1, 2].map((index) => {
              const Icon = icons[index];
              const cardData = t(`how_section.cards.${index}`, { returnObjects: true });
              
              return (
                <div key={index} className="relative p-8 bg-bg-main rounded-[3rem] border border-primary/20 group hover:bg-primary transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2">
                  <div className="absolute border border-amber-500 -top-6 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 w-12 h-12 bg-bg-main shadow-lg rounded-2xl flex items-center justify-center text-2xl font-black text-primary group-hover:bg-white group-hover:text-primary transition-all duration-500">
                    {numbers[index]}
                  </div>
                  <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 flex items-center justify-center text-primary group-hover:text-white transition-colors duration-500">
                      <Icon
                        size={48}
                        className="transition-transform duration-700 ease-in-out 
                        group-hover:-translate-y-1.25 
                        group-hover:transform-[rotateY(180deg)]"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-text-main mb-4 group-hover:text-white transition-colors duration-500">
                    {cardData.title}
                  </h3>
                  <p className="text-text-subtle leading-relaxed text-lg group-hover:text-white/90 transition-colors duration-500">
                    {cardData.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  )
}