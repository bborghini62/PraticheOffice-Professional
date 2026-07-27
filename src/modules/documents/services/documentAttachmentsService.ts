import { addEvent, createTimelineEvent } from '../../timeline/services/timelineService';
import { callGoogleCloud, loadCloudConfig } from '../../../core/cloud';
import { loadPersistedArray, savePersistedArray } from '../../../core/persistence/localStorageStore';
import type { DocumentAttachment, DocumentAttachmentPreviewType, DocumentAttachmentStatus, DocumentAttachmentStorageProvider } from '../documents.types';

const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'ppt', 'pptx', 'txt', 'rtf', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff', 'dwg', 'dxf', 'zip', '7z', 'xml'];
const blockedExtensions = ['exe', 'app', 'dmg', 'pkg', 'sh', 'bat', 'cmd', 'js', 'msi'];

const ATTACHMENTS_STORAGE_KEY = 'praticheoffice.document-attachments.v1';
const attachmentSeed: DocumentAttachment[] = [];
const attachmentStore: DocumentAttachment[] = loadPersistedArray(ATTACHMENTS_STORAGE_KEY, attachmentSeed);
const objectUrlStore: Record<string, string> = {};
const previewTextStore: Record<string, string> = {};

interface UploadAttachmentCloudResponse {
  id: string;
  documentId: string;
  practiceId: string;
  version: number;
  driveFileId: string;
  driveUrl: string;
  previewUrl: string;
  downloadUrl: string;
  fileName: string;
  mimeType: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

const normalizeExtension = (fileName: string): string => {
  const match = fileName.split('.').pop();
  return (match ?? '').toLowerCase();
};

const detectPreviewType = (fileName: string, mimeType: string): DocumentAttachmentPreviewType => {
  const extension = normalizeExtension(fileName);

  if (['pdf'].includes(extension)) {
    return 'pdf';
  }

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff'].includes(extension) || mimeType.startsWith('image/')) {
    return 'image';
  }

  if (['txt', 'csv', 'xml'].includes(extension) || mimeType.startsWith('text/')) {
    return 'text';
  }

  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
    return 'office';
  }

  if (['dwg', 'dxf'].includes(extension)) {
    return 'cad';
  }

  return 'unsupported';
};

export const documentAttachmentConfig = {
  allowedExtensions,
  blockedExtensions,
  maxSizeBytes: 25 * 1024 * 1024,
  defaultStorageProvider: 'browser-memory' as DocumentAttachmentStorageProvider,
};

export const validateAttachmentFile = (file: File): string | null => {
  if (!file || file.size === 0) {
    return 'Il file selezionato è vuoto.';
  }

  if (file.size > documentAttachmentConfig.maxSizeBytes) {
    return `Il file supera la dimensione massima consentita di ${Math.round(documentAttachmentConfig.maxSizeBytes / (1024 * 1024))} MB.`;
  }

  const extension = normalizeExtension(file.name);

  if (blockedExtensions.includes(extension)) {
    return 'Il tipo di file selezionato non è consentito per motivi di sicurezza.';
  }

  if (!allowedExtensions.includes(extension)) {
    return 'Formato non supportato. Seleziona un file tra PDF, Office, immagine, testo o archivi compatibili.';
  }

  return null;
};

const toBase64 = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }
  return btoa(binary);
};

const uploadAttachmentToGoogleDrive = async (
  documentId: string,
  file: File,
  attachmentId: string,
  versionNumber: number,
  context: AttachmentSubmitContext,
): Promise<UploadAttachmentCloudResponse> => {
  const config = loadCloudConfig();
  const fileBase64 = await toBase64(file);

  return callGoogleCloud<UploadAttachmentCloudResponse>(
    config,
    'documents.uploadAttachment',
    {
      id: attachmentId,
      documentId,
      practiceId: context.practiceId ?? documentId,
      documentName: context.documentName ?? documentId,
      category: context.documentCategory ?? 'attachment',
      status: context.documentStatus ?? 'active',
      version: versionNumber,
      fileName: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      fileBase64,
    },
  );
};

export const getAttachmentObjectUrl = (attachmentId: string): string | undefined => objectUrlStore[attachmentId];
export const getAttachmentPreviewText = (attachmentId: string): string | undefined => previewTextStore[attachmentId];

export const getAttachmentsByDocumentId = (documentId: string): DocumentAttachment[] =>
  attachmentStore.filter((attachment) => attachment.documentId === documentId).sort((left, right) => right.versionNumber - left.versionNumber);

export const getAttachmentById = (attachmentId: string): DocumentAttachment | undefined => attachmentStore.find((attachment) => attachment.id === attachmentId);

export const getVersionsByDocumentId = (documentId: string): DocumentAttachment[] => getAttachmentsByDocumentId(documentId);

interface AttachmentSubmitContext {
  userId?: string;
  userName: string;
  description?: string;
  storageProvider?: DocumentAttachmentStorageProvider;
  versionNumber?: number;
  practiceId?: string;
  documentName?: string;
  documentCategory?: string;
  documentStatus?: string;
}

export const addAttachments = async (documentId: string, files: File[], context: AttachmentSubmitContext): Promise<DocumentAttachment[]> => {
  const created: DocumentAttachment[] = [];
  const existing = getAttachmentsByDocumentId(documentId);
  const baseVersion = Math.max(...existing.map((attachment) => attachment.versionNumber), 0);
  const storageProvider = context.storageProvider ?? documentAttachmentConfig.defaultStorageProvider;

  for (const file of files) {
    const validationError = validateAttachmentFile(file);
    if (validationError) {
      throw new Error(validationError);
    }

    const extension = normalizeExtension(file.name);
    const versionNumber = context.versionNumber ?? baseVersion + created.length + 1;
    const attachmentId = `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const previewType = detectPreviewType(file.name, file.type);
    const isGoogleDrive = storageProvider === 'google-drive';
    const cloudUpload = isGoogleDrive
      ? await uploadAttachmentToGoogleDrive(documentId, file, attachmentId, versionNumber, context)
      : null;

    const objectUrl = !isGoogleDrive ? URL.createObjectURL(file) : undefined;
    let previewText: string | undefined;

    if (!isGoogleDrive && previewType === 'text') {
      previewText = await file.text();
    }

    const attachment: DocumentAttachment = {
      id: attachmentId,
      documentId,
      practiceId: context.practiceId,
      fileName: cloudUpload?.fileName ?? file.name,
      originalFileName: cloudUpload?.fileName ?? file.name,
      extension,
      mimeType: cloudUpload?.mimeType ?? (file.type || 'application/octet-stream'),
      size: cloudUpload?.size ?? file.size,
      versionNumber,
      storageProvider,
      storagePath: isGoogleDrive
        ? `google-drive/${cloudUpload?.driveFileId ?? attachmentId}`
        : `browser-memory/${documentId}/${file.name}`,
      driveFileId: cloudUpload?.driveFileId,
      driveUrl: cloudUpload?.driveUrl,
      previewUrl: cloudUpload?.previewUrl,
      downloadUrl: cloudUpload?.downloadUrl,
      uploadedByUserId: context.userId ?? 'demo-user',
      uploadedByName: context.userName,
      uploadedAt: cloudUpload?.createdAt ?? new Date().toISOString(),
      description: context.description,
      previewType,
      status: 'uploaded',
    };

    attachmentStore.push(attachment);
    if (objectUrl) {
      objectUrlStore[attachmentId] = objectUrl;
    }
    if (previewText) {
      previewTextStore[attachmentId] = previewText;
    }

    created.push(attachment);
  }

  if (created.length > 0) {
    savePersistedArray(ATTACHMENTS_STORAGE_KEY, attachmentStore);
    const practiceId = context.practiceId ?? documentId;
    const timelineType = existing.length === 0 ? 'document_added' : 'document_version_added';
    const title = existing.length === 0 ? 'Allegato caricato' : 'Nuova versione allegata';
    const description = existing.length === 0
      ? `È stato caricato il primo allegato per il documento ${documentId}.`
      : `È stata caricata una nuova versione dell’allegato ${created[0].fileName}.`;

    addEvent(
      createTimelineEvent(
        practiceId,
        timelineType,
        title,
        description,
        context.userName,
        new Date().toISOString(),
      ),
    );
  }

  return created;
};

export const createNewVersion = async (documentId: string, file: File, context: AttachmentSubmitContext): Promise<DocumentAttachment> => {
  const existing = getAttachmentsByDocumentId(documentId);
  const nextVersion = Math.max(...existing.map((attachment) => attachment.versionNumber), 0) + 1;
  const created = await addAttachments(documentId, [file], { ...context, versionNumber: nextVersion });
  return created[0];
};

export const removeAttachment = (
  attachmentId: string,
  context?: { documentName?: string; userName?: string; practiceId?: string },
): DocumentAttachment | undefined => {
  const attachment = getAttachmentById(attachmentId);
  if (!attachment) {
    return undefined;
  }

  const objectUrl = objectUrlStore[attachmentId];
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }

  delete objectUrlStore[attachmentId];
  delete previewTextStore[attachmentId];
  const index = attachmentStore.findIndex((candidate) => candidate.id === attachmentId);
  if (index >= 0) {
    attachmentStore.splice(index, 1);
    savePersistedArray(ATTACHMENTS_STORAGE_KEY, attachmentStore);
  }

  addEvent(
    createTimelineEvent(
      context?.practiceId ?? attachment.documentId,
      'document_attachment_deleted',
      'Allegato eliminato',
      `L’allegato ${attachment.fileName} è stato eliminato dal documento ${context?.documentName ?? attachment.documentId}.`,
      context?.userName ?? attachment.uploadedByName,
      new Date().toISOString(),
    ),
  );

  return attachment;
};

export const renameAttachment = (attachmentId: string, newFileName: string): DocumentAttachment | undefined => {
  const attachment = getAttachmentById(attachmentId);
  if (!attachment) {
    return undefined;
  }

  const extension = normalizeExtension(newFileName) || attachment.extension;
  const resolvedName = newFileName.includes('.') ? newFileName : `${newFileName}.${extension}`;
  const nextAttachment: DocumentAttachment = {
    ...attachment,
    fileName: resolvedName,
    originalFileName: resolvedName,
    extension,
  };

  const index = attachmentStore.findIndex((candidate) => candidate.id === attachmentId);
  if (index >= 0) {
    attachmentStore[index] = nextAttachment;
    savePersistedArray(ATTACHMENTS_STORAGE_KEY, attachmentStore);
  }

  return nextAttachment;
};

export const updateAttachmentStatus = (attachmentId: string, status: DocumentAttachmentStatus): DocumentAttachment | undefined => {
  const attachment = getAttachmentById(attachmentId);
  if (!attachment) {
    return undefined;
  }

  const nextAttachment: DocumentAttachment = {
    ...attachment,
    status,
  };

  const index = attachmentStore.findIndex((candidate) => candidate.id === attachmentId);
  if (index >= 0) {
    attachmentStore[index] = nextAttachment;
    savePersistedArray(ATTACHMENTS_STORAGE_KEY, attachmentStore);
  }

  return nextAttachment;
};

export const clearObjectUrls = (): void => {
  Object.values(objectUrlStore).forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
  Object.keys(objectUrlStore).forEach((attachmentId) => delete objectUrlStore[attachmentId]);
  Object.keys(previewTextStore).forEach((attachmentId) => delete previewTextStore[attachmentId]);
};
