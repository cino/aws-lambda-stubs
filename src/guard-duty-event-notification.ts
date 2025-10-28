import type { GuardDutyScanResultNotificationEvent, GuardDutyScanResultNotificationEventDetail } from 'aws-lambda';
import type { Merge } from 'type-fest';
import type { PartialEventBridgeEvent } from './common';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { deepMerge } from './utils/deepmerge';

type PartialGuardDutyScanResultNotificationEvent = Merge<
  PartialEventBridgeEvent,
  {
    detail?: Merge<
      Partial<GuardDutyScanResultNotificationEventDetail>,
      {
        s3ObjectDetails?: Partial<GuardDutyScanResultNotificationEventDetail['s3ObjectDetails']>;
        scanResultDetails?: Partial<GuardDutyScanResultNotificationEventDetail['scanResultDetails']>;
      }
    >;
  }
>;

export const GuardDutyScanResultNotificationEventStub = (
  overrides: PartialGuardDutyScanResultNotificationEvent = {}
): GuardDutyScanResultNotificationEvent => {
  const region = overrides.region ?? DEFAULT_REGION;
  const account = overrides.account ?? DEFAULT_ACCOUNT_ID;

  return deepMerge(
    {
      version: '1',
      id: 'abcd1234-ef56-7890-ab12-34567890cdef',
      'detail-type': 'GuardDuty Malware Protection Object Scan Result',
      source: 'aws.guardduty',
      account,
      time: new Date().toISOString(),
      region,
      resources: [
        `arn:aws:guardduty:${region}:${account}:detector/12abc34d567e8f9012gh345i678j90kl/scans/scan-id-1234abcd`,
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
    overrides as Partial<GuardDutyScanResultNotificationEvent>
  ) as GuardDutyScanResultNotificationEvent;
};
