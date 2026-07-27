const CLIENT_FIELDS_ = PO_HEADERS[PO_SHEETS.CLIENTS];
const PRACTICE_FIELDS_ = PO_HEADERS[PO_SHEETS.PRACTICES];
const DOCUMENT_FIELDS_ = PO_HEADERS[PO_SHEETS.DOCUMENTS];

function listClients_() {
  return listRows_(PO_SHEETS.CLIENTS);
}

function getClient_(payload) {
  const id = String((payload || {}).id || '').trim();
  if (!id) {
    throw apiError_('INVALID_CLIENT', 'ID cliente obbligatorio.');
  }

  const client = findRowById_(PO_SHEETS.CLIENTS, id);
  if (!client) {
    throw apiError_('CLIENT_NOT_FOUND', 'Cliente non trovato.');
  }

  return client;
}

function saveClient_(payload, user, isUpdate) {
  const source = payload || {};
  const now = new Date().toISOString();
  const existing = isUpdate ? findRowById_(PO_SHEETS.CLIENTS, source.id) : null;
  if (isUpdate && !existing) {
    throw apiError_('CLIENT_NOT_FOUND', 'Cliente non trovato.');
  }

  const clean = sanitizeRecord_(source, CLIENT_FIELDS_);
  const sourceVersion = Number(source.version || 1);
  const existingVersion = Number((existing && existing.version) || 0);
  if (existing && existingVersion > sourceVersion) {
    throw apiError_('CLIENT_VERSION_CONFLICT', 'Il cliente è stato aggiornato nel cloud. Ricarica e riprova.');
  }

  const record = Object.assign({}, existing || {}, clean, {
    id: existing ? existing.id : String(source.id || Utilities.getUuid()),
    code: existing ? existing.code : String(source.code || generateCode_('CLI')),
    createdBy: existing ? existing.createdBy : user.email,
    createdAt: existing ? existing.createdAt : now,
    updatedBy: user.email,
    updatedAt: now,
    version: existing ? Math.max(existingVersion, sourceVersion) : sourceVersion,
  });

  if (!record.companyName && !record.firstName && !record.lastName) {
    throw apiError_('INVALID_CLIENT', 'Indica la ragione sociale oppure nome e cognome.');
  }
  return withWriteLock_(function () {
    return upsertRecord_(PO_SHEETS.CLIENTS, record);
  });
}

function deleteClient_(payload, user) {
  const source = payload || {};
  const id = String(source.id || '').trim();
  if (!id) {
    throw apiError_('INVALID_CLIENT', 'ID cliente obbligatorio.');
  }

  const existing = findRowById_(PO_SHEETS.CLIENTS, id);
  if (!existing) {
    return { id: id, deleted: true };
  }

  return withWriteLock_(function () {
    removeRecordById_(PO_SHEETS.CLIENTS, id);
    return {
      id: id,
      deleted: true,
      updatedBy: user.email,
      updatedAt: new Date().toISOString(),
    };
  });
}

function listPractices_() {
  return listRows_(PO_SHEETS.PRACTICES);
}

function savePractice_(payload, user, isUpdate) {
  const source = payload || {};
  const now = new Date().toISOString();
  const existing = isUpdate ? findRowById_(PO_SHEETS.PRACTICES, source.id) : null;
  if (isUpdate && !existing) {
    throw apiError_('PRACTICE_NOT_FOUND', 'Pratica non trovata.');
  }
  if (!source.clientId && !(existing && existing.clientId)) {
    throw apiError_('INVALID_PRACTICE', 'La pratica deve essere collegata a un cliente.');
  }

  const clean = sanitizeRecord_(source, PRACTICE_FIELDS_);
  const record = Object.assign({}, existing || {}, clean, {
    id: existing ? existing.id : String(source.id || Utilities.getUuid()),
    code: existing ? existing.code : String(source.code || generateCode_('PRC')),
    createdBy: existing ? existing.createdBy : user.email,
    createdAt: existing ? existing.createdAt : now,
    updatedBy: user.email,
    updatedAt: now,
  });

  if (!record.subject) {
    throw apiError_('INVALID_PRACTICE', 'Oggetto della pratica obbligatorio.');
  }
  return withWriteLock_(function () {
    return upsertRecord_(PO_SHEETS.PRACTICES, record);
  });
}

function addUser_(payload, user) {
  assertRole_(user, [PO_ROLES.ADMIN]);
  const email = String((payload || {}).email || '').trim().toLowerCase();
  if (!email) {
    throw apiError_('INVALID_USER', 'Email utente obbligatoria.');
  }
  const existing = listRows_(PO_SHEETS.USERS).find(function (candidate) {
    return String(candidate.email).trim().toLowerCase() === email;
  });
  const now = new Date().toISOString();
  const record = Object.assign({}, existing || {}, {
    id: existing ? existing.id : Utilities.getUuid(),
    email: email,
    nome: String((payload || {}).nome || email),
    ruolo: String((payload || {}).ruolo || PO_ROLES.OPERATOR),
    attivo: (payload || {}).attivo !== false,
    gruppi: Array.isArray((payload || {}).gruppi) ? (payload || {}).gruppi.join(',') : String((payload || {}).gruppi || ''),
    createdAt: existing ? existing.createdAt : now,
    updatedAt: now,
  });
  return withWriteLock_(function () {
    return upsertRecord_(PO_SHEETS.USERS, record);
  });
}

function uploadDocumentAttachment_(payload, user) {
  const source = payload || {};
  const attachmentId = String(source.id || '').trim();
  const documentId = String(source.documentId || '').trim();
  const practiceId = String(source.practiceId || '').trim();
  const fileName = String(source.fileName || '').trim();
  const mimeType = String(source.mimeType || 'application/octet-stream').trim();
  const fileBase64 = String(source.fileBase64 || '').trim();
  const version = Number(source.version || 1);
  const size = Number(source.size || 0);

  if (!attachmentId) {
    throw apiError_('INVALID_DOCUMENT_ATTACHMENT', 'ID allegato obbligatorio.');
  }
  if (!documentId) {
    throw apiError_('INVALID_DOCUMENT_ATTACHMENT', 'Document ID obbligatorio.');
  }
  if (!practiceId) {
    throw apiError_('INVALID_DOCUMENT_ATTACHMENT', 'Practice ID obbligatorio.');
  }
  if (!fileName || !fileBase64) {
    throw apiError_('INVALID_DOCUMENT_ATTACHMENT', 'Nome file e contenuto del file sono obbligatori.');
  }
  if (!Number.isFinite(version) || version <= 0) {
    throw apiError_('INVALID_DOCUMENT_ATTACHMENT', 'Versione allegato non valida.');
  }

  const existing = findRowById_(PO_SHEETS.DOCUMENTS, attachmentId);
  if (existing && existing.driveFileId) {
    return withDocumentDriveLinks_(existing);
  }

  const decodedBytes = Utilities.base64Decode(fileBase64);
  const practiceFolder = ensurePracticeFolder_(practiceId);
  const fileBlob = Utilities.newBlob(decodedBytes, mimeType, fileName);
  const driveFile = practiceFolder.createFile(fileBlob);
  const now = new Date().toISOString();

  const clean = sanitizeRecord_(source, DOCUMENT_FIELDS_);
  const record = Object.assign({}, existing || {}, clean, {
    id: attachmentId,
    documentId: documentId,
    practiceId: practiceId,
    title: String(source.documentName || fileName),
    category: String(source.category || 'attachment'),
    status: String(source.status || 'active'),
    version: version,
    storageProvider: 'google-drive',
    driveFileId: driveFile.getId(),
    driveUrl: driveFile.getUrl(),
    fileName: fileName,
    mimeType: mimeType,
    size: size > 0 ? size : decodedBytes.length,
    uploadedBy: user.email,
    createdAt: existing ? existing.createdAt : now,
    updatedAt: now,
  });

  const saved = withWriteLock_(function () {
    return upsertRecord_(PO_SHEETS.DOCUMENTS, record);
  });

  return withDocumentDriveLinks_(saved);
}

function ensurePracticeFolder_(practiceId) {
  const properties = PropertiesService.getScriptProperties();
  const rootFolderId = properties.getProperty(PO_PROPERTIES.ROOT_FOLDER_ID);
  if (!rootFolderId) {
    throw apiError_('DRIVE_NOT_CONFIGURED', 'Cartella root Google Drive non configurata.');
  }

  const rootFolder = DriveApp.getFolderById(rootFolderId);
  const practicesFolder = ensureRootSubfolder_(rootFolder, 'Pratiche');

  const folderName = String(practiceId || '').trim();
  const existingFolders = practicesFolder.getFoldersByName(folderName);
  return existingFolders.hasNext() ? existingFolders.next() : practicesFolder.createFolder(folderName);
}

function ensureRootSubfolder_(rootFolder, folderName) {
  const properties = PropertiesService.getScriptProperties();
  const existingFolderId = properties.getProperty(PO_PROPERTIES.PRACTICES_FOLDER_ID);
  let practicesFolder = null;

  if (existingFolderId) {
    try {
      const candidate = DriveApp.getFolderById(existingFolderId);
      if (String(candidate.getParents().next().getId()) === String(rootFolder.getId())) {
        practicesFolder = candidate;
      }
    } catch (error) {
      practicesFolder = null;
    }
  }

  if (!practicesFolder) {
    const matchingFolders = rootFolder.getFoldersByName(folderName);
    practicesFolder = matchingFolders.hasNext() ? matchingFolders.next() : rootFolder.createFolder(folderName);
    properties.setProperty(PO_PROPERTIES.PRACTICES_FOLDER_ID, practicesFolder.getId());
  }

  return practicesFolder;
}

function withDocumentDriveLinks_(record) {
  const driveFileId = String(record.driveFileId || '').trim();
  if (!driveFileId) {
    return record;
  }

  return Object.assign({}, record, {
    previewUrl: 'https://drive.google.com/file/d/' + driveFileId + '/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=' + driveFileId,
  });
}
