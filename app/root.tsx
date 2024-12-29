import '~/styles/style.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import {
  Affix,
  Button,
  ColorSchemeScript,
  MantineProvider,
  Transition
} from '@mantine/core';
import type { LinksFunction } from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSearchParams
} from 'react-router';

import Document from './components/Document';
import useCurrentLanguage from './hooks/useCurrentLanguage';
import { theme } from './theme';
import { OutletContext, TranslationKeys } from './types/types';
import { Route } from './+types/root';
import { getExchangeRate } from './server/api';
import { getUserLocale } from './utils';
import { LOCALE_TO_CURRENCY } from './constant';
import useSyncForceRevalidate from './hooks/useSyncForceRevalidate';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from './icons';
import useTranslation from './hooks/useTranslation';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const currentLanguage = params?.lang as TranslationKeys;
  if (!currentLanguage) {
    return redirect('/en');
  }

  const locale = getUserLocale(currentLanguage);

  const currency = LOCALE_TO_CURRENCY[locale] || 'USD';

  const exchangeRate = await getExchangeRate(currency);

  const env = { DIRECTUS_URL: process.env?.DIRECTUS_URL };

  return { isLoggedIn: true, currentLanguage, env, exchangeRate };
};

export const links: LinksFunction = () => {
  return [
    { rel: 'icon', href: '/favicon.svg' } // Point to your favicon
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const currentLanguage = useCurrentLanguage();

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
  const [searchParams, setSearchParams] = useSearchParams();
  const t = useTranslation();
  const [scroll, scrollTo] = useWindowScroll();

  // This is used to remove force revalidate param from the url
  useSyncForceRevalidate({ searchParams, setSearchParams });

  const ctx: OutletContext = { searchParams, setSearchParams, ...loaderData };
  return (
    <Document {...ctx}>
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
  const currentLanguage = useCurrentLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const ctx: OutletContext = {
    currentLanguage,
    env: {},
    isLoggedIn: false,
    searchParams,
    setSearchParams,
    exchangeRate: 1
  };
  return (
    <Document {...ctx}>
      <p>Oops! Something went wrong on our end</p>
    </Document>
  );
};

// ErrorBoundary only in production
export const ErrorBoundary = isProduction && ErrorBoundaryComponent;
