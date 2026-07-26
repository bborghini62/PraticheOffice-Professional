import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useRef, useState } from 'react';
import type { DocumentAttachment } from '../documents.types';

interface AttachmentUploadAreaProps {
  selectedFiles: File[];
  onFilesChange: (files: File[]) => void;
  onError: (message: string) => void;
  existingAttachments?: DocumentAttachment[];
}

export const AttachmentUploadArea = ({ selectedFiles, onFilesChange, onError, existingAttachments = [] }: AttachmentUploadAreaProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    const nextFiles = Array.from(files).filter((file) => file.size > 0);
    if (nextFiles.length === 0) {
      onError('Il file selezionato è vuoto.');
      return;
    }

    const merged = [...selectedFiles, ...nextFiles];
    onFilesChange(merged);
  };

  const removeFile = (index: number) => {
    onFilesChange(selectedFiles.filter((_, candidateIndex) => candidateIndex !== index));
  };

  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      <Box
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          handleFiles(event.dataTransfer.files);
        }}
        sx={{
          border: '2px dashed',
          borderColor: dragActive ? 'primary.main' : 'divider',
          borderRadius: 3,
          p: 3,
          textAlign: 'center',
          bgcolor: dragActive ? 'primary.50' : 'grey.50',
          cursor: 'pointer',
        }}
        onClick={() => inputRef.current?.click()}
      >
        <CloudUploadRoundedIcon fontSize="large" color="primary" />
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
          Trascina qui i file oppure selezionali dal computer
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Supportiamo PDF, Office, immagini, testi e archivi comuni.
        </Typography>
        <Button variant="outlined" size="small" sx={{ mt: 1.5 }}>
          Seleziona file
        </Button>
        <input ref={inputRef} type="file" multiple hidden onChange={(event) => handleFiles(event.target.files)} />
      </Box>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        {existingAttachments.length > 0 ? existingAttachments.map((attachment) => <Chip key={attachment.id} label={attachment.fileName} size="small" color="default" />) : null}
      </Stack>
      {selectedFiles.length > 0 ? (
        <Box sx={{ display: 'grid', gap: 1, maxHeight: 220, overflowY: 'auto', pr: 0.5 }}>
          {selectedFiles.map((file, index) => (
            <Box key={`${file.name}-${index}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
              <Box>
                <Typography variant="subtitle2">{file.name}</Typography>
                <Typography variant="body2" color="text.secondary">{(file.size / 1024).toFixed(1)} KB</Typography>
              </Box>
              <Button size="small" startIcon={<DeleteRoundedIcon />} onClick={(event) => { event.stopPropagation(); removeFile(index); }}>
                Rimuovi
              </Button>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};
