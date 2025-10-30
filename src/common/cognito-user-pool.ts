import type { BaseTriggerEvent } from 'aws-lambda/trigger/cognito-user-pool-trigger/_common';
import { deepMerge } from '../utils';
import { DEFAULT_REGION } from './consts';

export const BaseCognitoTriggerEvent = <T extends string>(
  triggerSource: T,
  overrides: Partial<BaseTriggerEvent<T>> = {}
): BaseTriggerEvent<T> => {
  const region = overrides.region || DEFAULT_REGION;

  return deepMerge(
    {
      version: '1',
      region,
      userPoolId: `${region}_Example`,
      triggerSource,
      userName: 'example-user',
      callerContext: {
        awsSdkVersion: 'aws-sdk-unknown-version',
        clientId: 'example-client-id',
      },
      request: {},
      response: {},
    },
    overrides
  );
};
