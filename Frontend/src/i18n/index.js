import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationAR from './translations/ar.json';
import translationEN from './translations/en.json';

const resources = {
  ar: {
    translation: translationAR
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false, 
    
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;