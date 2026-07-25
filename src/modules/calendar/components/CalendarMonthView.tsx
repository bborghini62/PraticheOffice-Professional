import { Box, Grid, Typography } from '@mui/material';
import type { CalendarEvent } from '../calendar.types';
import { CalendarEventCard } from './CalendarEventCard';

interface CalendarMonthViewProps {
  days: Date[];
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDayClick: (date: Date) => void;
}

export const CalendarMonthView = ({ days, events, onEventClick, onDayClick }: CalendarMonthViewProps) => {
  const groupedEvents = new Map<string, CalendarEvent[]>();

  events.forEach((event) => {
    const key = event.date;
    if (!groupedEvents.has(key)) {
      groupedEvents.set(key, []);
    }

    groupedEvents.get(key)?.push(event);
  });

  return (
    <Grid container spacing={1.25}>
      {days.map((day) => {
        const dayKey = day.toISOString().slice(0, 10);
        const dayEvents = groupedEvents.get(dayKey) ?? [];

        return (
          <Grid key={dayKey} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Box
              onClick={() => onDayClick(day)}
              sx={{
                minHeight: 180,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                p: 1.25,
                bgcolor: dayKey === new Date().toISOString().slice(0, 10) ? 'primary.50' : 'background.paper',
                cursor: 'pointer',
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                {day.getDate()} {day.toLocaleString('it-IT', { month: 'short' })}
              </Typography>
              <Box sx={{ display: 'grid', gap: 0.75 }}>
                {dayEvents.slice(0, 3).map((event) => (
                  <CalendarEventCard key={event.id} event={event} onClick={() => onEventClick(event)} />
                ))}
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
