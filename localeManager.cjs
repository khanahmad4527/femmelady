const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
// addOrUpdateKeysBatch({
//   'common.categories': { en: 'Categories', ja: 'カテゴリー' }
// });

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['order.subTotal', 'order.pay']);
