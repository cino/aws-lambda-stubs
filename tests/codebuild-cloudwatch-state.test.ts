import { describe, expect, it } from 'vitest';
import {
  CodeBuildCloudWatchStateEventStub,
  CodeBuildStateEventDetailFailedStub,
  CodeBuildStateEventDetailInProgressStub,
  CodeBuildStateEventDetailStoppedStub,
  CodeBuildStateEventDetailSucceededStub,
  DEFAULT_ACCOUNT_ID,
} from '../src';

describe('#codebuild-cloudwatch-state', () => {
  describe('#in-progress', () => {
    it('should return a valid event', () => {
      const event = CodeBuildCloudWatchStateEventStub(CodeBuildStateEventDetailInProgressStub());

      expect(event).toEqual({
        version: '0',
        id: expect.any(String),
        'detail-type': 'CodeBuild Build State Change',
        source: 'aws.codebuild',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
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
            'build-start-time': expect.any(String), // TODO Make Matcher for Sep 1, 2017 4:12:29 PM
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
        },
      });
    });

    it('should allow overrides', () => {
      const event = CodeBuildCloudWatchStateEventStub(
        CodeBuildStateEventDetailInProgressStub({
          'additional-information': {
            cache: {
              type: 'S3',
            },
          },
        })
      );

      expect(event.detail['additional-information']?.cache?.type).toBe('S3');
    });
  });

  describe('#succeeded', () => {
    it('should return a valid event', () => {
      const event = CodeBuildCloudWatchStateEventStub(CodeBuildStateEventDetailSucceededStub());

      expect(event).toEqual({
        version: '0',
        id: expect.any(String),
        'detail-type': 'CodeBuild Build State Change',
        source: 'aws.codebuild',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
          'build-status': 'SUCCEEDED',
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
            'build-start-time': expect.any(String), // TODO Make Matcher for Sep 1, 2017 4:12:29 PM
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
        },
      });
    });

    it('should allow overrides', () => {
      const event = CodeBuildCloudWatchStateEventStub(
        CodeBuildStateEventDetailSucceededStub({
          'additional-information': {
            cache: {
              type: 'S3',
            },
          },
        })
      );

      expect(event.detail['additional-information']?.cache?.type).toBe('S3');
    });
  });

  describe('#failed', () => {
    it('should return a valid event', () => {
      const event = CodeBuildCloudWatchStateEventStub(CodeBuildStateEventDetailFailedStub());

      expect(event).toEqual({
        version: '0',
        id: expect.any(String),
        'detail-type': 'CodeBuild Build State Change',
        source: 'aws.codebuild',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
          'build-status': 'FAILED',
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
            'build-start-time': expect.any(String), // TODO Make Matcher for Sep 1, 2017 4:12:29 PM
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
        },
      });
    });

    it('should allow overrides', () => {
      const event = CodeBuildCloudWatchStateEventStub(
        CodeBuildStateEventDetailFailedStub({
          'additional-information': {
            cache: {
              type: 'S3',
            },
          },
        })
      );

      expect(event.detail['additional-information']?.cache?.type).toBe('S3');
    });
  });

  describe('#stopped', () => {
    it('should return a valid event', () => {
      const event = CodeBuildCloudWatchStateEventStub(CodeBuildStateEventDetailStoppedStub());

      expect(event).toEqual({
        version: '0',
        id: expect.any(String),
        'detail-type': 'CodeBuild Build State Change',
        source: 'aws.codebuild',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
        resources: [],
        detail: {
          'build-status': 'STOPPED',
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
            'build-start-time': expect.any(String), // TODO Make Matcher for Sep 1, 2017 4:12:29 PM
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
        },
      });
    });
  });
});
