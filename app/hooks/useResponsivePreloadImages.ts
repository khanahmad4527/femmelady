import { useEffect } from 'react';

interface ResponsivePreloadImagesProps {
  base: string[];
  above1200: string[];
  below1200: string[];
}

/**
 * This is to load all the images after the first render, for a better user experience
 */
export default function useResponsivePreloadImages({
  base,
  above1200,
  below1200
}: ResponsivePreloadImagesProps) {
  useEffect(() => {
    // Helper to inject a preload link if not already present
    const preloadLink = (url: string) => {
      if (!document.querySelector(`link[rel="preload"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      }
    };

    // Always preload the base images
    base.forEach(url => preloadLink(url));

    // Decide which responsive set to preload based on viewport width at mount time
    const isAbove1200 = window.innerWidth >= 1200;
    const responsiveImages = isAbove1200 ? above1200 : below1200;
    responsiveImages.forEach(url => preloadLink(url));

    // Cleanup: Remove the links when the component unmounts
    return () => {
      [...base, ...responsiveImages].forEach(url => {
        const link = document.querySelector(
          `link[rel="preload"][href="${url}"]`
        );
        if (link) {
          document.head.removeChild(link);
        }
      });
    };
  }, [base, above1200, below1200]);

  return null;
}
