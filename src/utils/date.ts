export const currentEpochTime = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const javaLoggingTimeStampFormat = (date: Date): string => {
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${hours >= 12 ? 'PM' : 'AM'}`;
};
