import { guardDutyScanResultNotificationEventStub } from 'src/guard-duty-event-notification';
import { describe, expect, it } from 'vitest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/common';

describe('#guard-duty-event-notification', () => {
  it('should return a valid event', () => {
    const event = guardDutyScanResultNotificationEventStub();

    expect(event).toEqual({
      version: '1',
      id: 'abcd1234-ef56-7890-ab12-34567890cdef',
      'detail-type': 'GuardDuty Malware Protection Object Scan Result',
      source: 'aws.guardduty',
      account: DEFAULT_ACCOUNT_ID,
      time: expect.any(String),
      region: DEFAULT_REGION,
      resources: [
        `arn:aws:guardduty:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:detector/12abc34d567e8f9012gh345i678j90kl/scans/scan-id-1234abcd`,
      ],
      detail: {
        schemaVersion: '1.0',
        scanStatus: 'COMPLETED',
        resourceType: 'S3_OBJECT',
        s3ObjectDetails: {
          bucketName: 'example-bucket',
          objectKey: 'path/to/object.txt',
          eTag: '0123456789abcdef0123456789abcdef',
          versionId: '1',
          s3Throttled: false,
        },
        scanResultDetails: {
          scanResultStatus: 'NO_THREATS_FOUND',
          threats: null,
        },
      },
    });
  });

  it('should allow overrides', () => {
    const event = guardDutyScanResultNotificationEventStub({
      detail: {
        scanStatus: 'FAILED',
        scanResultDetails: {
          scanResultStatus: 'FAILED',
          threats: [
            {
              name: 'Malware.Example',
            },
          ],
        },
      },
    });

    expect(event).toEqual({
      version: '1',
      id: 'abcd1234-ef56-7890-ab12-34567890cdef',
      'detail-type': 'GuardDuty Malware Protection Object Scan Result',
      source: 'aws.guardduty',
      account: DEFAULT_ACCOUNT_ID,
      time: expect.any(String),
      region: DEFAULT_REGION,
      resources: [
        `arn:aws:guardduty:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:detector/12abc34d567e8f9012gh345i678j90kl/scans/scan-id-1234abcd`,
      ],
      detail: {
        schemaVersion: '1.0',
        scanStatus: 'FAILED',
        resourceType: 'S3_OBJECT',
        s3ObjectDetails: {
          bucketName: 'example-bucket',
          objectKey: 'path/to/object.txt',
          eTag: '0123456789abcdef0123456789abcdef',
          versionId: '1',
          s3Throttled: false,
        },
        scanResultDetails: {
          scanResultStatus: 'FAILED',
          threats: [
            {
              name: 'Malware.Example',
            },
          ],
        },
      },
    });
  });
});
