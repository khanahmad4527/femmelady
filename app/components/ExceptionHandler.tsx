import { Button, Stack, Text } from '@mantine/core';
import { href, Link } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { formatNumber } from '~/utils';

export const ExceptionHandler = ({ status }: { status: number }) => {
  const { currentLanguage, userLocale } = useCurrentLanguage();
  const t = useTranslation();

  const getErrorDetails = () => {
    switch (status) {
      case 404:
        return {
          title: t('exceptionHandler.productNotFound.title'),
          description: t('exceptionHandler.productNotFound.description'),
          number: 404
        };

      default:
        return {
          title: t('exceptionHandler.internalServerError.title'),
          description: t('exceptionHandler.internalServerError.description'),
          number: 500
        };
    }
  };

  const { title, number, description } = getErrorDetails();

  return (
    <Stack align={'center'} gap={0}>
      <Text c={'primary'} fz={100}>
        {' '}
        {formatNumber({ userLocale, value: number })}
      </Text>
      <Text ta={'center'} fz={{ base: 25, md: 50 }} fw={500} c={'primary'}>
        {title}
      </Text>
      <Text ta={'center'} fz={{ base: 12, md: 25 }} c={'primary'}>
        {description}
      </Text>
      <Button
        mt={'md'}
        component={Link}
        prefetch="intent"
        to={href('/:lang?', {
          lang: currentLanguage
        })}
      >
        {t('common.goToHome')}
      </Button>
    </Stack>
  );
};
