import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../../../design/components';
import type { DocumentAttachment } from '../documents.types';

interface RenameAttachmentDialogProps {
  open: boolean;
  attachment?: DocumentAttachment;
  onClose: () => void;
  onSubmit: (nextFileName: string) => void;
}

export const RenameAttachmentDialog = ({ open, attachment, onClose, onSubmit }: RenameAttachmentDialogProps) => {
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (!attachment) {
      setFileName('');
      return;
    }

    const extension = attachment.extension ? `.${attachment.extension}` : '';
    setFileName(attachment.fileName.replace(new RegExp(`${extension}$`, 'i'), ''));
  }, [attachment, open]);

  const handleSubmit = () => {
    const nextFileName = fileName.trim();
    if (!nextFileName) {
      return;
    }

    onSubmit(nextFileName);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Rinomina allegato</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField label="Nuovo nome file" value={fileName} onChange={(event) => setFileName(event.target.value)} fullWidth autoFocus />
          <TextField label="Estensione" value={attachment?.extension ? `.${attachment.extension}` : ''} fullWidth disabled />
        </Stack>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={onClose}>Annulla</SecondaryButton>
        <PrimaryButton onClick={handleSubmit}>Salva</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
