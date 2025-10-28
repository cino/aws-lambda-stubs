import type { CodeBuildCloudWatchStateEvent, CodeBuildStateEventDetail } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID } from './common';
import { EventBridgeEventStub } from './event-bridge';
import { deepMerge } from './utils';

const codeBuildStateEventDetail: CodeBuildStateEventDetail = {
  'build-status': 'IN_PROGRESS',
  'project-name': 'example-project',
  'build-id': 'example-build-id',
  'current-phase': 'BUILD',
  'current-phase-context': 'Some context',
  version: '1.0',
  'additional-information': {
    cache: {
      type: 'NO_CACHE',
    },
    'build-number': 1,
    'timeout-in-minutes': 60,
    'build-complete': false,
    initiator: 'user/example',
    'build-start-time': new Date().toISOString(),
    source: {
      buildspec: 'buildspec.yml',
      location: 'https://github.com/example/repo.git',
      type: 'GITHUB',
    },
    'source-version': 'main',
    environment: {
      image: 'aws/codebuild/standard:5.0',
      'privileged-mode': false,
      'image-pull-credentials-type': 'SERVICE_ROLE',
      type: 'LINUX_CONTAINER',
      'compute-type': 'BUILD_GENERAL1_SMALL',
      'environment-variables': [
        {
          name: 'EXAMPLE_VAR',
          value: 'example_value',
          type: 'PLAINTEXT',
        },
      ],
    },
    'project-file-system-locations': [],
    artifact: {
      location: 'arn:aws:s3:::example-bucket/artifacts/',
    },
    logs: {
      'group-name': '/aws/codebuild/example-project',
      'stream-name': 'example-build-id',
      'deep-link': `https://console.aws.amazon.com/cloudwatch/home?region=${DEFAULT_ACCOUNT_ID}#logsV2:log-groups/log-group/%252Faws%252Fcodebuild%252Fexample-project/log-events/example-build-id`,
    },
    phases: [],
    'queued-timeout-in-minutes': 480,
  },
};

type PartialCodeBuildStateEventDetail = Merge<
  Partial<CodeBuildStateEventDetail>,
  {
    'additional-information'?: Partial<CodeBuildStateEventDetail['additional-information']>;
  }
>;

type CodeBuildStateEventDetailInProgress = Merge<
  PartialCodeBuildStateEventDetail,
  {
    'build-status': 'IN_PROGRESS';
  }
>;
export const CodeBuildStateEventDetailInProgressStub = (
  overrides: Partial<CodeBuildStateEventDetailInProgress> = {}
): CodeBuildStateEventDetailInProgress => {
  return deepMerge(codeBuildStateEventDetail, {
    'build-status': 'IN_PROGRESS',
    ...(overrides as Partial<CodeBuildStateEventDetail>),
  }) as CodeBuildStateEventDetailInProgress;
};

type CodeBuildStateEventDetailSucceeded = Merge<
  PartialCodeBuildStateEventDetail,
  {
    'build-status': 'SUCCEEDED';
  }
>;
export const CodeBuildStateEventDetailSucceededStub = (
  overrides: Partial<CodeBuildStateEventDetailSucceeded> = {}
): CodeBuildStateEventDetailSucceeded => {
  return deepMerge(codeBuildStateEventDetail, {
    'build-status': 'SUCCEEDED',
    ...(overrides as Partial<CodeBuildStateEventDetail>),
  }) as CodeBuildStateEventDetailSucceeded;
};

type CodeBuildStateEventDetailFailed = Merge<
  PartialCodeBuildStateEventDetail,
  {
    'build-status': 'FAILED';
  }
>;
export const CodeBuildStateEventDetailFailedStub = (
  overrides: Partial<CodeBuildStateEventDetailFailed> = {}
): CodeBuildStateEventDetailFailed => {
  return deepMerge(codeBuildStateEventDetail, {
    'build-status': 'FAILED',
    ...(overrides as Partial<CodeBuildStateEventDetail>),
  }) as CodeBuildStateEventDetailFailed;
};

type CodeBuildStateEventDetailStopped = Merge<
  PartialCodeBuildStateEventDetail,
  {
    'build-status': 'STOPPED';
  }
>;
export const CodeBuildStateEventDetailStoppedStub = (
  overrides: Partial<CodeBuildStateEventDetailStopped> = {}
): CodeBuildStateEventDetailStopped => {
  return deepMerge(codeBuildStateEventDetail, {
    'build-status': 'STOPPED',
    ...(overrides as Partial<CodeBuildStateEventDetail>),
  }) as CodeBuildStateEventDetailStopped;
};

type CodeBuildStateEventDetails =
  | CodeBuildStateEventDetailInProgress
  | CodeBuildStateEventDetailSucceeded
  | CodeBuildStateEventDetailFailed
  | CodeBuildStateEventDetailStopped;

export const CodeBuildCloudWatchStateEventStub = (
  detail: CodeBuildStateEventDetails,
  overrides: Partial<CodeBuildCloudWatchStateEvent> = {}
): CodeBuildCloudWatchStateEvent => {
  return EventBridgeEventStub<CodeBuildStateEventDetail>(
    'CodeBuild Build State Change',
    deepMerge(detail, overrides) as CodeBuildStateEventDetail,
    {
      source: 'aws.codebuild',
    }
  ) as CodeBuildCloudWatchStateEvent;
};
