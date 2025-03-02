import { ActionIcon, Group } from '@mantine/core';
import { usePagination } from '@mantine/hooks';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { IconChevronLeft, IconChevronRight, IconDots } from '~/icons';
import { formatNumber } from '~/utils';

const LocalizedPagination = ({
  totalPaginationButtons,
  currentPage,
  handlePagination,
  siblings
}: {
  totalPaginationButtons: number;
  currentPage: number;
  handlePagination: (value: number) => void;
  siblings?: number;
}) => {
  const { userLocale, dir } = useCurrentLanguage();

  const pagination = usePagination({
    total: totalPaginationButtons,
    initialPage: currentPage,
    onChange: handlePagination,
    siblings
  });

  // This is to render correct arrow direction based on language direction
  const leftIcon = dir === 'ltr' ? <IconChevronLeft /> : <IconChevronRight />;
  const rightIcon = dir === 'ltr' ? <IconChevronRight /> : <IconChevronLeft />;

  return (
    <Group m={'auto'}>
      <ActionIcon
        bg={'white'}
        style={{ borderColor: 'var(--mantine-color-gray-4)' }}
        onClick={pagination.previous}
        disabled={pagination.active === 1}
      >
        {leftIcon}
      </ActionIcon>

      {pagination.range.map(r => {
        const isDots = isNaN(r as number);

        return isDots ? (
          <IconDots key={r} />
        ) : (
          <ActionIcon
            key={r}
            bg={r === pagination.active ? 'black' : 'white'}
            c={r === pagination.active ? 'white' : 'black'}
            style={{
              borderColor:
                r !== pagination.active ? 'var(--mantine-color-gray-4)' : ''
            }}
            onClick={() => pagination.setPage(r as number)}
          >
            {formatNumber({ userLocale, value: r as number })}
          </ActionIcon>
        );
      })}

      <ActionIcon
        bg={'white'}
        style={{ borderColor: 'var(--mantine-color-gray-4)' }}
        onClick={pagination.next}
        disabled={pagination.active === totalPaginationButtons}
      >
        {rightIcon}
      </ActionIcon>
    </Group>
  );
};

export default LocalizedPagination;
