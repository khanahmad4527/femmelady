import { Box, Text, Title } from '@mantine/core';
import { Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { buildLocalizedLink } from '~/utils';

const Logo = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const { env } = useHeaderFooterContext();
  const TEXT_ALIGN = { base: 'auto', md: 'inherit' } as any;

  return (
    <Box
      component={Link}
      to={buildLocalizedLink({ baseUrl: env?.APP_URL!, currentLanguage })}
      style={{ textDecoration: 'none' }}
    >
      <Title w={'fit-content'} c="white" m={TEXT_ALIGN}>
        UNTHAA
      </Title>
      <Text c="white" ta={TEXT_ALIGN}>
        {t('header.slogan')}
      </Text>
    </Box>
  );
};

export default Logo;
