import { Box, Chip, Stack, Typography } from '@mui/material';
import type { DashboardDeadlineItem } from '../dashboard.types';
import { DashboardEmptyState } from './DashboardEmptyState';
import { DashboardSection } from './DashboardSection';

interface UpcomingDeadlinesProps {
  items: DashboardDeadlineItem[];
}

const getPriorityLabel = (kind: DashboardDeadlineItem['kind']) => {
  if (kind === 'practice') {
    return 'Pratica';
  }
  if (kind === 'activity') {
    return 'Attività';
  }
  return 'Documento';
};

export const UpcomingDeadlines = ({ items }: UpcomingDeadlinesProps) => {
  if (items.length === 0) {
    return (
      <DashboardSection title="Prossime scadenze" description="Nessuna scadenza rilevante nel periodo selezionato.">
        <DashboardEmptyState title="Nessuna scadenza" description="Non ci sono elementi in scadenza per il filtro attuale." />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Prossime scadenze" description="Pratiche, attività e documenti ordinati per data di scadenza.">
      <Stack spacing={1.25}>
        {items.map((item) => (
          <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.75 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                  {item.subtitle}
                </Typography>
              </Box>
              <Chip label={getPriorityLabel(item.kind)} size="small" variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.25 }}>
              <Chip label={new Date(item.dueDate).toLocaleDateString('it-IT')} size="small" />
              {item.isOverdue ? <Chip label="Scaduto" size="small" color="error" /> : null}
              {item.isToday ? <Chip label="Oggi" size="small" color="warning" /> : null}
              {item.isWithinThreeDays && !item.isToday ? <Chip label="Entro 3 giorni" size="small" color="secondary" /> : null}
              {item.isUrgent ? <Chip label="Urgente" size="small" color="error" /> : null}
            </Box>
          </Box>
        ))}
      </Stack>
    </DashboardSection>
  );
};
