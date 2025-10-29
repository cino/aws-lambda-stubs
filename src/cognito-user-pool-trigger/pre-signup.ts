import type { BasePreSignUpTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialBasePreSignUpTriggerEvent<T extends string> = Merge<
  Partial<BasePreSignUpTriggerEvent<T>>,
  {
    request?: Partial<BasePreSignUpTriggerEvent<T>['request']>;
    response?: Partial<BasePreSignUpTriggerEvent<T>['response']>;
  }
>;

export const PreSignUpEmailTriggerEventStub = (
  overrides: PartialBasePreSignUpTriggerEvent<'PreSignUp_SignUp'> = {}
): BasePreSignUpTriggerEvent<'PreSignUp_SignUp'> => {
  return BaseCognitoTriggerEvent(
    'PreSignUp_SignUp',
    deepMerge<Partial<BasePreSignUpTriggerEvent<'PreSignUp_SignUp'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
        },
        response: {
          autoConfirmUser: false,
          autoVerifyEmail: false,
          autoVerifyPhone: false,
        },
      },
      overrides as Partial<BasePreSignUpTriggerEvent<'PreSignUp_SignUp'>>
    )
  ) as BasePreSignUpTriggerEvent<'PreSignUp_SignUp'>;
};

export const PreSignUpExternalProviderTriggerEventStub = (
  overrides: PartialBasePreSignUpTriggerEvent<'PreSignUp_ExternalProvider'> = {}
): BasePreSignUpTriggerEvent<'PreSignUp_ExternalProvider'> => {
  return BaseCognitoTriggerEvent(
    'PreSignUp_ExternalProvider',
    deepMerge<Partial<BasePreSignUpTriggerEvent<'PreSignUp_ExternalProvider'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
        },
        response: {
          autoConfirmUser: false,
          autoVerifyEmail: true,
          autoVerifyPhone: false,
        },
      },
      overrides as Partial<BasePreSignUpTriggerEvent<'PreSignUp_ExternalProvider'>>
    )
  ) as BasePreSignUpTriggerEvent<'PreSignUp_ExternalProvider'>;
};

export const PreSignUpAdminCreateUserTriggerEventStub = (
  overrides: PartialBasePreSignUpTriggerEvent<'PreSignUp_AdminCreateUser'> = {}
): BasePreSignUpTriggerEvent<'PreSignUp_AdminCreateUser'> => {
  return BaseCognitoTriggerEvent(
    'PreSignUp_AdminCreateUser',
    deepMerge<Partial<BasePreSignUpTriggerEvent<'PreSignUp_AdminCreateUser'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
        },
        response: {
          autoConfirmUser: true,
          autoVerifyEmail: true,
          autoVerifyPhone: true,
        },
      },
      overrides as Partial<BasePreSignUpTriggerEvent<'PreSignUp_AdminCreateUser'>>
    )
  ) as BasePreSignUpTriggerEvent<'PreSignUp_AdminCreateUser'>;
};
