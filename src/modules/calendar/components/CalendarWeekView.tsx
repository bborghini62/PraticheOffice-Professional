import { Box, Typography } from '@mui/material';
import type { CalendarEvent } from '../calendar.types';
import { CalendarEventCard } from './CalendarEventCard';

interface CalendarWeekViewProps {
  days: Date[];
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDayClick: (date: Date) => void;
}

export const CalendarWeekView = ({ days, events, onEventClick, onDayClick }: CalendarWeekViewProps) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(7, minmax(0, 1fr))' }, gap: 1.25 }}>
    {days.map((day) => {
      const dayKey = day.toISOString().slice(0, 10);
      const dayEvents = events.filter((event) => event.date === dayKey);

      return (
        <Box key={dayKey} onClick={() => onDayClick(day)} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 1.25, minHeight: 220, bgcolor: dayKey === new Date().toISOString().slice(0, 10) ? 'primary.50' : 'background.paper', cursor: 'pointer' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
            {day.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric' })}
          </Typography>
          <Box sx={{ display: 'grid', gap: 0.75 }}>
            {dayEvents.length > 0 ? dayEvents.map((event) => <CalendarEventCard key={event.id} event={event} onClick={() => onEventClick(event)} />) : <Typography variant="body2" color="text.secondary">Nessun evento</Typography>}
          </Box>
        </Box>
      );
    })}
  </Box>
);
