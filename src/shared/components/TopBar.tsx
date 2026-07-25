// Shared top bar component for the application shell.

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

interface TopBarProps {
  onMenuOpen: () => void;
}

export const TopBar = ({ onMenuOpen }: TopBarProps) => (
  <AppBar
    position="static"
    color="transparent"
    elevation={0}
    sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
  >
    <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <IconButton color="inherit" sx={{ display: { md: 'none' } }} onClick={onMenuOpen}>
          <MenuRoundedIcon />
        </IconButton>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Good morning
          </Typography>
          <Typography variant="h6">Welcome back, Elena</Typography>
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
