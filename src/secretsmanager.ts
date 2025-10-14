import type { SecretsManagerRotationEvent } from 'aws-lambda';

export const secretsManagerRotationStub = (
  overrides: Partial<SecretsManagerRotationEvent> = {}
): SecretsManagerRotationEvent => {
  return {
    Step: 'createSecret',
    SecretId: 'test-secret',
    ClientRequestToken: 'test-token',
    ...overrides,
  };
};
