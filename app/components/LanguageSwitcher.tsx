import { ComboboxItem, Select } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { IconSwitch } from '~/icons';

const LanguageSwitcher = () => {
  const { currentLanguage } = useCurrentLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (
    _value: string | null,
    option: ComboboxItem
  ) => {
    if (currentLanguage !== option.value) {
      const newPath = location.pathname.replace(
        `/${currentLanguage}`,
        `/${option.value}`
      );

      navigate({
        pathname: newPath,
        search: location.search
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
      defaultValue={currentLanguage}
      data={languageOptions}
      allowDeselect={false}
      onChange={handleLanguageChange}
      rightSection={<IconSwitch color="white" size={18} />}
    />
  );
};

export default LanguageSwitcher;
