import type { BaseCustomMessageTriggerEvent, CustomMessageAdminCreateUserTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialBaseCustomMessageAdminCreateTriggerEvent<T extends string> = Merge<
  Partial<BaseCustomMessageTriggerEvent<T>>,
  {
    request?: Partial<BaseCustomMessageTriggerEvent<T>['request']>;
    response?: Partial<BaseCustomMessageTriggerEvent<T>['response']>;
  }
>;

// usernameParameter and clientMetadata are only not-null in AdminCreateUser events
type PartialBaseCustomMessageTriggerEvent<T extends string> = Merge<
  Partial<BaseCustomMessageTriggerEvent<T>>,
  {
    request?: Partial<Omit<BaseCustomMessageTriggerEvent<T>['request'], 'userNameParameter' | 'clientMetaData'>>;
    response?: Partial<BaseCustomMessageTriggerEvent<T>['response']>;
  }
>;

export const CustomMessageAdminCreateUserTriggerEventStub = (
  overrides: PartialBaseCustomMessageAdminCreateTriggerEvent<'CustomMessage_AdminCreateUser'> = {}
): CustomMessageAdminCreateUserTriggerEvent => {
  return BaseCognitoTriggerEvent<'CustomMessage_AdminCreateUser'>(
    'CustomMessage_AdminCreateUser',
    deepMerge<Partial<BaseCustomMessageTriggerEvent<'CustomMessage_AdminCreateUser'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: 'newuser',
        },
        response: {
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        },
      },
      overrides as Partial<BaseCustomMessageTriggerEvent<'CustomMessage_AdminCreateUser'>>
    )
  ) as BaseCustomMessageTriggerEvent<'CustomMessage_AdminCreateUser'>;
};

export const CustomMessageAuthenticationTriggerEventStub = (
  overrides: PartialBaseCustomMessageTriggerEvent<'CustomMessage_Authentication'> = {}
): BaseCustomMessageTriggerEvent<'CustomMessage_Authentication'> => {
  return BaseCognitoTriggerEvent(
    'CustomMessage_Authentication',
    deepMerge<Partial<BaseCustomMessageTriggerEvent<'CustomMessage_Authentication'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: null,
        },
        response: {
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        },
      },
      overrides as Partial<BaseCustomMessageTriggerEvent<'CustomMessage_Authentication'>>
    )
  ) as BaseCustomMessageTriggerEvent<'CustomMessage_Authentication'>;
};

export const CustomMessageForgotPasswordTriggerEventStub = (
  overrides: PartialBaseCustomMessageTriggerEvent<'CustomMessage_ForgotPassword'> = {}
): BaseCustomMessageTriggerEvent<'CustomMessage_ForgotPassword'> => {
  return BaseCognitoTriggerEvent(
    'CustomMessage_ForgotPassword',
    deepMerge<Partial<BaseCustomMessageTriggerEvent<'CustomMessage_ForgotPassword'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: null,
        },
        response: {
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        },
      },
      overrides as Partial<BaseCustomMessageTriggerEvent<'CustomMessage_ForgotPassword'>>
    )
  ) as BaseCustomMessageTriggerEvent<'CustomMessage_ForgotPassword'>;
};

export const CustomMessageResendCodeTriggerEventStub = (
  overrides: PartialBaseCustomMessageTriggerEvent<'CustomMessage_ResendCode'> = {}
): BaseCustomMessageTriggerEvent<'CustomMessage_ResendCode'> => {
  return BaseCognitoTriggerEvent(
    'CustomMessage_ResendCode',
    deepMerge<Partial<BaseCustomMessageTriggerEvent<'CustomMessage_ResendCode'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: null,
        },
        response: {
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        },
      },
      overrides as Partial<BaseCustomMessageTriggerEvent<'CustomMessage_ResendCode'>>
    )
  ) as BaseCustomMessageTriggerEvent<'CustomMessage_ResendCode'>;
};

export const CustomMessageSignUpTriggerEventStub = (
  overrides: PartialBaseCustomMessageTriggerEvent<'CustomMessage_SignUp'> = {}
): BaseCustomMessageTriggerEvent<'CustomMessage_SignUp'> => {
  return BaseCognitoTriggerEvent(
    'CustomMessage_SignUp',
    deepMerge<Partial<BaseCustomMessageTriggerEvent<'CustomMessage_SignUp'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: null,
        },
        response: {
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        },
      },
      overrides as Partial<BaseCustomMessageTriggerEvent<'CustomMessage_SignUp'>>
    )
  ) as BaseCustomMessageTriggerEvent<'CustomMessage_SignUp'>;
};

export const CustomMessageUpdateUserAttributeTriggerEventStub = (
  overrides: PartialBaseCustomMessageTriggerEvent<'CustomMessage_UpdateUserAttribute'> = {}
): BaseCustomMessageTriggerEvent<'CustomMessage_UpdateUserAttribute'> => {
  return BaseCognitoTriggerEvent(
    'CustomMessage_UpdateUserAttribute',
    deepMerge<Partial<BaseCustomMessageTriggerEvent<'CustomMessage_UpdateUserAttribute'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: null,
        },
        response: {
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        },
      },
      overrides as Partial<BaseCustomMessageTriggerEvent<'CustomMessage_UpdateUserAttribute'>>
    )
  ) as BaseCustomMessageTriggerEvent<'CustomMessage_UpdateUserAttribute'>;
};

export const CustomMessageVerifyUserAttributeTriggerEventStub = (
  overrides: PartialBaseCustomMessageTriggerEvent<'CustomMessage_VerifyUserAttribute'> = {}
): BaseCustomMessageTriggerEvent<'CustomMessage_VerifyUserAttribute'> => {
  return BaseCognitoTriggerEvent(
    'CustomMessage_VerifyUserAttribute',
    deepMerge<Partial<BaseCustomMessageTriggerEvent<'CustomMessage_VerifyUserAttribute'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: null,
        },
        response: {
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        },
      },
      overrides as Partial<BaseCustomMessageTriggerEvent<'CustomMessage_VerifyUserAttribute'>>
    )
  ) as BaseCustomMessageTriggerEvent<'CustomMessage_VerifyUserAttribute'>;
};
