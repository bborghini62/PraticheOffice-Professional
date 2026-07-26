import { Box, Typography } from '@mui/material';
import { SectionCard } from '../../../design/components';
import type { DashboardKpi } from '../dashboard.types';

interface DashboardKpiCardProps {
  kpi: DashboardKpi;
}

export const DashboardKpiCard = ({ kpi }: DashboardKpiCardProps) => (
  <SectionCard sx={{ height: '100%' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {kpi.title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {kpi.value}
      </Typography>
      <Typography variant="body2" color="primary.main">
        {kpi.subtitle}
      </Typography>
    </Box>
  </SectionCard>
);
