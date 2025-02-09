import { Divider, Stack, Text } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';
import { getLanguageCode } from '~/utils';
import { Route } from './+types/privacy-policy';
import { getPrivacyPolicy } from '~/server/api';
import { useLoaderData } from 'react-router';

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
          <Text>
            <div
              className="dangerouslySetInnerHTML"
              dangerouslySetInnerHTML={{ __html: pp.content }}
            />
          </Text>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default PrivacyPolicy;
