import type { CreateAuthChallengeTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialCreateAuthChallengeTriggerEvent = Merge<
  Partial<CreateAuthChallengeTriggerEvent>,
  {
    request?: Partial<CreateAuthChallengeTriggerEvent['request']>
    response?: Partial<CreateAuthChallengeTriggerEvent['response']>
  }
>;
export const CreateAuthChallengeTriggerEventStub = (
  overrides: PartialCreateAuthChallengeTriggerEvent = {}
): CreateAuthChallengeTriggerEvent => {
  return BaseCognitoTriggerEvent(
    'CreateAuthChallenge_Authentication',
    deepMerge<Partial<CreateAuthChallengeTriggerEvent>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          challengeName: 'CUSTOM_CHALLENGE',
          session: [
            {
              challengeName: 'CUSTOM_CHALLENGE',
              challengeResult: true,
            },
          ],
        },
        response: {
          publicChallengeParameters: {
            question: 'What is your favorite color?',
          },
          privateChallengeParameters: {
            answer: 'blue',
          },
          challengeMetadata: 'metadata2',
        },
      },
      overrides as Partial<CreateAuthChallengeTriggerEvent>
    )
  ) as CreateAuthChallengeTriggerEvent;
};
