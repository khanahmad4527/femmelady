import { Divider, Stack, Text, TypographyStylesProvider } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';
import { useLoaderData } from 'react-router';

import { getPrivacyPolicy } from '~/server/api';
import { getLanguageCode } from '~/utils';

import { Route } from './+types/privacy-policy';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const privacyPolicies = await getPrivacyPolicy({ languageCode });

  return { privacyPolicies };
};

const PrivacyPolicy = () => {
  const { privacyPolicies } = useLoaderData<typeof loader>();

  return (
    <Stack>
      {privacyPolicies.map((pp, i) => (
        <Fragment key={i}>
          <Text fw={500}>{pp.title}</Text>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: pp.content }} />
          </TypographyStylesProvider>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default PrivacyPolicy;
