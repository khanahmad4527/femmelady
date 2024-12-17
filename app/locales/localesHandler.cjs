const fs = require('fs');
const path = require('path');

const LOCALE_DIR = path.resolve(__dirname);

// Utility to get all locale files
const getLocaleFiles = () => {
  return fs.readdirSync(LOCALE_DIR).filter(file => file.endsWith('.json'));
};

// Utility to load a locale file
const loadLocaleFile = filePath => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Utility to save changes to a locale file
const saveLocaleFile = (filePath, content) => {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
};

// Recursively set a key path in a JSON object
const setKey = (obj, keyPath, value) => {
  let current = obj;
  keyPath.forEach((key, index) => {
    if (index === keyPath.length - 1) {
      current[key] = value; // Set value at the final key
    } else {
      current[key] = current[key] || {}; // Ensure nested object exists
      current = current[key];
    }
  });
};

// Recursively delete a key path in a JSON object
const deleteKey = (obj, keyPath) => {
  let current = obj;
  for (let i = 0; i < keyPath.length - 1; i++) {
    current = current[keyPath[i]];
    if (!current) return; // Key path doesn't exist
  }
  delete current[keyPath[keyPath.length - 1]];
};

// Function to add or update multiple keys at once
const addOrUpdateKeysBatch = keysWithValues => {
  const localeFiles = getLocaleFiles();

  Object.entries(keysWithValues).forEach(([key, values]) => {
    const keyPath = key.split('.');
    Object.entries(values).forEach(([locale, value]) => {
      const fileName = `${locale}.json`;
      if (localeFiles.includes(fileName)) {
        const filePath = path.join(LOCALE_DIR, fileName);
        const localeData = loadLocaleFile(filePath);
        setKey(localeData, keyPath, value);
        saveLocaleFile(filePath, localeData);
        console.log(`Updated "${key}" in ${fileName} with value: "${value}"`);
      } else {
        console.warn(`Locale file for "${locale}" not found.`);
      }
    });
  });
};

// Function to delete multiple keys at once
const deleteKeysBatch = (keysToDelete, locales) => {
  const localeFiles = getLocaleFiles();
  const targetLocales =
    locales || localeFiles.map(file => file.replace('.json', ''));

  keysToDelete.forEach(key => {
    const keyPath = key.split('.');
    targetLocales.forEach(locale => {
      const fileName = `${locale}.json`;
      if (localeFiles.includes(fileName)) {
        const filePath = path.join(LOCALE_DIR, fileName);
        const localeData = loadLocaleFile(filePath);
        deleteKey(localeData, keyPath);
        saveLocaleFile(filePath, localeData);
        console.log(`Deleted "${key}" in ${fileName}`);
      } else {
        console.warn(`Locale file for "${locale}" not found.`);
      }
    });
  });
};

module.exports = {
  addOrUpdateKeysBatch,
  deleteKeysBatch
};
