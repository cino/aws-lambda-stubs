import { describe, expect, it } from 'vitest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION, FireHoseTransformationEventStub } from '../src';
import { epochTimeRegex } from './helpers';

describe('#kinesis-firehose-transformation', () => {
  it('should return a valid event', () => {
    const event = FireHoseTransformationEventStub();

    expect(event).toEqual({
      invocationId: 'invocation-id-123',
      deliveryStreamArn: `arn:aws:firehose:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:deliverystream/stream-name`,
      region: DEFAULT_REGION,
      records: [
        {
          recordId: 'record-id-123',
          approximateArrivalTimestamp: expect.toSatisfy((val: number) => epochTimeRegex.test(val.toString())),
          data: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uh',
        },
      ],
    });
  });

  it('should allow overrides', () => {
    const event = FireHoseTransformationEventStub(
      [
        {
          recordId: 'custom-record-id',
          data: 'Q3VzdG9tIGRhdGE=',
        },
      ],
      { region: 'us-west-2' }
    );

    expect(event).toEqual({
      invocationId: 'invocation-id-123',
      deliveryStreamArn: `arn:aws:firehose:us-west-2:${DEFAULT_ACCOUNT_ID}:deliverystream/stream-name`,
      region: 'us-west-2',
      records: [
        {
          recordId: 'custom-record-id',
          approximateArrivalTimestamp: expect.toSatisfy((val: number) => epochTimeRegex.test(val.toString())),
          data: 'Q3VzdG9tIGRhdGE=',
        },
      ],
    });
  });
});
