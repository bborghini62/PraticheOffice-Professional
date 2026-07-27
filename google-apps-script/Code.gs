function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || 'health');
  if (action !== 'health') {
    return jsonResponse_(failure_('ACTION_NOT_ALLOWED', 'Per le operazioni dati usa una richiesta POST.'));
  }
  return jsonResponse_(success_(getHealth_()));
}

function doPost(e) {
  let requestId = '';
  let action = '';
  let actorEmail = '';
  try {
    const request = parsePostRequest_(e);
    requestId = request.requestId;
    action = request.action;
    const user = authorizeUser_(request.idToken);
    actorEmail = user.email;
    const data = routeAction_(action, request.payload, user);
    const entityId = data && data.id ? String(data.id) : '';
    writeAudit_(requestId, actorEmail, action, action.split('.')[0], entityId, 'success', {});
    return jsonResponse_(success_(data, requestId));
  } catch (error) {
    const normalized = normalizeError_(error);
    writeAudit_(requestId, actorEmail, action, '', '', 'error', normalized);
    return jsonResponse_(failure_(normalized.code, normalized.message, requestId));
  }
}

function routeAction_(action, payload, user) {
  switch (action) {
    case 'auth.me':
      return user;
    case 'clients.list':
      return listClients_();
    case 'clients.create':
      return saveClient_(payload, user, false);
    case 'clients.update':
      return saveClient_(payload, user, true);
    case 'practices.list':
      return listPractices_();
    case 'practices.create':
      return savePractice_(payload, user, false);
    case 'practices.update':
      return savePractice_(payload, user, true);
    case 'users.createOrUpdate':
      return addUser_(payload, user);
    case 'documents.uploadAttachment':
      return uploadDocumentAttachment_(payload, user);
    default:
      throw apiError_('UNKNOWN_ACTION', 'Operazione cloud non riconosciuta: ' + action);
  }
}

function parsePostRequest_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw apiError_('EMPTY_REQUEST', 'Richiesta priva di contenuto.');
  }
  let parsed;
  try {
    parsed = JSON.parse(e.postData.contents);
  } catch (error) {
    throw apiError_('INVALID_JSON', 'La richiesta non contiene JSON valido.');
  }
  return {
    action: String(parsed.action || ''),
    payload: parsed.payload || {},
    idToken: String(parsed.idToken || ''),
    requestId: String(parsed.requestId || Utilities.getUuid()),
  };
}

function getHealth_() {
  const properties = PropertiesService.getScriptProperties();
  const databaseConfigured = Boolean(properties.getProperty(PO_PROPERTIES.SPREADSHEET_ID));
  const driveConfigured = Boolean(properties.getProperty(PO_PROPERTIES.ROOT_FOLDER_ID));
  const oauthConfigured = Boolean(properties.getProperty(PO_PROPERTIES.GOOGLE_CLIENT_ID));
  return {
    service: PO_SERVICE_NAME,
    version: PO_VERSION,
    timestamp: new Date().toISOString(),
    configured: databaseConfigured && driveConfigured && oauthConfigured,
    databaseConfigured: databaseConfigured,
    driveConfigured: driveConfigured,
    oauthConfigured: oauthConfigured,
  };
}

function success_(data, requestId) {
  return {
    ok: true,
    data: data,
    requestId: requestId || '',
  };
}

function failure_(code, message, requestId) {
  return {
    ok: false,
    error: {
      code: code,
      message: message,
    },
    requestId: requestId || '',
  };
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function apiError_(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function normalizeError_(error) {
  return {
    code: String((error && error.code) || 'INTERNAL_ERROR'),
    message: String((error && error.message) || 'Errore interno del servizio cloud.'),
  };
}
