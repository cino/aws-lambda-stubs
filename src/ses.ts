import type {
  SESEvent,
  SESEventRecord,
  SESMail,
  SESMailCommonHeaders,
  SESMessage,
  SESReceipt,
  SESReceiptBounceAction,
  SESReceiptLambdaAction,
  SESReceiptS3Action,
  SESReceiptSnsAction,
  SESReceiptStopAction,
  SESReceiptWorkMailAction,
} from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

type PartialSESMail = Merge<
  Partial<SESMail>,
  {
    commonHeaders?: Partial<SESMailCommonHeaders>;
  }
>;

type PartialSESReceipt = Merge<
  Partial<SESReceipt>,
  {
    action?:
      | Partial<SESReceiptS3Action>
      | Partial<SESReceiptSnsAction>
      | Partial<SESReceiptBounceAction>
      | Partial<SESReceiptLambdaAction>
      | Partial<SESReceiptStopAction>
      | Partial<SESReceiptWorkMailAction>;
  }
>;

type PartialSESMessage = Merge<
  Partial<SESMessage>,
  {
    mail?: PartialSESMail;
    receipt?: PartialSESReceipt;
  }
>;

type PartialSESEventRecord = Merge<
  Partial<SESEventRecord>,
  {
    ses?: PartialSESMessage;
  }
>;

export const SESEventRecordStub = (overrides: PartialSESEventRecord = {}): SESEventRecord => {
  return deepmerge(
    {
      eventVersion: '1.0',
      eventSource: 'aws:ses',
      ses: {
        mail: {
          timestamp: new Date().toISOString(),
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
            date: new Date().toISOString(),
            messageId: 'message-id',
          },
        },
        receipt: {
          timestamp: new Date().toISOString(),
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
    overrides
  ) as SESEventRecord;
};

export const SESEventStub = (records: SESEventRecord[]): SESEvent => {
  return {
    Records: records,
  };
};
