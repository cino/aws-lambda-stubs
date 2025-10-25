import type { TransferFamilyAuthorizerEvent } from 'aws-lambda';

export const TransferFamilyAuthorizerEventStub = (
  overrides: Partial<TransferFamilyAuthorizerEvent> = {}
): TransferFamilyAuthorizerEvent => {
  return {
    username: 'test-user',
    password: 'test-password',
    protocol: 'SFTP',
    sourceIp: '192.168.1.1',
    serverId: 's-1234567890abcdef0',

    ...overrides,
  };
};
