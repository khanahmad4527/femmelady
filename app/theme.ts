import { createTheme, type MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
  colors: {
    artichoke: [
      '#f4f7ea',
      '#e8ebe0',
      '#d0d4c5',
      '#b6bca7',
      '#a0a78e',
      '#929a7d',
      '#8b9473',
      '#788061',
      '#6a7254',
      '#5a6343'
    ]
  },
  black: '#333333',
  white: '#F5F5F5',
  primaryShade: 6,
  primaryColor: 'artichoke',
  fontFamily: '"Playfair Display", serif',
  headings: {
    fontFamily: '"Playfair Display", serif'
  },
  components: {
    Container: {
      defaultProps: { size: 1280, px: { base: 0, md: 'xl' } }
    }
  }
});
