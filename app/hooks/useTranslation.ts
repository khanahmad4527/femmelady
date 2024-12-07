import { TranslationKeys } from '~/types/types';
import en from '../locales/en.json';
import ja from '../locales/ja.json';
import useCurrentLanguage from './useCurrentLanguage';

type Translations = {
  [key in TranslationKeys]: typeof en;
};

const translations: Translations = {
  en,
  ja
};

const useTranslation = () => {
  const { currentLanguage } = useCurrentLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translations[currentLanguage];

    for (let i = 0; i < keys.length; i++) {
      const keyPart = keys[i];

      if (
        translation &&
        typeof translation === 'object' &&
        keyPart in translation
      ) {
        translation = translation[keyPart];
      } else {
        translation = key;
        break;
      }
    }

    return translation as string;
  };

  return t;
};

export default useTranslation;
