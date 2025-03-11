import { passwordRequest } from '@directus/sdk';
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Paper,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { ActionFunction, href, Link } from 'react-router';
import CFTurnstile from '~/components/CFTurnstile';
import FetcherError from '~/components/error/FetcherError';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { useForm } from '~/hooks/useForm';
import useTranslation from '~/hooks/useTranslation';
import { IconArrowLeft } from '~/icons';
import { forgotPasswordFormSchema } from '~/schema';
import { getUserIp, redisClient } from '~/server';
import { directus } from '~/server/directus';
import { getEnv } from '~/server/env';
import { validateTurnstile } from '~/server/turnstile';
import { buildLocalizedLink, getValidLanguageOrRedirect } from '~/utils';
import { handleActionError, throwResetPasswordLimitError } from '~/utils/error';

export const action: ActionFunction = async ({ request, params }) => {
  try {
    const result = getValidLanguageOrRedirect({ params, request });

    if (result instanceof Response) {
      return result;
    }

    const currentLanguage = result;

    const formData = await request.formData();

    const data = Object.fromEntries(formData);

    const validatedData = forgotPasswordFormSchema.parse(data);

    const outcome = await validateTurnstile({
      request,
      token: validatedData['cf-turnstile-response']
    });

    if (!outcome.success) {
      return {
        title: 'turnstile.errorTitle',
        description: 'turnstile.errorDescription'
      };
    }

    const email = validatedData.email;

    const ip = getUserIp(request);

    // Check rate limit before sending the reset password email
    const { allowed } = await redisClient.checkRateLimit(
      'reset-password',
      email,
      ip!
    );

    if (!allowed) {
      return throwResetPasswordLimitError();
    }

    const env = getEnv(process.env);

    await directus.request(
      passwordRequest(
        validatedData.email,
        buildLocalizedLink({
          origin: env.APP_URL,
          url: href('/:lang?/reset-password', {
            lang: currentLanguage
          })
        })
      )
    );

    return { title: 'RESET_PASSWORD_EMAIL_SENT' };
  } catch (error) {
    console.log(error);
    return handleActionError({ error });
  }
};

const forgotPassword = () => {
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();

  const { Form, form, state, fetcher, handleSubmit } = useForm<{
    title: string;
    description: string;
  }>({
    schema: forgotPasswordFormSchema,
    initialValues: {
      email: '',
      'cf-turnstile-response': ''
    }
  });

  return (
    <Container size={460} my={30}>
      <Title fz={26} ta="center">
        {t('resetPassword.forgotPasswordQuestion')}
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        {t('resetPassword.enterEmailForReset')}
      </Text>

      <Paper withBorder shadow="md" p={30} radius={0} mt="xl">
        <Form method="POST" onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              withAsterisk
              label={t('authForm.email')}
              name="email"
              placeholder="jhon@email.com"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />

            <Flex
              justify="space-between"
              align={{ base: 'unset', xs: 'end' }}
              direction={{ base: 'column-reverse', xs: 'row' }}
              gap={'md'}
            >
              <Anchor
                component={Link}
                to={href('/:lang?/login', { lang: currentLanguage })}
                c="dimmed"
                size="sm"
              >
                <Center inline>
                  <IconArrowLeft
                    size={12}
                    color="var(--mantine-color-dimmed)"
                  />
                  <Box ml={5}>{t('resetPassword.backToLogin')}</Box>
                </Center>
              </Anchor>
              <Button type="submit" loading={state !== 'idle'}>
                {t('resetPassword.resetPassword')}
              </Button>
            </Flex>

            <CFTurnstile fetcher={fetcher} form={form} state={state} />
          </Stack>
        </Form>

        <Box mt="md">
          <FetcherError fetcher={fetcher} />

          {fetcher.data?.title === 'RESET_PASSWORD_EMAIL_SENT' && (
            <Alert
              variant="light"
              color="green"
              title={t('resetPassword.resetPasswordEmailSentTitle')}
            >
              {t('resetPassword.resetPasswordEmailSentDescription')}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default forgotPassword;
