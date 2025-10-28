import { describe, expect, it } from 'vitest';
import {
  DEFAULT_ACCOUNT_ID,
  DEFAULT_REGION,
  KinesisStreamEventStub,
  KinesisStreamRecordStub,
  KinesisStreamTumblingWindowEventStub,
} from '../src';

describe('#kinesis', () => {
  describe('#stream', () => {
    it('should return a valid event', () => {
      const event = KinesisStreamEventStub([KinesisStreamRecordStub()]);

      expect(event).toEqual({
        Records: [
          {
            awsRegion: 'us-east-1',
            eventID: 'shardId-000000000006:49590338271490256608559692540925702759324208523137515618',
            eventName: 'aws:kinesis:record',
            eventSource: 'aws:kinesis',
            eventSourceARN: `arn:aws:kinesis:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:stream/lambda-stream`,
            eventVersion: '1.0',
            invokeIdentityArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/lambda-role`,
            kinesis: {
              kinesisSchemaVersion: '1.0',
              partitionKey: '1',
              sequenceNumber: '49545115243490985018280067714973144582180062593244200961',
              data: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uh',
              approximateArrivalTimestamp: expect.any(Number),
            },
          },
        ],
      });
    });

    it('should allow overrides', () => {
      const event = KinesisStreamEventStub([
        KinesisStreamRecordStub({
          eventID: 'custom-event-id',
          awsRegion: 'us-west-1',
          kinesis: {
            partitionKey: 'custom-partition-key',
          },
        }),
      ]);

      expect(event).toEqual({
        Records: [
          {
            awsRegion: 'us-west-1',
            eventID: 'custom-event-id',
            eventName: 'aws:kinesis:record',
            eventSource: 'aws:kinesis',
            eventSourceARN: `arn:aws:kinesis:us-west-1:${DEFAULT_ACCOUNT_ID}:stream/lambda-stream`,
            eventVersion: '1.0',
            invokeIdentityArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/lambda-role`,
            kinesis: {
              kinesisSchemaVersion: '1.0',
              partitionKey: 'custom-partition-key',
              sequenceNumber: '49545115243490985018280067714973144582180062593244200961',
              data: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uh',
              approximateArrivalTimestamp: expect.any(Number),
            },
          },
        ],
      });
    });
  });

  describe('#stream-tumbling-window', () => {
    it('should have tests', () => {
      const event = KinesisStreamTumblingWindowEventStub([KinesisStreamRecordStub()]);

      expect(event).toEqual({
        Records: [
          {
            awsRegion: 'us-east-1',
            eventID: 'shardId-000000000006:49590338271490256608559692540925702759324208523137515618',
            eventName: 'aws:kinesis:record',
            eventSource: 'aws:kinesis',
            eventSourceARN: `arn:aws:kinesis:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:stream/lambda-stream`,
            eventVersion: '1.0',
            invokeIdentityArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/lambda-role`,
            kinesis: {
              kinesisSchemaVersion: '1.0',
              partitionKey: '1',
              sequenceNumber: '49545115243490985018280067714973144582180062593244200961',
              data: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uh',
              approximateArrivalTimestamp: expect.any(Number),
            },
          },
        ],
        window: {
          start: expect.any(String),
          end: expect.any(String),
        },
        isFinalInvokeForWindow: false,
        isWindowTerminatedEarly: false,
      });
    });

    it('should allow overrides', () => {
      const event = KinesisStreamTumblingWindowEventStub([KinesisStreamRecordStub()], {
        isFinalInvokeForWindow: true,
        isWindowTerminatedEarly: true,
      });

      expect(event).toEqual({
        Records: [
          {
            awsRegion: 'us-east-1',
            eventID: 'shardId-000000000006:49590338271490256608559692540925702759324208523137515618',
            eventName: 'aws:kinesis:record',
            eventSource: 'aws:kinesis',
            eventSourceARN: `arn:aws:kinesis:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:stream/lambda-stream`,
            eventVersion: '1.0',
            invokeIdentityArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/lambda-role`,
            kinesis: {
              kinesisSchemaVersion: '1.0',
              partitionKey: '1',
              sequenceNumber: '49545115243490985018280067714973144582180062593244200961',
              data: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IG1lc3NhZ2Uh',
              approximateArrivalTimestamp: expect.any(Number),
            },
          },
        ],
        window: {
          start: expect.any(String),
          end: expect.any(String),
        },
        isFinalInvokeForWindow: true,
        isWindowTerminatedEarly: true,
      });
    });
  });
});
