import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const useCurrentUrl = () => {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState<string | undefined>();

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('force-validate', 'global');
    setCurrentUrl(url.toString());
  }, [location]);

  return { currentUrl, setCurrentUrl, location };
};

export default useCurrentUrl;
