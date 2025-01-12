import { Box, Button, Stack, Text } from '@mantine/core';
import { Link } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import useUserLocale from '~/hooks/useUserLocale';
import { IconDatabaseExclamation } from '~/icons';
import { buildLocalizedLink } from '~/utils';

const NoData = () => {
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();

  return (
    <Stack align={'center'} gap={0}>
      <Box ta={'center'} w={{ base: 100, md: 200 }}>
        <IconDatabaseExclamation size={'100%'} />
      </Box>
      <Text ta={'center'} fz={{ base: 50, md: 100 }} fw={500} c={'primary'}>
        {t('common.noDataFoundTitle')}
      </Text>
      <Text ta={'center'} fz={{ base: 25, md: 50 }} c={'primary'}>
        {t('common.noDataFoundMessage')}
      </Text>
      <Button
        mt={'md'}
        component={Link}
        to={buildLocalizedLink({ currentLanguage, paths: [''] })}
      >
        {t('common.goToHome')}
      </Button>
    </Stack>
  );
};

export default NoData;
