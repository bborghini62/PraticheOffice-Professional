import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { SectionCard } from '../../../design/components';

const sectionBodySx = {
  maxHeight: 360,
  overflowY: 'auto',
  pr: 0.5,
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: 'divider', borderRadius: 999 },
};

interface DashboardSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const DashboardSection = ({ title, description, children }: DashboardSectionProps) => (
  <SectionCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Stack spacing={2} sx={{ height: '100%' }}>
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
      <Box sx={sectionBodySx}>{children}</Box>
    </Stack>
  </SectionCard>
);
