import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { PrimaryButton, SecondaryButton, SectionCard } from '../../../design/components';
import { AttachmentList } from './AttachmentList';
import type { DocumentAttachment, DocumentRecord } from '../documents.types';

interface DocumentDetailsTabsProps {
  document: DocumentRecord;
  attachments: DocumentAttachment[];
  onUpload: (files: File[]) => Promise<void> | void;
  onNewVersion: (file: File) => Promise<void> | void;
  onRename: (attachmentId: string) => void;
  onArchive: (attachmentId: string) => void;
  onDelete: (attachmentId: string) => void;
  onPreview: (attachmentId: string) => void;
}

export const DocumentDetailsTabs = ({ document, attachments, onUpload, onNewVersion, onRename, onArchive, onDelete, onPreview }: DocumentDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const versionInputRef = useRef<HTMLInputElement | null>(null);

  const tabItems = ['Riepilogo', 'Allegati', 'Collegamenti', 'Storico'];
  const categoryLabel =
    document.category === 'received'
      ? 'Documento ricevuto'
      : document.category === 'produced'
        ? 'Documento prodotto'
        : document.category === 'communication'
          ? 'Comunicazione'
          : document.category === 'signed'
            ? 'Documento firmato'
            : document.category === 'attachment'
              ? 'Allegato'
              : 'Altro';

  const providerLabel =
    document.provider === 'local' ? 'Archivio locale' : document.provider === 'google_drive' ? 'Google Drive' : 'Dropbox';

  const handleUploadSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) {
      return;
    }

    await onUpload(Array.from(files));
    event.target.value = '';
  };

  const handleVersionSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) {
      return;
    }

    await onNewVersion(files[0]);
    event.target.value = '';
  };

  return (
    <SectionCard>
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
        {tabItems.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="body1">{document.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {document.description || 'Descrizione non disponibile.'}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
            {[
              { label: 'Codice', value: document.code },
              { label: 'Pratica collegata', value: document.practiceId },
              { label: 'Categoria', value: categoryLabel },
              { label: 'Stato', value: document.status },
              { label: 'Versione corrente', value: document.version },
              { label: 'Proprietario', value: document.owner },
              { label: 'Provider', value: providerLabel },
              { label: 'Percorso logico', value: document.logicalPath },
              { label: 'Data documento', value: new Date(document.documentDate).toLocaleDateString('it-IT') },
              { label: 'Data scadenza', value: new Date(document.dueDate).toLocaleDateString('it-IT') },
            ].map((item) => (
              <Box key={item.label} sx={{ p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                <Typography variant="subtitle2" sx={{ mt: 0.25 }}>{item.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2">Allegati e versioni</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <PrimaryButton size="small" onClick={() => uploadInputRef.current?.click()}>Carica allegati</PrimaryButton>
              <PrimaryButton size="small" onClick={() => versionInputRef.current?.click()}>Nuova versione</PrimaryButton>
            </Box>
          </Box>
          <input ref={uploadInputRef} type="file" multiple hidden onChange={handleUploadSelection} />
          <input ref={versionInputRef} type="file" hidden onChange={handleVersionSelection} />
          <Box sx={{ p: 1.35, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2">Versione {document.version}</Typography>
            <Typography variant="body2" color="text.secondary">Aggiornata il {new Date(document.lastUpdatedAt).toLocaleDateString('it-IT')}</Typography>
          </Box>
          {attachments.length > 0 ? (
            <AttachmentList attachments={attachments} onPreview={(attachment) => onPreview(attachment.id)} onOpen={(attachment) => onPreview(attachment.id)} onDownload={(attachment) => onPreview(attachment.id)} onNewVersion={() => versionInputRef.current?.click()} onRename={(attachment) => onRename(attachment.id)} onArchive={(attachment) => onArchive(attachment.id)} onDelete={(attachment) => onDelete(attachment.id)} />
          ) : (
            <Typography variant="body2" color="text.secondary">Carica il primo allegato per aggiungere documenti reali alla scheda.</Typography>
          )}
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Collegamenti</Typography>
          <Typography variant="body2" color="text.secondary">
            Documento associato alla pratica selezionata e disponibile in archiviazione condivisa.
          </Typography>
          <SecondaryButton size="small">Apri pratica</SecondaryButton>
        </Box>
      )}

      {activeTab === 3 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Storico</Typography>
          <Typography variant="body2" color="text.secondary">
            24/07/2026 • Documento registrato
          </Typography>
          <Typography variant="body2" color="text.secondary">
            23/07/2026 • Aggiornamento versione
          </Typography>
        </Box>
      )}
    </SectionCard>
  );
};
