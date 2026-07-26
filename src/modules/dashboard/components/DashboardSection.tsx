import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { SectionCard } from '../../../design/components';

interface DashboardSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const DashboardSection = ({ title, description, children }: DashboardSectionProps) => (
  <SectionCard>
    <Stack spacing={2}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {description ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        ) : null}
      </Box>
      {children}
    </Stack>
  </SectionCard>
);
