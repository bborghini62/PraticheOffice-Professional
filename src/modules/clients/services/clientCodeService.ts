export const getNextClientCode = (existingCodes: string[]): string => {
  const usedCodes = new Set(existingCodes.map((code) => code.toUpperCase()));
  let index = 1;

  while (true) {
    const candidate = `CLI-${String(index).padStart(3, '0')}`;
    if (!usedCodes.has(candidate)) {
      return candidate;
    }
    index += 1;
  }
};
