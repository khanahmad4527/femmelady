export const ROUTES_WITHOUT_HEADER_AND_FOOTER = new Set([
  'login',
  'register',
  'change-password',
  'reset-password'
]);

export const LANGUAGE_TO_LOCALE_LANGUAGE: Record<string, string> = {
  en: 'en-US', // English
  ja: 'ja-JP', // Japanese
  fr: 'fr-FR', // French
  de: 'de-DE' // German
};
