import { Box, Text, Title } from '@mantine/core';
import { href, Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';

const Logo = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const TEXT_ALIGN = { base: 'auto', md: 'inherit' } as any;

  return (
    <Box
      component={Link}
      to={href('/:lang?', { lang: currentLanguage })}
      prefetch="intent"
      style={{ textDecoration: 'none' }}
    >
      <Title w={'fit-content'} c="white" m={TEXT_ALIGN}>
        FemmeLady
      </Title>
      <Text c="white" ta={TEXT_ALIGN}>
        {t('header.slogan')}
      </Text>
    </Box>
  );
};

export default Logo;
