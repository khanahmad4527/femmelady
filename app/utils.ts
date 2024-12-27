import { useForm } from '@mantine/form';
import { useFetcher, useOutletContext } from 'react-router';
import { z } from 'zod';
import { GetParam, OutletContext, TranslationKeys } from './types/types';
import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_PAGE,
  FALL_BACK_LANG,
  LANGUAGE_TO_LOCALE_LANGUAGE,
  LOCALE_TO_CURRENCY,
  PARAMS
} from './constant';

export const submitForm = <T extends Record<string, any>>(
  fetcher: ReturnType<typeof useFetcher>,
  form: ReturnType<typeof useForm<T>>
): React.FormEventHandler<HTMLFormElement> => {
  return event => {
    event.preventDefault(); // Prevent the default form submission behavior
    const values = form.values;

    // Convert form values to FormData
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Submit the data using fetcher
    fetcher.submit(formData, { method: 'POST' });
  };
};

export const parseZodError = (error: z.ZodError) => {
  // Return field-specific errors
  const fieldErrors = error.issues.reduce((acc, issue) => {
    const fieldName = issue.path[0]; // Get the field name
    acc[fieldName] = issue.message; // Map field to message
    return acc;
  }, {} as Record<string, string>);

  return { errors: fieldErrors };
};

export const getUserLocale = (currentLanguage: TranslationKeys = 'en') => {
  return (
    LANGUAGE_TO_LOCALE_LANGUAGE[currentLanguage] || // Use language from URL
    (typeof navigator !== 'undefined' ? navigator.language : 'en-US') || // Fallback to browser language (client-side only)
    'en-US'
  ); // Default fallback
};

/**
 * Formats a number as a currency string based on the locale.
 * Automatically determines the currency based on the locale.
 *
 * @param currentLanguage - The current language (e.g., "en-US", "fr-FR").
 * @param value - The number to format.
 * @returns The formatted currency string.
 */
export const formatCurrency = ({
  currentLanguage,
  value
}: {
  currentLanguage: TranslationKeys;
  value: number;
}) => {
  const outletContext = useOutletContext<OutletContext>();

  const locale = getUserLocale(currentLanguage);
  const currency = LOCALE_TO_CURRENCY[locale] || 'USD';

  const exchangeRate = outletContext?.exchangeRate;

  // If the currency is USD, no need to convert
  if (currency === 'USD') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(value);
  }

  const convertedValue = value * exchangeRate;

  // Format the converted value
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(convertedValue);
};

/**
 * Formats a date to locale date (month, day, year).
 *
 * @param currentLanguage - The currentLanguage from the URL (default is "en").
 * @param isoDate - The isoDate in ISO 8601 format.
 * @returns The formatted date string.
 */
export const formatDate = ({
  currentLanguage,
  isoDate
}: {
  currentLanguage: TranslationKeys;
  isoDate: string;
}): string => {
  const date = new Date(isoDate);

  const locale = getUserLocale(currentLanguage);

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return formatter.format(date);
};

/**
 * Formats a number to locale format (e.g., thousands separators, decimals).
 *
 * @param currentLanguage - The currentLanguage from the URL (default is "en").
 * @param number - The number to be formatted.
 * @returns The formatted number string.
 */
export const formatNumber = ({
  currentLanguage,
  number
}: {
  currentLanguage: TranslationKeys;
  number: number;
}): string => {
  const locale = getUserLocale(currentLanguage);

  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2, // You can adjust this for currency or other purposes
    minimumFractionDigits: 0
  });

  return formatter.format(number);
};

export const buildLocalizedLink = ({
  currentLanguage,
  primaryPath,
  secondaryPath
}: {
  currentLanguage: TranslationKeys;
  primaryPath?: string;
  secondaryPath?: string;
}) => {
  if (primaryPath && secondaryPath) {
    return `/${currentLanguage}/${primaryPath}/${secondaryPath}`;
  }

  if (primaryPath) {
    return `/${currentLanguage}/${primaryPath}`;
  }

  return `/${currentLanguage}`;
};

export const getSingleTranslation = (translations: any) => {
  if (typeof translations?.[0] !== 'object') {
    return {};
  }

  return translations[0];
};

export const getImageUrl = ({
  id,
  h = 300,
  w = 300,
  DIRECTUS_URL
}: {
  id?: string;
  h?: number;
  w?: number;
  DIRECTUS_URL?: string;
}) => {
  const { env } = useOutletContext<OutletContext>();

  return `${
    env?.DIRECTUS_URL || DIRECTUS_URL
  }/assets/${id}?height=${h}&width=${w}`;
};

export const validateUUID = (uuid: string) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};

export const getLanguageCode = (params: { lang?: string }) => {
  const languageCode =
    LANGUAGE_TO_LOCALE_LANGUAGE[params?.lang ?? FALL_BACK_LANG];

  return languageCode;
};

export const getPriceRange = ({ request, searchParams }: GetParam) => {
  if (!request && !searchParams) {
    return undefined;
  }
  let priceParam: string | undefined | null = undefined;

  if (request) {
    const url = new URL(request.url);
    priceParam = url.searchParams.get(PARAMS.PRICE);
  } else if (searchParams) {
    priceParam = searchParams.get(PARAMS.PRICE);
  }

  // If the price parameter is missing, return undefined
  if (!priceParam) return undefined;

  // Split the price range and map it to numbers
  const priceRange = priceParam.split(',').map(Number);

  // Validate the parsed numbers
  if (priceRange.some(isNaN) || priceRange.length !== 2) return undefined;

  return [priceRange[0], priceRange[1]] as [number, number];
};

export const getRating = ({ request, searchParams }: GetParam) => {
  if (!request && !searchParams) {
    return undefined;
  }
  let rating: string | undefined | null = undefined;

  if (request) {
    const url = new URL(request.url);
    rating = url.searchParams.get(PARAMS.RATING);
  } else if (searchParams) {
    rating = searchParams.get(PARAMS.RATING);
  }

  // If the price parameter is missing, return undefined
  if (!rating) return undefined;

  return Number(rating);
};

export const getAverageRatingRange = (rating?: number) => {
  if (!rating) {
    return undefined;
  }

  if (rating < 1 || rating > 5) {
    return undefined; // Handle invalid ratings
  }

  const lowerBound = Math.floor(rating);
  const upperBound = rating === 5 ? 5 : lowerBound + 0.9; // Special case for 5

  return [lowerBound, upperBound] as [number, number];
};

export const getLimit = ({ request, searchParams }: GetParam) => {
  if (!request && !searchParams) {
    return DEFAULT_PRODUCT_LIMIT;
  }
  let limit = DEFAULT_PRODUCT_LIMIT;

  if (request) {
    const url = new URL(request.url);
    limit = Number(url.searchParams.get(PARAMS.LIMIT));
  } else if (searchParams) {
    limit = Number(searchParams.get(PARAMS.LIMIT));
  }

  // If the limit parameter is missing, return DEFAULT_PRODUCT_LIMIT
  if (!limit) return DEFAULT_PRODUCT_LIMIT;

  return Number(limit);
};

export const getPage = ({ request, searchParams }: GetParam) => {
  if (!request && !searchParams) {
    return DEFAULT_PRODUCT_PAGE;
  }
  let page = DEFAULT_PRODUCT_PAGE;

  if (request) {
    const url = new URL(request.url);
    page = Number(url.searchParams.get(PARAMS.PAGE));
  } else if (searchParams) {
    page = Number(searchParams.get(PARAMS.PAGE));
  }

  // If the page parameter is missing, return DEFAULT_PRODUCT_PAGE
  if (!page) return DEFAULT_PRODUCT_PAGE;

  return Number(page);
};
