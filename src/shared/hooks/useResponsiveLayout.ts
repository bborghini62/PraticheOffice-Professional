// Shared hook for responsive behavior in the application shell.

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsiveLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileOpen = () => {
    setMobileOpen((current) => !current);
  };

  const closeMobileDrawer = () => {
    setMobileOpen(false);
  };

  return { isMobile, mobileOpen, toggleMobileOpen, closeMobileDrawer };
};
