// Core application layout shell used by all routed modules.

import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../shared/components/Sidebar';
import { TopBar } from '../../shared/components/TopBar';
import { useResponsiveLayout } from '../../shared/hooks/useResponsiveLayout';

export const MainLayout = () => {
  const { isMobile, mobileOpen, toggleMobileOpen, closeMobileDrawer } = useResponsiveLayout();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <Sidebar open={mobileOpen} onClose={closeMobileDrawer} mobile={isMobile} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar onMenuOpen={toggleMobileOpen} />
        <Toolbar />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
