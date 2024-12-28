const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'products.filter.weddingDresses': { en: 'Wedding Dresses', ja: 'ウェディングドレス' },
  'products.filter.shoes': { en: 'Shoes', ja: '靴' },
  'products.filter.candles': { en: 'Candles', ja: 'キャンドル' },
  'products.filter.dresses': { en: 'Dresses', ja: 'ドレス' },
  'products.filter.jewelry': { en: 'Jewelry', ja: 'ジュエリー' },
  'products.filter.bags': { en: 'Bags', ja: 'バッグ' },
  'products.filter.perfumes': { en: 'Perfumes', ja: '香水' },
  'products.filter.watches': { en: 'Watches', ja: '時計' }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['order.subTotal', 'order.pay']);
