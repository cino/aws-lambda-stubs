import crypto from 'node:crypto';
import type { SQSEvent, SQSRecord } from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

type omittedKeys = 'attributes' | 'messageAttributes';

interface PartialSQSRecord extends Omit<Partial<SQSRecord>, omittedKeys> {
  attributes?: Partial<SQSRecord['attributes']>;
  messageAttributes?: Partial<SQSRecord['messageAttributes']>;
}

export const sqsRecordStub = (body: object, overrides: PartialSQSRecord = {}): SQSRecord => {
  const stringifiedBody = JSON.stringify(body);
  const currentEpoch = Date.now().toString();

  return deepmerge(
    {
      messageId: '1',
      receiptHandle: 'receipt-handle',
      body: stringifiedBody,
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: currentEpoch,
        SenderId: 'sender-id',
        ApproximateFirstReceiveTimestamp: currentEpoch,
      },
      messageAttributes: {},
      md5OfBody: crypto.createHash('md5').update(stringifiedBody).digest('hex'),
      eventSource: 'aws:sqs',
      eventSourceARN: `sarn:aws:sqs:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:queue-name`,
      awsRegion: DEFAULT_REGION,
    },
    overrides
  ) as SQSRecord;
};

export const sqsEventStub = (records: SQSRecord[]): SQSEvent => {
  return {
    Records: [...records],
  };
};
