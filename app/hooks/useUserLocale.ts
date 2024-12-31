import { TranslationKeys } from '~/types';
import { getUserLocale } from '~/utils';

const useUserLocale = (currentLanguage: TranslationKeys = 'en') => {
  const userLocale = getUserLocale(currentLanguage);

  return userLocale;
};

export default useUserLocale;
