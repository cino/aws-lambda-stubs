import type { BasePreTokenGenerationTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID } from '../common';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialBasePreTokenGenerationTriggerEvent<T extends string> = Merge<
  Partial<BasePreTokenGenerationTriggerEvent<T>>,
  {
    request?: Merge<
      Partial<BasePreTokenGenerationTriggerEvent<T>['request']>,
      {
        groupConfiguration?: Partial<BasePreTokenGenerationTriggerEvent<T>['request']['groupConfiguration']>;
      }
    >;
    response?: Merge<
      Partial<BasePreTokenGenerationTriggerEvent<T>['response']>,
      {
        claimsOverrideDetails?: Partial<BasePreTokenGenerationTriggerEvent<T>['response']['claimsOverrideDetails']>;
      }
    >;
  }
>;

export const PreTokenGenerationHostedAuthTriggerEventStub = (
  overrides: PartialBasePreTokenGenerationTriggerEvent<'TokenGeneration_HostedAuth'> = {}
): BasePreTokenGenerationTriggerEvent<'TokenGeneration_HostedAuth'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_HostedAuth',
    deepMerge<Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_HostedAuth'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsOverrideDetails: {
            claimsToAddOrOverride: {
              custom: 'customValue',
            },
            claimsToSuppress: ['email_verified'],
            groupOverrideDetails: {
              groupsToOverride: ['Admins'],
              iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_AdminRole`],
              preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredAdminRole`,
            },
          },
        },
      },
      overrides as Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_HostedAuth'>>
    )
  ) as BasePreTokenGenerationTriggerEvent<'TokenGeneration_HostedAuth'>;
};

export const PreTokenGenerationAuthenticationTriggerEventStub = (
  overrides: PartialBasePreTokenGenerationTriggerEvent<'TokenGeneration_Authentication'> = {}
): BasePreTokenGenerationTriggerEvent<'TokenGeneration_Authentication'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_Authentication',
    deepMerge<Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_Authentication'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsOverrideDetails: {
            claimsToAddOrOverride: {
              custom: 'customValue',
            },
            claimsToSuppress: ['email_verified'],
            groupOverrideDetails: {
              groupsToOverride: ['Admins'],
              iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_AdminRole`],
              preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredAdminRole`,
            },
          },
        },
      },
      overrides as Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_Authentication'>>
    )
  ) as BasePreTokenGenerationTriggerEvent<'TokenGeneration_Authentication'>;
};

export const PreTokenGenerationNewPasswordChallengeTriggerEvent = (
  overrides: PartialBasePreTokenGenerationTriggerEvent<'TokenGeneration_NewPasswordChallenge'> = {}
): BasePreTokenGenerationTriggerEvent<'TokenGeneration_NewPasswordChallenge'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_NewPasswordChallenge',
    deepMerge<Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_NewPasswordChallenge'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsOverrideDetails: {
            claimsToAddOrOverride: {
              custom: 'customValue',
            },
            claimsToSuppress: ['email_verified'],
            groupOverrideDetails: {
              groupsToOverride: ['Admins'],
              iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_AdminRole`],
              preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredAdminRole`,
            },
          },
        },
      },
      overrides as Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_NewPasswordChallenge'>>
    )
  ) as BasePreTokenGenerationTriggerEvent<'TokenGeneration_NewPasswordChallenge'>;
};

export const PreTokenGenerationAuthenticateDeviceTriggerEvent = (
  overrides: PartialBasePreTokenGenerationTriggerEvent<'TokenGeneration_AuthenticateDevice'> = {}
): BasePreTokenGenerationTriggerEvent<'TokenGeneration_AuthenticateDevice'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_AuthenticateDevice',
    deepMerge<Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_AuthenticateDevice'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsOverrideDetails: {
            claimsToAddOrOverride: {
              custom: 'customValue',
            },
            claimsToSuppress: ['email_verified'],
            groupOverrideDetails: {
              groupsToOverride: ['Admins'],
              iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_AdminRole`],
              preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredAdminRole`,
            },
          },
        },
      },
      overrides as Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_AuthenticateDevice'>>
    )
  ) as BasePreTokenGenerationTriggerEvent<'TokenGeneration_AuthenticateDevice'>;
};

export const PreTokenGenerationRefreshTokensTriggerEvent = (
  overrides: PartialBasePreTokenGenerationTriggerEvent<'TokenGeneration_RefreshTokens'> = {}
): BasePreTokenGenerationTriggerEvent<'TokenGeneration_RefreshTokens'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_RefreshTokens',
    deepMerge<Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_RefreshTokens'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsOverrideDetails: {
            claimsToAddOrOverride: {
              custom: 'customValue',
            },
            claimsToSuppress: ['email_verified'],
            groupOverrideDetails: {
              groupsToOverride: ['Admins'],
              iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_AdminRole`],
              preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredAdminRole`,
            },
          },
        },
      },
      overrides as Partial<BasePreTokenGenerationTriggerEvent<'TokenGeneration_RefreshTokens'>>
    )
  ) as BasePreTokenGenerationTriggerEvent<'TokenGeneration_RefreshTokens'>;
};
