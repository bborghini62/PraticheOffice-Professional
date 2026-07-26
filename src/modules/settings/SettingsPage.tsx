import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../core/router/routes';
import { useAuth } from '../auth/context/useAuth';
import { PageContainer, PageTitle, PrimaryButton, SectionCard } from '../../design/components';
import { settingsPreferences } from '../../shared/services/dashboardService';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'Amministratore';

  return (
    <PageContainer>
      <Box>
        <PageTitle subtitle="Personalizza le preferenze operative per il tuo lavoro quotidiano.">Impostazioni</PageTitle>
      </Box>

      {isAdmin ? (
        <SectionCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Catalogo gruppi e classificazioni</Typography>
              <Typography variant="body2" color="text.secondary">Gestisci i gruppi operativi condivisi e le etichette di stato usate nelle pratiche e nelle attività.</Typography>
            </Box>
            <PrimaryButton onClick={() => navigate(appRoutes.groups.path)}>Apri configurazione</PrimaryButton>
          </Box>
        </SectionCard>
      ) : null}

      <SectionCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {settingsPreferences.map((preference) => (
            <Box key={preference.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
              <FormControlLabel control={<Switch defaultChecked={preference.enabled} />} label={preference.title} sx={{ alignItems: 'flex-start' }} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5 }}>
                {preference.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </SectionCard>
    </PageContainer>
  );
};

export default SettingsPage;
