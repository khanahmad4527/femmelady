import '@mantine/core/styles.css';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useParams
} from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import Document from './components/Document';
import { TranslationKeys } from './types/types';
import useCurrentLanguage from './hooks/useCurrentLanguage';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'
  }
];

export const loader: LoaderFunction = async ({ params }) => {
  const currentLanguage = (params.lang ?? 'en') as TranslationKeys;
  return { isLoggedIn: true, currentLanguage };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
  const loaderData = useLoaderData<typeof loader>();
  return (
    <Document {...loaderData}>
      <Outlet context={loaderData} />
    </Document>
  );
}

const isProduction = process.env.NODE_ENV === 'production';

const ErrorBoundaryComponent = () => {
  const { currentLanguage } = useCurrentLanguage();

  return (
    <Document isLoggedIn={false} currentLanguage={currentLanguage}>
      <p>Oops! Something went wrong on our end</p>
    </Document>
  );
};

// ErrorBoundary only in production
export const ErrorBoundary = isProduction && ErrorBoundaryComponent;
