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

export const randomString = (
  length: number,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

type InstanceId = `i-${string}`;
export const randomInstanceId = (): InstanceId => {
  return `i-${randomString(16, '0123456789abcdef')}` as InstanceId;
};

export const randomUserAgent = (): string => {
  const userAgents: string[] = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 15_7_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 15.7; rv:144.0) Gecko/20100101 Firefox/144.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 15.7; rv:144.0) Gecko/20100101 Firefox/144.0',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/144.0 Mobile/15E148 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.3595.53',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0',
    'Mozilla/5.0 (Linux; Android 16; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.49 Mobile Safari/537.36',
    'Mozilla/5.0 (Android 16; Mobile; rv:68.0) Gecko/68.0 Firefox/144.0',
    'Mozilla/5.0 (X11; CrOS x86_64 16181.61.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.6998.198 Safari/537.36',
  ];

  const randomAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

  if (!randomAgent) {
    throw new Error('No user agents available');
  }

  return randomAgent;
};
