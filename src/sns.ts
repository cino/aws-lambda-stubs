import type { SNSEvent, SNSEventRecord } from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

interface PartialSnsRecord extends Omit<Partial<SNSEventRecord>, 'Sns'> {
  Sns?: Partial<SNSEventRecord['Sns']>;
}

export const snsEventRecordStub = (overrides: PartialSnsRecord = {}): SNSEventRecord => {
  return deepmerge(
    {
      EventVersion: '1.0',
      EventSubscriptionArn: `arn:aws:sns:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:MyTopic:2bcfbf39-05c3-41de-beaa-fcfcc21c8f55`,
      EventSource: 'aws:sns',
      Sns: {
        SignatureVersion: '1',
        Timestamp: new Date().toISOString(),
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
    overrides
  ) as SNSEventRecord;
};

export const snsEventStub = (records: SNSEventRecord[]): SNSEvent => {
  return {
    Records: records,
  };
};
