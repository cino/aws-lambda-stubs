import { describe, expect, it } from 'vitest';
import { TransferFamilyAuthorizerEventStub } from '../src';
import { ipRegex } from './helpers';

describe('#transfer-family-authorizer', () => {
  it('should return a valid event', () => {
    const event = TransferFamilyAuthorizerEventStub();

    expect(event).toEqual({
      username: 'test-user',
      password: 'test-password',
      protocol: 'SFTP',
      sourceIp: expect.stringMatching(ipRegex),
      serverId: 's-1234567890abcdef0',
    });
  });

  it('should allow partial overrides', () => {
    const event = TransferFamilyAuthorizerEventStub({
      username: 'custom-user',
      protocol: 'FTP',
    });

    expect(event).toEqual({
      username: 'custom-user',
      password: 'test-password',
      protocol: 'FTP',
      sourceIp: expect.stringMatching(ipRegex),
      serverId: 's-1234567890abcdef0',
    });
  });
});
