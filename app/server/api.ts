import {
  readItem,
  readItems,
  Query,
  aggregate,
  readSingleton,
  withToken
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
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { redisClient } from '.';
import { getEnv } from './env';

// Utility function to fetch exchange rates
export const getExchangeRate = async (
  currentLanguage: TranslationKeys
): Promise<number> => {
  const locale = getUserLocale(currentLanguage);
  const currency = LOCALE_TO_CURRENCY[locale] || 'USD';
  const cacheKey = `exchange-rate-${currency}`;

  // Check if the exchange rate is already cached in Redis
  const cachedRate = await redisClient.getCache<number>(cacheKey);
  if (cachedRate) return cachedRate;

  try {
    const response = await fetch(getEnv(process.env).EXCHANGE_RATE_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    const data = await response.json();
    const rate = data?.rates?.[currency] || 1; // Default to 1 if no rate is found

    // Cache the exchange rate in Redis for 1 hour (3600 seconds)
    await redisClient.setCache<number>(cacheKey, rate, 3600);

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
  languageCode: string;
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
  const routeConfig: Partial<
    Record<
      Page,
      {
        fields: Query<Schema, Product>['fields'];
        deep: Query<Schema, Product>['deep'];
      }
    >
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

  const { fields, deep } = routeConfig[route] || {
    fields: [] as Query<Schema, Product>['fields'],
    deep: {} as Query<Schema, Product>['deep']
  };

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
  languageCode,
  token
}: {
  slug: string;
  languageCode: string;
  token?: string;
}): Promise<Product> => {
  const isUUID = validateUUID(slug);
  const fields = [
    '*',
    { sizes: ['*'] },
    { translations: ['*'] },
    { images: ['*', { product_image_id: ['*', { images: ['*'] }] }] },
    { colors: ['*', { product_color_id: ['*', { translations: ['*'] }] }] },
    { carts: [{ cart_id: ['color', 'size'] }] }
  ] as Query<Schema, Product>['fields'];

  const query: Query<Schema, Product> = {
    fields,
    deep: {
      ...productTranslationBaseQuery(languageCode),
      carts: {
        _filter: {
          product_id: {
            ...(isUUID ? { _eq: slug } : { translations: { slug } })
          }
        }
      }
    }
  };

  let product;

  if (isUUID) {
    if (token) {
      product = await directus.request(
        withToken(token, readItem('product', slug, query))
      );
    } else {
      product = await directus.request(readItem('product', slug, query));
    }
  } else {
    if (token) {
      [product] = await directus.request(
        withToken(
          token,
          readItems('product', {
            filter: { translations: { slug } },
            ...query
          })
        )
      );
    } else {
      [product] = await directus.request(
        readItems('product', {
          filter: { translations: { slug } },
          ...query
        })
      );
    }
  }

  return product;
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
  languageCode,
  useCache = false
}: {
  languageCode: string;
  useCache?: boolean;
}) => {
  const cacheKey = `about_us_${languageCode}`;

  if (useCache) {
    try {
      // Fetch cached data as GenericContent[]
      const cachedData = await redisClient.getCache<GenericContent[]>(cacheKey);
      if (cachedData) {
        return cachedData; // Now correctly typed
      }
    } catch (error) {
      console.error('Redis cache error:', error);
    }
  }

  // Fetch fresh data from Directus
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

  if (useCache) {
    try {
      // Store the fetched data in Redis with correct typing
      await redisClient.setCache<GenericContent[]>(cacheKey, aboutUs, 86400);
    } catch (error) {
      console.error('Redis cache saving error:', error);
    }
  }

  return aboutUs;
};

export const getContactUs = async ({
  languageCode,
  useCache = false
}: {
  languageCode: string;
  useCache?: boolean;
}) => {
  const cacheKey = `contact_us_${languageCode}`;

  if (useCache) {
    const cachedData = await redisClient.getCache<GenericContent[]>(cacheKey);
    if (cachedData) return cachedData;
  }

  const data = (await directus.request(
    readSingleton('contact_us' as never, {
      fields: ['*', { translations: ['*'] }] as never,
      deep: {
        translations: { _filter: { languages_code: { _eq: languageCode } } }
      } as any
    })
  )) as GenericSingleton;

  const extendedContactUsTranslation: ExtendedGenericTranslation =
    getFirstObjectDto(data?.translations);

  const contactUs = extendedContactUsTranslation.contents.filter(
    a => a.is_featured
  );

  if (useCache)
    await redisClient.setCache<GenericContent[]>(cacheKey, contactUs, 86400);

  return contactUs;
};

export const getPrivacyPolicy = async ({
  languageCode,
  useCache = false
}: {
  languageCode: string;
  useCache?: boolean;
}) => {
  const cacheKey = `privacy_policy_${languageCode}`;

  if (useCache) {
    const cachedData = await redisClient.getCache<GenericContent[]>(cacheKey);
    if (cachedData) return cachedData;
  }

  const data = (await directus.request(
    readSingleton('privacy_policy' as never, {
      fields: ['*', { translations: ['*'] }] as never,
      deep: {
        translations: { _filter: { languages_code: { _eq: languageCode } } }
      } as any
    })
  )) as GenericSingleton;

  const extendedPrivacyPolicyTranslation: ExtendedGenericTranslation =
    getFirstObjectDto(data?.translations);

  const privacyPolicy = extendedPrivacyPolicyTranslation.contents.filter(
    a => a.is_featured
  );

  if (useCache)
    await redisClient.setCache<GenericContent[]>(
      cacheKey,
      privacyPolicy,
      86400
    );

  return privacyPolicy;
};

export const getTermsOfServices = async ({
  languageCode,
  useCache = false
}: {
  languageCode: string;
  useCache?: boolean;
}) => {
  const cacheKey = `terms_of_services_${languageCode}`;

  if (useCache) {
    const cachedData = await redisClient.getCache<GenericContent[]>(cacheKey);
    if (cachedData) return cachedData;
  }

  const data = (await directus.request(
    readSingleton('terms_of_services' as never, {
      fields: ['*', { translations: ['*'] }] as never,
      deep: {
        translations: { _filter: { languages_code: { _eq: languageCode } } }
      } as any
    })
  )) as GenericSingleton;

  const extendedTermsOfServicesTranslation: ExtendedGenericTranslation =
    getFirstObjectDto(data?.translations);

  const termsOfServices = extendedTermsOfServicesTranslation.contents.filter(
    a => a.is_featured
  );

  if (useCache)
    await redisClient.setCache<GenericContent[]>(
      cacheKey,
      termsOfServices,
      86400
    );

  return termsOfServices;
};

export const getFaqs = async ({
  languageCode,
  useCache = false
}: {
  languageCode: string;
  useCache?: boolean;
}) => {
  const cacheKey = `faq_${languageCode}`;

  if (useCache) {
    // Check if data is in Redis cache
    const cachedData = await redisClient.getCache<Faqs[]>(cacheKey);
    if (cachedData) return cachedData;
  }

  // Fetch from Directus if not cached
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

  const extendedFAQTranslation: ExtendedFAQTranslation = getFirstObjectDto(
    data?.translations
  );

  const faqs = extendedFAQTranslation.faqs.map(f => ({
    ...f,
    faqs: f.faqs.filter(a => a.is_featured)
  }));

  if (useCache) {
    // Store fetched data in Redis for 24 hours
    await redisClient.setCache<Faqs[]>(cacheKey, faqs, 86400);
  }

  return faqs;
};

export const getCarts = async ({
  languageCode,
  token,
  page,
  limit = 10
}: {
  languageCode: string;
  token: string;
  page: number;
  limit?: number;
}) => {
  return await directus.request(
    withToken(
      token,
      readItems('cart', {
        fields: [
          '*',
          {
            products: [
              '*',
              { product_id: ['id', 'price', { translations: ['*'] }] }
            ]
          },
          { color: [{ translations: ['*'] }] },
          { size: ['*'] }
        ],
        page,
        limit: limit,
        deep: {
          products: {
            product_id: {
              translations: {
                _filter: { languages_code: languageCode }
              }
            }
          },
          color: {
            translations: {
              _filter: { languages_code: languageCode }
            }
          }
        },
        sort: ['-date_created']
      })
    )
  );
};

export const getCartsPrice = async ({
  token,
  page,
  limit = 10
}: {
  token: string;
  page: number;
  limit?: number;
}) => {
  return await directus.request(
    withToken(
      token,
      readItems('cart', {
        fields: [
          'id',
          'quantity',
          {
            products: [{ product_id: ['id', 'price'] }]
          }
        ],
        page,
        limit: limit,
        sort: ['-date_created']
      })
    )
  );
};
