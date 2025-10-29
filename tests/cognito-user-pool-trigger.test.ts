import { describe, expect, it } from 'vitest';
import {
  CreateAuthChallengeTriggerEventStub,
  DefineAuthChallengeTriggerEventStub,
  PostAuthenticationTriggerEventStub,
  PostConfirmationConfirmForgotPasswordStub,
  PostConfirmationConfirmSignUpTriggerEventStub,
  PreAuthenticationTriggerEventStub,
  VerifyAuthChallengeResponseTriggerEventStub,
} from '../src';

describe('#cognito-user-pool-trigger', () => {
  describe('#create-auth-challenge-trigger-event-stub', () => {
    it('should return a valid event', () => {
      const event = CreateAuthChallengeTriggerEventStub();

      expect(event.request).toEqual({
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
      });
      expect(event.response).toEqual({
        publicChallengeParameters: {
          question: 'What is your favorite color?',
        },
        privateChallengeParameters: {
          answer: 'blue',
        },
        challengeMetadata: 'metadata2',
      });
    });

    it('should allow overrides', () => {
      const event = CreateAuthChallengeTriggerEventStub({
        request: {
          challengeName: 'ANOTHER_CHALLENGE',
        },
        response: {
          challengeMetadata: 'custom-metadata',
        },
      });

      expect(event.request.challengeName).toBe('ANOTHER_CHALLENGE');
      expect(event.response.challengeMetadata).toBe('custom-metadata');
    });
  });

  describe('#define-auth-challenge-trigger-event-stub', () => {
    it('should return a valid event', () => {
      const event = DefineAuthChallengeTriggerEventStub();

      expect(event.request).toEqual({
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
      });

      expect(event.response).toEqual({
        challengeName: 'CUSTOM_CHALLENGE',
        failAuthentication: false,
        issueTokens: false,
      });
    });

    it('should allow overrides', () => {
      const event = DefineAuthChallengeTriggerEventStub({
        request: {
          userNotFound: true,
        },
        response: {
          failAuthentication: true,
        },
      });

      expect(event.request.userNotFound).toBe(true);
      expect(event.response.failAuthentication).toBe(true);
    });
  });

  describe('#post-authentication-trigger-event-stub', () => {
    it('should return a valid event', () => {
      const event = PostAuthenticationTriggerEventStub();

      expect(event.request).toEqual({
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+1234567890',
        },
        newDeviceUsed: true,
      });
    });

    it('should allow overrides', () => {
      const event = PostAuthenticationTriggerEventStub({
        request: {
          newDeviceUsed: false,
        },
      });

      expect(event.request.newDeviceUsed).toBe(false);
    });
  });

  describe('#post-confirmation-confirm-sign-up-stub', () => {
    it('should return a valid event', () => {
      const event = PostConfirmationConfirmSignUpTriggerEventStub();

      expect(event.request).toEqual({
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+1234567890',
        },
      });
    });

    it('should allow overrides', () => {
      const event = PostAuthenticationTriggerEventStub({
        request: {
          userAttributes: {
            email: 'override@example.com',
            phone_number: '+1987654321',
          },
        },
      });

      expect(event.request.userAttributes).toEqual({
        email: 'override@example.com',
        phone_number: '+1987654321',
      });
    });
  });

  describe('#post-confirmation-confirm-forgot-password-stub', () => {
    it('should return a valid event', () => {
      const event = PostConfirmationConfirmForgotPasswordStub();

      expect(event.request).toEqual({
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+1234567890',
        },
      });
    });

    it('should allow overrides', () => {
      const event = PostConfirmationConfirmForgotPasswordStub({
        request: {
          userAttributes: {
            email: 'override@example.com',
            phone_number: '+1987654321',
          },
        },
      });

      expect(event.request.userAttributes).toEqual({
        email: 'override@example.com',
        phone_number: '+1987654321',
      });
    });
  });

  describe('#pre-authentication-trigger-event-stub', () => {
    it('should return a valid event', () => {
      const event = PreAuthenticationTriggerEventStub();

      expect(event.request).toEqual({
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+1234567890',
        },
        userNotFound: false,
      });
    });

    it('should allow overrides', () => {
      const event = PreAuthenticationTriggerEventStub({
        request: {
          userNotFound: true,
        },
      });

      expect(event.request.userNotFound).toBe(true);
    });
  });

  describe('#verify-auth-challenge-response-trigger-event-stub', () => {
    it('should return a valid event', () => {
      const event = VerifyAuthChallengeResponseTriggerEventStub();

      expect(event.request).toEqual({
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+1234567890',
        },
        privateChallengeParameters: {
          answer: 'blue',
        },
        challengeAnswer: 'blue',
      });

      expect(event.response).toEqual({
        answerCorrect: true,
      });
    });

    it('should allow overrides', () => {
      const event = VerifyAuthChallengeResponseTriggerEventStub({
        request: {
          challengeAnswer: 'red',
        },
        response: {
          answerCorrect: false,
        },
      });

      expect(event.request.challengeAnswer).toBe('red');
      expect(event.response.answerCorrect).toBe(false);
    });
  });
});
