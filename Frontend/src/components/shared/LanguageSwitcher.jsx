import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ isMobile = false }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center justify-center rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main ${
        isMobile ? 'w-9 h-9' : 'w-8 h-8 sm:w-10 sm:h-10'
      }`}
      aria-label="تغيير اللغة"
    >
      <Globe size={isMobile ? 18 : 16} className="sm:w-4.5 sm:h-4.5" />
      <span className="mr-1 text-xs font-bold">
        {currentLang.startsWith('ar') ? 'EN' : 'AR'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;