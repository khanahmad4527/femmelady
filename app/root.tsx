import '~/styles/style.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';

import {
  Affix,
  Button,
  ColorSchemeScript,
  MantineProvider,
  Transition
} from '@mantine/core';
import type { LinksFunction, ShouldRevalidateFunction } from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSearchParams
} from 'react-router';

import Document from './components/Document';
import useCurrentLanguage from './hooks/useCurrentLanguage';
import { theme } from './theme';
import { OutletContext, TranslationKeys } from './types';
import { Route } from './+types/root';
import { getExchangeRate } from './server/api';
import { getUserLocale, shouldRevalidateLogic } from './utils';
import useSyncForceRevalidate from './hooks/useSyncForceRevalidate';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from './icons';
import useTranslation from './hooks/useTranslation';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { useEffect } from 'react';
import { isAuthenticated } from './auth/auth.server';
import { Notifications } from '@mantine/notifications';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  nextUrl,
  currentUrl
}) => {
  // Use shared logic
  const commonResult = shouldRevalidateLogic(nextUrl, currentUrl);

  if (commonResult) {
    return true; // If shared logic already decided to revalidate, no need to check further
  }

  return false;
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { isLoggedIn, user } = await isAuthenticated(request);

  const currentLanguage = params?.lang as TranslationKeys;
  if (!currentLanguage) {
    return redirect('/en');
  }

  const locale = getUserLocale(currentLanguage);

  const exchangeRate = await getExchangeRate(currentLanguage);

  const env = { DIRECTUS_URL: process.env?.DIRECTUS_URL };

  return { isLoggedIn, user, locale, currentLanguage, env, exchangeRate };
};

export const links: LinksFunction = () => {
  return [
    { rel: 'icon', href: '/favicon.svg' } // Point to your favicon
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { currentLanguage } = useCurrentLanguage();

  return (
    <html lang={currentLanguage}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const loaderData = useLoaderData();
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const t = useTranslation();
  const [scroll, scrollTo] = useWindowScroll();

  // This is used to remove force revalidate param from the url
  useSyncForceRevalidate({ searchParams, setSearchParams });

  const ctx: OutletContext = { searchParams, setSearchParams, ...loaderData };

  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (navigation.state === 'idle') {
      nprogress.complete();
    }
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else nprogress.start();
  }, [navigation.state]);

  return (
    <Document {...ctx}>
      <Notifications />
      <NavigationProgress color="primary.3" />
      <Outlet context={ctx} />

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <Button
              leftSection={<IconArrowUp />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              {t('common.scrollToTop')}
            </Button>
          )}
        </Transition>
      </Affix>
    </Document>
  );
}

const isProduction = process.env.NODE_ENV === 'production';

const ErrorBoundaryComponent = () => {
  const { currentLanguage } = useCurrentLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const locale = getUserLocale(currentLanguage);

  const ctx: OutletContext = {
    currentLanguage,
    env: {},
    isLoggedIn: false,
    searchParams,
    setSearchParams,
    exchangeRate: 1,
    locale
  };
  return (
    <Document {...ctx}>
      <p>Oops! Something went wrong on our end</p>
    </Document>
  );
};

// ErrorBoundary only in production
export const ErrorBoundary = isProduction && ErrorBoundaryComponent;
