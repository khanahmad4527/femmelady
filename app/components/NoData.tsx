import { Box, Button, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { href , Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconDatabaseExclamation } from '~/icons';

const NoData = ({ button }: { button?: ReactNode }) => {
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();

  return (
    <Stack align={'center'} gap={0}>
      <Box ta={'center'} w={{ base: 100, md: 200 }}>
        <IconDatabaseExclamation size={'100%'} />
      </Box>
      <Text ta={'center'} fz={{ base: 25, md: 50 }} fw={500} c={'primary'}>
        {t('common.noDataFoundTitle')}
      </Text>
      <Text ta={'center'} fz={{ base: 12, md: 25 }} c={'primary'}>
        {t('common.noDataFoundMessage')}
      </Text>
      {button ? (
        button
      ) : (
        <Button
          mt={'md'}
          component={Link}
          prefetch="intent"
          to={href('/:lang?', { lang: currentLanguage })}
        >
          {t('common.goToHome')}
        </Button>
      )}
    </Stack>
  );
};

export default NoData;
