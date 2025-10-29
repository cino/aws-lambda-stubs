import type { DefineAuthChallengeTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialDefineAuthChallengeTriggerEvent = Merge<
  Partial<DefineAuthChallengeTriggerEvent>,
  {
    request?: Partial<DefineAuthChallengeTriggerEvent['request']>;
    response?: Partial<DefineAuthChallengeTriggerEvent['response']>;
  }
>;

export const DefineAuthChallengeTriggerEventStub = (
  overrides: PartialDefineAuthChallengeTriggerEvent = {}
): DefineAuthChallengeTriggerEvent => {
  return BaseCognitoTriggerEvent(
    'DefineAuthChallenge_Authentication',
    deepMerge<Partial<DefineAuthChallengeTriggerEvent>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          session: [
            {
              challengeName: 'CUSTOM_CHALLENGE',
              challengeResult: true,
            },
          ],
        },
        response: {
          challengeName: 'CUSTOM_CHALLENGE',
          failAuthentication: false,
          issueTokens: false,
        },
      },
      overrides as Partial<DefineAuthChallengeTriggerEvent>
    )
  ) as DefineAuthChallengeTriggerEvent;
};
