import { Divider, Stack, Text } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';
import { getAboutUs } from '~/server/api';
import { getLanguageCode } from '~/utils';
import { Route } from './+types/about-us';
import { useLoaderData } from 'react-router';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { ExtendedAboutUsTranslation } from '~/types/types';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const aboutUsContent = await getAboutUs({ languageCode });

  return { aboutUsContent };
};

const AboutUs = () => {
  const { aboutUsContent } = useLoaderData<typeof loader>();

  const extendedAboutUsTranslation: ExtendedAboutUsTranslation =
    getFirstObjectDto(aboutUsContent?.translations);

  const aboutUs = extendedAboutUsTranslation.content;

  return (
    <Stack>
      {aboutUs.map((a, i) => (
        <Fragment key={i}>
          <Text fw={500}>{a.title}</Text>
          <Text>
            <div
              className="dangerouslySetInnerHTML"
              dangerouslySetInnerHTML={{ __html: a.content }}
            />
          </Text>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default AboutUs;
