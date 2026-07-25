import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useMemo, useState, type MouseEvent } from 'react';
import { DataTable } from '../../../design/components';
import { getActivityPracticeDisplayName } from '../services/activitiesService';
import { ActivityStatusBadge } from './ActivityStatusBadge';
import type { ActivityPriority, ActivityRecord, ActivityStatus } from '../activities.types';

interface ActivitiesTableProps {
  activities: ActivityRecord[];
  onOpenActivity: (activity: ActivityRecord) => void;
  onInformationalAction: (action: string) => void;
  onCompleteActivity: (activity: ActivityRecord) => void;
}

const priorityLabels: Record<ActivityPriority, string> = {
  low: 'Bassa',
  normal: 'Normale',
  high: 'Alta',
  urgent: 'Urgente',
};

const formatDate = (value: string) => new Date(value).toLocaleDateString('it-IT');

export const ActivitiesTable = ({ activities, onOpenActivity, onInformationalAction, onCompleteActivity }: ActivitiesTableProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityRecord | null>(null);

  const menuOpen = Boolean(anchorEl);

  const sortedActivities = useMemo(() => [...activities].sort((left, right) => left.title.localeCompare(right.title)), [activities]);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, activity: ActivityRecord) => {
    event.stopPropagation();
    setSelectedActivity(activity);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedActivity(null);
  };

  const handleAction = (action: string) => {
    if (!selectedActivity) {
      return;
    }

    if (action === 'complete') {
      onCompleteActivity(selectedActivity);
    } else {
      onInformationalAction(action);
    }
    handleMenuClose();
  };

  return (
    <Box>
      <DataTable columns={['Codice', 'Titolo', 'Pratica', 'Stato', 'Priorità', 'Assegnatario', 'Scadenza', 'Ultimo aggiornamento', 'Azioni']}>
        {sortedActivities.map((activity) => (
          <Box component="tr" key={activity.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {activity.code}
              </Typography>
            </Box>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{activity.title}</Typography>
            </Box>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">
                {getActivityPracticeDisplayName(activity)}
              </Typography>
            </Box>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              <ActivityStatusBadge status={activity.status as ActivityStatus} />
            </Box>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              {priorityLabels[activity.priority as ActivityPriority]}
            </Box>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              {activity.assignee}
            </Box>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              {formatDate(activity.dueDate)}
            </Box>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              {formatDate(activity.updatedAt)}
            </Box>
            <Box component="td" sx={{ p: 1.4, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Typography component="button" onClick={() => onOpenActivity(activity)} sx={{ cursor: 'pointer', color: 'primary.main', border: 'none', background: 'transparent', p: 0, fontWeight: 600 }}>
                  Apri
                </Typography>
                <IconButton size="small" onClick={(event) => handleMenuOpen(event, activity)}>
                  <MoreVertRoundedIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </DataTable>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleAction('edit')}>Modifica</MenuItem>
        <MenuItem onClick={() => handleAction('complete')}>Completa</MenuItem>
        <MenuItem onClick={() => handleAction('cancel')}>Annulla</MenuItem>
      </Menu>
    </Box>
  );
};
