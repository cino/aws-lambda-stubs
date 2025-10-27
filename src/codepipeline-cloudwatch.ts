import type {
  CodePipelineCloudWatchActionEvent,
  CodePipelineCloudWatchPipelineEvent,
  CodePipelineCloudWatchStageEvent,
} from 'aws-lambda';
import type { Merge } from 'type-fest';
import { EventBridgeEventStub } from './event-bridge';
import { deepMerge } from './utils/deepmerge';

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

export const CodePipelineCloudWatchActionEventStub = (
  overrides: PartialCodePipelineCloudWatchActionEvent = {}
): CodePipelineCloudWatchActionEvent => {
  return deepMerge(
    EventBridgeEventStub<CodePipelineCloudWatchActionEvent['detail']>('CodePipeline Action Execution State Change', {
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
    overrides as Partial<CodePipelineCloudWatchActionEvent>
  ) as CodePipelineCloudWatchActionEvent;
};

type PartialCodePipelineCloudWatchPipelineEvent = Merge<
  Partial<CodePipelineCloudWatchPipelineEvent>,
  {
    detail?: Partial<CodePipelineCloudWatchPipelineEvent['detail']>;
  }
>;

export const CodePipelineCloudWatchPipelineEventStub = (
  overrides: PartialCodePipelineCloudWatchPipelineEvent = {}
): CodePipelineCloudWatchPipelineEvent => {
  return deepMerge(
    EventBridgeEventStub<CodePipelineCloudWatchPipelineEvent['detail']>(
      'CodePipeline Pipeline Execution State Change',
      {
        pipeline: 'my-pipeline',
        version: 1,
        state: 'STARTED',
        'execution-id': '12345678-1234-1234-1234-123456789012',
      }
    ),
    overrides as Partial<CodePipelineCloudWatchPipelineEvent>
  ) as CodePipelineCloudWatchPipelineEvent;
};

type PartialCodePipelineCloudWatchStageEvent = Merge<
  Partial<CodePipelineCloudWatchStageEvent>,
  {
    detail?: Partial<CodePipelineCloudWatchStageEvent['detail']>;
  }
>;

export const CodePipelineCloudWatchStageEventStub = (
  overrides: PartialCodePipelineCloudWatchStageEvent = {}
): CodePipelineCloudWatchStageEvent => {
  return deepMerge(
    EventBridgeEventStub<CodePipelineCloudWatchStageEvent['detail']>('CodePipeline Stage Execution State Change', {
      pipeline: 'my-pipeline',
      version: 1,
      'execution-id': '12345678-1234-1234-1234-123456789012',
      stage: 'BuildStage',
      state: 'SUCCEEDED',
    }),
    overrides as Partial<CodePipelineCloudWatchStageEvent>
  ) as CodePipelineCloudWatchStageEvent;
};
