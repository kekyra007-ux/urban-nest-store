/** Design reminder: Warm Scandinavian digital showroom — soft cream surfaces, muted sage accents, editorial whitespace. */
export const theme = {
  colors: {
    background: '#f6f0e7',
    surface: '#fffaf4',
    surfaceAlt: '#ebe4d8',
    text: '#201a17',
    textPrimary: '#201a17',
    textMuted: '#6d6259',
    accent: '#556b5d',
    accentSoft: '#dde6dc',
    border: 'rgba(32, 26, 23, 0.12)',
    success: '#527a5f',
    danger: '#b85b4f',
    shadow: 'rgba(53, 42, 35, 0.16)',
    overlay: 'rgba(19, 17, 15, 0.45)',
  },
  radii: {
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '40px',
    pill: '999px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2.5rem',
    xxl: '4rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  shadows: {
    card: '0 18px 40px rgba(72, 57, 47, 0.08)',
    soft: '0 8px 24px rgba(72, 57, 47, 0.06)',
    lifted: '0 30px 80px rgba(72, 57, 47, 0.14)',
  },
  fonts: {
    body: 'var(--font-body), system-ui, sans-serif',
    display: 'var(--font-display), Georgia, serif',
  },
} as const;
