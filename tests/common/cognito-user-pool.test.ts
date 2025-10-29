import { describe, expect, it } from 'vitest';
import { BaseCognitoTriggerEvent } from '../../src/common/cognito-user-pool';

describe('#cognito-user-pool', () => {
  it('should return the base event', () => {
    const event = BaseCognitoTriggerEvent('random');

    expect(event).toEqual({
      version: '1',
      region: 'us-east-1',
      userPoolId: 'us-east-1_Example',
      triggerSource: 'random',
      userName: 'example-user',
      callerContext: {
        awsSdkVersion: 'aws-sdk-unknown-version',
        clientId: 'example-client-id',
      },
      request: {},
      response: {},
    });
  });

  it('should allow overrides', () => {
    const event = BaseCognitoTriggerEvent('custom-trigger', {
      userName: 'custom-user',
      region: 'us-west-2',
    });

    expect(event).toEqual({
      version: '1',
      region: 'us-west-2',
      userPoolId: 'us-west-2_Example',
      triggerSource: 'custom-trigger',
      userName: 'custom-user',
      callerContext: {
        awsSdkVersion: 'aws-sdk-unknown-version',
        clientId: 'example-client-id',
      },
      request: {},
      response: {},
    });
  });
});
