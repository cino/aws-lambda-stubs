import type { FirehoseTransformationEvent, FirehoseTransformationEventRecord } from 'aws-lambda';
import { DateTime } from 'luxon';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

export const fireHoseTransformationEventRecordStub = (
  overrides: Partial<FirehoseTransformationEventRecord> = {}
): FirehoseTransformationEventRecord => {
  return {
    recordId: 'record-id-123',
    approximateArrivalTimestamp: DateTime.now().toUnixInteger(),
    data: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uh', // "Hello, this is a test message!" in base64
    ...overrides,
  };
};

export const fireHoseTransformationEventStub = (
  records: FirehoseTransformationEventRecord[]
): FirehoseTransformationEvent => {
  return {
    invocationId: 'invocation-id-123',
    deliveryStreamArn: `arn:aws:firehose:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:deliverystream/stream-name`,
    region: DEFAULT_REGION,
    records,
  };
};
