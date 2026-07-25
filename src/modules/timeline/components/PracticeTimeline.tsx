import { Stack } from '@mui/material';
import type { TimelineEvent } from '../timeline.types';
import { EmptyTimelineState } from './EmptyTimelineState';
import { TimelineEventItem } from './TimelineEventItem';

interface PracticeTimelineProps {
  events: TimelineEvent[];
}

export const PracticeTimeline = ({ events }: PracticeTimelineProps) => {
  if (!events.length) {
    return <EmptyTimelineState />;
  }

  return (
    <Stack spacing={1.5}>
      {events.map((event) => (
        <TimelineEventItem key={event.id} event={event} />
      ))}
    </Stack>
  );
};
