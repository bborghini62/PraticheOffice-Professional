import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import type { DocumentAttachment } from '../documents.types';
import { AttachmentIcon } from './AttachmentIcon';

interface AttachmentListProps {
  attachments: DocumentAttachment[];
  onPreview: (attachment: DocumentAttachment) => void;
  onOpen: (attachment: DocumentAttachment) => void;
  onDownload: (attachment: DocumentAttachment) => void;
  onNewVersion?: (attachment: DocumentAttachment) => void;
  onRename?: (attachment: DocumentAttachment) => void;
  onArchive?: (attachment: DocumentAttachment) => void;
  onDelete?: (attachment: DocumentAttachment) => void;
}

export const AttachmentList = ({ attachments, onPreview, onOpen, onDownload, onNewVersion, onRename, onArchive, onDelete }: AttachmentListProps) => (
  <Box sx={{ display: 'grid', gap: 1.25, maxHeight: 320, overflowY: 'auto', pr: 0.5 }}>
    {attachments.map((attachment) => (
      <Box key={attachment.id} sx={{ p: 1.25, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'grey.50', display: 'grid', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <AttachmentIcon previewType={attachment.previewType} />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>{attachment.fileName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {attachment.extension.toUpperCase()} • {Math.round(attachment.size / 1024)} KB • v{attachment.versionNumber}
              </Typography>
            </Box>
          </Box>
          <Chip label={attachment.status === 'uploaded' ? 'Caricato' : attachment.status === 'archived' ? 'Archiviato' : 'Eliminato'} size="small" />
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Button size="small" startIcon={<VisibilityRoundedIcon />} onClick={() => onPreview(attachment)}>Anteprima</Button>
          <Button size="small" startIcon={<OpenInNewRoundedIcon />} onClick={() => onOpen(attachment)}>Apri</Button>
          <Button size="small" startIcon={<DownloadRoundedIcon />} onClick={() => onDownload(attachment)}>Scarica</Button>
          {onNewVersion ? <Button size="small" onClick={() => onNewVersion(attachment)}>Nuova versione</Button> : null}
          {onRename ? <Button size="small" onClick={() => onRename(attachment)}>Rinomina</Button> : null}
          {onArchive ? <Button size="small" onClick={() => onArchive(attachment)}>Archivia</Button> : null}
          {onDelete ? <Button size="small" color="error" onClick={() => onDelete(attachment)}>Elimina</Button> : null}
        </Stack>
      </Box>
    ))}
  </Box>
);
