import { transferFamilyAuthorizerEventStub } from 'src';
import { describe, expect, it } from 'vitest';

describe('#transfer-family-authorizer', () => {
  it('should return a valid event', () => {
    const event = transferFamilyAuthorizerEventStub();

    expect(event).toEqual({
      username: 'test-user',
      password: 'test-password',
      protocol: 'SFTP',
      sourceIp: '192.168.1.1',
      serverId: 's-1234567890abcdef0',
    });
  });

  it('should allow partial overrides', () => {
    const event = transferFamilyAuthorizerEventStub({
      username: 'custom-user',
      protocol: 'FTP',
    });

    expect(event).toEqual({
      username: 'custom-user',
      password: 'test-password',
      protocol: 'FTP',
      sourceIp: '192.168.1.1',
      serverId: 's-1234567890abcdef0',
    });
  });
});
