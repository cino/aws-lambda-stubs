import crypto from 'node:crypto';
import type { SQSEvent, SQSRecord } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { deepMerge } from './utils';

type omittedKeys = 'attributes' | 'messageAttributes' | 'body';

interface PartialSQSRecord extends Omit<Partial<SQSRecord>, omittedKeys> {
  attributes?: Partial<SQSRecord['attributes']>;
  messageAttributes?: Partial<SQSRecord['messageAttributes']>;
  body?: Record<string, unknown>;
}

const SQSRecordStub = (overrides: PartialSQSRecord = {}): SQSRecord => {
  const region = overrides.awsRegion ?? DEFAULT_REGION;
  const nowIso = new Date().toISOString();

  const body = overrides.body || { key: 'value' };
  const stringifiedBody = JSON.stringify(body);
  delete overrides.body;

  return deepMerge<SQSRecord>(
    {
      messageId: '1',
      receiptHandle: 'receipt-handle',
      body: stringifiedBody,
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: nowIso,
        SenderId: 'sender-id',
        ApproximateFirstReceiveTimestamp: nowIso,
      },
      messageAttributes: {},
      md5OfBody: crypto.createHash('md5').update(stringifiedBody).digest('hex'),
      eventSource: 'aws:sqs',
      eventSourceARN: `arn:aws:sqs:${region}:${DEFAULT_ACCOUNT_ID}:queue-name`,
      awsRegion: region,
    },
    overrides as unknown as Partial<SQSRecord>
  ) as SQSRecord;
};

export const SQSEventStub = (records: PartialSQSRecord[] = [{}]): SQSEvent => {
  return {
    Records: records.map((record) => SQSRecordStub(record)),
  };
};
