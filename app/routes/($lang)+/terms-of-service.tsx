import { Divider, Stack, Text } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';
import { getLanguageCode } from '~/utils';
import { Route } from './+types/terms-of-service';
import { getTermsOfServices } from '~/server/api';
import { useLoaderData } from 'react-router';

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
          <Text>
            <div
              className="dangerouslySetInnerHTML"
              dangerouslySetInnerHTML={{ __html: ts.content }}
            />
          </Text>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default TermsOfService;
