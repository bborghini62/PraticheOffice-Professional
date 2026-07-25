// Shared sidebar component for the application shell.

import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { NavLink, useLocation } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';

const navItems = [
  { label: appRoutes.dashboard.title, to: appRoutes.dashboard.path, icon: DashboardRoundedIcon, implemented: true },
  { label: appRoutes.practices.title, to: appRoutes.practices.path, icon: FolderRoundedIcon, implemented: true },
  { label: appRoutes.clients.title, to: appRoutes.clients.path, icon: BusinessRoundedIcon, implemented: true },
  { label: appRoutes.activities.title, to: appRoutes.activities.path, icon: AssignmentRoundedIcon, implemented: true },
  { label: 'Calendario', to: '/calendario', icon: CalendarTodayRoundedIcon, implemented: false },
  { label: 'Documenti', to: '/documenti', icon: DescriptionRoundedIcon, implemented: false },
  { label: 'Persone', to: '/persone', icon: PeopleRoundedIcon, implemented: false },
  { label: 'Report', to: '/report', icon: BarChartRoundedIcon, implemented: false },
  { label: appRoutes.settings.title, to: appRoutes.settings.path, icon: SettingsRoundedIcon, implemented: true },
  { label: 'Aiuto', to: '/aiuto', icon: HelpOutlineRoundedIcon, implemented: false },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  mobile?: boolean;
}

export const Sidebar = ({ open, onClose, mobile = false }: SidebarProps) => {
  const location = useLocation();
  const { showNotification } = useNotification();

  const handleNavClick = (item: (typeof navItems)[number]) => {
    if (!item.implemented) {
      showNotification({ message: `${item.label} sarà disponibile nel prossimo aggiornamento.`, severity: 'info' });
      return;
    }

    onClose();
  };

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
        {navItems.map((item) => {
          const { label, to, icon: Icon, implemented } = item;
          const active = location.pathname === to;

          return implemented ? (
            <ListItemButton
              key={to}
              component={NavLink}
              to={to}
              onClick={() => handleNavClick(item)}
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
          ) : (
            <ListItemButton
              key={to}
              onClick={() => handleNavClick(item)}
              sx={{
                borderRadius: 2,
                mb: 0.75,
                color: 'text.secondary',
                '&:hover': { bgcolor: 'grey.50' },
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
