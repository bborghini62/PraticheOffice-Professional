import { Box, Paper } from '@mui/material';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { isCloudAuthError } from '../../core/cloud';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle } from '../../design/components';
import { DocumentForm, type DocumentFormErrors, type DocumentFormValues } from './components/DocumentForm';
import { addDocument, getDocuments } from './services/documentsService';
import { addAttachments } from './services/documentAttachmentsService';
import { getNextDocumentCode } from './services/documentCodeService';
import type { DocumentCategory, DocumentProvider, DocumentRecord, DocumentStatus } from './documents.types';

const initialValues = (practiceId?: string): DocumentFormValues => {
  const existingDocuments = getDocuments();
  return {
    code: getNextDocumentCode(existingDocuments.map((document) => document.code)),
    name: '',
    description: '',
    practiceId: practiceId ?? '',
    category: '',
    status: 'draft' as DocumentStatus,
    owner: '',
    version: '1',
    provider: 'local' as DocumentProvider,
    logicalPath: '',
    documentDate: '',
    dueDate: '',
    notes: '',
  };
};

const NewDocumentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { practiceId } = useParams<{ practiceId: string }>();
  const { showNotification } = useNotification();
  const [values, setValues] = useState<DocumentFormValues>(initialValues(practiceId));
  const [errors, setErrors] = useState<DocumentFormErrors>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [attachmentMessage, setAttachmentMessage] = useState<string | undefined>();

  const practiceContext = useMemo(() => {
    const match = location.pathname.match(/\/pratiche\/(.+?)\/documenti\/nuovo/);
    return match?.[1] ?? practiceId;
  }, [location.pathname, practiceId]);

  const validate = (): DocumentFormErrors => {
    const nextErrors: DocumentFormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = 'Il nome documento è obbligatorio.';
    }

    if (!values.practiceId.trim()) {
      nextErrors.practiceId = 'La pratica è obbligatoria.';
    }

    if (!values.category) {
      nextErrors.category = 'La categoria è obbligatoria.';
    }

    if (!values.owner.trim()) {
      nextErrors.owner = 'Il proprietario è obbligatorio.';
    }

    const version = Number(values.version);
    if (!Number.isFinite(version) || version <= 0) {
      nextErrors.version = 'La versione deve essere maggiore di zero.';
    }

    if (values.dueDate && values.documentDate && values.dueDate < values.documentDate) {
      nextErrors.dueDate = 'La data scadenza non può essere precedente alla data documento.';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof DocumentFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const newDocument: DocumentRecord = {
      id: values.code,
      code: values.code,
      name: values.name.trim(),
      description: values.description.trim(),
      practiceId: values.practiceId.trim(),
      category: values.category as DocumentCategory,
      status: values.status as DocumentStatus,
      owner: values.owner.trim(),
      version: Number(values.version),
      provider: values.provider as DocumentProvider,
      logicalPath: values.logicalPath.trim(),
      documentDate: values.documentDate,
      dueDate: values.dueDate,
      lastUpdatedAt: values.documentDate || new Date().toISOString().slice(0, 10),
      notes: values.notes.trim(),
    };

    if (newDocument.provider === 'google_drive' && selectedFiles.length === 0) {
      const message = 'Per il provider Google Drive devi allegare almeno un file.';
      setAttachmentMessage(message);
      showNotification({ message, severity: 'warning' });
      return;
    }

    if (selectedFiles.length > 0) {
      try {
        await addAttachments(newDocument.id, selectedFiles, {
          userId: 'demo-user',
          userName: newDocument.owner,
          description: 'Allegato iniziale del documento',
          practiceId: newDocument.practiceId,
          documentName: newDocument.name,
          documentCategory: newDocument.category,
          documentStatus: newDocument.status,
          storageProvider: newDocument.provider === 'google_drive' ? 'google-drive' : 'browser-memory',
        });
        setAttachmentMessage(undefined);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Impossibile caricare gli allegati.';
        setAttachmentMessage(message);
        showNotification({ message, severity: 'warning' });
        if (isCloudAuthError(error)) {
          navigate(appRoutes.settings.path);
        }
        return;
      }
    }

    addDocument(newDocument);

    showNotification({ message: 'Documento registrato correttamente', severity: 'success' });

    if (practiceContext) {
      navigate(appRoutes.practiceDetail.path.replace(':practiceId', practiceContext));
      return;
    }

    navigate('/documenti');
  };

  const handleCancel = () => {
    if (practiceContext) {
      navigate(appRoutes.practiceDetail.path.replace(':practiceId', practiceContext));
      return;
    }

    navigate('/documenti');
  };

  return (
    <PageContainer>
      <Box>
        <PageTitle subtitle="Compila i dati per registrare un nuovo documento operativo.">Nuovo documento</PageTitle>
      </Box>
      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
        <DocumentForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit} onCancel={handleCancel} selectedFiles={selectedFiles} onFilesChange={setSelectedFiles} onAttachmentError={(message) => setAttachmentMessage(message)} />
      </Paper>
      {attachmentMessage ? (
        <Box sx={{ mt: 2, color: 'warning.main', fontSize: 14 }}>{attachmentMessage}</Box>
      ) : null}
    </PageContainer>
  );
};

export default NewDocumentPage;
