import type { DynamoDBRecord, DynamoDBStreamEvent } from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

export const DynamoDBRecordStub = (overrides: Partial<DynamoDBRecord> = {}): DynamoDBRecord => {
  return deepmerge(
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

export const DynamoDBStreamEventStub = (records: DynamoDBRecord[]): DynamoDBStreamEvent => {
  return {
    Records: records,
  };
};
