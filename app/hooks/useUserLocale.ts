import { LANGUAGE_TO_LOCALE_LANGUAGE } from '~/constant';
import { TranslationKeys } from '~/types/types';

const useUserLocale = (currentLanguage: TranslationKeys = 'en') => {
  const userLocale =
    LANGUAGE_TO_LOCALE_LANGUAGE[currentLanguage] || // Use language from URL
    (typeof navigator !== 'undefined' ? navigator.language : 'en-US') || // Fallback to browser language (client-side only)
    'en-US'; // Default fallback

  return userLocale;
};

export default useUserLocale;
