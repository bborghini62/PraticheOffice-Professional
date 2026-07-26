import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../../../design/components';
import { getUsers } from '../../users/services/usersService';
import type { GroupRecord } from '../groups.types';

interface GroupFormDialogProps {
  open: boolean;
  group?: GroupRecord;
  onClose: () => void;
  onSubmit: (group: Omit<GroupRecord, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const GroupFormDialog = ({ open, group, onClose, onSubmit }: GroupFormDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [managerUserId, setManagerUserId] = useState('');
  const [memberUserIds, setMemberUserIds] = useState<string[]>([]);
  const [status, setStatus] = useState<GroupRecord['status']>('active');
  const userOptions = useMemo(() => getUsers().map((user) => ({ value: user.id, label: `${user.displayName} (${user.role})` })), []);

  useEffect(() => {
    if (!group) {
      setName('');
      setDescription('');
      setResponsible('');
      setManagerUserId('');
      setMemberUserIds([]);
      setStatus('active');
      return;
    }

    setName(group.name);
    setDescription(group.description);
    setResponsible(group.responsible);
    setManagerUserId(group.managerUserId ?? '');
    setMemberUserIds(group.memberUserIds ?? []);
    setStatus(group.status);
  }, [group, open]);

  const handleSubmit = () => {
    const nextMembers = Array.from(new Set([...(memberUserIds ?? []), ...(managerUserId ? [managerUserId] : [])].filter(Boolean)));
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      responsible: responsible.trim(),
      managerUserId: managerUserId || nextMembers[0],
      memberUserIds: nextMembers,
      status,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{group ? 'Modifica gruppo' : 'Nuovo gruppo'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField label="Nome" value={name} onChange={(event) => setName(event.target.value)} fullWidth required />
          <TextField label="Descrizione" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth multiline minRows={3} />
          <TextField label="Responsabile" value={responsible} onChange={(event) => setResponsible(event.target.value)} fullWidth />
          <TextField select label="Manager di gruppo" value={managerUserId} onChange={(event) => setManagerUserId(event.target.value)} fullWidth>
            <MenuItem value="">Nessun manager</MenuItem>
            {userOptions.map((user) => (
              <MenuItem key={user.value} value={user.value}>
                {user.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label="Membri" value={memberUserIds} onChange={(event) => setMemberUserIds(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)} slotProps={{ select: { multiple: true } }} fullWidth>
            {userOptions.map((user) => (
              <MenuItem key={user.value} value={user.value}>
                {user.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label="Stato" value={status} onChange={(event) => setStatus(event.target.value as GroupRecord['status'])} fullWidth>
            <MenuItem value="active">Attivo</MenuItem>
            <MenuItem value="archived">Archiviato</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={onClose}>Annulla</SecondaryButton>
        <PrimaryButton onClick={handleSubmit}>Salva</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
