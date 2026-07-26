import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../../core/router/routes';
import { DashboardEmptyState } from './DashboardEmptyState';
import { DashboardSection } from './DashboardSection';
import type { DashboardActivityItem } from '../dashboard.types';

interface OpenActivitiesProps {
  items: DashboardActivityItem[];
}

const priorityLabels: Record<DashboardActivityItem['priority'], string> = {
  low: 'Bassa',
  normal: 'Normale',
  high: 'Alta',
  urgent: 'Urgente',
};

const statusLabels: Record<DashboardActivityItem['status'], string> = {
  todo: 'Da fare',
  in_progress: 'In corso',
  blocked: 'Bloccata',
  completed: 'Completata',
  cancelled: 'Annullata',
};

export const OpenActivities = ({ items }: OpenActivitiesProps) => {
  if (items.length === 0) {
    return (
      <DashboardSection title="Attività da completare" description="Nessuna attività aperta per il filtro selezionato.">
        <DashboardEmptyState title="Nessuna attività aperta" description="Le attività operative sono tutte completate o non pertinenti al filtro corrente." />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Attività da completare" description="Attività aperte con pratica collegata, assegnatario e priorità.">
      <Stack spacing={1.25}>
        {items.map((item) => (
          <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.75 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Link component={RouterLink} to={appRoutes.practiceDetail.path.replace(':practiceId', item.practiceId)} underline="hover" color="primary.main">
                  {item.practiceCode} • {item.practiceSubject}
                </Link>
              </Box>
              <Chip label={priorityLabels[item.priority]} size="small" color={item.priority === 'urgent' ? 'error' : 'default'} />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.25 }}>
              <Chip label={`Assegnatario: ${item.assignee}`} size="small" variant="outlined" />
              <Chip label={`Scadenza: ${new Date(item.dueDate).toLocaleDateString('it-IT')}`} size="small" variant="outlined" />
              <Chip label={`Stato: ${statusLabels[item.status]}`} size="small" variant="outlined" />
            </Box>
          </Box>
        ))}
      </Stack>
    </DashboardSection>
  );
};
