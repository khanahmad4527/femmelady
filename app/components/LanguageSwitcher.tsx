import { ComboboxItem, Select } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router';
import { FORCE_REVALIDATE_MAP, PARAM_KEYS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { IconSwitch } from '~/icons';
import selectClasses from '~/styles/Select.module.scss';

const LanguageSwitcher = () => {
  const { currentLanguage } = useCurrentLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (
    _value: string | null,
    option: ComboboxItem
  ) => {
    if (currentLanguage !== option.value) {
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

      // Navigate to the new path with updated search parameters
      navigate({
        pathname: newPath,
        search: searchParams.toString() // Ensure the updated query string is used
      });
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' }
  ];

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
