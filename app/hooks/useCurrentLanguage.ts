import { useParams } from 'react-router';
import { LANGUAGE_DIRECTION } from '~/constant';

import { TranslationKeys } from '~/types';
import { getLanguageCode } from '~/utils';

const useCurrentLanguage = () => {
  const params = useParams<{ lang: TranslationKeys }>();

  const currentLanguage = params?.lang ?? 'en';

  const currentLanguageCode = getLanguageCode(params);

  return {
    currentLanguage,
    currentLanguageCode,
    dir: LANGUAGE_DIRECTION[currentLanguage]
  };
};

export default useCurrentLanguage;
