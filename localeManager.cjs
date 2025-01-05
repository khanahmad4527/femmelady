const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'common.errors': {
    en: 'Errors',
    ja: 'エラー'
  }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['order.subTotal', 'order.pay']);
