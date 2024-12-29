const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'common.scrollToTop': { en: 'Scroll to top', ja: '上にスクロール' }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['order.subTotal', 'order.pay']);
