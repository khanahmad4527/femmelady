import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text
} from '@mantine/core';
import { Link } from 'react-router';
import { PRODUCTS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconX } from '~/icons';
import { formatCurrency } from '~/utils';

const HeaderCartCard = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const p = PRODUCTS[1];
  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <Box h={100} component={Link} to={`/${currentLanguage}/products/123`}>
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
            <Text>Beige</Text>
            <Text>{formatCurrency({ currentLanguage, value: 1234.56 })}</Text>
            <Group><Button></Button></Group>
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
