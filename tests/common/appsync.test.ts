import { describe, expect, it } from 'vitest';
import { AppSyncIdentityStub, DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../../src';
import { ipRegex } from '../helpers';

describe('#appsync', () => {
  describe('appSyncIdentityStub', () => {
    describe('#iam', () => {
      it('should return the iam identity', () => {
        const identity = AppSyncIdentityStub('iam');

        expect(identity).toEqual({
          accountId: DEFAULT_ACCOUNT_ID,
          cognitoIdentityPoolId: `${DEFAULT_REGION}:abcd1234-efgh-5678-ijkl-9012mnop3456`,
          cognitoIdentityId: `${DEFAULT_REGION}:abcdef12-3456-7890-abcd-ef1234567890`,
          sourceIp: [expect.stringMatching(ipRegex), expect.stringMatching(ipRegex)],
          username: 'jane_doe',
          userArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/jane_doe`,
          cognitoIdentityAuthType: 'AWS_IAM',
          cognitoIdentityAuthProvider: `cognito-idp.${DEFAULT_REGION}.amazonaws.com/${DEFAULT_REGION}_example`,
        });
      });

      it('should allow overrides', () => {
        const identity = AppSyncIdentityStub('iam', {
          username: 'override_jane_doe',
          userArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/override_jane_doe`,
          sourceIp: [expect.stringMatching(ipRegex)],
        });

        expect(identity).toEqual({
          accountId: DEFAULT_ACCOUNT_ID,
          cognitoIdentityPoolId: `${DEFAULT_REGION}:abcd1234-efgh-5678-ijkl-9012mnop3456`,
          cognitoIdentityId: `${DEFAULT_REGION}:abcdef12-3456-7890-abcd-ef1234567890`,
          sourceIp: [expect.stringMatching(ipRegex)],
          username: 'override_jane_doe',
          userArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/override_jane_doe`,
          cognitoIdentityAuthType: 'AWS_IAM',
          cognitoIdentityAuthProvider: `cognito-idp.${DEFAULT_REGION}.amazonaws.com/${DEFAULT_REGION}_example`,
        });
      });
    });

    describe('#cognito', () => {
      it('should return the cognito identity', () => {
        const identity = AppSyncIdentityStub('cognito');

        expect(identity).toEqual({
          sub: 'abcdef123456',
          issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_example',
          username: 'john_doe',
          claims: {
            email: 'john.doe@example.com',
            name: 'John Doe',
            phone_number: '+1234567890',
          },
          sourceIp: [expect.stringMatching(ipRegex), expect.stringMatching(ipRegex)],
          defaultAuthStrategy: 'ALLOW',
          groups: ['admin', 'users'],
        });
      });

      it('should allow overrides', () => {
        const identity = AppSyncIdentityStub('cognito', {
          sub: 'override-abcdef123456',
          issuer: 'https://override.com/cognito-idp.us-east-1.amazonaws.com/us-east-1_example',
          username: 'override_john_doe',
          claims: {
            email: 'override_john.doe@example.com',
            name: 'Override John Doe',
            phone_number: '+1987654321',
          },
          sourceIp: [expect.stringMatching(ipRegex), expect.stringMatching(ipRegex)],
          defaultAuthStrategy: 'DENY',
          groups: ['override_admin', 'override_users'],
        });

        expect(identity).toEqual({
          sub: 'override-abcdef123456',
          issuer: 'https://override.com/cognito-idp.us-east-1.amazonaws.com/us-east-1_example',
          username: 'override_john_doe',
          claims: {
            email: 'override_john.doe@example.com',
            name: 'Override John Doe',
            phone_number: '+1987654321',
          },
          sourceIp: [expect.stringMatching(ipRegex), expect.stringMatching(ipRegex)],
          defaultAuthStrategy: 'DENY',
          groups: ['override_admin', 'override_users'],
        });
      });
    });

    describe('#oidc', () => {
      it('should return the oidc identity', () => {
        const identity = AppSyncIdentityStub('oidc');

        expect(identity).toEqual({
          claims: {
            email: 'john.doe@example.com',
            name: 'John Doe',
            roles: ['admin', 'user'],
          },
          issuer: 'https://example.com/oauth2/default',
          sub: '1234567890',
        });
      });

      it('should allow overrides', () => {
        const identity = AppSyncIdentityStub('oidc', {
          claims: {
            email: 'override@example.com',
            name: 'Override Name',
          },
          issuer: 'https://override.com/oauth2/default',
          sub: 'override-1234567890',
        });

        expect(identity).toEqual({
          claims: {
            email: 'override@example.com',
            name: 'Override Name',
            roles: ['admin', 'user'],
          },
          issuer: 'https://override.com/oauth2/default',
          sub: 'override-1234567890',
        });
      });
    });

    describe('#lambda', () => {
      it('should return the lambda identity', () => {
        const identity = AppSyncIdentityStub('lambda');

        expect(identity).toEqual({
          resolverContext: {},
        });
      });

      it('should allow overrides', () => {
        const identity = AppSyncIdentityStub('lambda', {
          resolverContext: {
            user: {
              email: 'override@example.com',
              name: 'Override Name',
            },
          },
        });

        expect(identity).toEqual({
          resolverContext: {
            user: {
              email: 'override@example.com',
              name: 'Override Name',
            },
          },
        });
      });
    });
  });
});
