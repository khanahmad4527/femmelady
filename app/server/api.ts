import {
  readItem,
  readItems,
  Query,
  aggregate,
  readSingleton
} from '@directus/sdk';
import { directus } from './directus';
import { Schema } from '~/types/collections';
import {
  GenericContent,
  Page,
  Product,
  Review,
  GenericSingleton,
  ExtendedGenericTranslation,
  FAQ,
  ExtendedFAQTranslation,
  Faqs,
  TranslationKeys
} from '~/types';
import { getUserLocale, validateUUID } from '~/utils';
import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_PAGE,
  DEFAULT_PRODUCT_SORT,
  LOCALE_TO_CURRENCY
} from '~/constant';
import NodeCache from 'node-cache';
import getFirstObjectDto from '~/dto/getFirstObjectDto';

const cache = new NodeCache();

// Utility function to fetch exchange rates
export const getExchangeRate = async (
  currentLanguage: TranslationKeys
): Promise<number> => {
  const locale = getUserLocale(currentLanguage);

  const currency = LOCALE_TO_CURRENCY[locale] || 'USD';

  // Check if the exchange rate is already cached
  const cachedRate = cache.get<number>(`exchange-rate-${currency}`);
  if (cachedRate) {
    return cachedRate;
  }

  try {
    const response = await fetch(process.env?.EXCHANGE_RATE_API_URL ?? '');
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    const data = await response.json();
    const rate = data?.rates?.[currency] || 1; // Default to 1 if no rate is found

    // Cache the exchange rate
    cache.set(`exchange-rate-${currency}`, rate, 3600);

    return rate;
  } catch (error) {
    console.error(`Error fetching exchange rate for ${currency}:`, error);
    return 1; // Default fallback rate
  }
};

const productTranslationBaseQuery = (languageCode: string) => {
  return {
    translations: {
      _filter: {
        languages_code: languageCode
      }
    },
    colors: {
      product_color_id: {
        translations: {
          _filter: {
            languages_code: languageCode
          }
        }
      }
    }
  } as Query<Schema, Product>['deep'];
};

export const getProducts = async ({
  route,
  isSame,
  productCount,
  languageCode,
  priceRange,
  averageRatingRange,
  productsPerPage = DEFAULT_PRODUCT_LIMIT,
  currentPage = DEFAULT_PRODUCT_PAGE,
  productSort = DEFAULT_PRODUCT_SORT,
  categoriesId,
  brandsId,
  searchQuery
}: {
  route: Page;
  isSame?: boolean;
  productCount?: number;
  languageCode: TranslationKeys;
  priceRange?: [number, number];
  averageRatingRange?: [number, number];
  productsPerPage?: number;
  currentPage?: number;
  productSort?: string;
  categoriesId?: string[];
  brandsId?: string[];
  searchQuery?: string;
}): Promise<{ products: Product[]; totalProductCount: number }> => {
  // Common filters

  const filter: Query<Schema, Product>['filter'] = {
    price: priceRange ? { _between: priceRange } : undefined,
    average_rating: averageRatingRange
      ? { _between: averageRatingRange }
      : undefined,
    categories: !categoriesId
      ? categoriesId
      : {
          product_category_id: {
            _in: categoriesId
          }
        },
    brand: !brandsId
      ? brandsId
      : {
          _in: brandsId
        },
    translations: {
      title: {
        _icontains: searchQuery
      }
    }
  };

  // Common fields and deep options based on the route
  const routeConfig: Record<
    Page,
    {
      fields: Query<Schema, Product>['fields'];
      deep: Query<Schema, Product>['deep'];
    }
  > = {
    home: {
      fields: [
        'id',
        'feature_image_1',
        'feature_image_2',
        'price',
        { translations: ['*'] }
      ],
      deep: {
        translations: {
          _filter: { languages_code: languageCode }
        }
      }
    },
    products: {
      fields: [
        'id',
        'price',
        'feature_image_1',
        'feature_image_2',
        { translations: ['*'] },
        { images: ['*', { product_image_id: ['*', { images: ['*'] }] }] },
        { colors: ['*', { product_color_id: ['*', { translations: ['*'] }] }] }
      ],
      deep: {
        translations: {
          _filter: { languages_code: languageCode }
        },
        colors: {
          product_color_id: {
            translations: {
              _filter: { languages_code: languageCode }
            }
          }
        } as any
      }
    }
  };

  const { fields, deep } = routeConfig[route];

  // Build the query dynamically
  const baseQuery: Query<Schema, Product> = {
    filter,
    fields,
    limit: DEFAULT_PRODUCT_LIMIT,
    deep
  };

  // Query for products
  const productQuery: Query<Schema, Product> = {
    ...baseQuery,
    limit: productsPerPage,
    page: currentPage,
    sort: [productSort as any]
  };

  if (route === 'home') {
    const products = await directus.request(readItems('product', productQuery));
    return { products, totalProductCount: 0 };
  }

  if (route === 'products') {
    let count = productCount;

    if (!isSame) {
      // Aggregate query for product count
      const [productCount] = await directus.request(
        aggregate('product', {
          aggregate: { countDistinct: '*' },
          query: baseQuery
        })
      );

      count = Number(productCount?.countDistinct?.['*' as any] ?? 0);
    }

    // Fetch products
    const products = await directus.request(readItems('product', productQuery));
    return {
      products,
      totalProductCount: Number(count)
    };
  }

  // Default case for unsupported routes
  return { products: [], totalProductCount: 0 };
};

export const getSingleProduct = async ({
  slug,
  languageCode
}: {
  slug: string;
  languageCode: string;
}) => {
  const isUUID = validateUUID(slug);
  const fields = [
    '*',
    { sizes: ['*'] },
    { translations: ['*'] },
    { images: ['*', { product_image_id: ['*', { images: ['*'] }] }] },
    { colors: ['*', { product_color_id: ['*', { translations: ['*'] }] }] }
  ] as Query<Schema, Product>['fields'];

  const query: Query<Schema, Product> = {
    fields,
    deep: productTranslationBaseQuery(languageCode)
  };

  if (isUUID) {
    const product = await directus.request(readItem('product', slug, query));
    return product;
  } else {
    const [product] = await directus.request(
      readItems('product', {
        filter: { translations: { slug } },
        ...query
      })
    );
    return product;
  }
};

export const getReviews = async ({
  slug,
  languageCode,
  reviewsPerPage = DEFAULT_PRODUCT_LIMIT,
  currentPage = DEFAULT_PRODUCT_PAGE
}: {
  slug: string;
  languageCode: string;
  reviewsPerPage?: number;
  currentPage?: number;
}) => {
  const isUUID = validateUUID(slug);

  const fields: Query<Schema, Review>['fields'] = [
    '*',
    { user_created: ['first_name', 'last_name'] } as any,
    { translations: ['*'] }
  ];

  const baseFilter = {
    translations: {
      languages_code: languageCode
    }
  };

  const filter: Query<Schema, Review>['filter'] = isUUID
    ? {
        ...baseFilter,
        product: { id: { _eq: slug } }
      }
    : {
        ...baseFilter,
        product: { translations: { slug } }
      };

  const query: Query<Schema, Review> = {
    fields,
    filter,
    limit: reviewsPerPage,
    page: currentPage,
    sort: ['-rating']
  };

  return await directus.request(readItems('review', query));
};

export const getAboutUs = async ({
  languageCode
}: {
  languageCode: string;
}) => {
  const cacheKey = `about_us_${languageCode}`;

  // Check if data is in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData as GenericContent[];
  }

  // If not cached, fetch from Directus
  const data = (await directus.request(
    readSingleton('about_us' as never, {
      fields: ['*', { translations: ['*'] }] as never,
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: languageCode
            }
          }
        }
      } as any
    })
  )) as GenericSingleton;

  const extendedAboutUsTranslation: ExtendedGenericTranslation =
    getFirstObjectDto(data?.translations);

  const aboutUs = extendedAboutUsTranslation.contents.filter(
    a => a.is_featured
  );

  // Store fetched data in cache for 24 hours
  cache.set(cacheKey, aboutUs, 86400);

  return aboutUs as GenericContent[];
};

export const getContactUs = async ({
  languageCode
}: {
  languageCode: string;
}) => {
  const cacheKey = `contact_us_${languageCode}`;

  // Check if data is in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData as GenericContent[];
  }

  // If not cached, fetch from Directus
  const data = (await directus.request(
    readSingleton('contact_us' as never, {
      fields: ['*', { translations: ['*'] }] as never,
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: languageCode
            }
          }
        }
      } as any
    })
  )) as GenericSingleton;

  const extendedContactUsTranslation: ExtendedGenericTranslation =
    getFirstObjectDto(data?.translations);

  const contactUs = extendedContactUsTranslation.contents.filter(
    a => a.is_featured
  );

  // Store fetched data in cache for 24 hours
  cache.set(cacheKey, contactUs, 86400);

  return contactUs as GenericContent[];
};

export const getPrivacyPolicy = async ({
  languageCode
}: {
  languageCode: string;
}) => {
  const cacheKey = `privacy_policy_${languageCode}`;

  // Check if data is in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData as GenericContent[];
  }

  // If not cached, fetch from Directus
  const data = (await directus.request(
    readSingleton('privacy_policy' as never, {
      fields: ['*', { translations: ['*'] }] as never,
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: languageCode
            }
          }
        }
      } as any
    })
  )) as GenericSingleton;

  const extendedPrivacyPolicyTranslation: ExtendedGenericTranslation =
    getFirstObjectDto(data?.translations);

  const privacyPolicy = extendedPrivacyPolicyTranslation.contents.filter(
    a => a.is_featured
  );

  // Store fetched data in cache for 24 hours
  cache.set(cacheKey, privacyPolicy, 86400);

  return privacyPolicy as GenericContent[];
};

export const getTermsOfServices = async ({
  languageCode
}: {
  languageCode: string;
}) => {
  const cacheKey = `terms_of_services_${languageCode}`;

  // Check if data is in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData as GenericContent[];
  }

  // If not cached, fetch from Directus
  const data = (await directus.request(
    readSingleton('terms_of_services' as never, {
      fields: ['*', { translations: ['*'] }] as never,
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: languageCode
            }
          }
        }
      } as any
    })
  )) as GenericSingleton;

  const extendedTermsOfServicesTranslation: ExtendedGenericTranslation =
    getFirstObjectDto(data?.translations);

  const termsOfServices = extendedTermsOfServicesTranslation.contents.filter(
    a => a.is_featured
  );

  // Store fetched data in cache for 24 hours
  cache.set(cacheKey, termsOfServices, 86400);

  return termsOfServices as GenericContent[];
};

export const getFaqs = async ({ languageCode }: { languageCode: string }) => {
  const cacheKey = `faq_${languageCode}`;

  // Check if data is in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData as Faqs[];
  }

  // If not cached, fetch from Directus
  const data = (await directus.request(
    readSingleton('faq' as never, {
      fields: ['*', { translations: ['*'] }] as never,
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: languageCode
            }
          }
        }
      } as any
    })
  )) as FAQ;

  const extendedExtendedFAQTranslation: ExtendedFAQTranslation =
    getFirstObjectDto(data?.translations);

  const faqs = extendedExtendedFAQTranslation.faqs.map(f => {
    return {
      ...f,
      faqs: f.faqs.filter(a => a.is_featured)
    };
  });

  // Store fetched data in cache for 24 hours
  cache.set(cacheKey, faqs, 86400);

  return faqs as Faqs[];
};
