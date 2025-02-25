const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'common.continueWithGoogle': {
    en: 'Please continue with Google',
    ja: 'Googleで続行してください',
    ko: 'Google로 계속하십시오',
    ar: 'يرجى المتابعة باستخدام جوجل',
    nl: 'Ga door met Google',
    fr: 'Veuillez continuer avec Google',
    zh: '请使用Google继续'
  }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['home.text1', 'home.text2']);
