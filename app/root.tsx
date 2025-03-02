import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';

import {
  Affix,
  Box,
  Button,
  ColorSchemeScript,
  DirectionProvider,
  mantineHtmlProps,
  MantineProvider,
  Stack,
  Text,
  Transition
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { useEffect } from 'react';
import type { MetaFunction, ShouldRevalidateFunction } from 'react-router';
import {
  href,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSearchParams
} from 'react-router';

import { Route } from './+types/root';
import { isAuthenticated } from './auth/auth.server';
import Document from './components/Document';
import { LANGUAGE_DIRECTION, PARAMS } from './constant';
import useCurrentLanguage from './hooks/useCurrentLanguage';
import useSyncForceRevalidate from './hooks/useSyncForceRevalidate';
import useTranslation from './hooks/useTranslation';
import { IconArrowUp, IconInfoTriangle } from './icons';
import { getMeta } from './meta';
import { getExchangeRate } from './server/api';
import { getPublicEnv } from './server/env';
import fontStyleSheetUrl from './styles/fonts.css?url';
import globalStyle from './styles/style.css?url';
import { theme } from './theme';
import { OutletContext } from './types';
import {
  getUserLocale,
  getValidLanguageOrRedirect,
  shouldRevalidateLogic
} from './utils';

export const links = () => [
  { rel: 'icon', href: '/favicon.svg' },
  { rel: 'preload', href: fontStyleSheetUrl, as: 'style' }, // Keep this for font stylesheet
  { rel: 'stylesheet', href: fontStyleSheetUrl }, // Ensure fonts are loaded
  { rel: 'stylesheet', href: globalStyle } // Global styles
];

export const meta: MetaFunction = ({ location }) => {
  return getMeta({ pathname: location.pathname });
};

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

  const result = getValidLanguageOrRedirect({ params, request, user });

  if (result instanceof Response) {
    return result;
  }

  const currentLanguage = result;

  const locale = getUserLocale(currentLanguage);

  const exchangeRate = await getExchangeRate(currentLanguage);

  const env = getPublicEnv();
  const url = new URL(request.url);
  const utmSource = url.searchParams.get(PARAMS.utmSource);
  const dir = LANGUAGE_DIRECTION[currentLanguage];

  return {
    isLoggedIn,
    user,
    locale,
    currentLanguage,
    env,
    exchangeRate,
    utmSource,
    dir
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { currentLanguage, dir } = useCurrentLanguage();

  return (
    <html lang={currentLanguage} dir={dir} {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />{' '}
        {/* Prevents indexing */}
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <DirectionProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </DirectionProvider>
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

      {/* This shows the scroll to top button */}
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <Button
              leftSection={<IconArrowUp />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              color={'primary.4'}
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
  const loaderData = useLoaderData<OutletContext>();
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();

  return (
    <Document {...loaderData}>
      <Stack align={'center'} gap={0}>
        <Box ta={'center'} w={{ base: 100, md: 200 }}>
          <IconInfoTriangle size={'100%'} />
        </Box>
        <Text ta={'center'} fz={{ base: 25, md: 50 }} fw={500} c={'primary'}>
          {t('common.somethingWentWrong')}
        </Text>
        <Text ta={'center'} fz={{ base: 12, md: 25 }} c={'primary'}>
          {t('common.encounteredError')}
        </Text>
        <Button
          mt={'md'}
          component={Link}
          prefetch="intent"
          to={href('/:lang?', {
            lang: currentLanguage
          })}
        >
          {t('common.goToHome')}
        </Button>
      </Stack>
    </Document>
  );
};

// ErrorBoundary in development
// export const ErrorBoundary = ErrorBoundaryComponent;

// ErrorBoundary only in production
export const ErrorBoundary = isProduction && ErrorBoundaryComponent;
