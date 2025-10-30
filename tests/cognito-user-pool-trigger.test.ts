import { describe, expect, it } from 'vitest';
import {
  CreateAuthChallengeTriggerEventStub,
  CustomMessageAdminCreateUserTriggerEventStub,
  CustomMessageAuthenticationTriggerEventStub,
  CustomMessageForgotPasswordTriggerEventStub,
  CustomMessageResendCodeTriggerEventStub,
  CustomMessageSignUpTriggerEventStub,
  CustomMessageUpdateUserAttributeTriggerEventStub,
  CustomMessageVerifyUserAttributeTriggerEventStub,
  DEFAULT_ACCOUNT_ID,
  DefineAuthChallengeTriggerEventStub,
  PostAuthenticationTriggerEventStub,
  PostConfirmationConfirmForgotPasswordStub,
  PostConfirmationConfirmSignUpTriggerEventStub,
  PreAuthenticationTriggerEventStub,
  PreSignUpAdminCreateUserTriggerEventStub,
  PreSignUpEmailTriggerEventStub,
  PreSignUpExternalProviderTriggerEventStub,
  PreTokenGenerationAuthenticateDeviceTriggerEvent,
  PreTokenGenerationAuthenticateDeviceV2TriggerEventStub,
  PreTokenGenerationAuthenticationTriggerEventStub,
  PreTokenGenerationAuthenticationV2TriggerEventStub,
  PreTokenGenerationClientCredentialsV3TriggerEventStub,
  PreTokenGenerationHostedAuthTriggerEventStub,
  PreTokenGenerationHostedAuthV2TriggerEventStub,
  PreTokenGenerationNewPasswordChallengeTriggerEvent,
  PreTokenGenerationNewPasswordChallengeV2TriggerEventStub,
  PreTokenGenerationRefreshTokensTriggerEvent,
  PreTokenGenerationRefreshTokensV2TriggerEventStub,
  UserMigrationAuthenticationTriggerEventStub,
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

  describe('#custom-message-trigger-event-stub', () => {
    describe('#admin-create-user', () => {
      it('should return a valid event', () => {
        const event = CustomMessageAdminCreateUserTriggerEventStub();

        expect(event.request).toEqual({
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: 'newuser',
        });
        expect(event.response).toEqual({
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        });
      });

      it('should allow overrides', () => {
        const event = CustomMessageAdminCreateUserTriggerEventStub({
          request: {
            userAttributes: {
              email: 'override@example.com',
              phone_number: '+1987654321',
            },
          },
          response: {
            emailSubject: 'Overridden subject',
          },
        });

        expect(event.request).toEqual({
          userAttributes: {
            email: 'override@example.com',
            phone_number: '+1987654321',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: 'newuser',
        });
        expect(event.response).toEqual({
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Overridden subject',
        });
      });
    });

    describe.each([
      { function: CustomMessageAuthenticationTriggerEventStub },
      { function: CustomMessageForgotPasswordTriggerEventStub },
      { function: CustomMessageResendCodeTriggerEventStub },
      { function: CustomMessageSignUpTriggerEventStub },
      { function: CustomMessageUpdateUserAttributeTriggerEventStub },
      { function: CustomMessageVerifyUserAttributeTriggerEventStub },
    ])('$function.name', ({ function: triggerStub }) => {
      it('should return a valid event', () => {
        const event = triggerStub();

        expect(event.request).toEqual({
          userAttributes: {
            email: 'example@example.com',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: null,
        });
        expect(event.response).toEqual({
          smsMessage: null,
          emailMessage: 'Email message content',
          emailSubject: 'Email subject content',
        });
      });

      it('should allow overrides', () => {
        const event = triggerStub({
          request: {
            userAttributes: {
              email: 'override@example.com',
              phone_number: '+1987654321',
            },
          },
        });

        expect(event.request).toEqual({
          userAttributes: {
            email: 'override@example.com',
            phone_number: '+1987654321',
          },
          codeParameter: '{####}',
          linkParameter: 'https://example.com/verify?code={####}',
          usernameParameter: null,
        });
      });
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

  describe('#pre-sign-up-email-trigger-event-stub', () => {
    it('should return a valid event', () => {
      const event = PreSignUpEmailTriggerEventStub();

      expect(event.request).toEqual({
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+1234567890',
        },
      });
      expect(event.response).toEqual({
        autoConfirmUser: false,
        autoVerifyEmail: false,
        autoVerifyPhone: false,
      });
    });

    it('should allow overrides', () => {
      const event = PreSignUpEmailTriggerEventStub({
        response: {
          autoConfirmUser: true,
          autoVerifyEmail: true,
        },
      });

      expect(event.response.autoConfirmUser).toBe(true);
      expect(event.response.autoVerifyEmail).toBe(true);
      expect(event.response.autoVerifyPhone).toBe(false);
    });
  });

  describe('#pre-sign-up-external-provider-trigger-event-stub', () => {
    it('should return a valid event', () => {
      const event = PreSignUpExternalProviderTriggerEventStub();

      expect(event.request).toEqual({
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+1234567890',
        },
      });
      expect(event.response).toEqual({
        autoConfirmUser: false,
        autoVerifyEmail: true,
        autoVerifyPhone: false,
      });
    });

    it('should allow overrides', () => {
      const event = PreSignUpExternalProviderTriggerEventStub({
        response: {
          autoConfirmUser: true,
          autoVerifyEmail: true,
        },
      });

      expect(event.response.autoConfirmUser).toBe(true);
      expect(event.response.autoVerifyEmail).toBe(true);
    });
  });

  describe('#pre-sign-up-admin-create-user-trigger-event-stub', () => {
    it('should return a valid event', () => {
      const event = PreSignUpAdminCreateUserTriggerEventStub();

      expect(event.request).toEqual({
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+1234567890',
        },
      });
      expect(event.response).toEqual({
        autoConfirmUser: true,
        autoVerifyEmail: true,
        autoVerifyPhone: true,
      });
    });

    it('should allow overrides', () => {
      const event = PreSignUpAdminCreateUserTriggerEventStub({
        response: {
          autoConfirmUser: false,
          autoVerifyPhone: false,
        },
      });

      expect(event.response.autoConfirmUser).toBe(false);
      expect(event.response.autoVerifyEmail).toBe(true);
      expect(event.response.autoVerifyPhone).toBe(false);
    });
  });

  describe('#pre-token-generation', () => {
    describe('#v1', () => {
      describe.each([
        { function: PreTokenGenerationHostedAuthTriggerEventStub },
        { function: PreTokenGenerationAuthenticationTriggerEventStub },
        { function: PreTokenGenerationNewPasswordChallengeTriggerEvent },
        { function: PreTokenGenerationAuthenticateDeviceTriggerEvent },
        { function: PreTokenGenerationRefreshTokensTriggerEvent },
      ])('$function.name', ({ function: triggerStub }) => {
        it('should return a valid event', () => {
          const event = triggerStub();

          expect(event.request).toEqual({
            userAttributes: {
              email: 'example@example.com',
              phone_number: '+1234567890',
            },
            groupConfiguration: {
              groupsToOverride: ['Users'],
              iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
              preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
            },
          });
          expect(event.response).toEqual({
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
          });
        });

        it('should allow overrides', () => {
          const event = triggerStub({
            request: {
              userAttributes: {
                email: 'override@example.com',
                phone_number: '+1987654321',
              },
            },
            region: 'us-west-2',
          });

          expect(event).toEqual({
            region: 'us-west-2',
            version: '1',
            userPoolId: 'us-west-2_Example',
            triggerSource: event.triggerSource,
            userName: 'example-user',
            callerContext: {
              awsSdkVersion: 'aws-sdk-unknown-version',
              clientId: 'example-client-id',
            },
            request: {
              userAttributes: {
                email: 'override@example.com',
                phone_number: '+1987654321',
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
          });
        });
      });
    });

    describe('#v2', () => {
      describe.each([
        { function: PreTokenGenerationHostedAuthV2TriggerEventStub },
        { function: PreTokenGenerationAuthenticationV2TriggerEventStub },
        { function: PreTokenGenerationNewPasswordChallengeV2TriggerEventStub },
        { function: PreTokenGenerationAuthenticateDeviceV2TriggerEventStub },
        { function: PreTokenGenerationRefreshTokensV2TriggerEventStub },
      ])('$function.name', ({ function: triggerStub }) => {
        it('should return a valid event', () => {
          const event = triggerStub();

          expect(event.request).toEqual({
            userAttributes: {
              email: 'example@example.com',
            },
            groupConfiguration: {
              groupsToOverride: ['Users'],
              iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
              preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
            },
          });

          expect(event.response).toEqual({
            claimsAndScopeOverrideDetails: {},
          });
        });

        it('should allow overrides', () => {
          const event = triggerStub({
            version: '2',
            request: {
              userAttributes: {
                email: 'override@example.com',
                phone_number: '+1987654321',
              },
            },
            region: 'us-west-2',
          });

          expect(event).toEqual({
            version: '2',
            region: 'us-west-2',
            userPoolId: 'us-west-2_Example',
            triggerSource: event.triggerSource,
            userName: 'example-user',
            callerContext: {
              awsSdkVersion: 'aws-sdk-unknown-version',
              clientId: 'example-client-id',
            },
            request: {
              userAttributes: {
                email: 'override@example.com',
                phone_number: '+1987654321',
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
          });
        });
      });
    });

    describe('v3', () => {
      it('PreTokenGenerationClientCredentialsV3TriggerEventStub should return a valid event', () => {
        const event = PreTokenGenerationClientCredentialsV3TriggerEventStub();

        expect(event.request).toEqual({
          userAttributes: {
            email: 'example@example.com',
          },
          groupConfiguration: {
            groupsToOverride: ['Users'],
            iamRolesToOverride: [`arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_DefaultRole`],
            preferredRole: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:role/Cognito_PreferredRole`,
          },
        });

        expect(event.response).toEqual({
          claimsAndScopeOverrideDetails: {},
        });
      });

      it('should allow overrides', () => {
        const event = PreTokenGenerationClientCredentialsV3TriggerEventStub({
          response: {
            claimsAndScopeOverrideDetails: {
              accessTokenGeneration: {
                scopesToAdd: ['custom/scope'],
              },
            },
          },
          region: 'us-west-2',
        });

        expect(event).toEqual({
          version: '3',
          region: 'us-west-2',
          userPoolId: 'us-west-2_Example',
          triggerSource: 'TokenGeneration_ClientCredentials',
          userName: 'example-user',
          callerContext: {
            awsSdkVersion: 'aws-sdk-unknown-version',
            clientId: 'example-client-id',
          },
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
            claimsAndScopeOverrideDetails: {
              accessTokenGeneration: {
                scopesToAdd: ['custom/scope'],
              },
            },
          },
        });
      });
    });
  });

  describe('#user-migration-trigger-event-stub', () => {
    it('should return a valid authentication event', () => {
      const event = UserMigrationAuthenticationTriggerEventStub();

      expect(event.request).toEqual({
        password: 'ExamplePassword123!',
      });
      expect(event.response).toEqual({
        userAttributes: {
          email: 'example@example.com',
          given_name: 'John',
          family_name: 'Doe',
        },
        finalUserStatus: 'CONFIRMED',
        messageAction: 'SUPPRESS',
        desiredDeliveryMediums: ['EMAIL'],
      });
    });

    it('should allow overrides', () => {
      const event = UserMigrationAuthenticationTriggerEventStub({
        response: {
          finalUserStatus: 'RESET_REQUIRED',
        },
      });

      expect(event.response.finalUserStatus).toBe('RESET_REQUIRED');
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
