import { describe, expect, it } from 'vitest';
import { IoTPreProvisioningHookEventStub } from '../src';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/common';

describe('#iot', () => {
  it('should return a valid event', () => {
    const event = IoTPreProvisioningHookEventStub();

    expect(event).toEqual({
      claimCertificateId: 'example-claim-certificate-id',
      certificateId: 'example-certificate-id',
      certificatePem: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
      templateArn: `arn:aws:iot:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:provisioningtemplate/ExampleTemplate`,
      clientId: 'example-client-id',
      parameters: {
        Test: '1234567890',
      },
    });
  });

  it('should allow overrides', () => {
    const event = IoTPreProvisioningHookEventStub({
      clientId: 'custom-client-id',
      parameters: {},
    });

    expect(event).toEqual({
      claimCertificateId: 'example-claim-certificate-id',
      certificateId: 'example-certificate-id',
      certificatePem: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
      templateArn: `arn:aws:iot:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:provisioningtemplate/ExampleTemplate`,
      clientId: 'custom-client-id',
      parameters: {},
    });
  });
});
