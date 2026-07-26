import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../../../design/components';
import type { WorkflowDefinition, WorkflowTransition } from '../workflow.types';

interface WorkflowTransitionDialogProps {
  workflow: WorkflowDefinition | undefined;
  transitions?: WorkflowTransition[];
  open: boolean;
  onClose: () => void;
  onConfirm: (transitionId: string, note: string) => void;
}

export const WorkflowTransitionDialog = ({ workflow, transitions, open, onClose, onConfirm }: WorkflowTransitionDialogProps) => {
  const availableTransitions = transitions ?? workflow?.transitions ?? [];
  const [transitionId, setTransitionId] = useState(availableTransitions[0]?.id ?? '');
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    if (!transitionId) {
      return;
    }
    onConfirm(transitionId, note);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nuova transizione workflow</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Seleziona la transizione da applicare al workflow corrente.
          </Typography>
          <TextField select label="Transizione" value={transitionId} onChange={(event) => setTransitionId(event.target.value)} fullWidth>
            {availableTransitions.map((transition: WorkflowTransition) => (
              <MenuItem key={transition.id} value={transition.id}>
                {transition.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Note" value={note} onChange={(event) => setNote(event.target.value)} multiline minRows={3} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={onClose}>Annulla</SecondaryButton>
        <PrimaryButton onClick={handleConfirm}>Applica</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
