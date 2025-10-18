import type { CodeCommitTrigger, CodeCommitTriggerEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

export const codeCommitTriggerStub = (overrides: Partial<CodeCommitTrigger> = {}): CodeCommitTrigger => {
  return {
    awsRegion: DEFAULT_REGION,
    codecommit: {
      references: [
        {
          commit: '819d7a8d21117320a459afdc89720b1e5f378dba',
          created: true,
          ref: 'refs/tags/test-tag',
        },
      ],
    },
    customData: '',
    eventId: '921a2dad-07e5-4ec3-be8a-e5e6333639a4',
    eventName: 'ReferenceChanges',
    eventPartNumber: 1,
    eventSource: 'aws:codecommit',
    eventSourceARN: `arn:aws:codecommit:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:TestRepo`,
    eventTime: '2023-03-06T12:39:06.494+0000',
    eventTotalParts: 1,
    eventTriggerConfigId: 'baa59553-44f2-4939-9f57-f1b1b2f6d031',
    eventTriggerName: 'my-trigger',
    eventVersion: '1.0',
    userIdentityARN: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/john@doe.com`,

    ...overrides,
  };
};

export const codeCommitTriggerEventStub = (records: CodeCommitTrigger[]): CodeCommitTriggerEvent => {
  return {
    Records: records,
  };
};
