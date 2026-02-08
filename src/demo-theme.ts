import type { Theme } from './types';

/**
 * Example theme demonstrating all available token types
 */
export const demoTheme: Theme = {
  name: 'my-theme',
  base: {
    palette: {
      black: '#000',
      white: '#fff',
      red: '#f00',
      blue: '#00f',
      gray: '#808080',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    size: {
      small: '2rem',
      medium: '2.5rem',
      large: '3rem',
    },
    zIndex: {
      surface: '1',
      modal: '10',
      dropdown: '5',
    },
    container: {
      sm: '40rem',
      md: '64rem',
      lg: '80rem',
    },
  },
  light: {
    bg: {
      root: 'white palette',
      surface: 'gray palette',
      accent: 'blue palette',
    },
  },
  dark: {
    bg: {
      root: 'black palette',
      surface: 'gray palette',
      accent: 'blue palette',
    },
  },
};