import { Accordion, Button, Grid, Stack, Text } from '@mantine/core';
import { useLoaderData, useOutletContext } from 'react-router';
import useTranslation from '~/hooks/useTranslation';
import { Faqs, OutletContext } from '~/types';
import { Route } from './+types/faq';
import { getLanguageCode } from '~/utils';
import { getFaqs } from '~/server/api';
import { PARAMS } from '~/constant';

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
        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
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
