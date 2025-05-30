import { href, redirect } from 'react-router';

import { logout } from '~/auth/auth.server';
import {
  destroySession,
  getSession,
  USER_SESSION_KEY
} from '~/auth/session.server';
import { PARAMS } from '~/constant';
import { redisClient } from '~/server';
import { buildLocalizedLink, getValidLanguageOrRedirect } from '~/utils';

import { Route } from './+types/logout';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const result = getValidLanguageOrRedirect({ params, request });

  if (result instanceof Response) {
    return result;
  }

  const currentLanguage = result;

  const url = new URL(request.url);

  const redirectTo =
    url.searchParams.get(PARAMS.redirectTo) ??
    buildLocalizedLink({
      url: href('/:lang?', { lang: currentLanguage }),
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
