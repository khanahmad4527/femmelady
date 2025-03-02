import { useParams } from 'react-router';

import { LANGUAGE_DIRECTION } from '~/constant';
import { TranslationKeys } from '~/types';
import { getLanguageCode, getUserLocale } from '~/utils';

const useCurrentLanguage = () => {
  const params = useParams<{ lang: TranslationKeys }>();

  const currentLanguage = params?.lang ?? 'en';

  const currentLanguageCode = getLanguageCode(params);

  const userLocale = getUserLocale(currentLanguage);

  return {
    currentLanguage,
    currentLanguageCode,
    dir: LANGUAGE_DIRECTION[currentLanguage],
    userLocale
  };
};

export default useCurrentLanguage;
