// Shared top bar component for the application shell.

import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { appRoutes } from '../../core/router/routes';
import { getClientById } from '../../modules/clients/services/clientsService';
import { getDocumentById } from '../../modules/documents/services/documentsService';
import { getPracticeById } from '../../modules/practices/services/practicesService';
import { useAuth } from '../../modules/auth/context/useAuth';

interface TopBarProps {
  onMenuOpen: () => void;
}

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  [appRoutes.dashboard.path]: { title: 'Cruscotto', subtitle: 'Panoramica operativa quotidiana' },
  [appRoutes.clients.path]: { title: 'Clienti', subtitle: 'Gestione delle anagrafiche clienti' },
  [appRoutes.newClient.path]: { title: 'Nuovo cliente', subtitle: 'Creazione di una nuova anagrafica' },
  [appRoutes.clientEdit.path]: { title: 'Modifica cliente', subtitle: 'Aggiornamento dell’anagrafica cliente' },
  [appRoutes.clientDetail.path]: { title: 'Scheda cliente', subtitle: 'Dettaglio anagrafico e contesto operativo' },
  [appRoutes.practices.path]: { title: 'Pratiche', subtitle: 'Gestione delle pratiche operative' },
  [appRoutes.newPractice.path]: { title: 'Nuova pratica', subtitle: 'Creazione di una nuova pratica' },
  [appRoutes.practiceDetail.path]: { title: 'Scheda pratica', subtitle: 'Dettaglio della pratica selezionata' },
  [appRoutes.activities.path]: { title: 'Attività', subtitle: 'Monitoraggio dei lavori e delle scadenze' },
  [appRoutes.newActivity.path]: { title: 'Nuova attività', subtitle: 'Aggiunta di una nuova attività operativa' },
  [appRoutes.practiceActivitiesNew.path]: { title: 'Nuova attività', subtitle: 'Aggiunta di una nuova attività collegata' },
  [appRoutes.documents.path]: { title: 'Documenti', subtitle: 'Gestione documenti e allegati' },
  [appRoutes.newDocument.path]: { title: 'Nuovo documento', subtitle: 'Registrazione di un nuovo documento' },
  [appRoutes.documentDetail.path]: { title: 'Scheda documento', subtitle: 'Dettaglio del documento selezionato' },
  [appRoutes.practiceDocumentsNew.path]: { title: 'Nuovo documento', subtitle: 'Registrazione di un nuovo allegato' },
  [appRoutes.calendar.path]: { title: 'Calendario', subtitle: 'Agenda operativa per pratiche, attività e documenti' },
  [appRoutes.report.path]: { title: 'Report', subtitle: 'Panoramica dei risultati e delle performance' },
  [appRoutes.settings.path]: { title: 'Impostazioni', subtitle: 'Personalizzazione dell’esperienza operativa' },
  [appRoutes.help.path]: { title: 'Aiuto', subtitle: 'Supporto e indicazioni rapide' },
};

const getCurrentPageMeta = (pathname: string) => {
  const practiceDetailMatch = pathname.match(/^\/pratiche\/([^/]+)$/);
  if (practiceDetailMatch) {
    const practice = getPracticeById(practiceDetailMatch[1]);
    if (practice) {
      return { title: 'Scheda pratica', subtitle: `${practice.code} • ${practice.subject}` };
    }
  }

  const clientDetailMatch = pathname.match(/^\/clienti\/([^/]+)$/);
  if (clientDetailMatch) {
    const client = getClientById(clientDetailMatch[1]);
    if (client) {
      return { title: 'Scheda cliente', subtitle: `${client.code} • ${client.companyName || `${client.firstName} ${client.lastName}`.trim()}` };
    }
  }

  const documentDetailMatch = pathname.match(/^\/documenti\/([^/]+)$/);
  if (documentDetailMatch) {
    const document = getDocumentById(documentDetailMatch[1]);
    if (document) {
      return { title: 'Scheda documento', subtitle: `${document.code} • ${document.name}` };
    }
  }

  return pageMeta[pathname] ?? { title: 'PraticheOffice', subtitle: 'Workspace operativo professionale' };
};

export const TopBar = ({ onMenuOpen }: TopBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const currentPage = getCurrentPageMeta(location.pathname);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleCloseMenu();
    await logout();
    navigate(appRoutes.login.path, { replace: true });
  };

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <AccountCircleRoundedIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user?.name ?? 'Utente'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role ?? 'Accesso demo'}
              </Typography>
            </Box>
          </Box>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem disabled>Profilo</MenuItem>
            <MenuItem onClick={() => { handleCloseMenu(); navigate(appRoutes.settings.path); }}>Impostazioni</MenuItem>
            <MenuItem onClick={handleLogout}>Esci</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
