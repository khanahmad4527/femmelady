const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
// addOrUpdateKeysBatch({
//   'order.summary': { en: 'Order Summary', ja: '注文概要' },
//   'order.subTotal': { en: 'SubTotal', ja: '小計' },
//   'order.total': { en: 'Total', ja: '合計' },
//   'order.pay': { en: 'Pay', ja: '支払う' },
//   'cart.checkout': { en: 'Go to Checkout', ja: 'チェックアウトに進む' },
// });

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['order.subTotal', 'order.pay']);
