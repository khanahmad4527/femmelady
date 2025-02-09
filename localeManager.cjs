const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'common.loginRequireTitle': {
    en: 'Action Requires Login',
    ja: '操作にはログインが必要です',
    ko: '작업을 수행하려면 로그인해야 합니다',
    ar: 'الإجراء يتطلب تسجيل الدخول',
    nl: 'Actie vereist inloggen',
    fr: "L'action nécessite une connexion",
    zh: '操作需要登录'
  },
  'common.loginRequireDescription': {
    en: 'Please sign in to continue.',
    ja: '続行するにはサインインしてください。',
    ko: '계속하려면 로그인하세요.',
    ar: 'يرجى تسجيل الدخول للمتابعة.',
    nl: 'Meld u aan om door te gaan.',
    fr: 'Veuillez vous connecter pour continuer.',
    zh: '请登录以继续。'
  }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['home.text1', 'home.text2']);
