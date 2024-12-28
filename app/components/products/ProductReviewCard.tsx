import { Divider, Group, Rating, Stack, Text } from '@mantine/core';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { Review, ReviewTranslation, User } from '~/types/types';
import { formatDate, getSingleTranslation } from '~/utils';

const ProductReviewCard = ({ review }: { review: Review }) => {
  const { currentLanguage } = useCurrentLanguage();

  const user = getFirstObjectDto(review?.user_created) as User;

  const translation = getSingleTranslation(
    review?.translations
  ) as ReviewTranslation;

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
            {user?.first_name} {user?.last_name}
          </Text>

          {/* For desktop display */}
          <Stack
            w={{ base: '100%', md: '60%' }}
            display={{ base: 'none', md: 'flex' }}
          >
            <Group gap={10}>
              <Rating defaultValue={2} color="black" readOnly />
              <Text fw={500}>{translation?.title}</Text>
            </Group>
            <Text>{translation?.description}</Text>
          </Stack>

          <Text ta={'right'} w={'30%'}>
            {formatDate({ currentLanguage, isoDate: '2024-12-14T15:30:00Z' })}
          </Text>
        </Group>

        {/* For mobile display */}
        <Stack display={{ base: 'flex', md: 'none' }}>
          <Group gap={10}>
            <Rating defaultValue={2} color="black" readOnly />
            <Text fw={500}>{translation?.title}</Text>
          </Group>
          <Text>{translation?.description}</Text>
        </Stack>
      </Stack>

      <Divider size="sm" my="md" color="black" />
    </>
  );
};

export default ProductReviewCard;
