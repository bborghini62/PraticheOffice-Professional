import { Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../../core/router/routes';
import { StatusBadge } from '../../../design/components';
import type { DashboardPracticeItem } from '../dashboard.types';
import { DashboardEmptyState } from './DashboardEmptyState';
import { DashboardSection } from './DashboardSection';

interface RecentPracticesProps {
  items: DashboardPracticeItem[];
}

export const RecentPractices = ({ items }: RecentPracticesProps) => {
  if (items.length === 0) {
    return (
      <DashboardSection title="Pratiche aggiornate di recente" description="Nessuna pratica rilevante per il filtro attuale.">
        <DashboardEmptyState title="Nessuna pratica recente" description="Non sono presenti pratiche aggiornate nel periodo selezionato." />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Pratiche aggiornate di recente" description="Le pratiche più recentemente aggiornate nel contesto selezionato.">
      <Stack spacing={1.25}>
        {items.map((item) => (
          <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.75 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'flex-start' }}>
              <Box>
                <Link component={RouterLink} to={appRoutes.practiceDetail.path.replace(':practiceId', item.id)} underline="hover" color="primary.main" sx={{ fontWeight: 700 }}>
                  {item.code} • {item.subject}
                </Link>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                  Cliente: {item.clientName}
                </Typography>
              </Box>
              <StatusBadge status={item.status} />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.25 }}>
              <Typography variant="body2" color="text.secondary">
                Responsabile: {item.responsible}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aggiornata: {new Date(item.updatedAt).toLocaleDateString('it-IT')}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </DashboardSection>
  );
};
