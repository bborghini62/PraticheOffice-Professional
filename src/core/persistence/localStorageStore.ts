const canUseLocalStorage = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const clone = <T>(value: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

export const loadPersistedArray = <T>(storageKey: string, seed: T[]): T[] => {
  if (!canUseLocalStorage()) {
    return clone(seed);
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey);
    if (storedValue) {
      const parsedValue: unknown = JSON.parse(storedValue);
      if (Array.isArray(parsedValue)) {
        return parsedValue as T[];
      }
    }

    const initialValue = clone(seed);
    window.localStorage.setItem(storageKey, JSON.stringify(initialValue));
    return initialValue;
  } catch (error) {
    console.error(`Impossibile leggere l'archivio locale ${storageKey}.`, error);
    return clone(seed);
  }
};

export const savePersistedArray = <T>(storageKey: string, records: T[]): void => {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(records));
    window.dispatchEvent(
      new CustomEvent('praticheoffice:data-changed', {
        detail: { storageKey },
      }),
    );
  } catch (error) {
    console.error(`Impossibile salvare l'archivio locale ${storageKey}.`, error);
  }
};

export const removePersistedStore = (storageKey: string): void => {
  if (!canUseLocalStorage()) {
    return;
  }
  window.localStorage.removeItem(storageKey);
};
