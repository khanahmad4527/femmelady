import {
  customEndpoint,
  login as sdkLogin,
  logout as sdkLogout,
  refresh,
  withToken} from '@directus/sdk';
import { jwtDecode } from 'jwt-decode';

import { redisClient } from '~/server';
import { directus } from '~/server/directus';
import { User } from '~/types';

import { getUserSessionKey } from './session.server';

export const customReadMe = async (token: string) => {
  try {
    const user = (await directus.request(
      withToken(
        token,
        customEndpoint({
          path: '/users/me',
          method: 'GET',
          params: {
            fields: ['*']
          }
        })
      )
    )) as User;
    return user;
  } catch (e) {
    throw e;
  }
};

export const login = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const user = await directus.request(
    sdkLogin(email, password, { mode: 'json' })
  );
  return user;
};

export const logout = async (refresh_token?: string) => {
  await directus.request(sdkLogout(refresh_token, 'json'));
};

export const refreshToken = async (refreshToken: string) => {
  const data = await directus.request(refresh('json', refreshToken));
  return data;
};

export const isTokenExpired = (token: string) => {
  const decodedToken: any = jwtDecode(token);
  const currentTime = Date.now() / 1000; // convert to seconds
  return decodedToken.exp < currentTime;
};

export const isAuthenticated = async (request: Request) => {
  const notLoggedIn = {
    isLoggedIn: false,
    token: undefined,
    user: undefined
  };

  try {
    const key = await getUserSessionKey(request);

    if (!key) return notLoggedIn;

    // Lock the Redis key
    const releaseLock = await redisClient.lockKey(key);

    try {
      let { token, refreshToken: currentRefreshToken } =
        (await redisClient.getToken(key)) || {};

      if (!token) {
        return notLoggedIn;
      }

      const expired = isTokenExpired(token);

      if (expired) {
        const authResponse = await refreshToken(currentRefreshToken);
        token = authResponse.access_token!;
        currentRefreshToken = authResponse.refresh_token!;

        await redisClient.saveToken(key, {
          token,
          refreshToken: currentRefreshToken
        });
      }

      const user = await customReadMe(token);

      if (!user?.email) return notLoggedIn;

      return { user, token, isLoggedIn: true };
    } finally {
      // Release the releaseLock
      await releaseLock();
    }
  } catch (e: any) {
    console.log('Failed to authenticate:', e);
    return notLoggedIn;
  }
};
