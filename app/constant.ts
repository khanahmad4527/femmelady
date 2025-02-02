export const ROUTES_WITHOUT_HEADER_AND_FOOTER = new Set(['/some']); // 'login',
// 'register',
// 'change-password',
// 'reset-password'

export const FALL_BACK_LANG = 'en';

// These are the languages that web app supports
export const AVAILABLE_LANGUAGES = ['en', 'ja', 'ko', 'ar', 'nl', 'fr', 'zh'];

export const LANGUAGE_TO_LOCALE_LANGUAGE: Record<string, string> = {
  en: 'en-US', // English (United States)
  ja: 'ja-JP', // Japanese (Japan)
  fr: 'fr-FR', // French (France)
  de: 'de-DE', // German (Germany)
  es: 'es-ES', // Spanish (Spain)
  pt: 'pt-PT', // Portuguese (Portugal)
  it: 'it-IT', // Italian (Italy)
  nl: 'nl-NL', // Dutch (Netherlands)
  ru: 'ru-RU', // Russian (Russia)
  zh: 'zh-CN', // Chinese (Simplified, China)
  ar: 'ar-SA', // Arabic (Saudi Arabia)
  ko: 'ko-KR', // Korean (South Korea)
  hi: 'hi-IN', // Hindi (India)
  bn: 'bn-IN', // Bengali (India)
  pl: 'pl-PL', // Polish (Poland)
  tr: 'tr-TR', // Turkish (Turkey)
  sv: 'sv-SE', // Swedish (Sweden)
  da: 'da-DK', // Danish (Denmark)
  no: 'no-NO', // Norwegian (Norway)
  fi: 'fi-FI', // Finnish (Finland)
  cs: 'cs-CZ', // Czech (Czech Republic)
  ro: 'ro-RO', // Romanian (Romania)
  hu: 'hu-HU', // Hungarian (Hungary)
  th: 'th-TH', // Thai (Thailand)
  vi: 'vi-VN', // Vietnamese (Vietnam)
  id: 'id-ID', // Indonesian (Indonesia)
  ms: 'ms-MY', // Malay (Malaysia)
  tl: 'tl-PH', // Filipino (Philippines)
  he: 'he-IL', // Hebrew (Israel)
  fa: 'fa-IR', // Persian (Iran)
  ur: 'ur-PK', // Urdu (Pakistan)
  sw: 'sw-KE', // Swahili (Kenya)
  sr: 'sr-RS', // Serbian (Serbia)
  mk: 'mk-MK', // Macedonian (North Macedonia)
  uk: 'uk-UA', // Ukrainian (Ukraine)
  lv: 'lv-LV', // Latvian (Latvia)
  et: 'et-EE', // Estonian (Estonia)
  lt: 'lt-LT', // Lithuanian (Lithuania)
  sq: 'sq-AL', // Albanian (Albania)
  bg: 'bg-BG', // Bulgarian (Bulgaria)
  hr: 'hr-HR', // Croatian (Croatia)
  sl: 'sl-SI', // Slovenian (Slovenia)
  sk: 'sk-SK', // Slovak (Slovakia)
  bs: 'bs-BA', // Bosnian (Bosnia and Herzegovina)
  am: 'am-ET', // Amharic (Ethiopia)
  hy: 'hy-AM', // Armenian (Armenia)
  ka: 'ka-GE', // Georgian (Georgia)
  rw: 'rw-RW', // Kinyarwanda (Rwanda)
  ne: 'ne-NP', // Nepali (Nepal)
  si: 'si-LK', // Sinhalese (Sri Lanka)
  km: 'km-KH', // Khmer (Cambodia)
  my: 'my-MM', // Burmese (Myanmar)
  lo: 'lo-LA', // Lao (Laos)
  mn: 'mn-MN', // Mongolian (Mongolia)
  bo: 'bo-CN', // Tibetan (China)
  ps: 'ps-AF', // Pashto (Afghanistan)
  cy: 'cy-GB', // Welsh (United Kingdom)
  eu: 'eu-ES', // Basque (Spain)
  gl: 'gl-ES', // Galician (Spain)
  is: 'is-IS', // Icelandic (Iceland)
  jw: 'jw-ID', // Javanese (Indonesia)
  mr: 'mr-IN', // Marathi (India)
  ta: 'ta-IN', // Tamil (India)
  te: 'te-IN', // Telugu (India)
  kn: 'kn-IN', // Kannada (India)
  gu: 'gu-IN', // Gujarati (India)
  pa: 'pa-IN', // Punjabi (India)
  ml: 'ml-IN', // Malayalam (India)
  or: 'or-IN', // Oriya (India)
  as: 'as-IN', // Assamese (India)
  bh: 'bh-IN', // Bihari (India)
  qu: 'qu-PE', // Quechua (Peru)
  dz: 'dz-BT' // Dzongkha (Bhutan)
} as const;

export const LOCALE_TO_LANGUAGE: Record<string, string> = {
  'en-US': 'en', // English (United States)
  'en-GB': 'en', // English (United Kingdom)
  'ja-JP': 'ja', // Japanese (Japan)
  'fr-FR': 'fr', // French (France)
  'de-DE': 'de', // German (Germany)
  'es-ES': 'es', // Spanish (Spain)
  'pt-PT': 'pt', // Portuguese (Portugal)
  'it-IT': 'it', // Italian (Italy)
  'nl-NL': 'nl', // Dutch (Netherlands)
  'ru-RU': 'ru', // Russian (Russia)
  'zh-CN': 'zh', // Chinese (Simplified, China)
  'ar-SA': 'ar', // Arabic (Saudi Arabia)
  'ko-KR': 'ko', // Korean (South Korea)
  'hi-IN': 'hi', // Hindi (India)
  'bn-IN': 'bn', // Bengali (India)
  'pl-PL': 'pl', // Polish (Poland)
  'tr-TR': 'tr', // Turkish (Turkey)
  'sv-SE': 'sv', // Swedish (Sweden)
  'da-DK': 'da', // Danish (Denmark)
  'no-NO': 'no', // Norwegian (Norway)
  'fi-FI': 'fi', // Finnish (Finland)
  'cs-CZ': 'cs', // Czech (Czech Republic)
  'ro-RO': 'ro', // Romanian (Romania)
  'hu-HU': 'hu', // Hungarian (Hungary)
  'th-TH': 'th', // Thai (Thailand)
  'vi-VN': 'vi', // Vietnamese (Vietnam)
  'id-ID': 'id', // Indonesian (Indonesia)
  'ms-MY': 'ms', // Malay (Malaysia)
  'tl-PH': 'tl', // Filipino (Philippines)
  'he-IL': 'he', // Hebrew (Israel)
  'fa-IR': 'fa', // Persian (Iran)
  'ur-PK': 'ur', // Urdu (Pakistan)
  'sw-KE': 'sw', // Swahili (Kenya)
  'sr-RS': 'sr', // Serbian (Serbia)
  'mk-MK': 'mk', // Macedonian (North Macedonia)
  'uk-UA': 'uk', // Ukrainian (Ukraine)
  'lv-LV': 'lv', // Latvian (Latvia)
  'et-EE': 'et', // Estonian (Estonia)
  'lt-LT': 'lt', // Lithuanian (Lithuania)
  'sq-AL': 'sq', // Albanian (Albania)
  'bg-BG': 'bg', // Bulgarian (Bulgaria)
  'hr-HR': 'hr', // Croatian (Croatia)
  'sl-SI': 'sl', // Slovenian (Slovenia)
  'sk-SK': 'sk', // Slovak (Slovakia)
  'bs-BA': 'bs', // Bosnian (Bosnia and Herzegovina)
  'am-ET': 'am', // Amharic (Ethiopia)
  'hy-AM': 'hy', // Armenian (Armenia)
  'ka-GE': 'ka', // Georgian (Georgia)
  'rw-RW': 'rw', // Kinyarwanda (Rwanda)
  'ne-NP': 'ne', // Nepali (Nepal)
  'si-LK': 'si', // Sinhalese (Sri Lanka)
  'km-KH': 'km', // Khmer (Cambodia)
  'my-MM': 'my', // Burmese (Myanmar)
  'lo-LA': 'lo', // Lao (Laos)
  'dz-BT': 'dz', // Dzongkha (Bhutan)
  'mn-MN': 'mn', // Mongolian (Mongolia)
  'bo-CN': 'bo', // Tibetan (China)
  'ps-AF': 'ps', // Pashto (Afghanistan)
  'cy-GB': 'cy', // Welsh (United Kingdom)
  'eu-ES': 'eu', // Basque (Spain)
  'gl-ES': 'gl', // Galician (Spain)
  'is-IS': 'is', // Icelandic (Iceland)
  'jw-ID': 'jw', // Javanese (Indonesia)
  'mr-IN': 'mr', // Marathi (India)
  'ta-IN': 'ta', // Tamil (India)
  'te-IN': 'te', // Telugu (India)
  'kn-IN': 'kn', // Kannada (India)
  'gu-IN': 'gu', // Gujarati (India)
  'pa-IN': 'pa', // Punjabi (India)
  'ml-IN': 'ml', // Malayalam (India)
  'or-IN': 'or', // Oriya (India)
  'as-IN': 'as', // Assamese (India)
  'bh-IN': 'bh', // Bihari (India)
  'qu-PE': 'qu' // Quechua (Peru)
} as const;

export const LOCALE_TO_CURRENCY: Record<string, string> = {
  'en-US': 'USD',
  'fr-FR': 'EUR',
  'de-DE': 'EUR',
  'ja-JP': 'JPY',
  'es-ES': 'EUR',
  'it-IT': 'EUR',
  'pt-BR': 'BRL',
  'ru-RU': 'RUB',
  'ar-SA': 'SAR',  
  'zh-CN': 'CNY',  
  'ko-KR': 'KRW',  
  'nl-NL': 'EUR',   
} as const;


export const DEFAULT_PRODUCT_LIMIT = 10;

export const DEFAULT_PRODUCT_PAGE = 1;

export const DEFAULT_PRODUCT_SORT = '-viewed_count';

// For SEO purpose we are appending category name instead of ids
// So to map the name to the ids we need this map
export const CATEGORIES_WITH_ID_MAP = {
  'beauty-and-wellness': {
    key: 'beauty-and-wellness',
    id: 'd638efcc-98cc-4be8-9e04-ed66a5a9c679'
  },
  'wedding-dresses': {
    key: 'wedding-dresses',
    id: '418ae741-d5cf-4442-8b6a-70b397bd2cec'
  },
  'home-and-furniture': {
    key: 'home-and-furniture',
    id: 'd756e31f-dd83-45e3-91d4-6cf8208d44e2'
  },
  shoes: { key: 'shoes', id: '1816621b-dfa4-4e50-a983-1fe126773fce' },
  candles: { key: 'candles', id: 'e76acfbc-a0f6-4a59-a962-a4bc4df54926' },
  dresses: { key: 'dresses', id: '2d94f3a4-c004-4e74-b928-248a0bb8210f' },
  jewelry: { key: 'jewelry', id: '68a0f6f7-120c-4758-9ca8-9863a5885a90' },
  bags: { key: 'bags', id: 'cfe393ba-b6a7-46f7-8b93-88d58b42fd2c' },
  perfumes: { key: 'perfumes', id: 'ee5d7591-983a-4d7a-87aa-e6030f78ae43' },
  watches: { key: 'watches', id: '66c302b5-f2da-40b5-83e9-3189ecf2fb18' }
} as const;

// For SEO purpose we are appending brand name instead of ids
// So to map the name to the ids we need this map
export const BRANDS_WITH_ID_MAP = {
  'vera-luxe': {
    key: 'vera-luxe',
    id: 'af07751e-3f73-449b-8250-0a520d40bac8'
  },
  'monique-couture': {
    key: 'monique-couture',
    id: '1d082713-e61f-4751-a9cf-b09db7383db8'
  },
  'pristine-vows': {
    key: 'pristine-vows',
    id: '51c8c3ba-a329-4e22-b910-049fe60e1ac9'
  },
  'crimson-soles': {
    key: 'crimson-soles',
    id: '87008205-17a0-48a1-9fd9-62fc4107d537'
  },
  'jewel-heels': {
    key: 'jewel-heels',
    id: '91bb45d8-8565-4f98-9109-8da297c85d6e'
  },
  'sophia-grace': {
    key: 'sophia-grace',
    id: '2c910946-4f12-4e9c-a152-50ce8d0988cf'
  },
  'aroma-luxe': {
    key: 'aroma-luxe',
    id: '828b6dbb-ea00-4ae0-b74b-c35c6ed088d0'
  },
  'glow-essence': {
    key: 'glow-essence',
    id: 'cbe6a6f2-f7bd-453c-97a7-495d83c9c7f5'
  },
  'luminous-bliss': {
    key: 'luminous-bliss',
    id: 'f63019ae-c533-4b67-854d-17e7dda460f8'
  },
  chantelle: {
    key: 'chantelle',
    id: 'f3943e9a-f1db-4957-9872-3bfe4c339278'
  },
  'divine-elegance': {
    key: 'divine-elegance',
    id: '0153c7bf-1668-4968-a520-37357c888346'
  },
  'olivia-de-luxe': {
    key: 'olivia-de-luxe',
    id: 'b2c6bb7a-59a5-4e4f-b8e0-0806d4ee4ad9'
  },
  'luxe-co': {
    key: 'luxe-co',
    id: '5e3cd8be-8f8f-4527-b5ce-5536cd0a4e63'
  },
  caratierre: {
    key: 'caratierre',
    id: '96397eac-bd89-49bd-bee9-6facb8438672'
  },
  'velvet-charms': {
    key: 'velvet-charms',
    id: '43de420d-5c46-489e-824c-429104cec006'
  },
  'elyse-bags': {
    key: 'elyse-bags',
    id: '5c5f15e8-454f-4ee6-97e1-1d1891b8c091'
  },
  'cherie-luxe': {
    key: 'cherie-luxe',
    id: 'a0b14769-29d0-444b-9b9b-23a02e426ec4'
  },
  'gilded-grace': {
    key: 'gilded-grace',
    id: '0b3d97b4-0d80-41f4-b7e4-6e7f26a12b49'
  },
  'scent-noire': {
    key: 'scent-noire',
    id: '172b5143-0395-4db8-a4c6-39df37f24663'
  },
  'dame-fleur': {
    key: 'dame-fleur',
    id: 'ec4f7824-2af1-4c15-8081-10f54098def7'
  },
  'la-belle': {
    key: 'la-belle',
    id: '1ae713ba-12a1-4984-9611-c13e244d87b4'
  },
  'timeless-lady': {
    key: 'timeless-lady',
    id: 'fb3693bc-68ef-4cb8-93ff-87f0ffc962e7'
  },
  'crystal-orb': {
    key: 'crystal-orb',
    id: '319157bf-5d3d-45d5-8516-fef388434435'
  },
  'radiant-moments': {
    key: 'radiant-moments',
    id: '07c12562-4200-4421-bb64-8f6392155106'
  }
} as const;

export const PARAM_KEYS = {
  PRODUCT_ID: 'product-id',
  IMAGE_SET: 'image-set',
  IMAGE_ID: 'image-id',
  PRICE: 'price',
  RATING: 'rating',
  CATEGORY: 'category',
  BRAND: 'brand',
  LIMIT: 'limit',
  PAGE: 'page',
  SORT: 'sort',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  SIZE: 'size',
  FORCE_REVALIDATE: 'force-validate'
} as const;

// Use to force validate, means the loader will get trigger
export const FORCE_REVALIDATE_MAP = {
  GLOBAL: 'global',
  SINGLE_PRODUCT: 'single-product',
  PRODUCT_REVIEW: 'product-review'
} as const;

// This is use to compute the previous params so that we can
// Decide wether the current params changes from the previous
// If changes are not detected then no need tp make any new request
// Thus save api calls
export const PRE_PARAM_KEYS = {
  PRODUCT_ID: 'pre-product-id',
  IMAGE_SET: 'pre-image-set',
  IMAGE_ID: 'pre-image-id',
  PRICE: 'pre-price',
  RATING: 'pre-rating',
  CATEGORY: 'pre-category',
  BRAND: 'pre-brand',
  LIMIT: 'pre-limit',
  PAGE: 'pre-page',
  SORT: 'pre-sort',
  CATEGORIES: 'pre-categories',
  BRANDS: 'pre-brands',
  SIZE: 'pre-size'
} as const;

// Endpoints or Routes
export const PATHS = {
  aboutUs: 'about-us',
  contactUs: 'contact-us',
  privacyPolicy: 'privacy-policy',
  termsOfService: 'terms-of-service',
  blog: 'blog',
  faq: 'faq',
  login: 'login',
  register: 'register',
  products: 'products',
  checkout: 'checkout',
  reviews: 'reviews',
  payment: 'payment',
   loginViaProviders: 'login-via-providers'
} as const;

export const PARAMS = {
  forceValidateGlobal: 'force-validate=global',
  categories: 'categories',
  redirectTo: 'redirect-to',
  error: 'error',
  utmSource: 'utm_source',
  loginViaProviders: 'login-via-providers'
} as const;
