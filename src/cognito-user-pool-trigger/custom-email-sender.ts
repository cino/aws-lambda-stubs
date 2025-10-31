import type { BaseCustomEmailSenderTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge, randomIpAddress } from '../utils';

type PartialBaseCustomEmailSenderTriggerEvent<T extends string> = Merge<
  Partial<BaseCustomEmailSenderTriggerEvent<T>>,
  {
    request?: Partial<BaseCustomEmailSenderTriggerEvent<T>['request']>;
  }
>;

const BaseCustomEmailSenderTriggerEventStub = <T extends string>(
  eventType: T,
  overrides: PartialBaseCustomEmailSenderTriggerEvent<T> = {}
): BaseCustomEmailSenderTriggerEvent<T> => {
  return BaseCognitoTriggerEvent<T>(
    eventType,
    deepMerge<Partial<BaseCustomEmailSenderTriggerEvent<T>>>(
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
      overrides as Partial<BaseCustomEmailSenderTriggerEvent<T>>,
      { overwriteKeys: ['userAttributes'] }
    )
  ) as BaseCustomEmailSenderTriggerEvent<T>;
};

export const CustomEmailSenderSignUpTriggerEventStub = (
  overrides: PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_SignUp'> = {}
): BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_SignUp'> => {
  return BaseCustomEmailSenderTriggerEventStub<'CustomEmailSender_SignUp'>('CustomEmailSender_SignUp', overrides);
};

export const CustomEmailSenderResendCodeTriggerEventStub = (
  overrides: PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_ResendCode'> = {}
): BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_ResendCode'> => {
  return BaseCustomEmailSenderTriggerEventStub<'CustomEmailSender_ResendCode'>(
    'CustomEmailSender_ResendCode',
    overrides
  );
};

export const CustomEmailSenderForgotPasswordTriggerEventStub = (
  overrides: PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_ForgotPassword'> = {}
): BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_ForgotPassword'> => {
  return BaseCustomEmailSenderTriggerEventStub<'CustomEmailSender_ForgotPassword'>(
    'CustomEmailSender_ForgotPassword',
    overrides
  );
};

export const CustomEmailSenderUpdateUserAttributeTriggerEventStub = (
  overrides: PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_UpdateUserAttribute'> = {}
): BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_UpdateUserAttribute'> => {
  return BaseCustomEmailSenderTriggerEventStub<'CustomEmailSender_UpdateUserAttribute'>(
    'CustomEmailSender_UpdateUserAttribute',
    overrides
  );
};

export const CustomEmailSenderVerifyUserAttributeTriggerEventStub = (
  overrides: PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_VerifyUserAttribute'> = {}
): BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_VerifyUserAttribute'> => {
  return BaseCustomEmailSenderTriggerEventStub<'CustomEmailSender_VerifyUserAttribute'>(
    'CustomEmailSender_VerifyUserAttribute',
    overrides
  );
};

export const CustomEmailSenderAdminCreateUserTriggerEventStub = (
  overrides: PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_AdminCreateUser'> = {}
): BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_AdminCreateUser'> => {
  return BaseCustomEmailSenderTriggerEventStub<'CustomEmailSender_AdminCreateUser'>(
    'CustomEmailSender_AdminCreateUser',
    overrides
  );
};

export const CustomEmailSenderAuthenticationUserTriggerEventStub = (
  overrides: PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_Authentication'> = {}
): BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_Authentication'> => {
  return BaseCustomEmailSenderTriggerEventStub<'CustomEmailSender_Authentication'>(
    'CustomEmailSender_Authentication',
    overrides
  );
};

export const CustomEmailSenderAccountTakeOverNotificationTriggerEventStub = (
  overrides: PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_AccountTakeOver_Notification'> = {}
): BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_AccountTakeOver_Notification'> => {
  return BaseCustomEmailSenderTriggerEventStub<'CustomEmailSender_AccountTakeOver_Notification'>(
    'CustomEmailSender_AccountTakeOver_Notification',
    deepMerge<Partial<PartialBaseCustomEmailSenderTriggerEvent<'CustomEmailSender_AccountTakeOver_Notification'>>>(
      {
        request: {
          userAttributes: {
            EVENT_ID: 'evt-12345678-90ab-cdef-1234-567890abcdef',
            USER_NAME: 'testuser@example.com',
            IP_ADDRESS: randomIpAddress(),
            ACCOUNT_TAKE_OVER_ACTION: 'BLOCK',
            ONE_CLICK_LINK_VALID: 'https://example.com/validate/token123',
            ONE_CLICK_LINK_INVALID: 'https://example.com/invalid/token123',
            LOGIN_TIME: '2023-12-01T10:30:00Z',
            FEEDBACK_TOKEN: 'feedback-token-abc123xyz789',
          },
        },
      },
      overrides as Partial<BaseCustomEmailSenderTriggerEvent<'CustomEmailSender_AccountTakeOver_Notification'>>,
      { overwriteKeys: ['userAttributes'] }
    )
  );
};
