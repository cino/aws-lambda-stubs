import { describe, expect, it } from 'vitest';
import { secretsManagerRotationStub } from '../src';

describe('#secretsManager', () => {
  it('should return a valid event', () => {
    const event = secretsManagerRotationStub();

    expect(event).toEqual({
      Step: 'createSecret',
      SecretId: 'test-secret',
      ClientRequestToken: 'test-token',
    });
  });

  it('should allow partial overrides', () => {
    const event = secretsManagerRotationStub({
      Step: 'setSecret',
      SecretId: 'overridden-secret',
    });

    expect(event).toEqual({
      Step: 'setSecret',
      SecretId: 'overridden-secret',
      ClientRequestToken: 'test-token',
    });
  });
});
