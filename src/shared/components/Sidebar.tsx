// Shared sidebar component for the application shell.

import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { NavLink, useLocation } from 'react-router-dom';
import { appRoutes } from '../../core/router/routes';

const navItems = [
  { label: appRoutes.dashboard.title, to: appRoutes.dashboard.path, icon: DashboardRoundedIcon, implemented: true },
  { label: appRoutes.clients.title, to: appRoutes.clients.path, icon: BusinessRoundedIcon, implemented: true },
  { label: appRoutes.practices.title, to: appRoutes.practices.path, icon: FolderRoundedIcon, implemented: true },
  { label: appRoutes.activities.title, to: appRoutes.activities.path, icon: AssignmentRoundedIcon, implemented: true },
  { label: appRoutes.calendar.title, to: appRoutes.calendar.path, icon: CalendarTodayRoundedIcon, implemented: true },
  { label: appRoutes.documents.title, to: appRoutes.documents.path, icon: DescriptionRoundedIcon, implemented: true },
  { label: appRoutes.report.title, to: appRoutes.report.path, icon: BarChartRoundedIcon, implemented: false },
  { label: appRoutes.settings.title, to: appRoutes.settings.path, icon: SettingsRoundedIcon, implemented: true },
  { label: appRoutes.help.title, to: appRoutes.help.path, icon: HelpOutlineRoundedIcon, implemented: false },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  mobile?: boolean;
}

export const Sidebar = ({ open, onClose, mobile = false }: SidebarProps) => {
  const location = useLocation();

  const isActive = (itemTo: string) => {
    if (itemTo === appRoutes.dashboard.path) {
      return location.pathname === appRoutes.dashboard.path;
    }

    return location.pathname === itemTo || location.pathname.startsWith(`${itemTo}/`);
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
            Workspace operativo professionale
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navItems.map((item) => {
          const { label, to, icon: Icon, implemented } = item;
          const active = isActive(to);

          return (
            <ListItemButton
              key={to}
              component={implemented ? NavLink : 'button'}
              to={implemented ? to : undefined}
              onClick={() => {
                if (implemented) {
                  onClose();
                }
              }}
              disabled={!implemented}
              sx={{
                borderRadius: 2,
                mb: 0.75,
                bgcolor: active ? 'primary.main' : 'transparent',
                color: active ? 'white' : implemented ? 'text.primary' : 'text.secondary',
                '&:hover': { bgcolor: active ? 'primary.main' : implemented ? 'grey.100' : 'transparent' },
                '&.Mui-disabled': {
                  opacity: 1,
                },
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
