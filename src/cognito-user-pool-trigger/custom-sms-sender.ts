import type { BaseCustomSMSSenderTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialBaseCustomSMSSenderTriggerEvent<T extends string> = Merge<
  Partial<BaseCustomSMSSenderTriggerEvent<T>>,
  {
    request?: Partial<BaseCustomSMSSenderTriggerEvent<T>['request']>;
  }
>;

const BaseCustomSMSSenderTriggerEventStub = <T extends string>(
  eventType: T,
  overrides: PartialBaseCustomSMSSenderTriggerEvent<T> = {}
): BaseCustomSMSSenderTriggerEvent<T> => {
  return BaseCognitoTriggerEvent<T>(
    eventType,
    deepMerge<Partial<BaseCustomSMSSenderTriggerEvent<T>>>(
      {
        request: {
          type: 'Default',
          code: '123456',
          userAttributes: {
            email: 'user@example.com',
            phone_number: '+1234567890',
          },
        },
      },
      overrides as Partial<BaseCustomSMSSenderTriggerEvent<T>>
    )
  ) as BaseCustomSMSSenderTriggerEvent<T>;
};

export const CustomSMSSenderSignUpTriggerEventStub = (
  overrides: PartialBaseCustomSMSSenderTriggerEvent<'CustomSMSSender_SignUp'> = {}
): BaseCustomSMSSenderTriggerEvent<'CustomSMSSender_SignUp'> => {
  return BaseCustomSMSSenderTriggerEventStub<'CustomSMSSender_SignUp'>('CustomSMSSender_SignUp', overrides);
};

export const CustomSMSSenderResendCodeTriggerEventStub = (
  overrides: PartialBaseCustomSMSSenderTriggerEvent<'CustomSMSSender_ResendCode'> = {}
): BaseCustomSMSSenderTriggerEvent<'CustomSMSSender_ResendCode'> => {
  return BaseCustomSMSSenderTriggerEventStub<'CustomSMSSender_ResendCode'>('CustomSMSSender_ResendCode', overrides);
};

export const CustomSMSSenderForgotPasswordTriggerEventStub = (
  overrides: PartialBaseCustomSMSSenderTriggerEvent<'CustomSMSSender_ForgotPassword'> = {}
): BaseCustomSMSSenderTriggerEvent<'CustomSMSSender_ForgotPassword'> => {
  return BaseCustomSMSSenderTriggerEventStub<'CustomSMSSender_ForgotPassword'>(
    'CustomSMSSender_ForgotPassword',
    overrides
  );
};

export const CustomSMSSenderUpdateUserAttributeTriggerEventStub = (
  overrides: PartialBaseCustomSMSSenderTriggerEvent<'CustomSMSSender_UpdateUserAttribute'> = {}
): BaseCustomSMSSenderTriggerEvent<'CustomSMSSender_UpdateUserAttribute'> => {
  return BaseCustomSMSSenderTriggerEventStub<'CustomSMSSender_UpdateUserAttribute'>(
    'CustomSMSSender_UpdateUserAttribute',
    overrides
  );
};

export const CustomSMSSenderVerifyUserAttributeTriggerEventStub = (
  overrides: PartialBaseCustomSMSSenderTriggerEvent<'CustomSMSSender_VerifyUserAttribute'> = {}
): BaseCustomSMSSenderTriggerEvent<'CustomSMSSender_VerifyUserAttribute'> => {
  return BaseCustomSMSSenderTriggerEventStub<'CustomSMSSender_VerifyUserAttribute'>(
    'CustomSMSSender_VerifyUserAttribute',
    overrides
  );
};

export const CustomSMSSenderAdminCreateUserTriggerEventStub = (
  overrides: PartialBaseCustomSMSSenderTriggerEvent<'CustomSMSSender_AdminCreateUser'> = {}
): BaseCustomSMSSenderTriggerEvent<'CustomSMSSender_AdminCreateUser'> => {
  return BaseCustomSMSSenderTriggerEventStub<'CustomSMSSender_AdminCreateUser'>(
    'CustomSMSSender_AdminCreateUser',
    overrides
  );
};

export const CustomSMSSenderAuthenticationUserTriggerEventStub = (
  overrides: PartialBaseCustomSMSSenderTriggerEvent<'CustomSMSSender_AuthenticationUser'> = {}
): BaseCustomSMSSenderTriggerEvent<'CustomSMSSender_AuthenticationUser'> => {
  return BaseCustomSMSSenderTriggerEventStub<'CustomSMSSender_AuthenticationUser'>(
    'CustomSMSSender_AuthenticationUser',
    overrides
  );
};
