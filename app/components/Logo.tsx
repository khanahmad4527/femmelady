import { Text, Title, Box } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';

const Logo = () => {
  const t = useTranslation();
  return (
    <Box>
      <Title c="primary.1">UNTHAA</Title>
      <Text c="primary.1">{t('header.slogan')}</Text>
    </Box>
  );
};

export default Logo;
