export type EntityId = string & { readonly __brand: unique symbol };

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function createEntityId(value?: string): EntityId {
  if (value) {
    if (!UUID_REGEX.test(value)) {
      throw new Error('Invalid UUID format');
    }

    return value as EntityId;
  }

  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID() as EntityId;
  }

  throw new Error('crypto.randomUUID is not available');
}
