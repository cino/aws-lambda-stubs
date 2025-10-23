import { describe, expect, it } from 'vitest';
import { S3EventRecordStub, S3EventStub } from '../src';
import { ipRegex } from './helpers';

describe('#s3', () => {
  it('should return a valid event', () => {
    const event = S3EventStub([S3EventRecordStub()]);

    expect(event).toEqual({
      Records: [
        {
          awsRegion: 'us-east-1',
          eventName: 'ObjectCreated:Put',
          eventSource: 'aws:s3',
          eventTime: expect.any(String),
          eventVersion: '2.1',
          glacierEventData: undefined,
          userIdentity: {
            principalId: 'AIDAJ45Q7YFFAREXAMPLE',
          },
          requestParameters: {
            sourceIPAddress: expect.stringMatching(ipRegex),
          },
          responseElements: {
            'x-amz-id-2': 'EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH',
            'x-amz-request-id': 'EXAMPLE123456789',
          },
          s3: {
            bucket: {
              arn: 'arn:aws:s3:::example-bucket',
              name: 'example-bucket',
              ownerIdentity: {
                principalId: 'AIDAJ45Q7YFFAREXAMPLE',
              },
            },
            configurationId: 'testConfigRule',
            object: {
              eTag: '0123456789abcdef0123456789abcdef',
              key: 'test/key',
              sequencer: '0A1B2C3D4E5F678901',
              size: 1024,
            },
            s3SchemaVersion: '1.0',
          },
        },
      ],
    });
  });

  it('should allow partial overrides', () => {
    const event = S3EventStub([
      S3EventRecordStub({
        awsRegion: 'us-west-2',
        s3: {
          bucket: {
            ownerIdentity: {
              principalId: 'ANOTHEREXAMPLE',
            },
          },
        },
      }),
    ]);

    expect(event.Records[0].awsRegion).toBe('us-west-2');
    expect(event.Records[0].s3.bucket.ownerIdentity.principalId).toBe('ANOTHEREXAMPLE');
  });

  it('should ensure the name and arn are in sync when bucket-name is overridden', () => {
    const event = S3EventStub([
      S3EventRecordStub({
        s3: {
          bucket: {
            name: 'my-bucket-name',
          },
        },
      }),
    ]);

    expect(event.Records[0].s3.bucket.arn).toBe('arn:aws:s3:::my-bucket-name');
  });
});
