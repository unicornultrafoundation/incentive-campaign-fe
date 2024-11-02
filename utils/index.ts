import { formatUnits } from 'viem';
import numeral from 'numeral';
import { trimEnd } from 'lodash';

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

export const toNumberNoRound = (
  value: any,
  maximumFractionDigitsDisplay = 4,
): string => {
  const truncateFractionAndFormat = (value: any, maxDigits: any) => {
    let returnValue = numeral(value).format(
      '0,0[.]' + '0'.repeat(maxDigits),
      Math.floor,
    );
    // Kiểm tra có phải là số thập phân
    if (returnValue.indexOf('.') != -1) {
      // Bỏ những số 0 cuối
      returnValue = trimEnd(returnValue, '0');
    }
    // Kiểm tra nếu dấu . ở cuối sau khi bỏ số 0
    if (returnValue.substr(-1) === '.') {
      returnValue = returnValue.replace('.', '');
    }
    return returnValue;
  };
  return truncateFractionAndFormat(value, maximumFractionDigitsDisplay);
};
