import { describe, expect, it } from 'vitest';
import { sqsEventStub, sqsRecordStub } from '../src';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/utils';

describe('#sqs', () => {
  it('should return a valid event', () => {
    const event = sqsEventStub([
      sqsRecordStub({
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
          eventSourceARN: `sarn:aws:sqs:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:queue-name`,
          awsRegion: 'us-east-1',
        },
      ],
    });
  });

  it('should allow partial overrides', () => {
    const event = sqsEventStub([
      sqsRecordStub(
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
          eventSourceARN: `sarn:aws:sqs:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:queue-name`,
          awsRegion: 'us-east-1',
        },
      ],
    });
  });
});
