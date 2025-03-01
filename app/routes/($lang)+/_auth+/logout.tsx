import {
  destroySession,
  getSession,
  USER_SESSION_KEY
} from '~/auth/session.server';
import { Route } from './+types/logout';
import { redirect } from 'react-router';
import { logout } from '~/auth/auth.server';
import { buildLocalizedLink, getValidLanguageOrRedirect } from '~/utils';
import { PARAMS } from '~/constant';
import { redisClient } from '~/server';
import { getEnv } from '~/server/env';

export const loader = async ({
  request,
  params,
  context
}: Route.LoaderArgs) => {
  const result = getValidLanguageOrRedirect({ params, request });

  if (result instanceof Response) {
    return result;
  }

  const currentLanguage = result;

  const url = new URL(request.url);

  const redirectTo =
    url.searchParams.get(PARAMS.redirectTo) ??
    buildLocalizedLink({
      baseUrl: getEnv((context.cloudflare as any)?.env).APP_URL,
      currentLanguage,
      queryParams: {
        'force-validate': 'global'
      }
    });

  try {
    const cookie = request.headers.get('Cookie');
    const session = await getSession(cookie);
    const key = session.get(USER_SESSION_KEY);
    const { refreshToken } = await redisClient.getToken(key);
    await logout(refreshToken);

    await redisClient.deleteToken(key);
    await destroySession(session);

    return redirect(redirectTo);
  } catch (e) {
    console.log(e);
    return redirect(redirectTo);
  }
};
