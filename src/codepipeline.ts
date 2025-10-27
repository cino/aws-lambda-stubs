import type { CodePipelineEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID } from './common';
import { deepMerge } from './utils/deepmerge';

type PartialCodePipelineEvent = {
  'CodePipeline.job'?: Merge<
    Partial<CodePipelineEvent['CodePipeline.job']>,
    {
      data: Partial<CodePipelineEvent['CodePipeline.job']['data']>;
    }
  >;
};

export const CodePipelineEventStub = (overrides: PartialCodePipelineEvent = {}): CodePipelineEvent => {
  return deepMerge(
    {
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
    },
    overrides as Partial<CodePipelineEvent>
  ) as CodePipelineEvent;
};
