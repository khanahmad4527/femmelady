import { useParams } from 'react-router';

import { TranslationKeys } from '~/types';
import { getLanguageCode } from '~/utils';

const useCurrentLanguage = () => {
  const params = useParams<{ lang: TranslationKeys }>();

  const currentLanguage = params?.lang ?? 'en';

  const currentLanguageCode = getLanguageCode(params);

  return { currentLanguage, currentLanguageCode };
};

export default useCurrentLanguage;
