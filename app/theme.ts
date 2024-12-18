import {
  Accordion,
  createTheme,
  type MantineThemeOverride,
  rem
} from '@mantine/core';

import selectClasses from './styles/Select.module.scss';
import accordionClasses from './styles/Accordion.module.scss';

export const theme: MantineThemeOverride = createTheme({
  colors: {
    primary: [
      '#f5f5f5',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
      '#8b8b8b',
      '#848484',
      '#717171',
      '#656565',
      '#575757'
    ]
  },
  black: '#333333',
  white: '#F5F5F5',
  spacing: {
    '2xl': rem(64)
  },
  primaryShade: 7,
  primaryColor: 'primary',
  components: {
    Container: {
      defaultProps: { size: 1280 }
    },
    Button: {
      defaultProps: {
        radius: 0
      }
    },
    ActionIcon: {
      defaultProps: {
        radius: 0
      }
    },
    ThemeIcon: {
      defaultProps: {
        radius: 0
      }
    },
    TextInput: {
      defaultProps: {
        radius: 0
      }
    },
    Card: {
      defaultProps: {
        radius: 0
      }
    },
    Paper: {
      defaultProps: {
        radius: 0
      }
    },
    Select: {
      classNames: selectClasses,
      defaultProps: {
        withScrollArea: false,
        withCheckIcon: false,
        clearable: true
      }
    },
    Accordion: Accordion.extend({
      classNames: accordionClasses,
      styles: {
        content: {
          padding: 0
        },
        control: {
          paddingLeft: 0
        }
      }
    })
  }
});
