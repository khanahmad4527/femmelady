// This function only export env variables which can are going to be use on client side
export const getEnv = () => {
  const { DIRECTUS_URL, APP_URL, NODE_ENV } = process.env;

  // In development mode we use test key provided by cloudflare,
  // to avoid turnstile failure
  const TURNSTILE_SITE_KEY =
    NODE_ENV === 'development'
      ? '1x00000000000000000000AA'
      : process.env?.TURNSTILE_SITE_KEY;

  return {
    DIRECTUS_URL,
    APP_URL,
    TURNSTILE_SITE_KEY
  };
};
