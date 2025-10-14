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
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './utils';

interface PartialSESMail extends Omit<Partial<SESMail>, 'commonHeaders'> {
  commonHeaders?: Partial<SESMailCommonHeaders>;
}

interface PartialSESReceipt extends Omit<Partial<SESReceipt>, 'action'> {
  action?: Partial<
    | SESReceiptS3Action
    | SESReceiptSnsAction
    | SESReceiptBounceAction
    | SESReceiptLambdaAction
    | SESReceiptStopAction
    | SESReceiptWorkMailAction
  >;
}

interface PartialSESMessage extends Omit<Partial<SESMessage>, 'mail' | 'receipt'> {
  mail?: PartialSESMail;
  receipt?: PartialSESReceipt;
}

interface PartialSESEventRecord extends Omit<Partial<SESEventRecord>, 'ses'> {
  ses?: PartialSESMessage;
}

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
