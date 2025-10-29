import type { VerifyAuthChallengeResponseTriggerEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { BaseCognitoTriggerEvent } from '../common/cognito-user-pool';
import { deepMerge } from '../utils';

type PartialVerifyAuthChallengeResponseTriggerEvent = Merge<
  Partial<VerifyAuthChallengeResponseTriggerEvent>,
  {
    request?: Partial<VerifyAuthChallengeResponseTriggerEvent['request']>;
    response?: Partial<VerifyAuthChallengeResponseTriggerEvent['response']>;
  }
>;
export const VerifyAuthChallengeResponseTriggerEventStub = (
  overrides: PartialVerifyAuthChallengeResponseTriggerEvent = {}
): VerifyAuthChallengeResponseTriggerEvent => {
  return BaseCognitoTriggerEvent(
    'VerifyAuthChallengeResponse_Authentication',
    deepMerge<Partial<VerifyAuthChallengeResponseTriggerEvent>>(
      {
        request: {
          userAttributes: {
            email: 'example@example.com',
            phone_number: '+1234567890',
          },
          privateChallengeParameters: {
            answer: 'blue',
          },
          challengeAnswer: 'blue',
        },
        response: {
          answerCorrect: true,
        },
      },
      overrides as Partial<VerifyAuthChallengeResponseTriggerEvent>
    )
  ) as VerifyAuthChallengeResponseTriggerEvent;
};
