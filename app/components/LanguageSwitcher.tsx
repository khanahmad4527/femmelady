import { ComboboxItem, Select, useDirection } from '@mantine/core';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import {
  DEFAULT_PRODUCT_PAGE,
  FORCE_REVALIDATE_MAP,
  PARAM_KEYS
} from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import { IconSwitch } from '~/icons';
import selectClasses from '~/styles/Select.module.scss';

const LanguageSwitcher = () => {
  const { currentLanguage, dir } = useCurrentLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { setDirection } = useDirection();
  const { isLoggedIn } = useHeaderFooterContext();

  const handleLanguageChange = async (
    _value: string | null,
    option: ComboboxItem
  ) => {
    if (currentLanguage !== option.value) {
      if (isLoggedIn) {
        await fetch(`/${option.value}/change-language`, { method: 'POST' });
      }

      // Update the pathname
      const newPath = location.pathname.replace(
        `/${currentLanguage}`,
        `/${option.value}`
      );

      // Clone and modify the search parameters
      const searchParams = new URLSearchParams(location.search);
      searchParams.set(
        PARAM_KEYS.FORCE_REVALIDATE,
        FORCE_REVALIDATE_MAP.GLOBAL
      ); // Add your extra parameter

      if (searchParams.has(PARAM_KEYS.PAGE)) {
        // If the user was on page 79 and changes the language, but page 79 may not exist in the new language,
        // reset the page number to 1.
        searchParams.set(PARAM_KEYS.PAGE, String(DEFAULT_PRODUCT_PAGE));
      }

      // Navigate to the new path with updated search parameters
      navigate({
        pathname: newPath,
        search: searchParams.toString() // Ensure the updated query string is used
      });
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'fr', label: 'Français' },
    { value: 'ar', label: 'العربية' },
    { value: 'ja', label: '日本語' },
    { value: 'zh', label: '中文' },
    { value: 'ko', label: '한국어' }
  ];

  // This was done because when switching language some components like rating and slider still
  // have the previous direction, to solve solve we are explicitly setting the direction
  useEffect(() => {
    setDirection(dir);
  }, [dir]);

  return (
    <Select
      w={{ base: '100%', md: 150 }}
      value={currentLanguage}
      data={languageOptions}
      allowDeselect={false}
      onChange={handleLanguageChange}
      rightSection={<IconSwitch color="white" size={18} />}
      classNames={selectClasses}
      rightSectionPointerEvents="none"
    />
  );
};

export default LanguageSwitcher;
