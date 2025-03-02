import { Divider, Stack, Text, TypographyStylesProvider } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';
import { useLoaderData } from 'react-router';

import { getTermsOfServices } from '~/server/api';
import { getLanguageCode } from '~/utils';

import { Route } from './+types/terms-of-service';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const termsOfServices = await getTermsOfServices({ languageCode });

  return { termsOfServices };
};

const TermsOfService = () => {
  const { termsOfServices } = useLoaderData<typeof loader>();

  return (
    <Stack>
      {termsOfServices.map((ts, i) => (
        <Fragment key={i}>
          <Text fw={500}>{ts.title}</Text>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: ts.content }} />
          </TypographyStylesProvider>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default TermsOfService;
