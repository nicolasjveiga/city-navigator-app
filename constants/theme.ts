export const COLORS = {
  primary: '#00b894',
  background: '#f3f3f3',
  white: '#ffffff',
  textDark: '#2d3436',
  textLight: '#636e72',
  card: '#fff',
  muted: '#eee',
};

const BASE = 8;
export const SPACING = (multiplier = 1) => BASE * multiplier;

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 18,
};

export const TYPO = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 24, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  small: { fontSize: 13, fontWeight: '400' as const },
};