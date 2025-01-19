import en from './en.json';
import ar from './ar.json';
import ja from './ja.json';
import nl from './nl.json';
import fr from './fr.json';
import { Product, ProductTranslation } from '~/types';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { getImageUrl } from '~/utils';

const base = [
  { title: 'Unthaa - Built on Quality, Not Numbers' },
  {
    description:
      'Explore Unthaa for the best products at amazing prices. Your one-stop online shop for all your needs.'
  },
  { 'og:title': 'Unthaa - Built on Quality, Not Numbers' },
  {
    'og:description':
      'Discover the latest and greatest products at Unthaa. Shop with confidence!'
  },
  { 'og:url': 'https://unthaa.teicneo.com' },
  {
    'og:image': 'https://unthaa.teicneo.com/assets/home-og-image.jpg'
  },
  { 'twitter:card': 'summary_large_image' }
];

const notFound = {
  en: [
    { title: 'Unthaa - Page Not Found' },
    { description: 'The page you are looking for does not exist.' }
  ],
  ja: [
    { title: 'Unthaa - ページが見つかりません' },
    { description: 'お探しのページは存在しません。' }
  ],
  ar: [
    { title: 'Unthaa - الصفحة غير موجودة' },
    { description: 'الصفحة التي تبحث عنها غير موجودة.' }
  ],
  fr: [
    { title: 'Unthaa - Page non trouvée' },
    { description: 'La page que vous recherchez est introuvable.' }
  ],
  nl: [
    { title: 'Unthaa - Pagina niet gevonden' },
    { description: 'De pagina die u zoekt, bestaat niet.' }
  ]
};

export const getMeta = ({ pathname }: { pathname: string }) => {
  const normalizedPathname = pathname.replace(/\/+$/, '');

  const seoData = {
    en: en,
    ja: ja,
    ar: ar,
    fr: fr,
    nl: nl
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
  product
}: {
  pathname: string;
  product: Product;
}) => {
  const normalizedPathname = pathname.replace(/\/+$/, '');

  const productTranslation = getFirstObjectDto(
    product?.translations
  ) as ProductTranslation;

  const seoData = {
    en: [
      { title: `${productTranslation?.title} - Buy Now on Unthaa` },
      {
        description: `Get ${productTranslation?.title} for just $${product.price}. High-quality and trusted by thousands. Available now on Unthaa.`
      },
      { 'og:title': `${productTranslation?.title} - Unthaa` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.unthaa.com/product/${product.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string
        })
      }
    ],
    nl: [
      { title: `${productTranslation?.title} - Nu kopen op Unthaa` },
      {
        description: `Koop ${productTranslation?.title} voor slechts $${product.price}. Hoogwaardige kwaliteit, vertrouwd door duizenden. Nu beschikbaar op Unthaa.`
      },
      { 'og:title': `${productTranslation?.title} - Unthaa` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.unthaa.com/product/${product.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string
        })
      }
    ],
    fr: [
      { title: `${productTranslation?.title} - Achetez maintenant sur Unthaa` },
      {
        description: `Obtenez ${productTranslation?.title} pour seulement $${product.price}. Haute qualité et approuvé par des milliers. Disponible maintenant sur Unthaa.`
      },
      { 'og:title': `${productTranslation?.title} - Unthaa` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.unthaa.com/product/${product.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string
        })
      }
    ],
    ja: [
      { title: `${productTranslation?.title} - Unthaaで今すぐ購入` },
      {
        description: `${productTranslation?.title}をたったの$${product.price}で手に入れよう。高品質で多くの人々に信頼されています。今すぐUnthaaで購入可能です。`
      },
      { 'og:title': `${productTranslation?.title} - Unthaa` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.unthaa.com/product/${product.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string
        })
      }
    ],
    ar: [
      { title: `${productTranslation?.title} - اشترِ الآن من Unthaa` },
      {
        description: `احصل على ${productTranslation?.title} مقابل فقط $${product.price}. جودة عالية وموثوق به من قبل الآلاف. متوفر الآن على Unthaa.`
      },
      { 'og:title': `${productTranslation?.title} - Unthaa` },
      { 'og:description': productTranslation?.description },
      { 'og:url': `https://www.unthaa.com/product/${product.id}` },
      {
        'og:image': getImageUrl({
          id: product?.feature_image_1 as string
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
