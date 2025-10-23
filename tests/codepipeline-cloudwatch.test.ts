import {
  codePipelineCloudWatchActionEventStub,
  codePipelineCloudWatchPipelineEventStub,
  codePipelineCloudWatchStageEventStub,
} from 'src';
import { DEFAULT_ACCOUNT_ID } from 'src/common';
import { describe, expect, it } from 'vitest';

describe('#codepipeline-cloudwatch', () => {
  describe('#action-event', () => {
    it('should return a valid action event', () => {
      const event = codePipelineCloudWatchActionEventStub();

      expect(event).toEqual({
        version: '0',
        id: '12345678-1234-1234-1234-123456789012',
        'detail-type': 'CodePipeline Action Execution State Change',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
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
        },
      });
    });

    it('should allow overrides', () => {
      const event = codePipelineCloudWatchActionEventStub({
        detail: {
          state: 'SUCCEEDED',
          action: 'OverriddenAction',
        },
      });

      expect(event).toEqual({
        version: '0',
        id: '12345678-1234-1234-1234-123456789012',
        'detail-type': 'CodePipeline Action Execution State Change',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
          pipeline: 'my-pipeline',
          version: 1,
          'execution-id': '12345678-1234-1234-1234-123456789012',
          stage: 'Source',
          action: 'OverriddenAction',
          state: 'SUCCEEDED',
          type: {
            owner: 'Custom',
            category: 'Build',
            provider: 'CodeBuild',
            version: 1,
          },
        },
      });
    });
  });

  describe('#pipeline-event', () => {
    it('should return a valid pipeline event', () => {
      const event = codePipelineCloudWatchPipelineEventStub();

      expect(event).toEqual({
        version: '0',
        id: '12345678-1234-1234-1234-123456789012',
        'detail-type': 'CodePipeline Pipeline Execution State Change',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
          pipeline: 'my-pipeline',
          version: 1,
          state: 'STARTED',
          'execution-id': '12345678-1234-1234-1234-123456789012',
        },
      });
    });

    it('should allow overrides', () => {
      const event = codePipelineCloudWatchPipelineEventStub({
        detail: {
          state: 'SUCCEEDED',
        },
      });

      expect(event).toEqual({
        version: '0',
        id: '12345678-1234-1234-1234-123456789012',
        'detail-type': 'CodePipeline Pipeline Execution State Change',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
          pipeline: 'my-pipeline',
          version: 1,
          state: 'SUCCEEDED',
          'execution-id': '12345678-1234-1234-1234-123456789012',
        },
      });
    });
  });

  describe('#stage-event', () => {
    it('should return a valid stage event', () => {
      const event = codePipelineCloudWatchStageEventStub();

      expect(event).toEqual({
        version: '0',
        id: '12345678-1234-1234-1234-123456789012',
        'detail-type': 'CodePipeline Stage Execution State Change',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
          pipeline: 'my-pipeline',
          version: 1,
          'execution-id': '12345678-1234-1234-1234-123456789012',
          stage: 'BuildStage',
          state: 'SUCCEEDED',
        },
      });
    });

    it('should allow overrides', () => {
      const event = codePipelineCloudWatchStageEventStub({
        detail: {
          state: 'FAILED',
          stage: 'OverriddenStage',
        },
      });

      expect(event).toEqual({
        version: '0',
        id: '12345678-1234-1234-1234-123456789012',
        'detail-type': 'CodePipeline Stage Execution State Change',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
          pipeline: 'my-pipeline',
          version: 1,
          'execution-id': '12345678-1234-1234-1234-123456789012',
          stage: 'OverriddenStage',
          state: 'FAILED',
        },
      });
    });
  });
});
