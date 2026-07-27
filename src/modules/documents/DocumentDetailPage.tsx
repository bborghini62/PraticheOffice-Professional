import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { isCloudAuthError } from '../../core/cloud';
import { appRoutes } from '../../core/router/routes';
import { EmptyState, PageContainer, PageTitle, SectionCard, PrimaryButton, SecondaryButton } from '../../design/components';
import { DocumentDetailsTabs } from './components/DocumentDetailsTabs';
import { DocumentHeader } from './components/DocumentHeader';
import { RenameAttachmentDialog } from './components/RenameAttachmentDialog';
import { deleteDocument, getDocumentById } from './services/documentsService';
import { addAttachments, createNewVersion, getAttachmentById, getAttachmentsByDocumentId, getAttachmentObjectUrl, removeAttachment, renameAttachment, updateAttachmentStatus } from './services/documentAttachmentsService';

export const DocumentDetailPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const documentRecord = useMemo(() => (documentId ? getDocumentById(documentId) : undefined), [documentId]);
  const [attachments, setAttachments] = useState(() => (documentId ? getAttachmentsByDocumentId(documentId) : []));
  const [previewAttachmentId, setPreviewAttachmentId] = useState<string | undefined>();
  const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<{ type: 'attachment' | 'document'; attachmentId?: string; documentName?: string } | undefined>();
  const [renameAttachmentId, setRenameAttachmentId] = useState<string | undefined>();
  const [previewError, setPreviewError] = useState<string | undefined>();

  const refreshAttachments = () => {
    if (documentId) {
      setAttachments(getAttachmentsByDocumentId(documentId));
    }
  };

  const getPreviewSource = (attachmentId: string): string | undefined => {
    const attachment = getAttachmentById(attachmentId);
    if (!attachment) {
      return undefined;
    }

    if (attachment.storageProvider === 'google-drive') {
      return attachment.previewUrl ?? attachment.driveUrl;
    }

    return getAttachmentObjectUrl(attachmentId);
  };

  const getOpenSource = (attachmentId: string): string | undefined => {
    const attachment = getAttachmentById(attachmentId);
    if (!attachment) {
      return undefined;
    }

    if (attachment.storageProvider === 'google-drive') {
      return attachment.driveUrl ?? attachment.previewUrl;
    }

    return getAttachmentObjectUrl(attachmentId);
  };

  const getDownloadSource = (attachmentId: string): string | undefined => {
    const attachment = getAttachmentById(attachmentId);
    if (!attachment) {
      return undefined;
    }

    if (attachment.storageProvider === 'google-drive') {
      return attachment.downloadUrl ?? attachment.driveUrl;
    }

    return getAttachmentObjectUrl(attachmentId);
  };

  const handleUpload = async (files: File[]) => {
    if (!documentId) {
      return;
    }

    try {
      const created = await addAttachments(documentId, files, {
        userId: 'demo-user',
        userName: documentRecord?.owner ?? 'Sistema',
        practiceId: documentRecord?.practiceId,
        documentName: documentRecord?.name,
        documentCategory: documentRecord?.category,
        documentStatus: documentRecord?.status,
        storageProvider: documentRecord?.provider === 'google_drive' ? 'google-drive' : 'browser-memory',
      });
      if (created.length > 0) {
        refreshAttachments();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Impossibile caricare gli allegati.';
      setPreviewError(message);
      showNotification({ message, severity: 'error' });
      if (isCloudAuthError(error)) {
        navigate(appRoutes.settings.path);
      }
    }
  };

  const handleNewVersion = async (file: File) => {
    if (!documentId) {
      return;
    }

    try {
      const created = await createNewVersion(documentId, file, {
        userId: 'demo-user',
        userName: documentRecord?.owner ?? 'Sistema',
        practiceId: documentRecord?.practiceId,
        documentName: documentRecord?.name,
        documentCategory: documentRecord?.category,
        documentStatus: documentRecord?.status,
        storageProvider: documentRecord?.provider === 'google_drive' ? 'google-drive' : 'browser-memory',
      });
      if (created) {
        refreshAttachments();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Impossibile caricare la nuova versione.';
      setPreviewError(message);
      showNotification({ message, severity: 'error' });
      if (isCloudAuthError(error)) {
        navigate(appRoutes.settings.path);
      }
    }
  };

  const handleDelete = (attachmentId: string) => {
    const attachment = attachments.find((candidate) => candidate.id === attachmentId);
    if (attachment) {
      setConfirmDeleteTarget({ type: 'attachment', attachmentId, documentName: documentRecord?.name });
    }
  };

  const confirmDelete = () => {
    if (!confirmDeleteTarget) {
      return;
    }

    if (confirmDeleteTarget.type === 'attachment' && confirmDeleteTarget.attachmentId) {
      const removed = removeAttachment(confirmDeleteTarget.attachmentId, { documentName: documentRecord?.name, userName: documentRecord?.owner ?? 'Sistema', practiceId: documentRecord?.practiceId });
      if (removed) {
        refreshAttachments();
      }
    } else if (documentId && documentRecord) {
      deleteDocument(documentId, documentRecord.owner);
      navigate('/documenti');
    }

    setConfirmDeleteTarget(undefined);
  };

  const handleArchive = (attachmentId: string) => {
    const updated = updateAttachmentStatus(attachmentId, 'archived');
    if (updated) {
      refreshAttachments();
    }
  };

  const handleRename = (attachmentId: string) => {
    setRenameAttachmentId(attachmentId);
  };

  const handleOpen = (attachmentId: string) => {
    const attachment = attachments.find((candidate) => candidate.id === attachmentId);
    if (!attachment) {
      setPreviewError('Allegato non disponibile.');
      return;
    }

    const objectUrl = getOpenSource(attachmentId);
    if (!objectUrl) {
      setPreviewError('L’allegato non è ancora disponibile per l’apertura.');
      return;
    }

    setPreviewError(undefined);
    window.open(objectUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (attachmentId: string) => {
    const attachment = attachments.find((candidate) => candidate.id === attachmentId);
    if (!attachment) {
      setPreviewError('Allegato non disponibile.');
      return;
    }

    const objectUrl = getDownloadSource(attachmentId);
    if (!objectUrl) {
      setPreviewError('L’allegato non è ancora disponibile per il download.');
      return;
    }

    const link = globalThis.document.createElement('a');
    link.href = objectUrl;
    link.download = attachment.fileName;
    globalThis.document.body.appendChild(link);
    link.click();
    globalThis.document.body.removeChild(link);
    setPreviewError(undefined);
  };

  const handleRenameSubmit = (nextFileName: string) => {
    if (!renameAttachmentId) {
      return;
    }

    const renamed = renameAttachment(renameAttachmentId, nextFileName);
    if (renamed) {
      refreshAttachments();
    }
    setRenameAttachmentId(undefined);
  };

  const handleDocumentDelete = () => {
    if (!documentRecord) {
      return;
    }

    setConfirmDeleteTarget({ type: 'document', documentName: documentRecord.name });
  };

  if (!documentRecord) {
    return (
      <PageContainer>
        <EmptyState title="Documento non trovato" description="Il documento richiesto non è disponibile o è stato rimosso dall’elenco corrente." actionLabel="Torna ai documenti" onAction={() => navigate('/documenti')} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle subtitle={`${documentRecord.code} • ${documentRecord.name}`}>Scheda documento</PageTitle>
      <DocumentHeader title={documentRecord.name} subtitle={`${documentRecord.code} • ${documentRecord.owner}`} onEdit={() => navigate('/documenti')} onMoreActions={handleDocumentDelete} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DocumentDetailsTabs document={documentRecord} attachments={attachments} onUpload={handleUpload} onNewVersion={handleNewVersion} onRename={handleRename} onArchive={handleArchive} onDelete={handleDelete} onPreview={(attachmentId) => { setPreviewAttachmentId(attachmentId); setPreviewError(undefined); }} onOpen={handleOpen} onDownload={handleDownload} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dati operativi
            </Typography>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Pratica</Typography>
                <Typography variant="subtitle1">{documentRecord.practiceId}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Ultimo aggiornamento</Typography>
                <Typography variant="subtitle1">{new Date(documentRecord.lastUpdatedAt).toLocaleDateString('it-IT')}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Note</Typography>
                <Typography variant="subtitle1">{documentRecord.notes || 'Nessuna nota aggiuntiva.'}</Typography>
              </Box>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
      {previewAttachmentId ? (
        <Dialog open={Boolean(previewAttachmentId)} onClose={() => setPreviewAttachmentId(undefined)} fullWidth maxWidth="md">
          <DialogTitle>{attachments.find((attachment) => attachment.id === previewAttachmentId)?.fileName ?? 'Anteprima allegato'}</DialogTitle>
          <DialogContent>
            {previewError ? (
              <Typography color="error.main">{previewError}</Typography>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}>
                {attachments.find((attachment) => attachment.id === previewAttachmentId)?.previewType === 'image' ? (
                  <Box component="img" src={getPreviewSource(previewAttachmentId)} alt="Anteprima allegato" sx={{ maxWidth: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 2 }} />
                ) : (
                  <Box component="iframe" src={getPreviewSource(previewAttachmentId)} title="Anteprima allegato" sx={{ width: '100%', minHeight: 420, border: 'none', borderRadius: 2 }} />
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <SecondaryButton onClick={() => setPreviewAttachmentId(undefined)}>Chiudi</SecondaryButton>
            <PrimaryButton onClick={() => handleOpen(previewAttachmentId)}>Apri in nuova scheda</PrimaryButton>
            <PrimaryButton onClick={() => handleDownload(previewAttachmentId)}>Scarica</PrimaryButton>
          </DialogActions>
        </Dialog>
      ) : null}
      <RenameAttachmentDialog open={Boolean(renameAttachmentId)} attachment={attachments.find((attachment) => attachment.id === renameAttachmentId)} onClose={() => setRenameAttachmentId(undefined)} onSubmit={handleRenameSubmit} />
      <Dialog open={Boolean(confirmDeleteTarget)} onClose={() => setConfirmDeleteTarget(undefined)} fullWidth maxWidth="sm">
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {confirmDeleteTarget?.type === 'attachment'
              ? `Confermi l’eliminazione dell’allegato ${attachments.find((attachment) => attachment.id === confirmDeleteTarget.attachmentId)?.fileName ?? 'selezionato'}?`
              : `Confermi l’eliminazione del documento ${confirmDeleteTarget?.documentName ?? 'selezionato'}? L’operazione non potrà essere annullata.`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={() => setConfirmDeleteTarget(undefined)}>Annulla</SecondaryButton>
          <PrimaryButton color="error" onClick={confirmDelete}>Elimina</PrimaryButton>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default DocumentDetailPage;
