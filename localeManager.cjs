const {
  addOrUpdateKeys,
  deleteKeys
} = require('./app/locales/localesHandler.cjs');

// Example Usage

// Add or update keys for multiple languages
// addOrUpdateKeys('header.newFeature', {
//   en: 'New Feature',
//   ja: '新機能',
// });

// Delete keys for specific languages
// deleteKeys('header.newFeature', ['en', 'ja']);

// Delete keys across all languages
// deleteKeys('header.newFeature');
