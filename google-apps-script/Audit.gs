function writeAudit_(requestId, actorEmail, action, entityType, entityId, result, details) {
  try {
    appendRecord_(PO_SHEETS.AUDIT, {
      id: Utilities.getUuid(),
      requestId: requestId || '',
      actorEmail: actorEmail || '',
      action: action || '',
      entityType: entityType || '',
      entityId: entityId || '',
      result: result || '',
      details: typeof details === 'string' ? details : JSON.stringify(details || {}),
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Audit non scritto:', error);
  }
}
