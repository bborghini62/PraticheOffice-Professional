import { Box, Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState, PageContainer, PageTitle, SectionCard } from '../../design/components';
import { DocumentDetailsTabs } from './components/DocumentDetailsTabs';
import { DocumentHeader } from './components/DocumentHeader';
import { getDocumentById } from './services/documentsService';
import { addAttachments, createNewVersion, getAttachmentsByDocumentId, getAttachmentObjectUrl, removeAttachment, renameAttachment, updateAttachmentStatus } from './services/documentAttachmentsService';

export const DocumentDetailPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  const document = useMemo(() => (documentId ? getDocumentById(documentId) : undefined), [documentId]);
  const [attachments, setAttachments] = useState(() => (documentId ? getAttachmentsByDocumentId(documentId) : []));
  const [previewAttachmentId, setPreviewAttachmentId] = useState<string | undefined>();

  const refreshAttachments = () => {
    if (documentId) {
      setAttachments(getAttachmentsByDocumentId(documentId));
    }
  };

  const handleUpload = async (files: File[]) => {
    if (!documentId) {
      return;
    }

    const created = await addAttachments(documentId, files, { userId: 'demo-user', userName: document?.owner ?? 'Sistema', practiceId: document?.practiceId });
    if (created.length > 0) {
      refreshAttachments();
    }
  };

  const handleNewVersion = async (file: File) => {
    if (!documentId) {
      return;
    }

    const created = await createNewVersion(documentId, file, { userId: 'demo-user', userName: document?.owner ?? 'Sistema', practiceId: document?.practiceId });
    if (created) {
      refreshAttachments();
    }
  };

  const handleRename = (attachmentId: string) => {
    const renamed = renameAttachment(attachmentId, `allegato-${attachmentId.slice(0, 6)}`);
    if (renamed) {
      refreshAttachments();
    }
  };

  const handleDelete = (attachmentId: string) => {
    const removed = removeAttachment(attachmentId);
    if (removed) {
      refreshAttachments();
    }
  };

  const handleArchive = (attachmentId: string) => {
    const updated = updateAttachmentStatus(attachmentId, 'archived');
    if (updated) {
      refreshAttachments();
    }
  };

  if (!document) {
    return (
      <PageContainer>
        <EmptyState title="Documento non trovato" description="Il documento richiesto non è disponibile o è stato rimosso dall’elenco corrente." actionLabel="Torna ai documenti" onAction={() => navigate('/documenti')} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle subtitle={`${document.code} • ${document.name}`}>Scheda documento</PageTitle>
      <DocumentHeader title={document.name} subtitle={`${document.code} • ${document.owner}`} onEdit={() => navigate('/documenti')} onMoreActions={() => navigate('/documenti')} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DocumentDetailsTabs document={document} attachments={attachments} onUpload={handleUpload} onNewVersion={handleNewVersion} onRename={handleRename} onArchive={handleArchive} onDelete={handleDelete} onPreview={(attachmentId) => setPreviewAttachmentId(attachmentId)} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dati operativi
            </Typography>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Pratica</Typography>
                <Typography variant="subtitle1">{document.practiceId}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Ultimo aggiornamento</Typography>
                <Typography variant="subtitle1">{new Date(document.lastUpdatedAt).toLocaleDateString('it-IT')}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Note</Typography>
                <Typography variant="subtitle1">{document.notes || 'Nessuna nota aggiuntiva.'}</Typography>
              </Box>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
      {previewAttachmentId ? (
        <Box sx={{ mt: 2, p: 2, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Anteprima allegato
          </Typography>
          {getAttachmentObjectUrl(previewAttachmentId) ? (
            <Box component="img" src={getAttachmentObjectUrl(previewAttachmentId)} alt="Anteprima allegato" sx={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain', borderRadius: 2 }} />
          ) : (
            <Typography variant="body2" color="text.secondary">L’allegato non è disponibile in anteprima in questa sessione.</Typography>
          )}
        </Box>
      ) : null}
    </PageContainer>
  );
};

export default DocumentDetailPage;
