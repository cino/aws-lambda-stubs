import type { DynamoDBRecord, DynamoDBStreamEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { deepMerge } from './utils';

const DynamoDBRecordStub = (overrides: Partial<DynamoDBRecord> = {}): DynamoDBRecord => {
  return deepMerge(
    {
      awsRegion: DEFAULT_REGION,
      eventID: '1',
      eventName: 'INSERT',
      eventSource: 'aws:dynamodb',
      eventSourceARN: `arn:aws:dynamodb:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:table/ExampleTable/stream/2020-04-01T00:00:00.000`,
      eventVersion: '1.1',
    },
    overrides
  );
};

export const DynamoDBStreamEventStub = (records: Partial<DynamoDBRecord>[] = [{}]): DynamoDBStreamEvent => {
  return {
    Records: records.map((record) => DynamoDBRecordStub(record)),
  };
};
