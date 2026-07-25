import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#0f172a',
      light: '#334155',
    },
    background: {
      default: '#f4f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          fontWeight: 600,
          px: 2,
          py: 0.9,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#64748b',
        },
      },
    },
  },
});
