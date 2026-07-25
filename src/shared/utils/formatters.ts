// Shared formatting helpers for presentation layers.

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'medium',
  }).format(new Date(value));
