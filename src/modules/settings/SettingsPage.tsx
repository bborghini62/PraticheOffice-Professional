// Settings module entry page.

import { Box, FormControlLabel, Paper, Switch, Typography } from '@mui/material';
import { settingsPreferences } from '../../shared/services/dashboardService';

const SettingsPage = () => (
  <Box>
    <Typography variant="h4" sx={{ mb: 1 }}>
      Workspace settings
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
      Configure the experience that best supports your day-to-day operations.
    </Typography>

    <Paper sx={{ p: 3 }}>
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
    </Paper>
  </Box>
);

export default SettingsPage;
