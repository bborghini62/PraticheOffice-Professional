// Shared sidebar component for the application shell.

import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { NavLink, useLocation } from 'react-router-dom';
import { appRoutes } from '../../core/router/routes';

const navItems = [
  { label: appRoutes.dashboard.title, to: appRoutes.dashboard.path, icon: DashboardRoundedIcon },
  { label: appRoutes.settings.title, to: appRoutes.settings.path, icon: SettingsRoundedIcon },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  mobile?: boolean;
}

export const Sidebar = ({ open, onClose, mobile = false }: SidebarProps) => {
  const location = useLocation();

  const content = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, mt: 1 }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 2, p: 1.2 }}>
          <DescriptionRoundedIcon />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            PraticheOffice
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Professional workspace
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navItems.map(({ label, to, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <ListItemButton
              key={to}
              component={NavLink}
              to={to}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                mb: 0.75,
                bgcolor: active ? 'primary.light' : 'transparent',
                color: active ? 'primary.main' : 'text.primary',
                '&:hover': { bgcolor: active ? 'primary.light' : 'grey.100' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return mobile ? (
    <Drawer open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>
      {content}
    </Drawer>
  ) : (
    <Box sx={{ display: { xs: 'none', md: 'block' }, width: 280, flexShrink: 0 }}>
      {content}
    </Box>
  );
};
