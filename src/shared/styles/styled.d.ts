import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      surfaceAlt: string;
      text: string;
      textPrimary: string;
      textMuted: string;
      accent: string;
      accentSoft: string;
      border: string;
      success: string;
      danger: string;
      shadow: string;
      overlay: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      pill: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      card: string;
      soft: string;
      lifted: string;
    };
    fonts: {
      body: string;
      display: string;
    };
  }
}
