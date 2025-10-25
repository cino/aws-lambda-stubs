import { describe, expect, it } from 'vitest';
import { DynamoDBRecordStub, DynamoDBStreamEventStub } from '../src';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/common';

describe('#dynamodb-stream', () => {
  it('should return a valid event', () => {
    const event = DynamoDBStreamEventStub([DynamoDBRecordStub()]);

    expect(event).toEqual({
      Records: [
        {
          awsRegion: 'us-east-1',
          eventID: '1',
          eventName: 'INSERT',
          eventSource: 'aws:dynamodb',
          eventSourceARN: `arn:aws:dynamodb:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:table/ExampleTable/stream/2020-04-01T00:00:00.000`,
          eventVersion: '1.1',
        },
      ],
    });
  });

  it('should allow overrides', () => {
    const event = DynamoDBStreamEventStub([DynamoDBRecordStub({ eventName: 'MODIFY' })]);

    expect(event).toEqual({
      Records: [
        {
          awsRegion: 'us-east-1',
          eventID: '1',
          eventName: 'MODIFY',
          eventSource: 'aws:dynamodb',
          eventSourceARN: `arn:aws:dynamodb:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:table/ExampleTable/stream/2020-04-01T00:00:00.000`,
          eventVersion: '1.1',
        },
      ],
    });
  });
});
