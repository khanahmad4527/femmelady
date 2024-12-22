import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import { Link } from 'react-router';
import { PRODUCTS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconMinus, IconPlus, IconX } from '~/icons';
import { buildLocalizedLink, formatCurrency, getImageUrl } from '~/utils';

const CheckoutCartCard = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const p = PRODUCTS[1];
  return (
    <Card
      pos={'relative'}
      component={Stack}
      shadow={'sm'}
      padding={'md'}
      withBorder
    >
      <Box
        component={Link}
        to={buildLocalizedLink({
          currentLanguage,
          primaryPath: 'products',
          secondaryPath: '123'
        })}
      >
        <Image
          h={'100%'}
          fit={'contain'}
          src={getImageUrl({ id: p.image })}
          alt={p.name}
          loading={'lazy'}
        />
      </Box>

      <Stack>
        <Text fw={500}>{p.name}</Text>
        <Text>{p.colors[0].name}</Text>
        <Text>{formatCurrency({ currentLanguage, value: 1234.56 })}</Text>
        <Group>
          <ActionIcon color="black">
            <IconMinus color={'white'} />
          </ActionIcon>
          <ThemeIcon color="black">10</ThemeIcon>
          <ActionIcon color="black">
            <IconPlus color={'white'} />
          </ActionIcon>
        </Group>
      </Stack>

      <ActionIcon color="black" pos={'absolute'} mx={'md'} right={0}>
        <IconX color="black" />
      </ActionIcon>
    </Card>
  );
};

export default CheckoutCartCard;
