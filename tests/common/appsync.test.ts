import { appSyncIdentityStub } from 'src/common';
import { describe, expect, it } from 'vitest';

describe('#appsync', () => {
  describe('appSyncIdentityStub', () => {
    describe('#iam', () => {
      it('should return the iam identity', () => {});

      it('should allow overrides', () => {});
    });

    describe('#cognito', () => {
      it('should return the cognito identity', () => {
        const identity = appSyncIdentityStub('cognito');

        expect(identity).toEqual({
          sub: 'abcdef123456',
          issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_example',
          username: 'john_doe',
          claims: {
            email: 'john.doe@example.com',
            name: 'John Doe',
            phone_number: '+1234567890',
          },
          sourceIp: ['192.0.2.1', '198.51.100.2'],
          defaultAuthStrategy: 'ALLOW',
          groups: ['admin', 'users'],
        });
      });

      it('should allow overrides', () => {
        const identity = appSyncIdentityStub('cognito', {
          sub: 'override-abcdef123456',
          issuer: 'https://override.com/cognito-idp.us-east-1.amazonaws.com/us-east-1_example',
          username: 'override_john_doe',
          claims: {
            email: 'override_john.doe@example.com',
            name: 'Override John Doe',
            phone_number: '+1987654321',
          },
          sourceIp: ['203.0.113.1', '192.0.2.2'],
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
          sourceIp: ['203.0.113.1', '192.0.2.2'],
          defaultAuthStrategy: 'DENY',
          groups: ['override_admin', 'override_users'],
        });
      });
    });

    describe('#oidc', () => {
      it('should return the oidc identity', () => {
        const identity = appSyncIdentityStub('oidc');

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
        const identity = appSyncIdentityStub('oidc', {
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
        const identity = appSyncIdentityStub('lambda');

        expect(identity).toEqual({
          resolverContext: {},
        });
      });

      it('should allow overrides', () => {
        const identity = appSyncIdentityStub('lambda', {
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
