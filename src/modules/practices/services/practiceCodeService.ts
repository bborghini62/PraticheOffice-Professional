const practiceCodePrefix = 'PRC-';

const parseCodeNumber = (code: string): number => {
  const match = code.match(/^PRC-(\d+)$/i);
  return match ? Number(match[1]) : 0;
};

export const getNextPracticeCode = (existingCodes: string[]): string => {
  const numericCodes = existingCodes
    .map((code) => parseCodeNumber(code))
    .filter((value) => value > 0)
    .sort((left, right) => left - right);

  const nextNumber = numericCodes.length > 0 ? Math.max(...numericCodes) + 1 : 1;
  return `${practiceCodePrefix}${String(nextNumber).padStart(3, '0')}`;
};
