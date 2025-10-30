import type { BaseUserMigrationTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialBaseUserMigrationTriggerEvent<T extends string> = Merge<
  Partial<BaseUserMigrationTriggerEvent<T>>,
  {
    request?: Partial<BaseUserMigrationTriggerEvent<T>['request']>;
    response?: Partial<BaseUserMigrationTriggerEvent<T>['response']>;
  }
>;

export const UserMigrationAuthenticationTriggerEventStub = (
  overrides: PartialBaseUserMigrationTriggerEvent<'UserMigration_Authentication'> = {}
): BaseUserMigrationTriggerEvent<'UserMigration_Authentication'> => {
  return BaseCognitoTriggerEvent(
    'UserMigration_Authentication',
    deepMerge<Partial<BaseUserMigrationTriggerEvent<'UserMigration_Authentication'>>>(
      {
        request: {
          password: 'ExamplePassword123!',
        },
        response: {
          userAttributes: {
            email: 'example@example.com',
            given_name: 'John',
            family_name: 'Doe',
          },
          finalUserStatus: 'CONFIRMED',
          messageAction: 'SUPPRESS',
          desiredDeliveryMediums: ['EMAIL'],
        },
      },
      overrides as Partial<BaseUserMigrationTriggerEvent<'UserMigration_Authentication'>>
    )
  ) as BaseUserMigrationTriggerEvent<'UserMigration_Authentication'>;
};

export const UserMigrationForgotPasswordTriggerEventStub = (
  overrides: PartialBaseUserMigrationTriggerEvent<'UserMigration_ForgotPassword'> = {}
): BaseUserMigrationTriggerEvent<'UserMigration_ForgotPassword'> => {
  return BaseCognitoTriggerEvent(
    'UserMigration_ForgotPassword',
    deepMerge<Partial<BaseUserMigrationTriggerEvent<'UserMigration_ForgotPassword'>>>(
      {
        request: {
          password: 'NewExamplePassword123!',
        },
        response: {
          userAttributes: {
            email: 'example@example.com',
            given_name: 'John',
            family_name: 'Doe',
          },
          desiredDeliveryMediums: ['EMAIL'],
        },
      },
      overrides as Partial<BaseUserMigrationTriggerEvent<'UserMigration_ForgotPassword'>>
    )
  ) as BaseUserMigrationTriggerEvent<'UserMigration_ForgotPassword'>;
};
