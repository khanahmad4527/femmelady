import { Divider, Group, Rating, Stack, Text } from '@mantine/core';

import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { Review, ReviewTranslation, User } from '~/types';
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
          <Stack w={{ base: '100%', md: '60%' }} visibleFrom="md">
            <Group gap={10}>
              <Rating value={review?.rating!} color="black" readOnly />
              <Text fw={500}>{translation?.title}</Text>
            </Group>
            <Text>{translation?.description}</Text>
          </Stack>

          <Text ta={'right'} w={'30%'}>
            {formatDate({ currentLanguage, isoDate: review?.date_created! })}
          </Text>
        </Group>

        {/* For mobile display */}
        <Stack hiddenFrom="md">
          <Group gap={10}>
            <Rating value={review?.rating!} color="black" readOnly />
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
