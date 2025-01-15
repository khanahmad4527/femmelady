export const getMeta = ({ pathname }: { pathname: string }) => {
  const normalizedPathname = pathname.replace(/\/+$/, '');

  const baseUrl = 'https://unthaa.teicneo.com';

  const seoData = {
    en: {
      '/': [
        { title: 'Unthaa - Built on Quality, Not Numbers' },
        {
          description:
            'Explore Unthaa for the best products at amazing prices. Your one-stop online shop for all your needs.'
        },
        { 'og:title': 'Unthaa - Built on Quality, Not Numbers' },
        {
          'og:description':
            'Discover the latest and greatest products at Unthaa. Shop with confidence!'
        },
        { 'og:url': baseUrl },
        {
          'og:image': 'https://unthaa.teicneo.com/assets/home-og-image.jpg'
        },
        { 'twitter:card': 'summary_large_image' }
      ],
      '/products': [
        { title: 'Browse Products - Unthaa' },
        {
          description:
            'Browse our wide range of products across categories. Find everything you need at Unthaa.'
        },
        { 'og:title': 'Browse Products - Unthaa' },
        {
          'og:description':
            'Discover a wide selection of products at unbeatable prices on Unthaa.'
        },
        { 'og:url': `${baseUrl}/en/products` },
        { 'og:image': `${baseUrl}/assets/products-og-image.jpg` }
      ],
      '/checkout': [
        { title: 'Checkout - Secure Payment | Unthaa' },
        {
          description:
            'Securely checkout your favorite products on Unthaa. Easy, fast, and safe payment options.'
        },
        { 'og:title': 'Checkout - Unthaa' },
        {
          'og:description':
            'Securely complete your purchase on Unthaa with fast and reliable checkout.'
        },
        { 'og:url': `${baseUrl}/en/checkout` }
      ],
      '/payment': [
        { title: 'Payment - Complete Your Order | Unthaa' },
        {
          description:
            'Complete your payment securely with Unthaa. Trusted payment options to keep your transactions safe.'
        },
        { 'og:title': 'Payment - Unthaa' },
        {
          'og:description':
            'Pay with confidence on Unthaa. Secure, fast, and easy payment process.'
        },
        { 'og:url': `${baseUrl}/en/payment` }
      ],
      '/login': [
        { title: 'Login to Your Account - Unthaa' },
        {
          description:
            'Login to your Unthaa account to access your orders, wishlist, and personalized recommendations.'
        },
        { 'og:title': 'Login - Unthaa' },
        {
          'og:description':
            'Securely login to your Unthaa account and continue shopping with ease.'
        },
        { 'og:url': `${baseUrl}/en/login` }
      ],
      '/register': [
        { title: 'Create an Account - Join Unthaa' },
        {
          description:
            'Sign up for a free Unthaa account and enjoy a personalized shopping experience.'
        },
        { 'og:title': 'Register - Unthaa' },
        {
          'og:description':
            'Create an account on Unthaa to get access to exclusive deals and a personalized shopping journey.'
        },
        { 'og:url': `${baseUrl}/en/register` }
      ]
    },
    ja: {
      '/': [
        { title: 'Unthaa - 数ではなく品質に基づいて構築' },
        {
          description:
            'Unthaaで最高の商品を驚くべき価格で見つけてください。すべてのニーズに応えるワンストップオンラインショップ。'
        },
        { 'og:title': 'Unthaa - 数ではなく品質に基づいて構築' },
        {
          'og:description':
            'Unthaaで最新かつ最高の商品を発見してください。自信を持ってショッピングをお楽しみください！'
        },
        { 'og:url': baseUrl },
        { 'og:image': 'https://unthaa.teicneo.com/assets/home-og-image.jpg' },
        { 'twitter:card': 'summary_large_image' }
      ],
      '/products': [
        { title: '製品を見る - Unthaa' },
        {
          description:
            'カテゴリごとの幅広い製品をご覧ください。Unthaaで必要なすべてのものを見つけてください。'
        },
        { 'og:title': '製品を見る - Unthaa' },
        {
          'og:description':
            'Unthaaで比類のない価格で豊富な製品を発見してください。'
        },
        { 'og:url': `${baseUrl}/ja/products` },
        { 'og:image': `${baseUrl}/assets/products-og-image.jpg` }
      ],
      '/checkout': [
        { title: 'チェックアウト - 安全な支払い | Unthaa' },
        {
          description:
            'Unthaaでお気に入りの商品を安全にチェックアウトしてください。簡単で迅速、安全な支払いオプション。'
        },
        { 'og:title': 'チェックアウト - Unthaa' },
        {
          'og:description':
            'Unthaaで迅速で信頼できるチェックアウトを使用して購入を安全に完了してください。'
        },
        { 'og:url': `${baseUrl}/ja/checkout` }
      ],
      '/payment': [
        { title: '支払い - 注文を完了 | Unthaa' },
        {
          description:
            'Unthaaで安全にお支払いを完了してください。取引を安全に保つ信頼できる支払いオプション。'
        },
        { 'og:title': '支払い - Unthaa' },
        {
          'og:description':
            'Unthaaで安心してお支払いください。安全、迅速、簡単な支払いプロセス。'
        },
        { 'og:url': `${baseUrl}/ja/payment` }
      ],
      '/login': [
        { title: 'アカウントにログイン - Unthaa' },
        {
          description:
            'Unthaaアカウントにログインして、注文、ウィッシュリスト、パーソナライズされた推奨事項にアクセスしてください。'
        },
        { 'og:title': 'ログイン - Unthaa' },
        {
          'og:description':
            'Unthaaアカウントに安全にログインして、簡単にショッピングを続けましょう。'
        },
        { 'og:url': `${baseUrl}/ja/login` }
      ],
      '/register': [
        { title: 'アカウントを作成 - Unthaaに参加' },
        {
          description:
            '無料のUnthaaアカウントにサインアップして、パーソナライズされたショッピング体験をお楽しみください。'
        },
        { 'og:title': '登録 - Unthaa' },
        {
          'og:description':
            'Unthaaにアカウントを作成して、限定のお得な情報やパーソナライズされたショッピング体験にアクセスしてください。'
        },
        { 'og:url': `${baseUrl}/ja/register` }
      ]
    },
    ar: {
      '/': [
        { title: 'Unthaa - مبني على الجودة، وليس الأرقام' },
        {
          description:
            'استكشف Unthaa للحصول على أفضل المنتجات بأسعار مذهلة. متجرك الشامل عبر الإنترنت لجميع احتياجاتك.'
        },
        { 'og:title': 'Unthaa - مبني على الجودة، وليس الأرقام' },
        {
          'og:description': 'اكتشف أحدث وأفضل المنتجات على Unthaa. تسوق بثقة!'
        },
        { 'og:url': baseUrl },
        { 'og:image': 'https://unthaa.teicneo.com/assets/home-og-image.jpg' },
        { 'twitter:card': 'summary_large_image' }
      ],
      '/products': [
        { title: 'تصفح المنتجات - Unthaa' },
        {
          description:
            'تصفح مجموعة واسعة من المنتجات عبر الفئات. اعثر على كل ما تحتاجه على Unthaa.'
        },
        { 'og:title': 'تصفح المنتجات - Unthaa' },
        {
          'og:description':
            'اكتشف مجموعة متنوعة من المنتجات بأسعار لا تقبل المنافسة على Unthaa.'
        },
        { 'og:url': `${baseUrl}/ar/products` },
        { 'og:image': `${baseUrl}/assets/products-og-image.jpg` }
      ],
      '/checkout': [
        { title: 'إتمام الدفع - الدفع الآمن | Unthaa' },
        {
          description:
            'قم بإتمام الدفع لمنتجاتك المفضلة على Unthaa بأمان. خيارات دفع سهلة وسريعة وآمنة.'
        },
        { 'og:title': 'إتمام الدفع - Unthaa' },
        {
          'og:description':
            'قم بإكمال عملية الشراء على Unthaa بأمان باستخدام عملية دفع سريعة وموثوقة.'
        },
        { 'og:url': `${baseUrl}/ar/checkout` }
      ],
      '/payment': [
        { title: 'الدفع - أكمل طلبك | Unthaa' },
        {
          description:
            'أكمل عملية الدفع بأمان على Unthaa. خيارات دفع موثوقة للحفاظ على معاملاتك آمنة.'
        },
        { 'og:title': 'الدفع - Unthaa' },
        {
          'og:description':
            'قم بالدفع بثقة على Unthaa. عملية دفع آمنة وسريعة وسهلة.'
        },
        { 'og:url': `${baseUrl}/ar/payment` }
      ],
      '/login': [
        { title: 'تسجيل الدخول إلى حسابك - Unthaa' },
        {
          description:
            'سجل الدخول إلى حسابك على Unthaa للوصول إلى طلباتك وقائمة الأمنيات والتوصيات المخصصة.'
        },
        { 'og:title': 'تسجيل الدخول - Unthaa' },
        {
          'og:description':
            'قم بتسجيل الدخول بأمان إلى حسابك على Unthaa واستمر في التسوق بسهولة.'
        },
        { 'og:url': `${baseUrl}/ar/login` }
      ],
      '/register': [
        { title: 'إنشاء حساب - انضم إلى Unthaa' },
        {
          description:
            'اشترك للحصول على حساب مجاني على Unthaa واستمتع بتجربة تسوق مخصصة.'
        },
        { 'og:title': 'التسجيل - Unthaa' },
        {
          'og:description':
            'قم بإنشاء حساب على Unthaa للوصول إلى العروض الحصرية وتجربة تسوق مخصصة.'
        },
        { 'og:url': `${baseUrl}/ar/register` }
      ]
    },
    fr: {
      '/': [
        { title: 'Unthaa - Basé sur la qualité, pas sur les chiffres' },
        {
          description:
            'Découvrez Unthaa pour les meilleurs produits à des prix incroyables. Votre boutique en ligne tout-en-un pour tous vos besoins.'
        },
        { 'og:title': 'Unthaa - Basé sur la qualité, pas sur les chiffres' },
        {
          'og:description':
            'Découvrez les derniers et meilleurs produits sur Unthaa. Achetez en toute confiance !'
        },
        { 'og:url': baseUrl },
        { 'og:image': 'https://unthaa.teicneo.com/assets/home-og-image.jpg' },
        { 'twitter:card': 'summary_large_image' }
      ],
      '/products': [
        { title: 'Parcourir les produits - Unthaa' },
        {
          description:
            'Parcourez notre large gamme de produits dans différentes catégories. Trouvez tout ce dont vous avez besoin sur Unthaa.'
        },
        { 'og:title': 'Parcourir les produits - Unthaa' },
        {
          'og:description':
            'Découvrez une vaste sélection de produits à des prix imbattables sur Unthaa.'
        },
        { 'og:url': `${baseUrl}/fr/products` },
        { 'og:image': `${baseUrl}/assets/products-og-image.jpg` }
      ],
      '/checkout': [
        { title: 'Paiement - Paiement sécurisé | Unthaa' },
        {
          description:
            'Payez vos produits préférés sur Unthaa en toute sécurité. Options de paiement simples, rapides et sûres.'
        },
        { 'og:title': 'Paiement - Unthaa' },
        {
          'og:description':
            'Finalisez votre achat sur Unthaa en toute sécurité avec un paiement rapide et fiable.'
        },
        { 'og:url': `${baseUrl}/fr/checkout` }
      ],
      '/payment': [
        { title: 'Paiement - Finalisez votre commande | Unthaa' },
        {
          description:
            'Finalisez votre paiement en toute sécurité sur Unthaa. Options de paiement fiables pour sécuriser vos transactions.'
        },
        { 'og:title': 'Paiement - Unthaa' },
        {
          'og:description':
            'Payez en toute confiance sur Unthaa. Processus de paiement sécurisé, rapide et simple.'
        },
        { 'og:url': `${baseUrl}/fr/payment` }
      ],
      '/login': [
        { title: 'Connexion à votre compte - Unthaa' },
        {
          description:
            'Connectez-vous à votre compte Unthaa pour accéder à vos commandes, à votre liste de souhaits et à des recommandations personnalisées.'
        },
        { 'og:title': 'Connexion - Unthaa' },
        {
          'og:description':
            'Connectez-vous en toute sécurité à votre compte Unthaa et continuez vos achats facilement.'
        },
        { 'og:url': `${baseUrl}/fr/login` }
      ],
      '/register': [
        { title: 'Créer un compte - Rejoignez Unthaa' },
        {
          description:
            "Inscrivez-vous pour obtenir un compte gratuit sur Unthaa et profitez d'une expérience d'achat personnalisée."
        },
        { 'og:title': 'Inscription - Unthaa' },
        {
          'og:description':
            "Créez un compte sur Unthaa pour accéder à des offres exclusives et vivre une expérience d'achat sur mesure."
        },
        { 'og:url': `${baseUrl}/fr/register` }
      ]
    },
    nl: {
      '/': [
        { title: 'Unthaa - Gebouwd op kwaliteit, niet op kwantiteit' },
        {
          description:
            'Ontdek Unthaa voor de beste producten tegen geweldige prijzen. Uw one-stop online winkel voor al uw behoeften.'
        },
        { 'og:title': 'Unthaa - Gebouwd op kwaliteit, niet op kwantiteit' },
        {
          'og:description':
            'Ontdek de nieuwste en beste producten bij Unthaa. Winkel met vertrouwen!'
        },
        { 'og:url': baseUrl },
        { 'og:image': 'https://unthaa.teicneo.com/assets/home-og-image.jpg' },
        { 'twitter:card': 'summary_large_image' }
      ],
      '/products': [
        { title: 'Producten bekijken - Unthaa' },
        {
          description:
            'Blader door ons brede assortiment producten in verschillende categorieën. Vind alles wat u nodig heeft bij Unthaa.'
        },
        { 'og:title': 'Producten bekijken - Unthaa' },
        {
          'og:description':
            'Ontdek een ruime keuze aan producten tegen onverslaanbare prijzen bij Unthaa.'
        },
        { 'og:url': `${baseUrl}/nl/products` },
        { 'og:image': `${baseUrl}/assets/products-og-image.jpg` }
      ],
      '/checkout': [
        { title: 'Afrekenen - Veilig betalen | Unthaa' },
        {
          description:
            'Reken uw favoriete producten veilig af bij Unthaa. Eenvoudige, snelle en veilige betalingsopties.'
        },
        { 'og:title': 'Afrekenen - Unthaa' },
        {
          'og:description':
            'Voltooi uw aankoop veilig bij Unthaa met een snelle en betrouwbare afrekenprocedure.'
        },
        { 'og:url': `${baseUrl}/nl/checkout` }
      ],
      '/payment': [
        { title: 'Betaling - Voltooi uw bestelling | Unthaa' },
        {
          description:
            'Voltooi uw betaling veilig met Unthaa. Betrouwbare betalingsopties om uw transacties te beveiligen.'
        },
        { 'og:title': 'Betaling - Unthaa' },
        {
          'og:description':
            'Betaal met vertrouwen bij Unthaa. Veilige, snelle en eenvoudige betalingsprocessen.'
        },
        { 'og:url': `${baseUrl}/nl/payment` }
      ],
      '/login': [
        { title: 'Inloggen op uw account - Unthaa' },
        {
          description:
            'Log in op uw Unthaa-account om toegang te krijgen tot uw bestellingen, verlanglijst en persoonlijke aanbevelingen.'
        },
        { 'og:title': 'Inloggen - Unthaa' },
        {
          'og:description':
            'Log veilig in op uw Unthaa-account en ga eenvoudig door met winkelen.'
        },
        { 'og:url': `${baseUrl}/nl/login` }
      ],
      '/register': [
        { title: 'Maak een account aan - Word lid van Unthaa' },
        {
          description:
            'Meld u aan voor een gratis Unthaa-account en geniet van een persoonlijke winkelervaring.'
        },
        { 'og:title': 'Registreren - Unthaa' },
        {
          'og:description':
            'Maak een account aan bij Unthaa en krijg toegang tot exclusieve aanbiedingen en een op maat gemaakte winkelervaring.'
        },
        { 'og:url': `${baseUrl}/nl/register` }
      ]
    }
  } as Record<string, any>;

  const language = normalizedPathname.split('/')[1] || 'en'; // Extract the language code (default to 'en')
  const route = normalizedPathname.replace(`/${language}`, '') || '/'; // Normalize the route

  // Get SEO data for the current route and language
  const seoEntries = seoData[language]?.[route];

  if (!seoEntries) {
    let notFoundData;

    switch (language) {
      case 'en':
        notFoundData = [
          { title: 'Unthaa - Page Not Found' },
          { description: 'The page you are looking for does not exist.' }
        ];
        break;

      case 'ja':
        notFoundData = [
          { title: 'Unthaa - ページが見つかりません' },
          { description: 'お探しのページは存在しません。' }
        ];
        break;

      case 'ar':
        notFoundData = [
          { title: 'Unthaa - الصفحة غير موجودة' },
          { description: 'الصفحة التي تبحث عنها غير موجودة.' }
        ];
        break;

      case 'fr':
        notFoundData = [
          { title: 'Unthaa - Page non trouvée' },
          { description: 'La page que vous recherchez est introuvable.' }
        ];
        break;

      case 'nl':
        notFoundData = [
          { title: 'Unthaa - Pagina niet gevonden' },
          { description: 'De pagina die u zoekt, bestaat niet.' }
        ];
        break;

      default:
        // Fallback to English if language is not supported
        notFoundData = [
          { title: 'Unthaa - Page Not Found' },
          { description: 'The page you are looking for does not exist.' }
        ];
    }

    return notFoundData;
  }

  if (Array.isArray(seoEntries)) {
    return seoEntries;
  }

  return [
    { title: 'Unthaa - Built on Quality, Not Numbers' },
    {
      description:
        'Explore Unthaa for the best products at amazing prices. Your one-stop online shop for all your needs.'
    },
    { 'og:title': 'Unthaa - Built on Quality, Not Numbers' },
    {
      'og:description':
        'Discover the latest and greatest products at Unthaa. Shop with confidence!'
    },
    { 'og:url': baseUrl },
    {
      'og:image': 'https://unthaa.teicneo.com/assets/home-og-image.jpg'
    },
    { 'twitter:card': 'summary_large_image' }
  ];
};
