import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './i18n/ru.json';
import en from './i18n/en.json';

const savedLang = localStorage.getItem('lang') || 'ru';

i18n.on('languageChanged', (lang) => {
  document.documentElement.lang = lang;
});

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: savedLang,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
