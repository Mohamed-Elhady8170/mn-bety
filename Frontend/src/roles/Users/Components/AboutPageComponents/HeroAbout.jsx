import React from 'react';
import { useTranslation } from 'react-i18next';
import heroabout from '../../../../assets/heroabout.jpg';
import { Sparkles } from 'lucide-react';

export default function HeroAbout() {
  const { t } = useTranslation();
  
  return (
    <>
      <section
        className="relative h-screen flex items-center justify-center px-4 md:px-20 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroabout})`
        }}
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <div className="space-y-6">
            <h5 className="text-primary font-bold tracking-[0.3em] text-sm md:text-base flex justify-center items-center gap-2 drop-shadow-lg">
              <Sparkles size={20} />
              <span>{t('hero_about.tagline')}</span>
            </h5>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl">
              {t('hero_about.title_part1')} <br />
              {t('hero_about.title_part2')} <span className="text-primary">{t('hero_about.title_highlight')}</span>
            </h1>
          </div>
        </div>
      </section>
    </>
  )
}