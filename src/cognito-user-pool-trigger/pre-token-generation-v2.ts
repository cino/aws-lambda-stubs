import type { BasePreTokenGenerationV2TriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID } from '../common';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialBasePreTokenGenerationV2TriggerEvent<T extends string> = Merge<
  Partial<BasePreTokenGenerationV2TriggerEvent<T>>,
  {
    request?: Merge<
      Partial<BasePreTokenGenerationV2TriggerEvent<T>['request']>,
      {
        groupConfiguration?: Partial<BasePreTokenGenerationV2TriggerEvent<T>['request']['groupConfiguration']>;
      }
    >;
    response?: Merge<
      Partial<BasePreTokenGenerationV2TriggerEvent<T>['response']>,
      {
        claimsAndScopeOverrideDetails?: Partial<
          BasePreTokenGenerationV2TriggerEvent<T>['response']['claimsAndScopeOverrideDetails']
        >;
      }
    >;
  }
>;

export const PreTokenGenerationHostedAuthV2TriggerEventStub = (
  overrides: PartialBasePreTokenGenerationV2TriggerEvent<'TokenGeneration_HostedAuth'> = {}
): BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_HostedAuth'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_HostedAuth',
    deepMerge<Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_HostedAuth'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsAndScopeOverrideDetails: {},
        },
      },
      overrides as Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_HostedAuth'>>
    )
  ) as BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_HostedAuth'>;
};

export const PreTokenGenerationAuthenticationV2TriggerEventStub = (
  overrides: PartialBasePreTokenGenerationV2TriggerEvent<'TokenGeneration_Authentication'> = {}
): BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_Authentication'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_Authentication',
    deepMerge<Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_Authentication'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsAndScopeOverrideDetails: {},
        },
      },
      overrides as Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_Authentication'>>
    )
  ) as BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_Authentication'>;
};

export const PreTokenGenerationNewPasswordChallengeV2TriggerEventStub = (
  overrides: PartialBasePreTokenGenerationV2TriggerEvent<'TokenGeneration_NewPasswordChallenge'> = {}
): BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_NewPasswordChallenge'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_NewPasswordChallenge',
    deepMerge<Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_NewPasswordChallenge'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsAndScopeOverrideDetails: {},
        },
      },
      overrides as Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_NewPasswordChallenge'>>
    )
  ) as BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_NewPasswordChallenge'>;
};

export const PreTokenGenerationAuthenticateDeviceV2TriggerEventStub = (
  overrides: PartialBasePreTokenGenerationV2TriggerEvent<'TokenGeneration_AuthenticateDevice'> = {}
): BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_AuthenticateDevice'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_AuthenticateDevice',
    deepMerge<Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_AuthenticateDevice'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsAndScopeOverrideDetails: {},
        },
      },
      overrides as Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_AuthenticateDevice'>>
    )
  ) as BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_AuthenticateDevice'>;
};

export const PreTokenGenerationRefreshTokensV2TriggerEventStub = (
  overrides: PartialBasePreTokenGenerationV2TriggerEvent<'TokenGeneration_RefreshTokens'> = {}
): BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_RefreshTokens'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_RefreshTokens',
    deepMerge<Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_RefreshTokens'>>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        },
        response: {
          claimsAndScopeOverrideDetails: {},
        },
      },
      overrides as Partial<BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_RefreshTokens'>>
    )
  ) as BasePreTokenGenerationV2TriggerEvent<'TokenGeneration_RefreshTokens'>;
};
