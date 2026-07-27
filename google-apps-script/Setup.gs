function setupPraticheOfficeCloud(adminEmail, googleClientId, allowedDomain) {
  const properties = PropertiesService.getScriptProperties();
  const ownerEmail = String(adminEmail || Session.getEffectiveUser().getEmail() || '').trim().toLowerCase();
  if (!ownerEmail) {
    throw new Error('Indica l’email dell’amministratore come primo parametro.');
  }

  // Do not attempt to enable Drive API programmatically.
  // The setup only verifies that DriveApp is usable with current permissions.
  assertDriveServiceAvailable_();

  let rootFolder;
  const existingRootId = properties.getProperty(PO_PROPERTIES.ROOT_FOLDER_ID);
  if (existingRootId) {
    rootFolder = getAccessibleFolderById_(existingRootId, 'cartella root configurata');
  } else {
    rootFolder = DriveApp.createFolder('PraticheOffice Cloud');
    assertFolderAccessible_(rootFolder, 'cartella root creata');
    properties.setProperty(PO_PROPERTIES.ROOT_FOLDER_ID, rootFolder.getId());
  }

  let spreadsheet;
  const existingSpreadsheetId = properties.getProperty(PO_PROPERTIES.SPREADSHEET_ID);
  if (existingSpreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(existingSpreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create('PraticheOffice Database');
    DriveApp.getFileById(spreadsheet.getId()).moveTo(rootFolder);
    properties.setProperty(PO_PROPERTIES.SPREADSHEET_ID, spreadsheet.getId());
  }

  Object.keys(PO_HEADERS).forEach(function (sheetName) {
    ensureSheet_(spreadsheet, sheetName, PO_HEADERS[sheetName]);
  });

  ensureSubfolderProperty_(rootFolder, 'Pratiche', PO_PROPERTIES.PRACTICES_FOLDER_ID);
  ensureSubfolderProperty_(rootFolder, 'Backup', PO_PROPERTIES.BACKUP_FOLDER_ID);
  ensureSubfolderProperty_(rootFolder, 'Modelli', PO_PROPERTIES.TEMPLATES_FOLDER_ID);

  if (googleClientId) {
    properties.setProperty(PO_PROPERTIES.GOOGLE_CLIENT_ID, String(googleClientId).trim());
  }
  if (allowedDomain) {
    properties.setProperty(PO_PROPERTIES.ALLOWED_DOMAIN, String(allowedDomain).trim().toLowerCase());
  }

  ensureInitialAdmin_(ownerEmail);

  return {
    ok: true,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    rootFolderId: rootFolder.getId(),
    rootFolderUrl: rootFolder.getUrl(),
    adminEmail: ownerEmail,
    googleClientConfigured: Boolean(properties.getProperty(PO_PROPERTIES.GOOGLE_CLIENT_ID)),
  };
}

function configurePraticheOfficeOAuth(googleClientId, allowedDomain) {
  if (!googleClientId) {
    throw new Error('Google OAuth Client ID obbligatorio.');
  }
  const properties = PropertiesService.getScriptProperties();
  properties.setProperty(PO_PROPERTIES.GOOGLE_CLIENT_ID, String(googleClientId).trim());
  properties.setProperty(PO_PROPERTIES.ALLOWED_DOMAIN, String(allowedDomain || '').trim().toLowerCase());
  return getPraticheOfficeConfiguration();
}

function getPraticheOfficeConfiguration() {
  const properties = PropertiesService.getScriptProperties();
  return {
    version: PO_VERSION,
    spreadsheetId: properties.getProperty(PO_PROPERTIES.SPREADSHEET_ID) || '',
    rootFolderId: properties.getProperty(PO_PROPERTIES.ROOT_FOLDER_ID) || '',
    googleClientConfigured: Boolean(properties.getProperty(PO_PROPERTIES.GOOGLE_CLIENT_ID)),
    allowedDomain: properties.getProperty(PO_PROPERTIES.ALLOWED_DOMAIN) || '',
  };
}

function ensureSheet_(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  const currentHeaders = sheet.getLastColumn() > 0
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    : [];
  const headerMismatch = headers.some(function (header, index) {
    return currentHeaders[index] !== header;
  });

  if (sheet.getLastRow() === 0 || headerMismatch) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#dfe7f2');
    sheet.setFrozenRows(1);
  }
  sheet.autoResizeColumns(1, headers.length);
  return sheet;
}

function ensureSubfolderProperty_(rootFolder, folderName, propertyName) {
  const properties = PropertiesService.getScriptProperties();
  const existingId = properties.getProperty(propertyName);
  if (existingId) {
    return getAccessibleFolderById_(existingId, 'sottocartella configurata: ' + folderName);
  }

  const matchingFolders = rootFolder.getFoldersByName(folderName);
  const folder = matchingFolders.hasNext() ? matchingFolders.next() : rootFolder.createFolder(folderName);
  properties.setProperty(propertyName, folder.getId());
  return folder;
}

function assertDriveServiceAvailable_() {
  try {
    // Innocuous check: confirms DriveApp is callable in this execution context.
    DriveApp.getRootFolder().getId();
  } catch (error) {
    throw new Error('Google Drive non utilizzabile in questo script. Verifica che Drive sia accessibile nel progetto Apps Script e riprova.');
  }
}

function getAccessibleFolderById_(folderId, contextLabel) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    assertFolderAccessible_(folder, contextLabel);
    return folder;
  } catch (error) {
    throw new Error('Cartella Drive non accessibile (' + contextLabel + ') [' + folderId + ']. Verifica ID cartella e permessi di accesso.');
  }
}

function assertFolderAccessible_(folder, contextLabel) {
  try {
    folder.getId();
    folder.getName();
  } catch (error) {
    throw new Error('Cartella Drive non accessibile (' + contextLabel + '). Verifica permessi di lettura/scrittura.');
  }
}

function ensureInitialAdmin_(email) {
  const users = listRows_(PO_SHEETS.USERS);
  const existing = users.find(function (user) {
    return String(user.email).toLowerCase() === email;
  });
  if (existing) {
    return existing;
  }

  const now = new Date().toISOString();
  return appendRecord_(PO_SHEETS.USERS, {
    id: Utilities.getUuid(),
    email: email,
    nome: 'Amministratore',
    ruolo: PO_ROLES.ADMIN,
    attivo: true,
    gruppi: '',
    createdAt: now,
    updatedAt: now,
  });
}
