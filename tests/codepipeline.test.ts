import { codePipelineEventStub } from 'src';
import { DEFAULT_ACCOUNT_ID } from 'src/common';
import { describe, expect, it } from 'vitest';

describe('#codepipeline', () => {
  it('should return a valid event', () => {
    const event = codePipelineEventStub();

    expect(event).toEqual({
      'CodePipeline.job': {
        id: 'unique-job-id',
        accountId: DEFAULT_ACCOUNT_ID,
        data: {
          actionConfiguration: {
            configuration: {
              FunctionName: 'my-lambda-function',
              UserParameters: 'some-user-parameters',
            },
          },
          inputArtifacts: [
            {
              name: 'InputArtifactName',
              revision: 'artifact-revision-id',
              location: {
                type: 'S3',
                s3Location: {
                  bucketName: 'input-artifact-bucket',
                  objectKey: 'input/artifact/key.zip',
                },
              },
            },
          ],
          outputArtifacts: [
            {
              name: 'OutputArtifactName',
              revision: 'artifact-revision-id',
              location: {
                type: 'S3',
                s3Location: {
                  bucketName: 'output-artifact-bucket',
                  objectKey: 'output/artifact/key.zip',
                },
              },
            },
          ],
          artifactCredentials: {
            accessKeyId: 'artifact-access-key-id',
            secretAccessKey: 'artifact-secret-access-key',
            sessionToken: 'artifact-session-token',
          },
        },
      },
    });
  });

  it('should allow overrides', () => {
    const event = codePipelineEventStub({
      'CodePipeline.job': {
        data: {
          actionConfiguration: {
            configuration: {
              FunctionName: 'overridden-lambda-function',
              UserParameters: 'overridden-user-parameters',
            },
          },
        },
      },
    });

    expect(event).toEqual({
      'CodePipeline.job': {
        id: 'unique-job-id',
        accountId: DEFAULT_ACCOUNT_ID,
        data: {
          actionConfiguration: {
            configuration: {
              FunctionName: 'overridden-lambda-function',
              UserParameters: 'overridden-user-parameters',
            },
          },
          inputArtifacts: [
            {
              name: 'InputArtifactName',
              revision: 'artifact-revision-id',
              location: {
                type: 'S3',
                s3Location: {
                  bucketName: 'input-artifact-bucket',
                  objectKey: 'input/artifact/key.zip',
                },
              },
            },
          ],
          outputArtifacts: [
            {
              name: 'OutputArtifactName',
              revision: 'artifact-revision-id',
              location: {
                type: 'S3',
                s3Location: {
                  bucketName: 'output-artifact-bucket',
                  objectKey: 'output/artifact/key.zip',
                },
              },
            },
          ],
          artifactCredentials: {
            accessKeyId: 'artifact-access-key-id',
            secretAccessKey: 'artifact-secret-access-key',
            sessionToken: 'artifact-session-token',
          },
        },
      },
    });
  });
});
