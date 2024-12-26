import '~/styles/style.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
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

export const loader = async ({ params }: Route.LoaderArgs) => {
  const currentLanguage = params?.lang as TranslationKeys;
  if (!currentLanguage) {
    return redirect('/en');
  }

  const env = { DIRECTUS_URL: process.env?.DIRECTUS_URL };

  return { isLoggedIn: true, currentLanguage, env };
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
  const [searchParams, setSearchParams] = useSearchParams();

  const ctx: OutletContext = { searchParams, setSearchParams, ...loaderData };
  return (
    <Document {...ctx}>
      <Outlet context={ctx} />
    </Document>
  );
}

const isProduction = process.env.NODE_ENV === 'production';

const ErrorBoundaryComponent = () => {
  const { currentLanguage } = useCurrentLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const ctx: OutletContext = {
    currentLanguage,
    env: {},
    isLoggedIn: false,
    searchParams,
    setSearchParams
  };
  return (
    <Document {...ctx}>
      <p>Oops! Something went wrong on our end</p>
    </Document>
  );
};

// ErrorBoundary only in production
export const ErrorBoundary = isProduction && ErrorBoundaryComponent;
