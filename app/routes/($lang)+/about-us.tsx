import { Divider, Stack, Text, TypographyStylesProvider } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';
import { getAboutUs } from '~/server/api';
import { getLanguageCode } from '~/utils';
import { Route } from './+types/about-us';
import { useLoaderData } from 'react-router';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const aboutUs = await getAboutUs({ languageCode });

  return { aboutUs };
};

const AboutUs = () => {
  const { aboutUs } = useLoaderData<typeof loader>();

  return (
    <Stack>
      {aboutUs.map((a, i) => (
        <Fragment key={i}>
          <Text fw={500}>{a.title}</Text>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: a.content }} />
          </TypographyStylesProvider>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default AboutUs;
