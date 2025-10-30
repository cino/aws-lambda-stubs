import type {
  KinesisStreamEvent,
  KinesisStreamRecord,
  KinesisStreamRecordPayload,
  KinesisStreamTumblingWindowEvent,
} from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { deepMerge } from './utils';

type PartialKinesisStreamRecord = Merge<
  Partial<KinesisStreamRecord>,
  {
    kinesis?: Partial<KinesisStreamRecordPayload>;
  }
>;

export const KinesisStreamRecordStub = (overrides: PartialKinesisStreamRecord = {}): KinesisStreamRecord => {
  const region = overrides.awsRegion ?? DEFAULT_REGION;

  return deepMerge(
    {
      awsRegion: region,
      eventID: 'shardId-000000000006:49590338271490256608559692540925702759324208523137515618',
      eventName: 'aws:kinesis:record',
      eventSource: 'aws:kinesis',
      eventSourceARN: `arn:aws:kinesis:${region}:${DEFAULT_ACCOUNT_ID}:stream/lambda-stream`,
      eventVersion: '1.0',
      invokeIdentityArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/lambda-role`,

      kinesis: {
        kinesisSchemaVersion: '1.0',
        partitionKey: '1',
        sequenceNumber: '49545115243490985018280067714973144582180062593244200961',
        data: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uh', // "Hello, this is a test message!" in base64
        approximateArrivalTimestamp: Date.now(),
      },
    },
    overrides as Partial<KinesisStreamRecord>
  ) as KinesisStreamRecord;
};

export const KinesisStreamEventStub = (records: KinesisStreamRecord[]): KinesisStreamEvent => {
  return {
    Records: records,
  };
};

export const KinesisStreamTumblingWindowEventStub = (
  records: KinesisStreamRecord[],
  overrides: Partial<KinesisStreamTumblingWindowEvent> = {}
): KinesisStreamTumblingWindowEvent => {
  return {
    ...KinesisStreamEventStub(records),
    window: {
      start: new Date().toISOString(),
      end: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes later
    },
    isFinalInvokeForWindow: false,
    isWindowTerminatedEarly: false,

    ...overrides,
  };
};
