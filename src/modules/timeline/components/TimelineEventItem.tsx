import { Box, Typography } from '@mui/material';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import type { TimelineEvent, TimelineEventType } from '../timeline.types';

interface TimelineEventItemProps {
  event: TimelineEvent;
}

const typeIcons: Record<TimelineEventType, typeof AssignmentTurnedInRoundedIcon> = {
  practice_created: AssignmentTurnedInRoundedIcon,
  practice_updated: UpdateRoundedIcon,
  practice_status_changed: SwapHorizRoundedIcon,
  practice_assignee_changed: PersonRoundedIcon,
  practice_group_changed: PersonRoundedIcon,
  practice_client_changed: PersonRoundedIcon,
  activity_created: AssignmentTurnedInRoundedIcon,
  activity_completed: AssignmentTurnedInRoundedIcon,
  activity_cancelled: CancelRoundedIcon,
  document_added: DescriptionRoundedIcon,
  document_version_added: DescriptionRoundedIcon,
  document_deleted: DescriptionRoundedIcon,
  document_attachment_deleted: DescriptionRoundedIcon,
  note_added: NoteAltRoundedIcon,
};

const formatDateTime = (value: string) => new Date(value).toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' });

export const TimelineEventItem = ({ event }: TimelineEventItemProps) => {
  const Icon = typeIcons[event.type];

  return (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
      <Box sx={{ minWidth: 40, height: 40, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.25 }}>
        <Icon />
      </Box>
      <Box sx={{ flex: 1, p: 1.25, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
          <Typography variant="subtitle2">{event.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDateTime(event.createdAt)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {event.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Utente: {event.userName}
        </Typography>
      </Box>
    </Box>
  );
};
