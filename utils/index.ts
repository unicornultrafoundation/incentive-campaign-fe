import { formatUnits } from 'viem';

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const formatDisplayedNumber = (
  value: string | number,
  threshold?: number,
  decimal?: number,
) => {
  if (threshold) {
    if (Number(value) < threshold) {
      return parseFloat(String(value)).toFixed(decimal || 2);
    }
  }

  if (!value) return '0.00';

  const usFormatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 3,
  });

  return usFormatter.format(Math.trunc(Number(value)));
};

export const formatDisplayedTokenAmount = (
  value?: bigint | string | number,
  decimal?: number,
) => {
  const _valueBN = typeof value === 'bigint' ? value : BigInt(value || 0);
  const _value = formatUnits(_valueBN, decimal || 18).toString();

  return formatDisplayedNumber(_value, 1e4);
};

export const generateRandomString = (length: number): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

export const generateRandomNumber = (length: number): string => {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};
