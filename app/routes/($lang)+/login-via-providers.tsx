import { Route } from './+types/login-via-providers';
import { redirect } from 'react-router';
import {
  buildLocalizedLink,
  generateUuidv4,
  getCookie,
  getCurrentLanguage
} from '~/utils';
import { directus } from '~/server/directus';
import { refresh } from '@directus/sdk';
import { redisClient } from '~/entry.server';
import { createUserSession } from '~/auth/session.server';

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const currentLanguage = getCurrentLanguage(params);
  const failureReason = url.searchParams.get('reason'); // This comes from Directus
  const fromPage = url.searchParams.get('from'); // We send from login and register page, to redirect user to same page they come from
  const redirectTo =
    fromPage === 'login'
      ? buildLocalizedLink({
          currentLanguage,
          paths: ['login']
        })
      : buildLocalizedLink({
          currentLanguage,
          paths: ['register']
        });
  try {
    if (failureReason && failureReason.includes('INVALID_CREDENTIALS')) {
      return redirect(`${redirectTo}?error=providerLoginFailed`);
    }
    if (failureReason && failureReason.includes('INVALID_PROVIDER')) {
      return redirect(`${redirectTo}?error=invalidProvider`);
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
      redirectTo: buildLocalizedLink({
        currentLanguage,
        paths: ['?force-validate=global']
      })
    });
  } catch (error) {
    console.log(error);
    return redirect(`${redirectTo}?error=providerLoginFailed`);
  }
};
