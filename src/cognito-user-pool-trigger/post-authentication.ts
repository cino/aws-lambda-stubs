import type { PostAuthenticationTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialPostAuthenticationTriggerEvent = Merge<
  Partial<PostAuthenticationTriggerEvent>,
  {
    request?: Partial<PostAuthenticationTriggerEvent['request']>;
    response?: Partial<PostAuthenticationTriggerEvent['response']>;
  }
>;

export const PostAuthenticationTriggerEventStub = (
  overrides: PartialPostAuthenticationTriggerEvent = {}
): PostAuthenticationTriggerEvent => {
  return BaseCognitoTriggerEvent(
    'PostAuthentication_Authentication',
    deepMerge<Partial<PostAuthenticationTriggerEvent>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          newDeviceUsed: true,
        },
      },
      overrides as Partial<PostAuthenticationTriggerEvent>
    )
  ) as PostAuthenticationTriggerEvent;
};
