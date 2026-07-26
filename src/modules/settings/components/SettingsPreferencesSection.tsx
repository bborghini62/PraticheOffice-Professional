import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { SecondaryButton } from '../../../design/components';

interface SettingsPreferencesSectionProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export const SettingsPreferencesSection = ({ title, description, children }: SettingsPreferencesSectionProps) => (
  <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, display: 'grid', gap: 1.5 }}>
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </Box>
    {children}
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <SecondaryButton size="small">Salva</SecondaryButton>
    </Box>
  </Box>
);
