import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../../../design/components';
import type { PracticePriority, PracticeRecord, PracticeStatus } from '../practices.types';

interface EditPracticeDialogProps {
  practice: PracticeRecord;
  open: boolean;
  onClose: () => void;
  onSaved: (practice: PracticeRecord) => void;
}

const statusOptions: PracticeStatus[] = ['draft', 'open', 'in_progress', 'waiting', 'under_review', 'approved', 'completed', 'archived', 'cancelled'];
const priorityOptions: PracticePriority[] = ['low', 'normal', 'high', 'urgent'];

export const EditPracticeDialog = ({ practice, open, onClose, onSaved }: EditPracticeDialogProps) => {
  const [subject, setSubject] = useState(practice.subject);
  const [status, setStatus] = useState<PracticeStatus>(practice.status);
  const [priority, setPriority] = useState<PracticePriority>(practice.priority);
  const [responsible, setResponsible] = useState(practice.responsible);
  const [group, setGroup] = useState(practice.group);
  const [dueDate, setDueDate] = useState(practice.dueDate);

  useEffect(() => {
    setSubject(practice.subject);
    setStatus(practice.status);
    setPriority(practice.priority);
    setResponsible(practice.responsible);
    setGroup(practice.group);
    setDueDate(practice.dueDate);
  }, [practice]);

  const handleSave = () => {
    const nextPractice: PracticeRecord = {
      ...practice,
      subject,
      status,
      priority,
      responsible,
      group,
      dueDate,
      updatedAt: new Date().toISOString(),
    };

    onSaved(nextPractice);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Modifica pratica</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField label="Oggetto" value={subject} onChange={(event) => setSubject(event.target.value)} fullWidth />
          <TextField select label="Stato" value={status} onChange={(event) => setStatus(event.target.value as PracticeStatus)} fullWidth>
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label="Priorità" value={priority} onChange={(event) => setPriority(event.target.value as PracticePriority)} fullWidth>
            {priorityOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Responsabile" value={responsible} onChange={(event) => setResponsible(event.target.value)} fullWidth />
          <TextField label="Gruppo" value={group} onChange={(event) => setGroup(event.target.value)} fullWidth />
          <TextField label="Scadenza" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} fullWidth slotProps={{ inputLabel: { shrink: true } }} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={onClose}>Annulla</SecondaryButton>
        <PrimaryButton onClick={handleSave}>Salva</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
