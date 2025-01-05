const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'cart.notificationTitle': {
    en: 'Item Added to Cart!',
    ja: 'アイテムがカートに追加されました！'
  },
  'cart.notificationMessage': {
    en: 'Your item has been successfully added to the cart. Happy shopping!',
    ja: 'アイテムは正常にカートに追加されました。楽しいショッピングを！'
  }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['order.subTotal', 'order.pay']);
