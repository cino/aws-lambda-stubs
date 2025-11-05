import crypto from 'node:crypto';
import type { SQSEvent, SQSRecord } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { currentEpochTime, deepMerge } from './utils';

type omittedKeys = 'attributes' | 'messageAttributes' | 'body';

interface PartialSQSRecord extends Omit<Partial<SQSRecord>, omittedKeys> {
  attributes?: Partial<SQSRecord['attributes']>;
  messageAttributes?: Partial<SQSRecord['messageAttributes']>;
  body?: Record<string, unknown>;
}

const SQSRecordStub = (overrides: PartialSQSRecord = {}): SQSRecord => {
  const region = overrides.awsRegion ?? DEFAULT_REGION;
  const nowEpoch = currentEpochTime().toString();

  const body = overrides.body || { key: 'value' };
  const stringifiedBody = JSON.stringify(body);
  delete overrides.body;

  return deepMerge<SQSRecord>(
    {
      messageId: uuidv4(),
      receiptHandle: 'receipt-handle',
      body: stringifiedBody,
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: nowEpoch,
        SenderId: 'sender-id',
        ApproximateFirstReceiveTimestamp: nowEpoch,
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
