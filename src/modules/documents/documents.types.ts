export type DocumentStatus = 'draft' | 'active' | 'signed' | 'expired' | 'archived';

export type DocumentCategory = 'received' | 'produced' | 'communication' | 'signed' | 'attachment' | 'other';

export type DocumentProvider = 'local' | 'google_drive' | 'dropbox';

export type DocumentAttachmentPreviewType = 'pdf' | 'image' | 'text' | 'office' | 'cad' | 'unsupported';

export type DocumentAttachmentStatus = 'uploaded' | 'archived' | 'deleted';

export type DocumentAttachmentStorageProvider = 'browser-memory' | 'electron-filesystem' | 'google-drive' | 'dropbox';

export interface DocumentAttachment {
  id: string;
  documentId: string;
  practiceId?: string;
  fileName: string;
  originalFileName: string;
  extension: string;
  mimeType: string;
  size: number;
  versionNumber: number;
  storageProvider: DocumentAttachmentStorageProvider;
  storagePath: string;
  driveFileId?: string;
  driveUrl?: string;
  previewUrl?: string;
  downloadUrl?: string;
  uploadedByUserId: string;
  uploadedByName: string;
  uploadedAt: string;
  description?: string;
  previewType: DocumentAttachmentPreviewType;
  status: DocumentAttachmentStatus;
}

export interface DocumentRecord {
  id: string;
  code: string;
  name: string;
  description: string;
  practiceId: string;
  category: DocumentCategory;
  status: DocumentStatus;
  owner: string;
  version: number;
  provider: DocumentProvider;
  driveFileId?: string;
  driveUrl?: string;
  fileName?: string;
  mimeType?: string;
  size?: number;
  logicalPath: string;
  documentDate: string;
  dueDate: string;
  lastUpdatedAt: string;
  notes: string;
}

export interface DocumentsFilters {
  search: string;
  status: DocumentStatus | 'all';
  category: DocumentCategory | 'all';
  practiceId: string | 'all';
  owner: string | 'all';
}
