'use client';

/** Design reminder: Global styles must preserve airy spacing, quiet luxury contrast, and tactile surfaces. */
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: light dark;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    text-rendering: optimizeLegibility;
    min-height: 100vh;
    transition: background 300ms ease, color 300ms ease;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.06;
    background-image:
      linear-gradient(${({ theme }) => theme.colors.border} 1px, transparent 1px),
      linear-gradient(90deg, ${({ theme }) => theme.colors.border} 1px, transparent 1px);
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
