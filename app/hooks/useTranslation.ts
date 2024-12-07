import en from '../locales/en.json';

const translations = {
  en
};

const useTranslation = () => {
  const language = 'en';

  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translations[language];
    keys.forEach(keyPart => {
      translation = translation[keyPart];
    });
    return translation || key; // fallback to the key if translation is not found
  };

  return t;
};

export default useTranslation;
