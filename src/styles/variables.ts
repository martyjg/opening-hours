import { css } from 'styled-components';

export const SPACING_TOKENS = {
  NONE: 0,
  TIGHTEST: '0.25rem',
  TIGHTER: '0.5rem',
  TIGHT: '0.75rem',
  BASE: '1rem',
  LOOSE: '1.5rem',
  LOOSER: '2rem',
  LOOSEST: '3rem',
};

export const SIZES = {
  s: '0.75rem',
  m: '1rem',
  l: '1.25rem',
  xl: '1.375rem',
};

export const LINE_HEIGHTS = {
  TIGHTER: '1.25',
  TIGHT: '1.333',
  BASE: '1.375',
};

const variables = css`
  :root {
    --typography-default: rgb(32, 33, 37);
    --typography-inactive: rgb(161, 162, 164);
    --divider-default: rgb(238, 238, 238);
    --background-default: rgb(248, 248, 248);
    --background-highlight: rgb(255, 255, 255);
    --accent-highlight: rgb(87, 204, 20);
  }
`;

export default variables;
