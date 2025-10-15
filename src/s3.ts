import type { S3Event, S3EventRecord } from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DEFAULT_REGION, randomIpAddress } from './utils';

interface PartialS3EventRecord extends Omit<Partial<S3EventRecord>, 's3'> {
  s3?: {
    bucket?: Partial<S3EventRecord['s3']['bucket']>;
    object?: Partial<S3EventRecord['s3']['object']>;
  };
}

export const S3EventRecordStub = (overrides: PartialS3EventRecord = {}): S3EventRecord => {
  const bucketName = overrides.s3?.bucket?.name || 'example-bucket';

  return deepmerge(
    {
      eventVersion: '2.1',
      eventSource: 'aws:s3',
      awsRegion: DEFAULT_REGION,
      eventTime: new Date().toISOString(),
      eventName: 'ObjectCreated:Put',
      userIdentity: {
        principalId: 'AIDAJ45Q7YFFAREXAMPLE',
      },
      requestParameters: {
        sourceIPAddress: randomIpAddress(),
      },
      responseElements: {
        'x-amz-request-id': 'EXAMPLE123456789',
        'x-amz-id-2': 'EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH',
      },
      s3: {
        s3SchemaVersion: '1.0',
        configurationId: 'testConfigRule', // check
        bucket: {
          name: bucketName,
          ownerIdentity: {
            principalId: 'AIDAJ45Q7YFFAREXAMPLE',
          },
          arn: `arn:aws:s3:::${bucketName}`,
        },
        object: {
          key: 'test/key',
          size: 1024,
          eTag: '0123456789abcdef0123456789abcdef',
          sequencer: '0A1B2C3D4E5F678901',
        },
      },
      glacierEventData: undefined,
    },
    overrides
  ) as S3EventRecord;
};

export const S3EventStub = (records: S3EventRecord[]): S3Event => {
  return {
    Records: [...records],
  };
};
