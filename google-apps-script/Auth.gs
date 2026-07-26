function verifyGoogleIdToken_(idToken) {
  if (!idToken) {
    throw apiError_('AUTH_REQUIRED', 'Token Google mancante.');
  }

  const properties = PropertiesService.getScriptProperties();
  const clientId = properties.getProperty(PO_PROPERTIES.GOOGLE_CLIENT_ID);
  if (!clientId) {
    throw apiError_('OAUTH_NOT_CONFIGURED', 'Google OAuth Client ID non configurato nello script.');
  }

  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken), {
    muteHttpExceptions: true,
  });
  if (response.getResponseCode() !== 200) {
    throw apiError_('INVALID_GOOGLE_TOKEN', 'Sessione Google non valida o scaduta.');
  }

  const tokenData = JSON.parse(response.getContentText());
  if (String(tokenData.aud) !== String(clientId)) {
    throw apiError_('INVALID_GOOGLE_AUDIENCE', 'Il token Google non appartiene a PraticheOffice.');
  }
  if (String(tokenData.email_verified) !== 'true') {
    throw apiError_('EMAIL_NOT_VERIFIED', 'L’indirizzo Google non è verificato.');
  }

  const email = String(tokenData.email || '').trim().toLowerCase();
  const allowedDomain = properties.getProperty(PO_PROPERTIES.ALLOWED_DOMAIN);
  if (allowedDomain && !email.endsWith('@' + allowedDomain)) {
    throw apiError_('DOMAIN_NOT_ALLOWED', 'Account Google non appartenente al dominio autorizzato.');
  }

  return {
    email: email,
    name: String(tokenData.name || tokenData.email || ''),
    picture: String(tokenData.picture || ''),
    subject: String(tokenData.sub || ''),
  };
}

function authorizeUser_(idToken) {
  const identity = verifyGoogleIdToken_(idToken);
  const users = listRows_(PO_SHEETS.USERS);
  const user = users.find(function (candidate) {
    return String(candidate.email).trim().toLowerCase() === identity.email;
  });

  if (!user || !toBoolean_(user.attivo)) {
    throw apiError_('USER_NOT_AUTHORIZED', 'Utente non autorizzato o disabilitato.');
  }

  return {
    id: String(user.id),
    email: identity.email,
    name: String(user.nome || identity.name),
    role: String(user.ruolo || PO_ROLES.OPERATOR),
    groups: String(user.gruppi || '').split(',').map(function (value) { return value.trim(); }).filter(Boolean),
    picture: identity.picture,
  };
}

function assertRole_(user, allowedRoles) {
  if (allowedRoles.indexOf(user.role) === -1) {
    throw apiError_('FORBIDDEN', 'Permessi insufficienti per questa operazione.');
  }
}

function toBoolean_(value) {
  if (typeof value === 'boolean') {
    return value;
  }
  const normalized = String(value).trim().toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'si' || normalized === 'sì';
}
