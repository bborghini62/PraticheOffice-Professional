import { Box, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../../../design/components';
import type { CalendarViewMode } from '../calendar.types';

interface CalendarToolbarProps {
  view: CalendarViewMode;
  currentRangeLabel: string;
  onToday: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onViewChange: (view: CalendarViewMode) => void;
}

export const CalendarToolbar = ({ view, currentRangeLabel, onToday, onPrevious, onNext, onViewChange }: CalendarToolbarProps) => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' } }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
      <SecondaryButton onClick={onPrevious}>← Precedente</SecondaryButton>
      <PrimaryButton onClick={onToday}>Oggi</PrimaryButton>
      <SecondaryButton onClick={onNext}>Successivo →</SecondaryButton>
      <Typography variant="h6" sx={{ fontWeight: 700, ml: { xs: 0, md: 1 } }}>
        {currentRangeLabel}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <SecondaryButton variant={view === 'month' ? 'contained' : 'outlined'} onClick={() => onViewChange('month')}>
        Mese
      </SecondaryButton>
      <SecondaryButton variant={view === 'week' ? 'contained' : 'outlined'} onClick={() => onViewChange('week')}>
        Settimana
      </SecondaryButton>
      <SecondaryButton variant={view === 'agenda' ? 'contained' : 'outlined'} onClick={() => onViewChange('agenda')}>
        Agenda
      </SecondaryButton>
    </Box>
  </Box>
);
