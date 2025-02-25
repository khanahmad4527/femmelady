import { useEffect } from 'react';

interface ResponsivePreloadImagesProps {
  base?: string[];
  above1200?: string[];
  below1200?: string[];
}

/**
 * Preloads images after the first render for an improved user experience.
 */
export default function useResponsivePreloadImages({
  base,
  above1200,
  below1200
}: ResponsivePreloadImagesProps) {
  useEffect(() => {
    // Helper to inject a preload link if not already present.
    const preloadLink = (url: string) => {
      if (!document.querySelector(`link[rel="preload"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      }
    };

    // Default to empty arrays if undefined.
    const baseImages = base ?? [];
    const responsiveImages =
      (window.innerWidth >= 1200 ? above1200 : below1200) ?? [];

    // Always preload base images.
    baseImages.forEach(url => preloadLink(url));

    // Preload responsive images.
    responsiveImages.forEach(url => preloadLink(url));

    // Cleanup: Remove the preload links when the component unmounts.
    return () => {
      [...baseImages, ...responsiveImages].forEach(url => {
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
