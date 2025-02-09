import { Route } from './+types/login-via-providers';
import { redirect } from 'react-router';
import {
  buildLocalizedLink,
  generateUuidv4,
  getCookie,
  getValidLanguageOrRedirect
} from '~/utils';
import { directus } from '~/server/directus';
import { refresh } from '@directus/sdk';
import { redisClient } from '~/entry.server';
import { createUserSession } from '~/auth/session.server';
import { PARAMS, PATHS } from '~/constant';

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  const result = getValidLanguageOrRedirect({ params, request });

  if (result instanceof Response) {
    return result;
  }

  const currentLanguage = result;

  const failureReason = url.searchParams.get(PARAMS.reason);
  const fromPage = url.searchParams.get(PARAMS.from);

  const baseUrl = process.env.APP_URL;
  if (!baseUrl) {
    throw new Error('APP_URL is not defined in environment variables.');
  }

  // Determine correct redirect path
  const redirectTo = buildLocalizedLink({
    baseUrl,
    currentLanguage,
    paths: [fromPage === 'login' ? PATHS.login : PATHS.register]
  });

  try {
    if (failureReason) {
      const redirectUrl = new URL(redirectTo);
      if (failureReason.includes('INVALID_CREDENTIALS')) {
        redirectUrl.searchParams.set(PARAMS.error, 'providerLoginFailed');
      } else if (failureReason.includes('INVALID_PROVIDER')) {
        redirectUrl.searchParams.set(PARAMS.error, 'invalidProvider');
      }
      return redirect(redirectUrl.toString());
    }

    const refreshToken = getCookie(request, 'directus_refresh_token');

    const authResults = await directus.request(refresh('json', refreshToken));

    const { access_token, refresh_token } = authResults;

    const sessionId = generateUuidv4();

    await redisClient.saveToken(sessionId, {
      token: access_token!,
      refreshToken: refresh_token!
    });

    return createUserSession({
      request,
      userSessionId: sessionId,
      remember: true,
      redirectTo:
        url.searchParams.get(PARAMS.redirectTo) ??
        buildLocalizedLink({
          baseUrl,
          currentLanguage,
          queryParams: {
            'force-validate': 'global'
          }
        })
    });
  } catch (error) {
    console.error('Login Error:', error);

    const redirectUrl = new URL(redirectTo);
    redirectUrl.searchParams.set(PARAMS.error, 'providerLoginFailed');

    return redirect(redirectUrl.toString());
  }
};
