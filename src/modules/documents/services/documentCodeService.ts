export const getNextDocumentCode = (codes: string[]): string => {
  const usedCodes = new Set(codes);
  let index = 1;

  while (usedCodes.has(`DOC-${String(index).padStart(3, '0')}`)) {
    index += 1;
  }

  return `DOC-${String(index).padStart(3, '0')}`;
};
