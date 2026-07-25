import { Button, Dialog, DialogActions, DialogContent, DialogTitle, type DialogProps } from '@mui/material';

interface ConfirmDialogProps extends DialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({ title, message, onConfirm, onCancel, ...props }: ConfirmDialogProps) => (
  <Dialog {...props}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Annulla</Button>
      <Button color="error" variant="contained" onClick={onConfirm}>
        Conferma
      </Button>
    </DialogActions>
  </Dialog>
);
