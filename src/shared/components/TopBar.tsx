// Shared top bar component for the application shell.

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { useLocation } from 'react-router-dom';

interface TopBarProps {
  onMenuOpen: () => void;
}

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Panoramica operativa' },
  '/pratiche': { title: 'Pratiche', subtitle: 'Gestione delle pratiche operative' },
  '/settings': { title: 'Impostazioni', subtitle: 'Configurazione dell’applicazione' },
};

export const TopBar = ({ onMenuOpen }: TopBarProps) => {
  const location = useLocation();
  const currentPage = pageMeta[location.pathname] ?? { title: 'Pagina', subtitle: 'Contenuto in aggiornamento' };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1.25, px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton color="inherit" sx={{ display: { md: 'none' } }} onClick={onMenuOpen}>
            <MenuRoundedIcon />
          </IconButton>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Pagina corrente
            </Typography>
            <Typography variant="h6">{currentPage.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {currentPage.subtitle}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <SearchRoundedIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsRoundedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
