import { fireHoseTransformationEventRecordStub, fireHoseTransformationEventStub } from 'src';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from 'src/common';
import { describe, expect, it } from 'vitest';

describe('#kinesis-firehose-transformation', () => {
  it('should return a valid event', () => {
    const event = fireHoseTransformationEventStub([fireHoseTransformationEventRecordStub()]);

    expect(event).toEqual({
      invocationId: 'invocation-id-123',
      deliveryStreamArn: `arn:aws:firehose:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:deliverystream/stream-name`,
      region: DEFAULT_REGION,
      records: [
        {
          recordId: 'record-id-123',
          approximateArrivalTimestamp: expect.any(Number),
          data: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uh',
        },
      ],
    });
  });

  it('should allow overrides', () => {
    const event = fireHoseTransformationEventStub([
      fireHoseTransformationEventRecordStub({
        recordId: 'custom-record-id',
        data: 'Q3VzdG9tIGRhdGE=',
      }),
    ]);

    expect(event).toEqual({
      invocationId: 'invocation-id-123',
      deliveryStreamArn: `arn:aws:firehose:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:deliverystream/stream-name`,
      region: DEFAULT_REGION,
      records: [
        {
          recordId: 'custom-record-id',
          approximateArrivalTimestamp: expect.any(Number),
          data: 'Q3VzdG9tIGRhdGE=',
        },
      ],
    });
  });
});
