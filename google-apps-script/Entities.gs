const CLIENT_FIELDS_ = PO_HEADERS[PO_SHEETS.CLIENTS];
const PRACTICE_FIELDS_ = PO_HEADERS[PO_SHEETS.PRACTICES];

function listClients_() {
  return listRows_(PO_SHEETS.CLIENTS);
}

function saveClient_(payload, user, isUpdate) {
  const source = payload || {};
  const now = new Date().toISOString();
  const existing = isUpdate ? findRowById_(PO_SHEETS.CLIENTS, source.id) : null;
  if (isUpdate && !existing) {
    throw apiError_('CLIENT_NOT_FOUND', 'Cliente non trovato.');
  }

  const clean = sanitizeRecord_(source, CLIENT_FIELDS_);
  const record = Object.assign({}, existing || {}, clean, {
    id: existing ? existing.id : String(source.id || Utilities.getUuid()),
    code: existing ? existing.code : String(source.code || generateCode_('CLI')),
    createdBy: existing ? existing.createdBy : user.email,
    createdAt: existing ? existing.createdAt : now,
    updatedBy: user.email,
    updatedAt: now,
  });

  if (!record.companyName && !record.firstName && !record.lastName) {
    throw apiError_('INVALID_CLIENT', 'Indica la ragione sociale oppure nome e cognome.');
  }
  return withWriteLock_(function () {
    return upsertRecord_(PO_SHEETS.CLIENTS, record);
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
