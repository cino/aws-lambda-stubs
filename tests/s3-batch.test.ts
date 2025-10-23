import { describe, expect, it } from 'vitest';
import { S3BatchEventStub } from '../src';

describe('#s3', () => {
  it('should return a valid event', () => {
    const event = S3BatchEventStub();

    expect(event).toEqual({
      invocationSchemaVersion: '1.0',
      invocationId: 'YXNkbGZqYWRmaiBhc2RmdW9hZHNmZGpmaGFzbGtkaGZza2RmaAo',
      job: {
        id: 'f3cc4f60-61f6-4a2b-8a21-d07600c373ce',
      },
      tasks: [
        {
          taskId: 'dGFza2lkZ29lc2hlcmUK',
          s3Key: 'customerImage1.jpg',
          s3VersionId: '1',
          s3BucketArn: 'arn:aws:s3:::amzn-s3-demo-bucket',
        },
      ],
    });
  });

  it('should allow partial overrides', () => {
    const event = S3BatchEventStub({
      invocationId: 'random-invocation-id',
    });

    expect(event).toEqual({
      invocationSchemaVersion: '1.0',
      invocationId: 'random-invocation-id',
      job: {
        id: 'f3cc4f60-61f6-4a2b-8a21-d07600c373ce',
      },
      tasks: [
        {
          taskId: 'dGFza2lkZ29lc2hlcmUK',
          s3Key: 'customerImage1.jpg',
          s3VersionId: '1',
          s3BucketArn: 'arn:aws:s3:::amzn-s3-demo-bucket',
        },
      ],
    });
  });
});
