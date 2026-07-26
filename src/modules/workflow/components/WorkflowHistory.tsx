import { Box, Stack, Typography } from '@mui/material';
import { SectionCard } from '../../../design/components';
import type { WorkflowTransitionRecord } from '../workflow.types';

interface WorkflowHistoryProps {
  history: WorkflowTransitionRecord[];
}

export const WorkflowHistory = ({ history }: WorkflowHistoryProps) => (
  <SectionCard>
    <Stack spacing={1.5}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Storico transizioni
      </Typography>
      {history.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Nessuna transizione registrata per questa pratica.
        </Typography>
      ) : (
        history.map((entry) => (
          <Box key={entry.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {entry.actor} · {new Date(entry.createdAt).toLocaleString('it-IT')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {entry.note ?? 'Transizione workflow applicata.'}
            </Typography>
          </Box>
        ))
      )}
    </Stack>
  </SectionCard>
);
