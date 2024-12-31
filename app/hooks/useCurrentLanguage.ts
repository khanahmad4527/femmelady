import { useParams } from 'react-router';

import { TranslationKeys } from '~/types';

const useCurrentLanguage = () => {
  const params = useParams<{ lang: TranslationKeys }>();

  const currentLanguage = params?.lang ?? 'en';

  return currentLanguage;
};

export default useCurrentLanguage;
