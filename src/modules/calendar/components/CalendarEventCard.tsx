import { Box, Chip, Typography } from '@mui/material';
import type { CalendarEvent } from '../calendar.types';

interface CalendarEventCardProps {
  event: CalendarEvent;
  onClick?: () => void;
}

const eventLabels: Record<string, string> = {
  practice: 'Pratica',
  activity: 'Attività',
  document: 'Documento',
  deadline: 'Scadenza',
};

export const CalendarEventCard = ({ event, onClick }: CalendarEventCardProps) => (
  <Box
    onClick={onClick}
    sx={{
      borderRadius: 2,
      border: '1px solid',
      borderColor: event.isUrgent ? 'error.main' : event.isToday ? 'primary.main' : event.isOverdue ? 'warning.main' : 'divider',
      bgcolor: event.isOverdue ? 'warning.50' : event.isToday ? 'primary.50' : 'background.paper',
      p: 1.25,
      cursor: 'pointer',
      display: 'grid',
      gap: 0.5,
    }}
  >
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      <Chip size="small" label={eventLabels[event.type]} color={event.isUrgent ? 'error' : event.isOverdue ? 'warning' : 'default'} />
      <Chip size="small" label={event.status} color="default" />
    </Box>
    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
      {event.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {event.description}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {event.responsible} • {event.group}
    </Typography>
  </Box>
);
