import { createGlobalStyle } from 'styled-components';
import variables, { LINE_HEIGHTS } from './variables';
import RobotoRegular from '../assets/Roboto-Regular.woff2';
import RobotoMedium from '../assets/Roboto-Medium.woff2';
import RobotoBold from '../assets/Roboto-Bold.woff2';

export const GlobalStyles = createGlobalStyle`
  ${variables};

  @font-face {
    font-family: 'Roboto';
    font-weight: 400;
    src: url(${RobotoRegular}) format('woff2');
  }
  @font-face {
    font-family: 'Roboto';
    font-weight: 500;
    src: url(${RobotoMedium}) format('woff2');
  }
  @font-face {
    font-family: 'Roboto';
    font-weight: 700;
    src: url(${RobotoBold}) format('woff2');
  }

  :root {
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: ${LINE_HEIGHTS.BASE};
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
