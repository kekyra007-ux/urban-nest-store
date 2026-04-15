'use client';

/** Design reminder: Global styles must preserve airy spacing, quiet luxury contrast, and tactile surfaces. */
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: light;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background:
      radial-gradient(circle at top left, rgba(255,255,255,0.72), transparent 28%),
      linear-gradient(180deg, #f8f2ea 0%, #f1eadf 100%);
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    text-rendering: optimizeLegibility;
    min-height: 100vh;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.08;
    background-image:
      linear-gradient(rgba(32, 26, 23, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(32, 26, 23, 0.03) 1px, transparent 1px);
    background-size: 100px 100px;
    z-index: -1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.fonts.display};
    margin: 0;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0;
    line-height: 1.7;
  }
`;
