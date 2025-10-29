import type { PreAuthenticationTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialPreAuthenticationTriggerEvent = Merge<
  Partial<PreAuthenticationTriggerEvent>,
  {
    request?: Partial<PreAuthenticationTriggerEvent['request']>;
  }
>;

export const PreAuthenticationTriggerEventStub = (
  overrides: PartialPreAuthenticationTriggerEvent = {}
): PreAuthenticationTriggerEvent => {
  return BaseCognitoTriggerEvent(
    'PreAuthentication_Authentication',
    deepMerge<Partial<PreAuthenticationTriggerEvent>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          userNotFound: false,
        },
      },
      overrides as Partial<PreAuthenticationTriggerEvent>
    )
  ) as PreAuthenticationTriggerEvent;
};
