import { Box, Text, Title } from '@mantine/core';
import { Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';

const Logo = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const TEXT_ALIGN = { base: 'center', md: 'left' } as any;

  return (
    <Box
      component={Link}
      to={`/${currentLanguage}`}
      style={{ textDecoration: 'none' }}
    >
      <Title c="black" ta={TEXT_ALIGN}>
        UNTHAA
      </Title>
      <Text c="black" ta={TEXT_ALIGN}>
        {t('header.slogan')}
      </Text>
    </Box>
  );
};

export default Logo;
