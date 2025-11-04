import type { TransferFamilyAuthorizerEvent } from 'aws-lambda';
import { randomIpAddress } from './utils';

export const TransferFamilyAuthorizerEventStub = (
  overrides: Partial<TransferFamilyAuthorizerEvent> = {}
): TransferFamilyAuthorizerEvent => {
  return {
    username: 'test-user',
    password: 'test-password',
    protocol: 'SFTP',
    sourceIp: randomIpAddress(),
    serverId: 's-1234567890abcdef0',

    ...overrides,
  };
};
