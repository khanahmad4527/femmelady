import {
  destroySession,
  getSession,
  USER_SESSION_KEY
} from '~/auth/session.server';
import { Route } from './+types/logout';
import { redisClient } from '~/entry.server';
import { redirect } from 'react-router';
import { logout } from '~/auth/auth.server';
import { getLang } from '~/utils';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const lang = getLang(params);
  const redirectTo = `/${lang}?force-validate=global`;
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
