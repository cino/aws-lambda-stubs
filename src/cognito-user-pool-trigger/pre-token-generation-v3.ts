import type { BasePreTokenGenerationV3TriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID } from '../common';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialBasePreTokenGenerationV3TriggerEvent<T extends string> = Merge<
  Partial<BasePreTokenGenerationV3TriggerEvent<T>>,
  {
    request?: Merge<
      Partial<BasePreTokenGenerationV3TriggerEvent<T>['request']>,
      {
        groupConfiguration?: Partial<BasePreTokenGenerationV3TriggerEvent<T>['request']['groupConfiguration']>;
      }
    >;
    response?: Merge<
      Partial<BasePreTokenGenerationV3TriggerEvent<T>['response']>,
      {
        claimsAndScopeOverrideDetails?: Partial<
          BasePreTokenGenerationV3TriggerEvent<T>['response']['claimsAndScopeOverrideDetails']
        >;
      }
    >;
  }
>;

export const PreTokenGenerationClientCredentialsV3TriggerEventStub = (
  overrides: PartialBasePreTokenGenerationV3TriggerEvent<'TokenGeneration_ClientCredentials'> = {}
): BasePreTokenGenerationV3TriggerEvent<'TokenGeneration_ClientCredentials'> => {
  return BaseCognitoTriggerEvent(
    'TokenGeneration_ClientCredentials',
    deepMerge<Partial<BasePreTokenGenerationV3TriggerEvent<'TokenGeneration_ClientCredentials'>>>(
      {
        version: '3',
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
      overrides as Partial<BasePreTokenGenerationV3TriggerEvent<'TokenGeneration_ClientCredentials'>>
    )
  ) as BasePreTokenGenerationV3TriggerEvent<'TokenGeneration_ClientCredentials'>;
};
