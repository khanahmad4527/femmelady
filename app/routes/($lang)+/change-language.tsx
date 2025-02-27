import { isAuthenticated } from '~/auth/auth.server';
import { Route } from './+types/change-language';
import { directus } from '~/server/directus';
import { updateMe, withToken } from '@directus/sdk';

import {
  AVAILABLE_LANGUAGES,
  LANGUAGE_TO_LOCALE_LANGUAGE,
  LOCALE_TO_LANGUAGE
} from '~/constant';

export const action = async ({ params, request }: Route.ActionArgs) => {
  const { isLoggedIn, user, token } = await isAuthenticated(request);
  const requestedLang = params.lang;

  // Validate requested language
  if (!requestedLang || !AVAILABLE_LANGUAGES.includes(requestedLang)) {
    return Response.json({ error: 'Invalid language' }, { status: 400 });
  }

  const currentLang = user?.language
    ? LOCALE_TO_LANGUAGE[user.language]
    : undefined;

  // If the user is logged in and their language needs updating
  if (isLoggedIn && requestedLang !== currentLang) {
    await directus.request(
      withToken(
        token!,
        updateMe({ language: LANGUAGE_TO_LOCALE_LANGUAGE[requestedLang] })
      )
    );
  }

  return Response.json(null, { status: 200 }); // No Content (successful, no response body)
};
