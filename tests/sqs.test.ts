import { describe, expect, it } from 'vitest';
import { SQSEventStub, SQSRecordStub } from '../src';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/common';

describe('#sqs', () => {
  it('should return a valid event', () => {
    const event = SQSEventStub([
      SQSRecordStub({
        key: 'value',
      }),
    ]);

    expect(event).toEqual({
      Records: [
        {
          messageId: '1',
          receiptHandle: 'receipt-handle',
          body: JSON.stringify({ key: 'value' }),
          attributes: {
            ApproximateReceiveCount: '1',
            SentTimestamp: expect.any(String),
            SenderId: 'sender-id',
            ApproximateFirstReceiveTimestamp: expect.any(String),
          },
          messageAttributes: {},
          md5OfBody: 'a7353f7cddce808de0032747a0b7be50',
          eventSource: 'aws:sqs',
          eventSourceARN: `arn:aws:sqs:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:queue-name`,
          awsRegion: 'us-east-1',
        },
      ],
    });
  });

  it('should allow partial overrides', () => {
    const event = SQSEventStub([
      SQSRecordStub(
        {
          key: 'value',
        },
        {
          attributes: {
            ApproximateReceiveCount: '5',
          },
        }
      ),
    ]);

    expect(event).toEqual({
      Records: [
        {
          messageId: '1',
          receiptHandle: 'receipt-handle',
          body: JSON.stringify({ key: 'value' }),
          attributes: {
            ApproximateReceiveCount: '5',
            SentTimestamp: expect.any(String),
            SenderId: 'sender-id',
            ApproximateFirstReceiveTimestamp: expect.any(String),
          },
          messageAttributes: {},
          md5OfBody: 'a7353f7cddce808de0032747a0b7be50',
          eventSource: 'aws:sqs',
          eventSourceARN: `arn:aws:sqs:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:queue-name`,
          awsRegion: 'us-east-1',
        },
      ],
    });
  });
});
