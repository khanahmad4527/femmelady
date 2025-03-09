import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { Env, Product, ProductTranslation } from '~/types';
import { getImageUrl } from '~/utils';

import ar from './ar.json';
import en from './en.json';
import fr from './fr.json';
import ja from './ja.json';
import ko from './ko.json';
import nl from './nl.json';
import zh from './zh.json';

const base = [
  { title: 'FemmeLady - Built on Quality, Not Numbers' },
  {
    description:
      'Explore FemmeLady for the best products at amazing prices. Your one-stop online shop for all your needs.'
  },
  { 'og:title': 'FemmeLady - Built on Quality, Not Numbers' },
  {
    'og:description':
      'Discover the latest and greatest products at FemmeLady. Shop with confidence!'
  },
  { 'og:url': 'https://femmelady.store' },
  {
    'og:image': 'https://assets.femmelady.store/femmelady.jpeg'
  },
  { 'twitter:card': 'summary' }
];

const notFound = {
  en: [
    { title: 'FemmeLady - Page Not Found' },
    { description: 'The page you are looking for does not exist.' }
  ],
  ja: [
    { title: 'FemmeLady - ページが見つかりません' },
    { description: 'お探しのページは存在しません。' }
  ],
  ar: [
    { title: 'FemmeLady - الصفحة غير موجودة' },
    { description: 'الصفحة التي تبحث عنها غير موجودة.' }
  ],
  fr: [
    { title: 'FemmeLady - Page non trouvée' },
    { description: 'La page que vous recherchez est introuvable.' }
  ],
  nl: [
    { title: 'FemmeLady - Pagina niet gevonden' },
    { description: 'De pagina die u zoekt, bestaat niet.' }
  ],
  ko: [
    { title: 'FemmeLady - 페이지를 찾을 수 없습니다' },
    { description: '찾고 있는 페이지는 존재하지 않습니다.' }
  ],
  zh: [
    { title: 'FemmeLady - 页面未找到' },
    { description: '您正在查找的页面不存在。' }
  ]
};

export const getMeta = ({ pathname }: { pathname: string }) => {
  const normalizedPathname = pathname.replace(/\/+$/, '');

  const seoData = {
    en: en,
    ja: ja,
    ar: ar,
    fr: fr,
    nl: nl,
    zh: zh,
    ko: ko
  } as Record<string, typeof en>;

  const language = (normalizedPathname.split('/')[1] ||
    'en') as keyof typeof seoData; // Ensure language is valid
  const route = normalizedPathname.replace(`/${language}`, '') || '/'; // Normalize route

  // Check if the language exists in seoData
  const seoEntries = seoData[language]?.[route as keyof typeof en];

  if (!seoEntries) {
    let notFoundData;

    switch (language) {
      case 'en':
        notFoundData = notFound.en;
        break;

      case 'ja':
        notFoundData = notFound.ja;
        break;

      case 'ar':
        notFoundData = notFound.ar;
        break;

      case 'fr':
        notFoundData = notFound.fr;
        break;

      case 'nl':
        notFoundData = notFound.nl;
        break;

      case 'ko':
        notFoundData = notFound.ko;
        break;

      case 'zh':
        notFoundData = notFound.zh;
        break;

      default:
        // Fallback to English if language is not supported
        notFoundData = notFound.en;
    }

    return notFoundData;
  }

  if (Array.isArray(seoEntries)) {
    return seoEntries;
  }

  return base;
};

export const getSingleProductPageMeta = ({
  pathname,
  product,
  env
}: {
  pathname: string;
  product: Product;
  env: Partial<Env>;
}) => {
  const normalizedPathname = pathname.replace(/\/+$/, '');

  const productTranslation = getFirstObjectDto(
    product?.translations
  ) as ProductTranslation;

  const seoData = {
    en: [
      { title: `${productTranslation?.title} - Buy Now on FemmeLady` },
      {
        description: `Get ${productTranslation?.title} for just $${product?.price}. High-quality and trusted by thousands. Available now on FemmeLady.`
      },
      { 'og:title': `${productTranslation?.title} - FemmeLady` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.femmelady.com/product/${product?.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string,
          url: env?.CDN_URL
        })
      }
    ],
    nl: [
      { title: `${productTranslation?.title} - Nu kopen op FemmeLady` },
      {
        description: `Koop ${productTranslation?.title} voor slechts $${product?.price}. Hoogwaardige kwaliteit, vertrouwd door duizenden. Nu beschikbaar op FemmeLady.`
      },
      { 'og:title': `${productTranslation?.title} - FemmeLady` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.femmelady.com/product/${product?.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string,
          url: env?.CDN_URL
        })
      }
    ],
    fr: [
      {
        title: `${productTranslation?.title} - Achetez maintenant sur FemmeLady`
      },
      {
        description: `Obtenez ${productTranslation?.title} pour seulement $${product?.price}. Haute qualité et approuvé par des milliers. Disponible maintenant sur FemmeLady.`
      },
      { 'og:title': `${productTranslation?.title} - FemmeLady` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.femmelady.com/product/${product?.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string,
          url: env?.CDN_URL
        })
      }
    ],
    ja: [
      { title: `${productTranslation?.title} - Unthaaで今すぐ購入` },
      {
        description: `${productTranslation?.title}をたったの$${product?.price}で手に入れよう。高品質で多くの人々に信頼されています。今すぐUnthaaで購入可能です。`
      },
      { 'og:title': `${productTranslation?.title} - FemmeLady` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.femmelady.com/product/${product?.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string,
          url: env?.CDN_URL
        })
      }
    ],
    ar: [
      { title: `${productTranslation?.title} - اشترِ الآن من FemmeLady` },
      {
        description: `احصل على ${productTranslation?.title} مقابل فقط $${product?.price}. جودة عالية وموثوق به من قبل الآلاف. متوفر الآن على FemmeLady.`
      },
      { 'og:title': `${productTranslation?.title} - FemmeLady` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.femmelady.com/product/${product?.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string,
          url: env?.CDN_URL
        })
      }
    ],
    ko: [
      { title: `${productTranslation?.title} - Unthaa에서 지금 구매` },
      {
        description: `${productTranslation?.title}를 단 $${product?.price}에 구매하세요. 고품질이며 수천 명이 신뢰하는 제품입니다. 지금 Unthaa에서 구매 가능합니다.`
      },
      { 'og:title': `${productTranslation?.title} - FemmeLady` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.femmelady.com/product/${product?.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string,
          url: env?.CDN_URL
        })
      }
    ],
    zh: [
      { title: `${productTranslation?.title} - 立即在Unthaa购买` },
      {
        description: `仅需$${product?.price}即可获得${productTranslation?.title}。高质量且受到数千人信任。现在即可在Unthaa购买。`
      },
      { 'og:title': `${productTranslation?.title} - FemmeLady` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.femmelady.com/product/${product?.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string,
          url: env?.CDN_URL
        })
      }
    ]
  } as Record<string, any>;

  const language = normalizedPathname.split('/')[1] || 'en'; // Extract the language code (default to 'en')

  // Get SEO data for the current route and language
  const seoEntries = seoData[language];

  if (!seoEntries) {
    let notFoundData;

    switch (language) {
      case 'en':
        notFoundData = notFound.en;
        break;

      case 'ja':
        notFoundData = notFound.ja;
        break;

      case 'ar':
        notFoundData = notFound.ar;
        break;

      case 'fr':
        notFoundData = notFound.fr;
        break;

      case 'nl':
        notFoundData = notFound.nl;
        break;

      case 'ko':
        notFoundData = notFound.ko;
        break;

      case 'zh':
        notFoundData = notFound.zh;
        break;

      default:
        // Fallback to English if language is not supported
        notFoundData = notFound.en;
    }

    return notFoundData;
  }

  if (Array.isArray(seoEntries)) {
    return seoEntries;
  }

  return base;
};
