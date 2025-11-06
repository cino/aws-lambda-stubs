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

type InstanceId = `i-${string}`;
export const randomInstanceId = (): InstanceId => {
  const randomHex = () =>
    Math.floor(Math.random() * 0xffffffff)
      .toString(16)
      .padStart(8, '0');

  return `i-${randomHex()}${randomHex()}` as InstanceId;
};

export const randomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
