import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../../locales/en.json';
import ptTranslation from '../../locales/pt-br.json';
import esTranslation from '../../locales/es.json'

const resources = {
    en: {
        translation: enTranslation,
    },
    pt: {
        translation: ptTranslation,
    },
    es: {
        translation: esTranslation,
    },
};

i18n.use(initReactI18next).init({
    resources,
    debug: true,
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    react: {
        wait: true,
    },
});

export default i18n;