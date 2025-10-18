import type { IoTPreProvisioningHookEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

export const IoTPreProvisioningHookEventStub = (
  overrides: Partial<IoTPreProvisioningHookEvent> = {}
): IoTPreProvisioningHookEvent => {
  return {
    claimCertificateId: 'example-claim-certificate-id',
    certificateId: 'example-certificate-id',
    certificatePem: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
    templateArn: `arn:aws:iot:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:provisioningtemplate/ExampleTemplate`,
    clientId: 'example-client-id',
    parameters: {
      Test: '1234567890',
    },

    ...overrides,
  };
};
