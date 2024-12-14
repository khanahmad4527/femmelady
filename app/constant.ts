export const ROUTES_WITHOUT_HEADER_AND_FOOTER = new Set([
  'login',
  'register',
  'change-password',
  'reset-password'
]);

export const LANGUAGE_TO_LOCALE_LANGUAGE: Record<string, string> = {
  en: 'en-US', // English (United States)
  ja: 'ja-JP', // Japanese (Japan)
  fr: 'fr-FR', // French (France)
  de: 'de-DE', // German (Germany)
  es: 'es-ES', // Spanish (Spain)
  pt: 'pt-PT', // Portuguese (Portugal)
  it: 'it-IT', // Italian (Italy)
  nl: 'nl-NL', // Dutch (Netherlands)
  ru: 'ru-RU', // Russian (Russia)
  zh: 'zh-CN', // Chinese (Simplified, China)
  ar: 'ar-SA', // Arabic (Saudi Arabia)
  ko: 'ko-KR', // Korean (South Korea)
  hi: 'hi-IN', // Hindi (India)
  bn: 'bn-IN', // Bengali (India)
  pl: 'pl-PL', // Polish (Poland)
  tr: 'tr-TR', // Turkish (Turkey)
  sv: 'sv-SE', // Swedish (Sweden)
  da: 'da-DK', // Danish (Denmark)
  no: 'no-NO', // Norwegian (Norway)
  fi: 'fi-FI', // Finnish (Finland)
  cs: 'cs-CZ', // Czech (Czech Republic)
  ro: 'ro-RO', // Romanian (Romania)
  hu: 'hu-HU', // Hungarian (Hungary)
  th: 'th-TH', // Thai (Thailand)
  vi: 'vi-VN', // Vietnamese (Vietnam)
  id: 'id-ID', // Indonesian (Indonesia)
  ms: 'ms-MY', // Malay (Malaysia)
  tl: 'tl-PH', // Filipino (Philippines)
  he: 'he-IL', // Hebrew (Israel)
  fa: 'fa-IR', // Persian (Iran)
  ur: 'ur-PK', // Urdu (Pakistan)
  sw: 'sw-KE', // Swahili (Kenya)
  sr: 'sr-RS', // Serbian (Serbia)
  mk: 'mk-MK', // Macedonian (North Macedonia)
  uk: 'uk-UA', // Ukrainian (Ukraine)
  lv: 'lv-LV', // Latvian (Latvia)
  et: 'et-EE', // Estonian (Estonia)
  lt: 'lt-LT', // Lithuanian (Lithuania)
  sq: 'sq-AL', // Albanian (Albania)
  bg: 'bg-BG', // Bulgarian (Bulgaria)
  hr: 'hr-HR', // Croatian (Croatia)
  sl: 'sl-SI', // Slovenian (Slovenia)
  sk: 'sk-SK', // Slovak (Slovakia)
  bs: 'bs-BA', // Bosnian (Bosnia and Herzegovina)
  am: 'am-ET', // Amharic (Ethiopia)
  hy: 'hy-AM', // Armenian (Armenia)
  ka: 'ka-GE', // Georgian (Georgia)
  rw: 'rw-RW', // Kinyarwanda (Rwanda)
  ne: 'ne-NP', // Nepali (Nepal)
  si: 'si-LK', // Sinhalese (Sri Lanka)
  km: 'km-KH', // Khmer (Cambodia)
  my: 'my-MM', // Burmese (Myanmar)
  lo: 'lo-LA', // Lao (Laos)
  mn: 'mn-MN', // Mongolian (Mongolia)
  bo: 'bo-CN', // Tibetan (China)
  ps: 'ps-AF', // Pashto (Afghanistan)
  cy: 'cy-GB', // Welsh (United Kingdom)
  eu: 'eu-ES', // Basque (Spain)
  gl: 'gl-ES', // Galician (Spain)
  is: 'is-IS', // Icelandic (Iceland)
  jw: 'jw-ID', // Javanese (Indonesia)
  mr: 'mr-IN', // Marathi (India)
  ta: 'ta-IN', // Tamil (India)
  te: 'te-IN', // Telugu (India)
  kn: 'kn-IN', // Kannada (India)
  gu: 'gu-IN', // Gujarati (India)
  pa: 'pa-IN', // Punjabi (India)
  ml: 'ml-IN', // Malayalam (India)
  or: 'or-IN', // Oriya (India)
  as: 'as-IN', // Assamese (India)
  bh: 'bh-IN', // Bihari (India)
  qu: 'qu-PE', // Quechua (Peru)
  dz: 'dz-BT' // Dzongkha (Bhutan)
};

export const LOCALE_TO_LANGUAGE: Record<string, string> = {
  'en-US': 'en', // English (United States)
  'en-GB': 'en', // English (United Kingdom)
  'ja-JP': 'ja', // Japanese (Japan)
  'fr-FR': 'fr', // French (France)
  'de-DE': 'de', // German (Germany)
  'es-ES': 'es', // Spanish (Spain)
  'pt-PT': 'pt', // Portuguese (Portugal)
  'it-IT': 'it', // Italian (Italy)
  'nl-NL': 'nl', // Dutch (Netherlands)
  'ru-RU': 'ru', // Russian (Russia)
  'zh-CN': 'zh', // Chinese (Simplified, China)
  'ar-SA': 'ar', // Arabic (Saudi Arabia)
  'ko-KR': 'ko', // Korean (South Korea)
  'hi-IN': 'hi', // Hindi (India)
  'bn-IN': 'bn', // Bengali (India)
  'pl-PL': 'pl', // Polish (Poland)
  'tr-TR': 'tr', // Turkish (Turkey)
  'sv-SE': 'sv', // Swedish (Sweden)
  'da-DK': 'da', // Danish (Denmark)
  'no-NO': 'no', // Norwegian (Norway)
  'fi-FI': 'fi', // Finnish (Finland)
  'cs-CZ': 'cs', // Czech (Czech Republic)
  'ro-RO': 'ro', // Romanian (Romania)
  'hu-HU': 'hu', // Hungarian (Hungary)
  'th-TH': 'th', // Thai (Thailand)
  'vi-VN': 'vi', // Vietnamese (Vietnam)
  'id-ID': 'id', // Indonesian (Indonesia)
  'ms-MY': 'ms', // Malay (Malaysia)
  'tl-PH': 'tl', // Filipino (Philippines)
  'he-IL': 'he', // Hebrew (Israel)
  'fa-IR': 'fa', // Persian (Iran)
  'ur-PK': 'ur', // Urdu (Pakistan)
  'sw-KE': 'sw', // Swahili (Kenya)
  'sr-RS': 'sr', // Serbian (Serbia)
  'mk-MK': 'mk', // Macedonian (North Macedonia)
  'uk-UA': 'uk', // Ukrainian (Ukraine)
  'lv-LV': 'lv', // Latvian (Latvia)
  'et-EE': 'et', // Estonian (Estonia)
  'lt-LT': 'lt', // Lithuanian (Lithuania)
  'sq-AL': 'sq', // Albanian (Albania)
  'bg-BG': 'bg', // Bulgarian (Bulgaria)
  'hr-HR': 'hr', // Croatian (Croatia)
  'sl-SI': 'sl', // Slovenian (Slovenia)
  'sk-SK': 'sk', // Slovak (Slovakia)
  'bs-BA': 'bs', // Bosnian (Bosnia and Herzegovina)
  'am-ET': 'am', // Amharic (Ethiopia)
  'hy-AM': 'hy', // Armenian (Armenia)
  'ka-GE': 'ka', // Georgian (Georgia)
  'rw-RW': 'rw', // Kinyarwanda (Rwanda)
  'ne-NP': 'ne', // Nepali (Nepal)
  'si-LK': 'si', // Sinhalese (Sri Lanka)
  'km-KH': 'km', // Khmer (Cambodia)
  'my-MM': 'my', // Burmese (Myanmar)
  'lo-LA': 'lo', // Lao (Laos)
  'dz-BT': 'dz', // Dzongkha (Bhutan)
  'mn-MN': 'mn', // Mongolian (Mongolia)
  'bo-CN': 'bo', // Tibetan (China)
  'ps-AF': 'ps', // Pashto (Afghanistan)
  'cy-GB': 'cy', // Welsh (United Kingdom)
  'eu-ES': 'eu', // Basque (Spain)
  'gl-ES': 'gl', // Galician (Spain)
  'is-IS': 'is', // Icelandic (Iceland)
  'jw-ID': 'jw', // Javanese (Indonesia)
  'mr-IN': 'mr', // Marathi (India)
  'ta-IN': 'ta', // Tamil (India)
  'te-IN': 'te', // Telugu (India)
  'kn-IN': 'kn', // Kannada (India)
  'gu-IN': 'gu', // Gujarati (India)
  'pa-IN': 'pa', // Punjabi (India)
  'ml-IN': 'ml', // Malayalam (India)
  'or-IN': 'or', // Oriya (India)
  'as-IN': 'as', // Assamese (India)
  'bh-IN': 'bh', // Bihari (India)
  'qu-PE': 'qu' // Quechua (Peru)
};

export const PRODUCTS = [
  {
    name: 'Bag 1',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/b89dc4f14bb34b4dbfccb2649b1ca6ab_5000x.webp?v=1717680673',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: 'e6e9a520-6456-4fcc-a1a9-c00bffb48f1e'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '066f4f0f-9376-42a6-a2f2-4c2d0d19a042'
      },
      {
        name: 'Blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: '78eb1c3e-6077-458e-b229-5f442635e89a'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: '33721c22-73e7-471d-80a5-8a208b0f2d6d'
      }
    ],
    id: 'a9d54441-9db1-4a6f-b487-a21b61a35107'
  },
  {
    name: 'Bag 2',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPKI3782U39_9_5000x.jpg?v=1717676606',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: '4a2ec589-d583-4ed5-bbd9-0e02568ee857'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '6799331d-6ae3-40a3-aefc-2ae217191b8a'
      },
      {
        name: 'Blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: '48ed9214-8d9a-491e-bf6f-22c1ce4cca18'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: '726c4489-c0ff-47c3-9878-85e53248000b'
      }
    ],
    id: '71c3000e-9ec8-4361-a96a-c1b679673df6'
  },
  {
    name: 'Bag 3',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPKI5812P98_9_5000x.jpg?v=1719845444',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: 'b866231f-54e3-4961-8fe3-a6c9f3dca0f0'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '77328e84-de2d-440d-aedc-64ae57a09731'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: '8a7b67d0-8411-48af-8af0-a61bead6d415'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: '2af77ba4-2ed9-4abe-9000-f78afc05c2aa'
      }
    ],
    id: 'd8ee23c8-71fc-431d-80e7-643f32a1effe'
  },
  {
    name: 'Bag 4',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPK0214472I_9_5000x.jpg?v=1720540910',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: 'b0990ace-4767-4e78-878d-aa264d72ac51'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '3b5b03dd-3eec-4b96-8430-be94940bf98b'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: 'ef56626d-c6f6-4af3-b219-c331e67b7dd6'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: '013994c8-da0a-40cb-ad3e-12f3907cd2f8'
      }
    ],
    id: '3e3897b4-4757-44dd-b0e5-cf8712eea1f6'
  },
  {
    name: 'Bag 5',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPKI79813QA_9_1_5000x.jpg?v=1717677142',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: '92f7563a-ba09-42e7-97c7-63dc5302d8ab'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '7a35d66c-76bb-46a7-8332-e25f293ceb03'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: '3036e216-3a46-43b3-96df-6bc27054a172'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: 'ef3ec3fd-fdd4-4d84-b823-bb126de69082'
      }
    ],
    id: '5ab8365a-8af6-417f-8857-b2831e604067'
  },
  {
    name: 'Bag 6',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPK13367R2C_9_5000x.jpg?v=1723217530',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: 'd29b5412-2af3-49a2-b08e-1995bd31d67d'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '6cb824e7-ac68-4ee9-84d6-5e2c9b0f1f40'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: '9f591012-72c0-4179-866f-1858cd68802b'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: '9dec6ad0-a79f-454f-b395-ca3fea7c6f23'
      }
    ],
    id: 'ae745251-9473-4cb4-a079-cb3bfd535e22'
  },
  {
    name: 'Bag 7',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPKI6543Z41_9_5000x.jpg?v=1719845296',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: '6c0ef15f-c754-4e44-b64f-d5937a0e1697'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '117cf2fa-6482-455b-b2b7-e2d15181d50a'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: '5247635c-0843-4a0e-8bd4-16ee71caa5e4'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: 'be95b276-5ec0-4d06-bc3e-2bcec773355c'
      }
    ],
    id: '34f172a8-9861-47cf-8df8-875908827cc1'
  },
  {
    name: 'Bag 8',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPKI4860Y55_9_5000x.jpg?v=1719845522',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: '458c6e92-51c0-48ad-ae85-71aa21ee1138'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '1f94bf93-f840-435b-9bf6-b446ab87e355'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: '13d86268-18f3-4f99-a98b-9b238ee66bd1'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: 'ae7e130a-f853-45d4-b82f-927d8925b54f'
      }
    ],
    id: 'debb702f-d628-4bd1-80be-d086bed72494'
  },
  {
    name: 'Bag 6',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPK13367R2C_9_5000x.jpg?v=1723217530',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: '45d073f8-6f05-42df-8c19-09d7df2f57b7'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '4d54b2db-225f-41ef-bf0e-09e1b289a8a4'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: '3213ee52-cd68-4658-b03a-1009306c0370'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: '7d141d5a-2843-4796-a7ed-cbf215104617'
      }
    ],
    id: '2a0b40bc-9b1d-4fff-b701-3f90c2e20c49'
  },
  {
    name: 'Bag 5',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPKI79813QA_9_1_5000x.jpg?v=1717677142',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: '8dd518f7-8426-4711-bc9c-2a0e8e8a9440'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: '4e25ad3d-4695-4da5-82b1-5e7c472c25e9'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: 'dabacb98-039f-42fd-a3a0-2c8ebc2a34a5'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: '634c9b5b-7e08-4ab7-b982-656aad9378cf'
      }
    ],
    id: 'ca82e88f-3e8c-458c-bc44-2bd9a59d0792'
  },
  {
    name: 'Bag 6',
    image:
      'https://www.shoppingeventvip.com/cdn/shop/files/KPK13367R2C_9_5000x.jpg?v=1723217530',
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        isPattern: false,
        pattern_img: null,
        id: 'aa4158b1-c5e8-40e2-9582-e3e87e256663'
      },
      {
        name: 'Red',
        value: 'red',
        hex: '#FF0000',
        isPattern: false,
        pattern_img: null,
        id: 'de21bd2c-3776-41e6-9d7c-f4e40f2b8ad8'
      },
      {
        name: 'Blue',
        value: 'blue',
        hex: '#0000FF',
        isPattern: false,
        pattern_img: null,
        id: 'e70d98ab-064d-4f34-b8f2-aadc696126c5'
      },
      {
        name: 'Pattern',
        value: 'pattern',
        hex: null,
        isPattern: true,
        pattern_img:
          'https://unsplash.com/photos/HN9sV5JnzoM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3J1bmdlJTIwdGV4dHVyZXxlbnwwfHx8fDE3MzQwNTM1MzN8MA&force=true&w=10',
        id: 'a7453220-bfe9-4e00-afc4-5828691718fd'
      }
    ],
    id: 'b33f046c-c1e8-4e27-bbd7-193247143c93'
  }
];