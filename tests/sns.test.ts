import { describe, expect, it } from 'vitest';
import { snsEventRecordStub, snsEventStub } from '../src';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/common';

describe('#sns', () => {
  it('should return a valid event', () => {
    const event = snsEventStub([snsEventRecordStub()]);

    expect(event).toEqual({
      Records: [
        {
          EventVersion: '1.0',
          EventSubscriptionArn: `arn:aws:sns:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:MyTopic:2bcfbf39-05c3-41de-beaa-fcfcc21c8f55`,
          EventSource: 'aws:sns',
          Sns: {
            SignatureVersion: '1',
            Timestamp: expect.any(String),
            Signature: 'EXAMPLE',
            SigningCertUrl: `https://sns.${DEFAULT_ACCOUNT_ID}.amazonaws.com/SimpleNotificationService-12345678901234567890.pem`,
            MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e',
            Message: 'Hello from SNS!',
            MessageAttributes: {},
            Type: 'Notification',
            UnsubscribeUrl: `https://sns.${DEFAULT_ACCOUNT_ID}.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:${DEFAULT_ACCOUNT_ID}:${DEFAULT_ACCOUNT_ID}:MyTopic:2bcfbf39-05c3-41de-beaa-fcfcc21c8f55`,
            TopicArn: `arn:aws:sns:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:MyTopic`,
            Subject: 'TestInvoke',
          },
        },
      ],
    });
  });

  it('should allow partial overrides', () => {
    const event = snsEventStub([
      snsEventRecordStub({
        Sns: {
          Message: 'Overridden message',
          MessageAttributes: {
            attr1: {
              Type: 'String',
              Value: 'value1',
            },
          },
        },
      }),
    ]);

    expect(event).toEqual({
      Records: [
        {
          EventVersion: '1.0',
          EventSubscriptionArn: `arn:aws:sns:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:MyTopic:2bcfbf39-05c3-41de-beaa-fcfcc21c8f55`,
          EventSource: 'aws:sns',
          Sns: {
            SignatureVersion: '1',
            Timestamp: expect.any(String),
            Signature: 'EXAMPLE',
            SigningCertUrl: `https://sns.${DEFAULT_ACCOUNT_ID}.amazonaws.com/SimpleNotificationService-12345678901234567890.pem`,
            MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e',
            Message: 'Overridden message',
            MessageAttributes: {
              attr1: {
                Type: 'String',
                Value: 'value1',
              },
            },
            Type: 'Notification',
            UnsubscribeUrl: `https://sns.${DEFAULT_ACCOUNT_ID}.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:${DEFAULT_ACCOUNT_ID}:${DEFAULT_ACCOUNT_ID}:MyTopic:2bcfbf39-05c3-41de-beaa-fcfcc21c8f55`,
            TopicArn: `arn:aws:sns:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:MyTopic`,
            Subject: 'TestInvoke',
          },
        },
      ],
    });
  });
});
