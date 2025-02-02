const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
// addOrUpdateKeysBatch({
//   'cart.errors.cartIdRequired': {
//     en: 'Cart ID is required',
//     ja: 'カートIDは必須です'
//   },
//   'cart.errors.cartIdInvalid': {
//     en: 'Cart ID must be a valid UUID',
//     ja: 'カートIDは有効なUUIDである必要があります'
//   },
//   'cart.errors.intentRequired': {
//     en: 'Intent is required',
//     ja: 'インテントは必須です'
//   }
// });

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['home.text1', 'home.text2']);
