import { Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../../core/router/routes';
import type { DashboardTimelineItem } from '../dashboard.types';
import { DashboardEmptyState } from './DashboardEmptyState';
import { DashboardSection } from './DashboardSection';

interface RecentTimelineEventsProps {
  items: DashboardTimelineItem[];
}

export const RecentTimelineEvents = ({ items }: RecentTimelineEventsProps) => {
  if (items.length === 0) {
    return (
      <DashboardSection title="Ultimi eventi Timeline" description="Non ci sono eventi di timeline pertinenti al filtro selezionato.">
        <DashboardEmptyState title="Nessun evento recente" description="Gli eventi operativi non sono disponibili in questo momento." />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Ultimi eventi Timeline" description="Gli ultimi 8 eventi globali, ordinati per data e ora.">
      <Stack spacing={1.25}>
        {items.map((item) => (
          <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.75 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
              {new Date(item.createdAt).toLocaleString('it-IT')} • {item.userName}
            </Typography>
            <Link component={RouterLink} to={appRoutes.practiceDetail.path.replace(':practiceId', item.practiceId)} underline="hover" color="primary.main" sx={{ mt: 0.75, display: 'inline-block' }}>
              {item.practiceCode}
            </Link>
          </Box>
        ))}
      </Stack>
    </DashboardSection>
  );
};
