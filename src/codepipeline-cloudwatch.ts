import type {
  CodePipelineCloudWatchActionEvent,
  CodePipelineCloudWatchPipelineEvent,
  CodePipelineCloudWatchStageEvent,
} from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { Merge } from 'type-fest';
import { eventBridgeEventStub } from './event-bridge';

type PartialCodePipelineCloudWatchActionEvent = Merge<
  Partial<CodePipelineCloudWatchActionEvent>,
  {
    detail?: Merge<
      Partial<CodePipelineCloudWatchActionEvent['detail']>,
      {
        type?: Partial<CodePipelineCloudWatchActionEvent['detail']['type']>;
      }
    >;
  }
>;

export const codePipelineCloudWatchActionEventStub = (
  overrides: PartialCodePipelineCloudWatchActionEvent = {}
): CodePipelineCloudWatchActionEvent => {
  return deepmerge(
    eventBridgeEventStub<CodePipelineCloudWatchActionEvent['detail']>('CodePipeline Action Execution State Change', {
      pipeline: 'my-pipeline',
      version: 1,
      'execution-id': '12345678-1234-1234-1234-123456789012',
      stage: 'Source',
      action: 'SourceAction',
      state: 'STARTED',
      type: {
        owner: 'Custom',
        category: 'Build',
        provider: 'CodeBuild',
        version: 1,
      },
    }),
    overrides
  );
};

type PartialCodePipelineCloudWatchPipelineEvent = Merge<
  Partial<CodePipelineCloudWatchPipelineEvent>,
  {
    detail?: Partial<CodePipelineCloudWatchPipelineEvent['detail']>;
  }
>;

export const codePipelineCloudWatchPipelineEventStub = (
  overrides: PartialCodePipelineCloudWatchPipelineEvent = {}
): CodePipelineCloudWatchPipelineEvent => {
  return deepmerge(
    eventBridgeEventStub<CodePipelineCloudWatchPipelineEvent['detail']>(
      'CodePipeline Pipeline Execution State Change',
      {
        pipeline: 'my-pipeline',
        version: 1,
        state: 'STARTED',
        'execution-id': '12345678-1234-1234-1234-123456789012',
      }
    ),
    overrides
  );
};

type PartialCodePipelineCloudWatchStageEvent = Merge<
  Partial<CodePipelineCloudWatchStageEvent>,
  {
    detail?: Partial<CodePipelineCloudWatchStageEvent['detail']>;
  }
>;

export const codePipelineCloudWatchStageEventStub = (
  overrides: PartialCodePipelineCloudWatchStageEvent = {}
): CodePipelineCloudWatchStageEvent => {
  return deepmerge(
    eventBridgeEventStub<CodePipelineCloudWatchStageEvent['detail']>('CodePipeline Stage Execution State Change', {
      pipeline: 'my-pipeline',
      version: 1,
      'execution-id': '12345678-1234-1234-1234-123456789012',
      stage: 'BuildStage',
      state: 'SUCCEEDED',
    }),
    overrides
  );
};
