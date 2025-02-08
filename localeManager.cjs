const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'common.notAllowedTitle': {
    en: 'Action Not Allowed',
    ja: '操作は許可されていません',
    ko: '허용되지 않은 작업',
    ar: 'الإجراء غير مسموح به',
    nl: 'Actie niet toegestaan',
    fr: 'Action non autorisée',
    zh: '操作不允许'
  },
  'common.notAllowedDescription': {
    en: 'You do not have permission to delete this item or it may no longer exist.',
    ja: 'このアイテムを削除する権限がないか、すでに存在しない可能性があります。',
    ko: '이 항목을 삭제할 권한이 없거나 더 이상 존재하지 않을 수 있습니다.',
    ar: 'ليس لديك إذن لحذف هذا العنصر أو قد لا يكون موجودًا بعد الآن.',
    nl: 'Je hebt geen toestemming om dit item te verwijderen of het bestaat mogelijk niet meer.',
    fr: "Vous n'avez pas la permission de supprimer cet élément ou il n'existe peut-être plus.",
    zh: '您没有权限删除此项目，或者它可能已不存在。'
  }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['home.text1', 'home.text2']);
