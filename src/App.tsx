// Root application bootstrap for the restructured architecture.

import { ThemeProvider } from '@mui/material/styles';
import { AppRouter } from './core/router/AppRouter';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
