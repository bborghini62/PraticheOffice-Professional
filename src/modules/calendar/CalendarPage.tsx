import { Box, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { PageContainer, PageTitle, SectionCard, PrimaryButton } from '../../design/components';
import { CalendarAgendaView } from './components/CalendarAgendaView';
import { CalendarEventCard } from './components/CalendarEventCard';
import { CalendarFilters } from './components/CalendarFilters';
import { CalendarMonthView } from './components/CalendarMonthView';
import { CalendarToolbar } from './components/CalendarToolbar';
import { CalendarWeekView } from './components/CalendarWeekView';
import { EmptyCalendarState } from './components/EmptyCalendarState';
import type { CalendarEvent, CalendarFiltersState, CalendarViewMode } from './calendar.types';
import { filterCalendarEvents, getCalendarEvents, getCalendarViewMode, getDefaultCalendarFilters } from './services/calendarService';

const getStartOfWeek = (date: Date): Date => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  return start;
};

const getMonthDays = (date: Date): Date[] => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const days: Date[] = [];

  for (let index = 0; index < end.getDate(); index += 1) {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    days.push(current);
  }

  return days;
};

const getWeekDays = (date: Date): Date[] => {
  const start = getStartOfWeek(date);
  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return current;
  });
};

const CalendarPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [view, setView] = useState<CalendarViewMode>('month');
  const [visibleDate, setVisibleDate] = useState(new Date());
  const [filters, setFilters] = useState<CalendarFiltersState>(getDefaultCalendarFilters());
  const [windowWidth, setWindowWidth] = useState(typeof window === 'undefined' ? 1280 : window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const nextView = getCalendarViewMode(windowWidth);
    setView(nextView);
  }, [windowWidth]);

  const events = useMemo(() => getCalendarEvents(), []);
  const filteredEvents = useMemo(() => filterCalendarEvents(events, filters), [events, filters]);
  const currentRangeLabel = useMemo(() => {
    if (view === 'agenda') {
      return `Agenda • ${visibleDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}`;
    }

    if (view === 'week') {
      const start = getWeekDays(visibleDate)[0];
      const end = getWeekDays(visibleDate)[6];
      return `${start.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }

    return visibleDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  }, [view, visibleDate]);

  const dayItems = useMemo(() => (view === 'week' ? getWeekDays(visibleDate) : getMonthDays(visibleDate)), [view, visibleDate]);
  const eventTypes = useMemo(() => [
    { value: 'all' as const, label: 'Tutti' },
    { value: 'practice' as const, label: 'Pratica' },
    { value: 'activity' as const, label: 'Attività' },
    { value: 'document' as const, label: 'Documento' },
    { value: 'deadline' as const, label: 'Scadenza' },
  ], []);

  const statusValues = useMemo(() => ['todo', 'open', 'in_progress', 'waiting', 'under_review', 'approved', 'completed', 'active', 'inactive', 'archived', 'cancelled', 'blocked', 'signed', 'expired', 'draft'], []);
  const responsibleValues = useMemo(() => Array.from(new Set(events.map((event) => event.responsible))).sort(), [events]);
  const groupValues = useMemo(() => Array.from(new Set(events.map((event) => event.group))).sort(), [events]);
  const practiceValues = useMemo(() => Array.from(new Map(events.map((event) => [event.practiceId ?? 'all', { value: event.practiceId ?? 'all', label: event.practiceTitle ?? event.practiceCode ?? 'Generica' }])).values()), [events]);

  const handleToday = () => setVisibleDate(new Date());
  const handlePrevious = () => {
    if (view === 'week') {
      const next = new Date(visibleDate);
      next.setDate(visibleDate.getDate() - 7);
      setVisibleDate(next);
      return;
    }

    const next = new Date(visibleDate);
    next.setMonth(visibleDate.getMonth() - 1);
    setVisibleDate(next);
  };
  const handleNext = () => {
    if (view === 'week') {
      const next = new Date(visibleDate);
      next.setDate(visibleDate.getDate() + 7);
      setVisibleDate(next);
      return;
    }

    const next = new Date(visibleDate);
    next.setMonth(visibleDate.getMonth() + 1);
    setVisibleDate(next);
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.type === 'activity') {
      showNotification({ message: `Hai aperto l’attività ${event.title}.`, severity: 'info' });
      return;
    }

    if (event.type === 'document') {
      navigate(`/documenti/${event.resourceId}`);
      return;
    }

    navigate(`/pratiche/${event.practiceId}`);
  };

  const handleDayClick = (date: Date) => {
    showNotification({ message: `Nuova attività per ${date.toLocaleDateString('it-IT')}.`, severity: 'info' });
  };

  const handleResetFilters = () => setFilters(getDefaultCalendarFilters());

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <PageTitle subtitle="Agenda operativa per pratiche, attività e documenti.">Calendario</PageTitle>
        <PrimaryButton onClick={() => navigate('/attivita/nuova')}>Nuova attività</PrimaryButton>
      </Box>
      <SectionCard>
        <CalendarToolbar view={view} currentRangeLabel={currentRangeLabel} onToday={handleToday} onPrevious={handlePrevious} onNext={handleNext} onViewChange={setView} />
      </SectionCard>
      <SectionCard>
        <CalendarFilters filters={filters} onFiltersChange={setFilters} onReset={handleResetFilters} eventTypes={eventTypes} statuses={statusValues} responsibleValues={responsibleValues} groupValues={groupValues} practiceValues={practiceValues} />
      </SectionCard>
      <Paper sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3 }}>
        {filteredEvents.length > 0 ? (
          <>
            {view === 'agenda' ? <CalendarAgendaView events={filteredEvents} onEventClick={handleEventClick} /> : view === 'week' ? <CalendarWeekView days={dayItems} events={filteredEvents} onEventClick={handleEventClick} onDayClick={handleDayClick} /> : <CalendarMonthView days={dayItems} events={filteredEvents} onEventClick={handleEventClick} onDayClick={handleDayClick} />}
          </>
        ) : (
          <EmptyCalendarState onReset={handleResetFilters} />
        )}
      </Paper>
      <Box sx={{ display: 'grid', gap: 1.25 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Eventi principali
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} useFlexGap>
          {filteredEvents.slice(0, 3).map((event) => (
            <CalendarEventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
          ))}
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default CalendarPage;
