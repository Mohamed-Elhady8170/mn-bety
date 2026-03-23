import React from 'react'
import { useTranslation } from 'react-i18next';
import rotateImg from '../../../../assets/rotate-img.png';
import { Quote } from 'lucide-react';

export default function AboutSection() {
  const { t } = useTranslation();
  
  return (
    <>
      <section className="relative z-20 py-32 bg-bg-amber-light shadow-[0_-50px_100px_rgba(0,0,0,0.1)] rounded-t-[3rem] md:rounded-t-[5rem] -mt-20 overflow-hidden">
        <div className="absolute -left-5 md:-left-10 top-10 w-32 h-32 md:w-48 md:h-44 lg:w-50.5 lg:h-60.5 opacity-40 pointer-events-none z-0">
          <img
            src={rotateImg}
            alt={t('common.decorative_shape')}
            className="w-full h-full object-contain animate-[spin_15s_linear_infinite]"
          />
        </div>
        <div className="absolute -right-5 md:-right-10 top-10 w-32 h-32 md:w-48 md:h-44 lg:w-50.5 lg:h-60.5 opacity-40 pointer-events-none z-0">
          <img
            src={rotateImg}
            alt={t('common.decorative_shape')}
            className="w-full h-full object-contain animate-[spin_15s_linear_infinite]"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block p-4 bg-primary/10 rounded-3xl text-primary mb-10">
            <Quote size={48} fill="currentColor" className="opacity-20" />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-text-main mb-10">{t('about_section.title')}</h2>

          <p className="text-xl md:text-3xl text-text-subtle leading-[1.8] font-medium italic">
            {t('about_section.quote_prefix')} 
            <span className="text-primary font-bold">{t('about_section.quote_highlight')}</span>
            {t('about_section.quote_suffix')}
          </p>

          <div className="mt-16 flex justify-center gap-6">
            <div className="h-1.5 w-16 bg-primary rounded-full"></div>
            <div className="h-1.5 w-4 bg-bg-subtle rounded-full"></div>
            <div className="h-1.5 w-4 bg-bg-subtle rounded-full"></div>
          </div>
        </div>
      </section>
    </>
  )
}