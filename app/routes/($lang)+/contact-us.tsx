import { Divider, Stack, Text } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';
import { getContactUs } from '~/server/api';
import { getLanguageCode } from '~/utils';
import { Route } from './+types/contact-us';
import { useLoaderData } from 'react-router';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const contactUs = await getContactUs({ languageCode });

  return { contactUs };
};

const ContactUs = () => {
  const { contactUs } = useLoaderData<typeof loader>();

  return (
    <Stack>
      {contactUs.map((c, i) => (
        <Fragment key={i}>
          <Text fw={500}>{c.title}</Text>
          <Text>
            <div
              className="dangerouslySetInnerHTML"
              dangerouslySetInnerHTML={{ __html: c.content }}
            />
          </Text>
          <Divider size="sm" my="md" />
        </Fragment>
      ))}
    </Stack>
  );
};

export default ContactUs;
