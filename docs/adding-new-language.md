# Steps for Adding New Languages

1. **Add the Language in Directus:**

   - Add the language name and its corresponding code in the Directus `languages` collection.

2. **Add JSON Translations:**

   - In the frontend web app repo:
     - Add the language-specific JSON translations to the `locales` folder.
     - Add the same JSON translations to the `meta` folder.

3. **Import Languages in the `useTranslation` Hook:**

   - Ensure the newly added languages are imported into the `useTranslation` hook.

4. **Update Constant Variables:**

   - Add the language code in the following constant variables:
     - `AVAILABLE_LANGUAGES`
     - `LANGUAGE_TO_LOCALE_LANGUAGE`
     - `LOCALE_TO_LANGUAGE`
     - `LOCALE_TO_CURRENCY`

5. **Update Translation Keys:**

   - Add the language name to the `TranslationKeys` type.

6. **Update Language Switcher:**

   - Ensure the new language is available in the `LanguageSwitcher` component.

7. **Product Translations (If Applicable):**

   - Add translations for new products, including product color translations, if applicable.

8. **Add Collection Translations:**
   - Provide translations for collections like:
     - `terms_of_services`
     - `privacy_policy`
     - `faq`
     - `contact_us`
     - `about_us`
