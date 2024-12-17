const fs = require('fs');
const path = require('path');

const LOCALE_DIR = path.resolve(__dirname);

// Utility to get all locale files
function getLocaleFiles() {
  return fs.readdirSync(LOCALE_DIR).filter(file => file.endsWith('.json'));
}

// Utility to load a locale file
function loadLocaleFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Utility to save changes to a locale file
function saveLocaleFile(filePath, content) {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
}

// Recursively set a key path in a JSON object
function setKey(obj, keyPath, value) {
  let current = obj;
  keyPath.forEach((key, index) => {
    if (index === keyPath.length - 1) {
      current[key] = value;
    } else {
      current[key] = current[key] || {};
      current = current[key];
    }
  });
}

// Recursively delete a key path in a JSON object
function deleteKey(obj, keyPath) {
  let current = obj;
  for (let i = 0; i < keyPath.length - 1; i++) {
    current = current[keyPath[i]];
    if (!current) return;
  }
  delete current[keyPath[keyPath.length - 1]];
}

// Add or Update Keys
function addOrUpdateKeys(key, values) {
  const keyPath = key.split('.');
  const localeFiles = getLocaleFiles();

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
}

// Delete Keys
function deleteKeys(key, locales) {
  const keyPath = key.split('.');
  const localeFiles = getLocaleFiles();

  const targetLocales =
    locales || localeFiles.map(file => file.replace('.json', ''));

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
}

module.exports = {
  addOrUpdateKeys,
  deleteKeys
};
