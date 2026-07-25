import { Box, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton, SectionCard, StatusBadge } from '../../../design/components';
import type { PracticeRecord, PracticePriority, PracticeStatus } from '../practices.types';

interface PracticeHeaderProps {
  practice: PracticeRecord;
  onEdit: () => void;
  onChangeStatus: () => void;
  onMoreActions: () => void;
}

const priorityLabels: Record<PracticePriority, string> = {
  low: 'Bassa',
  normal: 'Normale',
  high: 'Alta',
  urgent: 'Urgente',
};

const formatDate = (value: string) => new Date(value).toLocaleDateString('it-IT');

export const PracticeHeader = ({ practice, onEdit, onChangeStatus, onMoreActions }: PracticeHeaderProps) => (
  <SectionCard>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 2 }}>
      <Box sx={{ display: 'grid', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {practice.code}
        </Typography>
        <Typography variant="h5">{practice.subject}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
          <StatusBadge status={practice.status as PracticeStatus} />
          <Typography variant="body2" color="text.secondary">
            Priorità {priorityLabels[practice.priority]}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignSelf: { xs: 'flex-start', md: 'flex-end' } }}>
        <SecondaryButton size="small" sx={{ px: 1.5, py: 0.75 }} onClick={onEdit}>
          Modifica
        </SecondaryButton>
        <PrimaryButton size="small" sx={{ px: 1.5, py: 0.75 }} onClick={onChangeStatus}>
          Cambia stato
        </PrimaryButton>
        <SecondaryButton size="small" sx={{ px: 1.5, py: 0.75 }} onClick={onMoreActions}>
          Altre azioni
        </SecondaryButton>
      </Box>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2, mt: 3 }}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Responsabile
        </Typography>
        <Typography variant="subtitle1">{practice.responsible}</Typography>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Scadenza
        </Typography>
        <Typography variant="subtitle1">{formatDate(practice.dueDate)}</Typography>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Ultimo aggiornamento
        </Typography>
        <Typography variant="subtitle1">{formatDate(practice.updatedAt)}</Typography>
      </Box>
    </Box>
  </SectionCard>
);
