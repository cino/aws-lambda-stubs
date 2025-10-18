type IPType = 'ipv4' | 'ipv6';

export const randomIpAddress = (type: IPType = 'ipv4'): string => {
  if (type === 'ipv4') {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
  }

  return Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 65536)
      .toString(16)
      .padStart(4, '0')
  ).join(':');
};
