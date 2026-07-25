import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import { PageContainer, PageTitle, SectionCard } from '../../design/components';
import { settingsPreferences } from '../../shared/services/dashboardService';

const SettingsPage = () => (
  <PageContainer>
    <Box>
      <PageTitle subtitle="Personalizza le preferenze operative per il tuo lavoro quotidiano.">Impostazioni</PageTitle>
    </Box>

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

export default SettingsPage;
