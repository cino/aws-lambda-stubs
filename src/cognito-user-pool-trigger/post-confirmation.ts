import type { BasePostConfirmationTriggerEvent, PostConfirmationTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialBasePostConfirmationTriggerEvent<T extends string> = Merge<
  Partial<BasePostConfirmationTriggerEvent<T>>,
  {
    request?: Partial<BasePostConfirmationTriggerEvent<T>['request']>;
  }
>;

export const PostConfirmationConfirmSignUpTriggerEventStub = (
  overrides: PartialBasePostConfirmationTriggerEvent<'PostConfirmation_ConfirmSignUp'> = {}
): PostConfirmationTriggerEvent => {
  return BaseCognitoTriggerEvent(
    'PostConfirmation_ConfirmSignUp',
    deepMerge<Partial<BasePostConfirmationTriggerEvent<'PostConfirmation_ConfirmSignUp'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
        },
      },
      overrides as Partial<BasePostConfirmationTriggerEvent<'PostConfirmation_ConfirmSignUp'>>
    )
  ) as PostConfirmationTriggerEvent;
};

export const PostConfirmationConfirmForgotPasswordStub = (
  overrides: PartialBasePostConfirmationTriggerEvent<'PostConfirmation_ConfirmForgotPassword'> = {}
): PostConfirmationTriggerEvent => {
  return BaseCognitoTriggerEvent(
    'PostConfirmation_ConfirmForgotPassword',
    deepMerge<Partial<BasePostConfirmationTriggerEvent<'PostConfirmation_ConfirmForgotPassword'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
        },
      },
      overrides as Partial<BasePostConfirmationTriggerEvent<'PostConfirmation_ConfirmForgotPassword'>>
    )
  ) as PostConfirmationTriggerEvent;
};
