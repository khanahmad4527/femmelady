import { TranslationKeys } from '~/types/types';
import { ZodType, ZodTypeDef } from 'zod';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

type Translations = {
  [key in TranslationKeys]: typeof en;
};

const translations: Translations = {
  en,
  ja
};

export const validateFormWithTranslations = <T>({
  language,
  schema,
  data
}: {
  language: TranslationKeys;
  schema: (t: (key: string) => string) => ZodType<T, ZodTypeDef, T>;
  data: T;
}): T => {
  // Translation function based on language
  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translations[language];

    for (let i = 0; i < keys.length; i++) {
      const keyPart = keys[i];
      if (
        translation &&
        typeof translation === 'object' &&
        keyPart in translation
      ) {
        translation = translation[keyPart];
      } else {
        translation = key; // Fallback if key is not found
        break;
      }
    }

    return translation as string;
  };

  // Apply the schema validation with the translation function
  return schema(t).parse(data);
};
