import crypto from 'node:crypto';
import type { SQSEvent, SQSRecord } from 'aws-lambda';
import { DateTime } from 'luxon';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { deepMerge } from './utils';

type omittedKeys = 'attributes' | 'messageAttributes';

interface PartialSQSRecord extends Omit<Partial<SQSRecord>, omittedKeys> {
  attributes?: Partial<SQSRecord['attributes']>;
  messageAttributes?: Partial<SQSRecord['messageAttributes']>;
}

export const SQSRecordStub = (body: object, overrides: PartialSQSRecord = {}): SQSRecord => {
  const stringifiedBody = JSON.stringify(body);
  const now = DateTime.now();
  const region = overrides.awsRegion ?? DEFAULT_REGION;


  return deepMerge<SQSRecord>(
    {
      messageId: '1',
      receiptHandle: 'receipt-handle',
      body: stringifiedBody,
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: now.toISO(),
        SenderId: 'sender-id',
        ApproximateFirstReceiveTimestamp: now.toISO(),
      },
      messageAttributes: {},
      md5OfBody: crypto.createHash('md5').update(stringifiedBody).digest('hex'),
      eventSource: 'aws:sqs',
      eventSourceARN: `arn:aws:sqs:${region}:${DEFAULT_ACCOUNT_ID}:queue-name`,
      awsRegion: region,
    },
    overrides as Partial<SQSRecord>
  ) as SQSRecord;
};

export const SQSEventStub = (records: SQSRecord[]): SQSEvent => {
  return {
    Records: [...records],
  };
};
