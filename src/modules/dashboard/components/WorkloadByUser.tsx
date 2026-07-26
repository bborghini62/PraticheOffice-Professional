import { Box, Chip, Stack, Typography } from '@mui/material';
import type { DashboardWorkloadItem } from '../dashboard.types';
import { DashboardEmptyState } from './DashboardEmptyState';
import { DashboardSection } from './DashboardSection';

interface WorkloadByUserProps {
  items: DashboardWorkloadItem[];
}

export const WorkloadByUser = ({ items }: WorkloadByUserProps) => {
  if (items.length === 0) {
    return (
      <DashboardSection title="Carico di lavoro" description="Nessun utente rilevante per il contesto corrente.">
        <DashboardEmptyState title="Nessun carico di lavoro" description="Non ci sono utenti visibili con dati operativi nel filtro attuale." />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Carico di lavoro" description="Sintesi del lavoro per utente, attività aperte e pratiche assegnate.">
      <Stack spacing={1.25}>
        {items.map((item) => (
          <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.75 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {item.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                  {item.group}
                </Typography>
              </Box>
              <Chip label={item.role} size="small" variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.25 }}>
              <Chip label={`Attività aperte: ${item.openActivities}`} size="small" />
              <Chip label={`Urgenti: ${item.urgentActivities}`} size="small" color={item.urgentActivities > 0 ? 'error' : 'default'} />
              <Chip label={`Pratiche: ${item.assignedPractices}`} size="small" />
            </Box>
          </Box>
        ))}
      </Stack>
    </DashboardSection>
  );
};
