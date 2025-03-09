import { useMediaQuery } from '@mantine/hooks';

const useTurnstileSize = () => {
  const isCompact = useMediaQuery('(max-width: 22em)');
  const turnstileSize = isCompact ? 'compact' : 'normal';

  return turnstileSize;
};

export default useTurnstileSize;
