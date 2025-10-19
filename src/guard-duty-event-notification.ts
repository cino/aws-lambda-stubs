import type { GuardDutyScanResultNotificationEvent, GuardDutyScanResultNotificationEventDetail } from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import type { PartialEventBridgeEvent } from './common/event-bridge';

type PartialGuardDutyScanResultNotificationEvent = Merge<
  PartialEventBridgeEvent,
  {
    detail?: Partial<{
      schemaVersion?: '1.0';
      scanStatus?: 'COMPLETED' | 'SKIPPED' | 'FAILED';
      resourceType?: 'S3_OBJECT';
      s3ObjectDetails?: Partial<GuardDutyScanResultNotificationEventDetail['s3ObjectDetails']>;
      scanResultDetails?: Partial<GuardDutyScanResultNotificationEventDetail['scanResultDetails']>;
    }>;
  }
>;

export const guardDutyScanResultNotificationEventStub = (
  overrides: PartialGuardDutyScanResultNotificationEvent = {}
): GuardDutyScanResultNotificationEvent => {
  return deepmerge(
    {
      version: '1',
      id: 'abcd1234-ef56-7890-ab12-34567890cdef',
      'detail-type': 'GuardDuty Malware Protection Object Scan Result',
      source: 'aws.guardduty',
      account: DEFAULT_ACCOUNT_ID,
      time: new Date().toISOString(),
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
    },
    overrides
  ) as GuardDutyScanResultNotificationEvent;
};
