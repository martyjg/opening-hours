import { createGlobalStyle } from 'styled-components';
import variables from './variables';

export const GlobalStyles = createGlobalStyle`
  ${variables};

  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color-scheme: light dark;
    color: var(--typography-default);
    background-color: var(--background-default);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  * {
    padding: 0;
    margin: 0;
  }

  li {
    margin:0;
    padding: 0;
    text-indent: 0;
    list-style-type: none;
  }
  `;
