import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const useCurrentUrl = () => {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState<string | undefined>();

  useEffect(() => {
    const fullUrl = `${window.location.origin}${location.pathname}${location.search}`;
    setCurrentUrl(fullUrl);
  }, [location]);

  return { currentUrl, setCurrentUrl };
};

export default useCurrentUrl;
