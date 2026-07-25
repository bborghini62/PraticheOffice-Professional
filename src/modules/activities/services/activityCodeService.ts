const activityCodePrefix = 'ATT-';

const parseCodeNumber = (code: string): number => {
  const match = code.match(/^ATT-(\d+)$/i);
  return match ? Number(match[1]) : 0;
};

export const getNextActivityCode = (existingCodes: string[]): string => {
  const numericCodes = existingCodes
    .map((code) => parseCodeNumber(code))
    .filter((value) => value > 0)
    .sort((left, right) => left - right);

  const nextNumber = numericCodes.length > 0 ? Math.max(...numericCodes) + 1 : 1;
  return `${activityCodePrefix}${String(nextNumber).padStart(3, '0')}`;
};
