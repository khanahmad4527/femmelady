import { Box,Text, Title } from '@mantine/core';
import { Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';

const Logo = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  return (
    <Box
      component={Link}
      to={`/${currentLanguage}`}
      style={{ textDecoration: 'none' }}
    >
      <Title c="black">UNTHAA</Title>
      <Text c="black">{t('header.slogan')}</Text>
    </Box>
  );
};

export default Logo;
