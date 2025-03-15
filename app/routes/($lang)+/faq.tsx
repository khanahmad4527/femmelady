import {
  Accordion,
  Button,
  Grid,
  Stack,
  Text,
  TypographyStylesProvider
} from '@mantine/core';
import { useLoaderData, useOutletContext } from 'react-router';

import { PARAMS } from '~/constant';
import useTranslation from '~/hooks/useTranslation';
import { getFaqs } from '~/server/api';
import { Faqs, OutletContext } from '~/types';
import { getLanguageCode } from '~/utils';

import { Route } from './+types/faq';

export const shouldRevalidate = () => {
  return false;
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const faqs = await getFaqs({ languageCode });

  return { faqs };
};

const Faq = () => {
  const { faqs } = useLoaderData<typeof loader>();

  const t = useTranslation();
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const currentIndex = Number(searchParams.get(PARAMS.faq) ?? 1) - 1;

  const currentFaq = faqs.at(currentIndex) || faqs[0];

  const faqAccordionTitle = currentFaq.title;
  const faqAccordionFaq = currentFaq.faqs as Faqs['faqs'];

  const items = faqAccordionFaq.map(item => (
    <Accordion.Item key={item.question} value={item.question}>
      <Accordion.Control pl={'md'}>{item.question}</Accordion.Control>
      <Accordion.Panel pl={'md'}>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: item.answer }} />
        </TypographyStylesProvider>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Text fw={500} mb={{ base: 'md', md: 'xl' }} fz={'xl'}>
          {t('common.categories')}
        </Text>
        <Stack>
          {faqs.map((f, i) => (
            <Button
              key={f.title}
              color={currentIndex === i ? 'black' : ''}
              onClick={() => {
                searchParams.set(PARAMS.faq, String(++i));
                setSearchParams(searchParams, {
                  preventScrollReset: true
                });
              }}
            >
              {f.title}
            </Button>
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Text fw={500} mb={{ base: 'md', md: 'xl' }} fz={'xl'}>
          {faqAccordionTitle}
        </Text>
        <Accordion>{items}</Accordion>
      </Grid.Col>
    </Grid>
  );
};

export default Faq;
