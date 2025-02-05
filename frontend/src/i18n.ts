import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    fallbackLng: 'en', // Default fallback language
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
    // Override language detection behavior
    detection: {
      order: ['localStorage', 'navigator'], // Prioritize `localStorage` over automatic detection
      caches: ['localStorage'], // Cache language in `localStorage`
    },
  });

export default i18n;
