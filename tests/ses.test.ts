import { SESEventRecordStub, SESEventStub } from 'src/ses';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from 'src/utils';
import { describe, expect, it } from 'vitest';

describe('#ses', () => {
  it('should return a valid event', () => {
    const event = SESEventStub([SESEventRecordStub()]);

    expect(event).toEqual({
      Records: [
        {
          eventVersion: '1.0',
          eventSource: 'aws:ses',
          ses: {
            mail: {
              timestamp: expect.any(String),
              source: 'Example <email@example.com>',
              messageId: 'message-id',
              destination: ['recipient@example.com'],
              headersTruncated: false,
              headers: [
                {
                  name: 'From',
                  value: 'email@example.com',
                },
                {
                  name: 'To',
                  value: 'recipient@example.com',
                },
                {
                  name: 'Subject',
                  value: 'Test email',
                },
              ],
              commonHeaders: {
                returnPath: 'return@example.com',
                date: expect.any(String),
                messageId: 'message-id',
              },
            },
            receipt: {
              timestamp: expect.any(String),
              processingTimeMillis: 100,
              recipients: ['recipient@example.com'],
              spamVerdict: { status: 'PASS' },
              virusVerdict: { status: 'PASS' },
              spfVerdict: { status: 'PASS' },
              dkimVerdict: { status: 'PASS' },
              dmarcVerdict: { status: 'PASS' },
              dmarcPolicy: 'none',
              action: {
                type: 'S3',
                topicArn: `arn:aws:sns:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:MyTopic`,
                bucketName: 'my-email-bucket',
                objectKey: 'emails/',
              },
            },
          },
        },
      ],
    });
  });

  it('should allow partial overrides', () => {
    const event = SESEventStub([
      SESEventRecordStub({
        ses: {
          receipt: {
            virusVerdict: { status: 'FAIL' },
          },
        },
      }),
    ]);

    expect(event).toEqual({
      Records: [
        {
          eventVersion: '1.0',
          eventSource: 'aws:ses',
          ses: {
            mail: {
              timestamp: expect.any(String),
              source: 'Example <email@example.com>',
              messageId: 'message-id',
              destination: ['recipient@example.com'],
              headersTruncated: false,
              headers: [
                {
                  name: 'From',
                  value: 'email@example.com',
                },
                {
                  name: 'To',
                  value: 'recipient@example.com',
                },
                {
                  name: 'Subject',
                  value: 'Test email',
                },
              ],
              commonHeaders: {
                returnPath: 'return@example.com',
                date: expect.any(String),
                messageId: 'message-id',
              },
            },
            receipt: {
              timestamp: expect.any(String),
              processingTimeMillis: 100,
              recipients: ['recipient@example.com'],
              spamVerdict: { status: 'PASS' },
              virusVerdict: { status: 'FAIL' },
              spfVerdict: { status: 'PASS' },
              dkimVerdict: { status: 'PASS' },
              dmarcVerdict: { status: 'PASS' },
              dmarcPolicy: 'none',
              action: {
                type: 'S3',
                topicArn: `arn:aws:sns:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:MyTopic`,
                bucketName: 'my-email-bucket',
                objectKey: 'emails/',
              },
            },
          },
        },
      ],
    });
  });
});
