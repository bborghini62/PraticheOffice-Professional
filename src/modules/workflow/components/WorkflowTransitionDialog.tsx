import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../../../design/components';
import type { WorkflowDefinition, WorkflowTransition } from '../workflow.types';

interface WorkflowTransitionDialogProps {
  workflow: WorkflowDefinition;
  open: boolean;
  onClose: () => void;
  onConfirm: (transitionId: string, note: string) => void;
}

export const WorkflowTransitionDialog = ({ workflow, open, onClose, onConfirm }: WorkflowTransitionDialogProps) => {
  const [transitionId, setTransitionId] = useState(workflow.transitions[0]?.id ?? '');
  const [note, setNote] = useState('');

  const handleConfirm = () => {
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
            {workflow.transitions.map((transition: WorkflowTransition) => (
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
