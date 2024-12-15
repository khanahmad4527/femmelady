import { Divider, Group, Rating, Stack, Text } from '@mantine/core';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { formatDate } from '~/utils';

const ProductReviewCard = () => {
  const { currentLanguage } = useCurrentLanguage();
  return (
    <>
      <Stack>
        <Group
          gap={'md'}
          justify={'space-between'}
          wrap={'nowrap'}
          align={'flex-start'}
        >
          <Text fw={500} w={{ base: '70%', md: '20%' }} truncate>
            Ahmad Khan
          </Text>

          <Stack
            w={{ base: '100%', md: '60%' }}
            display={{ base: 'none', md: 'flex' }}
          >
            <Group gap={10}>
              <Rating defaultValue={2} color="black" readOnly />
              <Text fw={500}>Lorem ipsum consectetur.</Text>
            </Group>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,
              unde. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Sequi, unde. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Sequi, unde.
            </Text>
          </Stack>

          <Text ta={'right'} w={'30%'}>
            {formatDate({ currentLanguage, isoDate: '2024-12-14T15:30:00Z' })}
          </Text>
        </Group>

        <Stack display={{ base: 'flex', md: 'none' }}>
          <Group gap={10}>
            <Rating defaultValue={2} color="black" readOnly />
            <Text fw={500}>Lorem ipsum consectetur.</Text>
          </Group>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,
            unde. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Sequi, unde. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Sequi, unde.
          </Text>
        </Stack>
      </Stack>

      <Divider size="sm" my="md" color="black" />
    </>
  );
};

export default ProductReviewCard;
