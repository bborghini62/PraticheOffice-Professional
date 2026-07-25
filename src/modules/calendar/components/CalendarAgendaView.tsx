import { Box, Divider, Typography } from '@mui/material';
import { StatusBadge } from '../../../design/components';
import type { CalendarEvent } from '../calendar.types';

interface CalendarAgendaViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const eventLabels: Record<string, string> = {
  practice: 'Pratica',
  activity: 'Attività',
  document: 'Documento',
  deadline: 'Scadenza',
};

export const CalendarAgendaView = ({ events, onEventClick }: CalendarAgendaViewProps) => (
  <Box sx={{ display: 'grid', gap: 1.25 }}>
    {events.map((event) => (
      <Box key={event.id} onClick={() => onEventClick(event)} sx={{ borderRadius: 3, border: '1px solid', borderColor: event.isUrgent ? 'error.main' : event.isOverdue ? 'warning.main' : 'divider', bgcolor: event.isToday ? 'primary.50' : 'background.paper', p: 1.5, cursor: 'pointer' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 1.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(event.date).toLocaleDateString('it-IT')} {event.time ? `• ${event.time}` : ''}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <StatusBadge status={event.type} />
            <StatusBadge status={event.status} />
          </Box>
        </Box>
        <Divider sx={{ my: 1.25 }} />
        <Typography variant="body2">
          {event.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
          {eventLabels[event.type]} • {event.practiceTitle ?? event.practiceCode ?? 'Nessuna pratica'} • {event.responsible}
        </Typography>
      </Box>
    ))}
  </Box>
);
