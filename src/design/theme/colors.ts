import type { PaletteOptions } from '@mui/material/styles';

export const designColors = {
  primary: '#2563eb',
  primaryLight: '#60a5fa',
  primaryDark: '#1d4ed8',
  success: '#16a34a',
  successLight: '#4ade80',
  warning: '#ea580c',
  warningLight: '#fb923c',
  error: '#dc2626',
  errorLight: '#f87171',
  neutral: '#64748b',
  neutralLight: '#94a3b8',
  neutralLighter: '#e2e8f0',
  background: '#f4f7fb',
  surface: '#ffffff',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
} as const;

export const paletteOptions: PaletteOptions = {
  primary: {
    main: designColors.primary,
    light: designColors.primaryLight,
    dark: designColors.primaryDark,
  },
  success: {
    main: designColors.success,
    light: designColors.successLight,
  },
  warning: {
    main: designColors.warning,
    light: designColors.warningLight,
  },
  error: {
    main: designColors.error,
    light: designColors.errorLight,
  },
  grey: {
    400: designColors.neutralLight,
    500: designColors.neutral,
    600: designColors.textSecondary,
  },
  background: {
    default: designColors.background,
    paper: designColors.surface,
  },
  text: {
    primary: designColors.textPrimary,
    secondary: designColors.textSecondary,
  },
};
