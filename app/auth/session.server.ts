import { createCookieSessionStorage, redirect } from 'react-router';

const { SESSION_SECRET, NODE_ENV, APP_DOMAIN, APP_URL } = process.env;

const isSecureConnection = new URL(APP_URL!).protocol === 'https:';

export const USER_SESSION_KEY = 'userSessionId';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'unthaa',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [SESSION_SECRET!],
    secure: NODE_ENV === 'production' && isSecureConnection,
    domain: process.env.NODE_ENV === 'production' ? APP_DOMAIN : 'localhost'
  }
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export const createUserSession = async ({
  request,
  userSessionId,
  redirectTo,
  remember
}: {
  request: Request;
  userSessionId: string;
  remember: boolean;
  redirectTo: string;
}) => {
  try {
    const cookie = request.headers.get('Cookie');
    const session = await getSession(cookie);
    session.set(USER_SESSION_KEY, userSessionId);
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await commitSession(session, {
          maxAge: remember
            ? 60 * 60 * 24 * 7 // 7 days
            : undefined
        })
      }
    });
  } catch (error) {
    console.log(error);
    throw new Response('Something went wrong', { status: 500 });
  }
};

export const getUserSessionKey = async (request: Request) => {
  const cookie = request.headers.get('Cookie');
  const session = await getSession(cookie);
  return session.get(USER_SESSION_KEY);
};
