import { envSchema } from '~/schema';

/**
 * This function only export env variables that are going to be use on client side
 * @returns an object
 */
export const getPublicEnv = (env: Record<string, string>) => {
  const {
    DIRECTUS_URL,
    APP_URL,
    NODE_ENV,
    CDN_URL,
    TURNSTILE_SITE_KEY: _TURNSTILE_SITE_KEY
  } = getEnv(env);

  // In development mode we use test key provided by cloudflare,
  // to avoid turnstile failure
  const TURNSTILE_SITE_KEY =
    NODE_ENV === 'development'
      ? '1x00000000000000000000AA'
      : _TURNSTILE_SITE_KEY;

  return {
    DIRECTUS_URL,
    APP_URL,
    TURNSTILE_SITE_KEY,
    CDN_URL
  };
};

export function getEnv(env: NodeJS.ProcessEnv) {
  console.log('env', env);
  return env;
  const result = envSchema.parse(env);

  return result; // Return validated env variables
}
