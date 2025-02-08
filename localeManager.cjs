const {
  addOrUpdateKeysBatch,
  deleteKeysBatch
} = require('./app/locales/localesHandler.cjs');

// Add or update multiple keys at once
addOrUpdateKeysBatch({
  'header.profile': {
    en: 'Profile',
    ja: 'プロフィール',
    ko: '프로필',
    ar: 'الملف الشخصي',
    nl: 'Profiel',
    fr: 'Profil',
    zh: '个人资料'
  },
  'header.orders': {
    en: 'Orders',
    ja: '注文',
    ko: '주문',
    ar: 'الطلبات',
    nl: 'Bestellingen',
    fr: 'Commandes',
    zh: '订单'
  },
  'header.logout': {
    en: 'Logout',
    ja: 'ログアウト',
    ko: '로그아웃',
    ar: 'تسجيل الخروج',
    nl: 'Uitloggen',
    fr: 'Déconnexion',
    zh: '退出'
  }
});

// Delete multiple keys at once
// deleteKeysBatch(['order.subTotal', 'order.pay'], ['en', 'ja']);

// Delete keys across all languages
// deleteKeysBatch(['home.text1', 'home.text2']);
