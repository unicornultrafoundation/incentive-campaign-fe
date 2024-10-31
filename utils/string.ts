export const classNames = (
  ...classes: (string | undefined | null | boolean)[]
) => {
  return classes.filter(Boolean).join(' ');
};

export const shortenAddress = (
  str: string = '',
  head: number = 6,
  tail: number = 4,
) => {
  if (!str) return '';

  const totalLength = head + tail;
  if (str.length > totalLength) {
    return `${str.substring(0, head)}...${str.substring(str.length - tail)}`;
  } else {
    return str;
  }
};

export const readableFileSize = (size: number) => {
  if (size <= 0) return '0 B';

  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  const digitGroups = Math.floor(Math.log10(size) / Math.log10(1024));
  const formattedSize = (size / Math.pow(1024, digitGroups)).toFixed(1);

  return `${formattedSize} ${units[digitGroups]}`;
};
