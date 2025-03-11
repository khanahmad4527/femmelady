import { Alert, Anchor, Box, Button, Group, Paper, Stack } from '@mantine/core';
import { href } from 'react-router';
import { Link } from 'react-router';
import PasswordComponent from '~/components/PasswordComponent';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { useForm } from '~/hooks/useForm';
import useTranslation from '~/hooks/useTranslation';
import { resetPasswordFormSchema } from '~/schema';
import { Route } from './+types/reset-password';
import { directus } from '~/server/directus';
import { passwordReset } from '@directus/sdk';
import { invalidTokenError } from '~/utils/error';
import { getValidLanguageOrRedirect } from '~/utils';
import { validateTurnstile } from '~/server/turnstile';
import FetcherError from '~/components/error/FetcherError';
import CFTurnstile from '~/components/CFTurnstile';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return invalidTokenError();
  }

  return {};
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return invalidTokenError();
  }

  const result = getValidLanguageOrRedirect({ params, request });

  if (result instanceof Response) {
    return result;
  }

  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const validatedData = resetPasswordFormSchema.parse(data);

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

  await directus.request(passwordReset(token, validatedData.password));

  return { title: 'PASSWORD_RESET_SUCCESSFUL' };
};

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const t = useTranslation();

  const code = (error as any)?.data;

  switch (code) {
    case 'INVALID_TOKEN':
      return (
        <Alert
          w="max-content"
          variant="light"
          color="red"
          title={t('register.invalidTokenTitle')}
        >
          {t('register.invalidTokenDescription')}
        </Alert>
      );

    default:
      return (
        <Alert
          w="max-content"
          variant="light"
          color="red"
          title={t('exceptionHandler.internalServerError.title')}
        >
          {t('exceptionHandler.internalServerError.description')}
        </Alert>
      );
  }
};

const resetPassword = () => {
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();

  const { Form, form, state, fetcher, handleSubmit } = useForm<{
    title: string;
    description: string;
  }>({
    schema: resetPasswordFormSchema,
    initialValues: {
      password: '',
      confirm_password: '',
      'cf-turnstile-response': ''
    }
  });

  return (
    <Paper
      component={Stack}
      radius={0}
      p={{ base: 'md', md: 'xl' }}
      w={{ base: '100%', md: '50%' }}
      m={'auto'}
      withBorder
    >
      <Form method="POST" onSubmit={handleSubmit}>
        <Stack>
          <PasswordComponent form={form} />

          <Group justify="space-between">
            <Anchor
              component={Link}
              prefetch="intent"
              to={href('/:lang?/login', { lang: currentLanguage })}
            >
              {t('register.accountLogin')}
            </Anchor>
            <Button type="submit" loading={state !== 'idle'}>
              {t('resetPassword.resetPassword')}
            </Button>
          </Group>

          <CFTurnstile fetcher={fetcher} form={form} state={state} />
        </Stack>
      </Form>

      <Box mt="md">
        <FetcherError fetcher={fetcher} />

        {fetcher.data?.title === 'PASSWORD_RESET_SUCCESSFUL' && (
          <Stack>
            <Alert
              variant="light"
              color="green"
              title={t('resetPassword.resetPasswordSuccessTitle')}
            >
              {t('resetPassword.resetPasswordSuccessDescription')}
            </Alert>

            <Button
              component={Link}
              prefetch="intent"
              to={href('/:lang?/login', { lang: currentLanguage })}
            >
              {t('login.login')}
            </Button>
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default resetPassword;
