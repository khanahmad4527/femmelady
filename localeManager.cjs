const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
// addOrUpdateKeysBatch({
//   'order.summary': { en: 'Order Summary', ja: '注文概要' },
// });

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['order.subTotal', 'order.pay']);
