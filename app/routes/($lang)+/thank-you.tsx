import { Container, Title, Text, Button, Space } from '@mantine/core';
import { href, Link, useOutletContext } from 'react-router';
import useTranslation from '~/hooks/useTranslation';
import { OutletContext } from '~/types';

const ThankYouPage = () => {
  const { currentLanguage } = useOutletContext<OutletContext>();
  const t = useTranslation();

  return (
    <Container
      size="sm"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Title order={2}>{t('cart.thankYouTitle')}</Title>
      <Space h="md" />
      <Text size="lg" c="dimmed">
        {t('cart.thankYouMessage')}
      </Text>
      <Space h="xl" />
      <Button
        mt={'md'}
        component={Link}
        prefetch="intent"
        to={href('/:lang?', { lang: currentLanguage })}
      >
        {t('common.cartEmptyMessage')}
      </Button>
    </Container>
  );
};

export default ThankYouPage;
