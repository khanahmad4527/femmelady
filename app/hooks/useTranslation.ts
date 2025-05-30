import { TranslationKeys } from '~/types';

import ar from '../locales/ar.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import nl from '../locales/nl.json';
import zh from '../locales/zh.json';
import useCurrentLanguage from './useCurrentLanguage';

type Translations = {
  [key in TranslationKeys]: typeof en;
};

const translations: Translations = {
  en,
  ja,
  ar,
  nl,
  fr,
  ko,
  zh
};

const useTranslation = () => {
  const { currentLanguage } = useCurrentLanguage();

  const t = (key: string, replacements?: Record<string, React.ReactNode>) => {
    const keys = key?.split('.') ?? [];
    if (!keys || !keys.length) {
      return '';
    }
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

    if (replacements) {
      return Object.entries(replacements).reduce<React.ReactNode[]>(
        (result, [placeholder, value]) => {
          // Split the translation on the placeholder and insert the replacement
          return result.flatMap(part =>
            typeof part === 'string'
              ? part
                  .split(`{${placeholder}}`)
                  .flatMap((splitPart, index, arr) =>
                    index < arr.length - 1 ? [splitPart, value] : [splitPart]
                  )
              : [part]
          );
        },
        [translation as string]
      ) as any as string;
    }

    return translation as string;
  };

  return t;
};

export default useTranslation;
