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
import { PRODUCTS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconMinus, IconPlus, IconX } from '~/icons';
import { buildLocalizedLink, formatCurrency } from '~/utils';

const HeaderCartCard = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const p = PRODUCTS[1];
  return (
    <>
      <Grid>
        <Grid.Col span={4}>
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
              src={p.image}
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
              <ActionIcon>
                <IconMinus color={'white'} />
              </ActionIcon>
              <ThemeIcon>10</ThemeIcon>
              <ActionIcon>
                <IconPlus color={'white'} />
              </ActionIcon>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={2}>
          <ActionIcon>
            <IconX />
          </ActionIcon>
        </Grid.Col>
      </Grid>

      <Divider size="sm" my="md" color="black" />
    </>
  );
};

export default HeaderCartCard;
