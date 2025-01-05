import {
  ActionIcon,
  Box,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon
} from '@mantine/core';
import { Link } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconMinus, IconPlus, IconX } from '~/icons';
import { Product } from '~/types';
import { buildLocalizedLink, formatCurrency, getImageUrl } from '~/utils';

const HeaderCartCard = () => {
  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const p: Product = {};
  return (
    <>
      {/* <Grid>
        <Grid.Col span={4}>
          <Box
            component={Link}
            to={buildLocalizedLink({
              currentLanguage,
              paths: ['products', p.id]
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
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Text>{p.name}</Text>
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
        </Grid.Col>
        <Grid.Col span={2}>
          <ActionIcon color="black">
            <IconX color="black" />
          </ActionIcon>
        </Grid.Col>
      </Grid> */}

      <Divider size="sm" my="md" color="black" />
    </>
  );
};

export default HeaderCartCard;
