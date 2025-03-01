const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'turnstile.errorDescription': {
    en: 'Captcha failed. Please try again.',
    ja: 'キャプチャに失敗しました。もう一度お試しください。',
    ko: '캡차 실패. 다시 시도해 주세요.',
    ar: 'فشل الكابتشا. يرجى المحاولة مرة أخرى.',
    nl: 'Captcha mislukt. Probeer het opnieuw.',
    fr: 'Échec du captcha. Veuillez réessayer.',
    zh: '验证码失败。请再试一次。'
  }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['turnstile.errorDescription', 'home.text2']);
