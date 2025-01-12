import { useForm } from '@mantine/form';
import { useFetcher, useOutletContext } from 'react-router';
import { z } from 'zod';
import {
  Cart,
  GetParam,
  OutletContext,
  ProductCart,
  TranslationKeys
} from './types';
import {
  BRAND_WITH_ID_MAP,
  CATEGORIES_WITH_ID_MAP,
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_PAGE,
  DEFAULT_PRODUCT_SORT,
  FALL_BACK_LANG,
  FORCE_REVALIDATE_MAP,
  LANGUAGE_TO_LOCALE_LANGUAGE,
  LOCALE_TO_CURRENCY,
  PARAMS
} from './constant';
import useHeaderFooterContext from './hooks/useHeaderFooterContext';
import getFirstObjectDto from './dto/getFirstObjectDto';

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

export const translateErrors = (
  serverErrors: Record<string, string>, // Now expecting string values (not arrays)
  t: (key: string) => string // Translation function
) => {
  return Object.fromEntries(
    Object.entries(serverErrors).map(([key, errorKey]) => [
      key, // Use the original field name
      t(errorKey || '') // Translate the error message using the `t` function
    ])
  );
};

/**
 *
 * @param currentLanguage
 * @returns 'en-US' ...
 */
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
  const headerFooterContext = useHeaderFooterContext();

  const locale = getUserLocale(currentLanguage);
  const currency = LOCALE_TO_CURRENCY[locale] || 'USD';

  const exchangeRate =
    outletContext?.exchangeRate ?? headerFooterContext?.exchangeRate;

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
export const formatNumberKmb = ({
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

export const formatNumber = ({
  userLocale,
  value
}: {
  userLocale: string;
  value: number;
}) => new Intl.NumberFormat(userLocale, { useGrouping: false }).format(value);

export const buildLocalizedLink = ({
  currentLanguage,
  paths = []
}: {
  currentLanguage: TranslationKeys;
  paths?: string[]; // Accepts an array of paths
}) => {
  const validPaths = paths.filter(path => path); // Filter out undefined or empty paths
  return `/${[currentLanguage, ...validPaths].join('/')}`;
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
  const outletContext = useOutletContext<OutletContext>();
  const headerFooterContext = useHeaderFooterContext();
  const directusUrl =
    outletContext?.env?.DIRECTUS_URL ??
    headerFooterContext?.env?.DIRECTUS_URL ??
    DIRECTUS_URL;

  return `${directusUrl}/assets/${id}?height=${h}&width=${w}`;
};

export const validateUUID = (uuid: string) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};

/**
 *
 * @param params
 * @returns en-US
 */
export const getLanguageCode = (params: { lang?: string }) => {
  const languageCode =
    LANGUAGE_TO_LOCALE_LANGUAGE[params?.lang ?? FALL_BACK_LANG];

  return languageCode as string;
};

/**
 * Retrieves the current language, defaulting to the fallback language if none is provided.
 *
 * @param params - An object containing an optional `lang` property.
 * @param params.lang - The desired language code (e.g., "en", "fr"). Optional.
 * @returns The resolved language code (either the provided `lang` or the fallback language).
 */
export const getLang = (params: { lang?: string }): string => {
  const lang = params.lang ?? FALL_BACK_LANG;
  return lang as TranslationKeys;
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
    limit = Number(url.searchParams.get(PARAMS.LIMIT)) ?? DEFAULT_PRODUCT_LIMIT;
  } else if (searchParams) {
    limit = Number(searchParams.get(PARAMS.LIMIT)) ?? DEFAULT_PRODUCT_LIMIT;
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
    page = Number(url.searchParams.get(PARAMS.PAGE)) ?? DEFAULT_PRODUCT_PAGE;
  } else if (searchParams) {
    page = Number(searchParams.get(PARAMS.PAGE)) ?? DEFAULT_PRODUCT_PAGE;
  }

  // If the page parameter is missing, return DEFAULT_PRODUCT_PAGE
  if (!page) return DEFAULT_PRODUCT_PAGE;

  return Number(page);
};

export const getSort = ({ request, searchParams }: GetParam) => {
  if (!request && !searchParams) {
    return DEFAULT_PRODUCT_SORT;
  }
  let sort = DEFAULT_PRODUCT_SORT;

  if (request) {
    const url = new URL(request.url);
    sort = url.searchParams.get(PARAMS.SORT) ?? DEFAULT_PRODUCT_SORT;
  } else if (searchParams) {
    sort = searchParams.get(PARAMS.SORT) ?? DEFAULT_PRODUCT_SORT;
  }

  // If the sort parameter is missing, return DEFAULT_PRODUCT_SORT
  if (!sort) return DEFAULT_PRODUCT_SORT;

  return sort;
};

type IdMap = Record<string, string>;
type Key = string;

const mapToIds = <T extends Key>(keys: T[], idMap: IdMap): string[] => {
  return keys.map(key => idMap[key]).filter(Boolean);
};

const getIdsFromParams = ({
  request,
  searchParams,
  paramKey,
  idMap
}: {
  request?: Request;
  searchParams?: URLSearchParams;
  paramKey: string;
  idMap: IdMap;
}): string[] | undefined => {
  if (!request && !searchParams) return undefined;

  let keys: string[] | undefined = undefined;

  if (request) {
    const url = new URL(request.url);
    keys = url.searchParams.getAll(paramKey);
  } else if (searchParams) {
    keys = searchParams.getAll(paramKey);
  }

  if (!keys?.length) return undefined;

  const ids = mapToIds(keys, idMap);
  return ids.length ? ids : undefined;
};

export const getCategoriesId = (params: GetParam) => {
  return getIdsFromParams({
    ...params,
    paramKey: PARAMS.CATEGORIES,
    idMap: CATEGORIES_WITH_ID_MAP
  });
};

export const getBrandsId = (params: GetParam) => {
  return getIdsFromParams({
    ...params,
    paramKey: PARAMS.BRANDS,
    idMap: BRAND_WITH_ID_MAP
  });
};

export const getSearchQuery = ({ request, searchParams }: GetParam) => {
  if (!request && !searchParams) {
    return undefined;
  }
  let searchQuery = undefined;

  if (request) {
    const url = new URL(request.url);
    searchQuery = url.searchParams.get('q') ?? undefined;
  } else if (searchParams) {
    searchQuery = searchParams.get('q') ?? undefined;
  }

  if (!searchQuery) return undefined;

  return searchQuery;
};

export function shouldRevalidateLogic(nextUrl: URL, currentUrl: URL): boolean {
  if (nextUrl.href === currentUrl.href) {
    return false;
  }

  const forceValidate = nextUrl.searchParams.get(PARAMS.FORCE_REVALIDATE);

  if (forceValidate === FORCE_REVALIDATE_MAP.GLOBAL) {
    return true;
  }

  return false;
}

/**
 * Builds a filter object and compares it to the URL's filter parameter.
 * @param params - Parameters to build the filter, including potential functions.
 * @param requestUrl - The URL to extract the filter parameter from.
 * @returns An object containing a boolean indicating equality and the built filter object.
 */
export const buildAndCompareFilter = (
  params: {
    priceRange?: number[];
    averageRatingRange?: number[];
    categoriesId?: string[];
    brandsId?: string[];
    [key: string]: any; // Allow additional dynamic keys, including functions.
  },
  requestUrl: string
) => {
  // Step 1: Build the filter object
  const { priceRange, averageRatingRange, categoriesId, brandsId } = params;

  let filter = null;
  if (priceRange || averageRatingRange || categoriesId || brandsId) {
    filter = {
      price: priceRange,
      rating: averageRatingRange,
      category: categoriesId,
      brand: brandsId
    };
  }

  // Step 2: Extract filter from the URL
  const url = new URL(requestUrl);

  const urlFilter = JSON.parse(url.searchParams.get('filter') ?? '{}');
  const count = url.searchParams.get('count');

  let parsedUrlFilter: Record<string, any> | null = null;
  try {
    parsedUrlFilter = isEmptyObject(urlFilter) ? null : urlFilter;
  } catch (error) {
    console.error('Failed to parse URL filter:', error);
  }

  if (!filter && !parsedUrlFilter && count === null) {
    return { isSame: false, productCount: 0 };
  } else if (!filter && !parsedUrlFilter && count !== null) {
    return { isSame: true, productCount: safeParseInt(count) };
  }

  // Step 3: Perform deep comparison
  const isSame = deepEqual(filter, parsedUrlFilter);

  return { isSame, productCount: safeParseInt(count) };
};

/**
 * Deep comparison of two values, including objects, arrays, and functions.
 * @param val1 - The first value to compare.
 * @param val2 - The second value to compare.
 * @returns True if the values are deeply equal, otherwise false.
 */
const deepEqual = (val1: any, val2: any): boolean => {
  // If both values are strictly equal (including undefined), return true
  if (val1 === val2) return true;

  // If either value is not an object, or either is null, return false
  if (
    typeof val1 !== 'object' ||
    typeof val2 !== 'object' ||
    val1 === null ||
    val2 === null
  ) {
    return false;
  }

  // Get keys from both objects, ignoring keys with undefined values
  const keys1 = Object.keys(val1).filter(key => val1[key] !== undefined);
  const keys2 = Object.keys(val2).filter(key => val2[key] !== undefined);

  // If the number of keys is different, return false
  if (keys1.length !== keys2.length) return false;

  // Recursively check each key
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(val1[key], val2[key])) {
      return false;
    }
  }

  return true;
};

const isEmptyObject = (obj: any): boolean => {
  return (
    obj &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    Object.keys(obj).length === 0
  );
};

function safeParseInt(value: any): number {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function generateUuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const calculateTotalPrice = ({ carts }: { carts: Cart[] }): number => {
  if (!carts || !Array.isArray(carts)) {
    throw new Error('Invalid carts data. Expected an array.');
  }

  return carts.reduce((total, cart) => {
    const products = (cart.products || []) as ProductCart[];
    const cartTotal = products.reduce((productTotal, product) => {
      const price = getFirstObjectDto(product.product_id)?.price;

      if (price === undefined) {
        throw new Error(
          `Price not found for product ID: ${product.product_id}`
        );
      }

      return productTotal + price;
    }, 0);

    if (!cart.quantity) {
      throw new Error(`Quantity not found for cart ID: ${cart.id}`);
    }

    return total + cartTotal * cart.quantity;
  }, 0);
};

export const getLocalizedMonth = ({
  userLocale,
  monthIndex
}: {
  userLocale: string;
  monthIndex: number;
}): string => {
  const date = new Date(2000, monthIndex, 1); // Use a static year and day
  return new Intl.DateTimeFormat(userLocale, { month: 'long' }).format(date);
};
