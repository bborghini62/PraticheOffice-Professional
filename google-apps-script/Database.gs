function getDatabase_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(PO_PROPERTIES.SPREADSHEET_ID);
  if (!spreadsheetId) {
    throw apiError_('CLOUD_NOT_CONFIGURED', 'Esegui prima setupPraticheOfficeCloud().');
  }
  return SpreadsheetApp.openById(spreadsheetId);
}

function getSheet_(sheetName) {
  const sheet = getDatabase_().getSheetByName(sheetName);
  if (!sheet) {
    throw apiError_('SHEET_NOT_FOUND', 'Foglio non trovato: ' + sheetName);
  }
  return sheet;
}

function getHeaders_(sheet) {
  const lastColumn = sheet.getLastColumn();
  if (lastColumn === 0) {
    return [];
  }
  return sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(String);
}

function listRows_(sheetName) {
  const sheet = getSheet_(sheetName);
  const headers = getHeaders_(sheet);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2 || headers.length === 0) {
    return [];
  }

  return sheet.getRange(2, 1, lastRow - 1, headers.length).getValues().map(function (row) {
    const record = {};
    headers.forEach(function (header, index) {
      record[header] = normalizeCellValue_(row[index]);
    });
    return record;
  });
}

function findRowById_(sheetName, id) {
  const rows = listRows_(sheetName);
  return rows.find(function (row) {
    return String(row.id) === String(id);
  }) || null;
}

function appendRecord_(sheetName, record) {
  const sheet = getSheet_(sheetName);
  const headers = getHeaders_(sheet);
  const row = headers.map(function (header) {
    return toCellValue_(record[header]);
  });
  sheet.appendRow(row);
  return record;
}

function upsertRecord_(sheetName, record) {
  const sheet = getSheet_(sheetName);
  const headers = getHeaders_(sheet);
  const idColumnIndex = headers.indexOf('id');
  if (idColumnIndex === -1) {
    throw apiError_('INVALID_SCHEMA', 'Il foglio ' + sheetName + ' non contiene la colonna id.');
  }

  const lastRow = sheet.getLastRow();
  let targetRow = -1;
  if (lastRow >= 2) {
    const ids = sheet.getRange(2, idColumnIndex + 1, lastRow - 1, 1).getValues();
    for (let index = 0; index < ids.length; index += 1) {
      if (String(ids[index][0]) === String(record.id)) {
        targetRow = index + 2;
        break;
      }
    }
  }

  const values = headers.map(function (header) {
    return toCellValue_(record[header]);
  });
  if (targetRow === -1) {
    sheet.appendRow(values);
  } else {
    sheet.getRange(targetRow, 1, 1, headers.length).setValues([values]);
  }
  return record;
}

function removeRecordById_(sheetName, id) {
  const sheet = getSheet_(sheetName);
  const headers = getHeaders_(sheet);
  const idColumnIndex = headers.indexOf('id');
  if (idColumnIndex === -1) {
    throw apiError_('INVALID_SCHEMA', 'Il foglio ' + sheetName + ' non contiene la colonna id.');
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }

  const ids = sheet.getRange(2, idColumnIndex + 1, lastRow - 1, 1).getValues();
  for (let index = 0; index < ids.length; index += 1) {
    if (String(ids[index][0]) === String(id)) {
      sheet.deleteRow(index + 2);
      return true;
    }
  }

  return false;
}

function withWriteLock_(callback) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    return callback();
  } finally {
    lock.releaseLock();
  }
}

function normalizeCellValue_(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
}

function toCellValue_(value) {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  if (value === undefined || value === null) {
    return '';
  }
  return value;
}

function sanitizeRecord_(source, allowedFields) {
  const clean = {};
  allowedFields.forEach(function (field) {
    if (Object.prototype.hasOwnProperty.call(source, field)) {
      clean[field] = source[field];
    }
  });
  return clean;
}

function generateCode_(prefix) {
  const datePart = Utilities.formatDate(new Date(), 'Europe/Rome', 'yyyyMMdd');
  const randomPart = Utilities.getUuid().replace(/-/g, '').slice(0, 6).toUpperCase();
  return prefix + '-' + datePart + '-' + randomPart;
}
