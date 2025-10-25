import type { SecretsManagerRotationEvent } from 'aws-lambda';

export const SecretsManagerRotationStub = (
  overrides: Partial<SecretsManagerRotationEvent> = {}
): SecretsManagerRotationEvent => {
  return {
    Step: 'createSecret',
    SecretId: 'test-secret',
    ClientRequestToken: 'test-token',
    ...overrides,
  };
};
