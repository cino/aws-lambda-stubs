import { describe, expect, it } from 'vitest';
import {
  APIGatewayEventRequestContextV2Stub,
  APIGatewayEventRequestContextWithAuthorizerStub,
  DEFAULT_ACCOUNT_ID,
} from '../../src';
import { ipv4Regex, isUuidV4Regex } from '../helpers';

describe('#api-gateway', () => {
  describe('api-gateway-event-request-context-with-authorizer', () => {
    it('should return the api gateway event request context with authorizer', () => {
      const event = APIGatewayEventRequestContextWithAuthorizerStub();

      expect(event).toEqual({
        accountId: DEFAULT_ACCOUNT_ID,
        apiId: 'example',
        protocol: 'HTTP/1.1',
        httpMethod: 'GET',
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: expect.stringMatching(ipv4Regex),
          user: null,
          userAgent: null,
          userArn: null,
          // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/73964
          // vpcId: null,
          // vpceId: null,
        },
        path: '/prod/resource',
        stage: 'prod',
        requestId: expect.stringMatching(isUuidV4Regex),
        requestTimeEpoch: expect.any(Number),
        resourceId: 'resource-id',
        resourcePath: '/resource',
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayEventRequestContextWithAuthorizerStub({
        accountId: 'overridden-account-id',
        authorizer: undefined,
      });

      expect(event).toEqual({
        accountId: 'overridden-account-id',
        apiId: 'example',
        protocol: 'HTTP/1.1',
        httpMethod: 'GET',
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: expect.stringMatching(ipv4Regex),
          user: null,
          userAgent: null,
          userArn: null,
          // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/73964
          // vpcId: null,
          // vpceId: null,
        },
        path: '/prod/resource',
        stage: 'prod',
        requestId: expect.stringMatching(isUuidV4Regex),
        requestTimeEpoch: expect.any(Number),
        resourceId: 'resource-id',
        resourcePath: '/resource',
      });
    });
  });

  describe('api-gateway-event-request-context-v2', () => {
    it('should return the api gateway event request context', () => {
      const event = APIGatewayEventRequestContextV2Stub();

      expect(event).toEqual({
        accountId: DEFAULT_ACCOUNT_ID,
        apiId: 'example',
        domainName: 'id.execute-api.us-east-1.amazonaws.com',
        domainPrefix: 'id',
        http: {
          method: 'GET',
          path: '/prod/resource',
          protocol: 'HTTP/1.1',
          sourceIp: expect.stringMatching(ipv4Regex),
          userAgent: 'Custom User Agent String',
        },
        requestId: expect.stringMatching(isUuidV4Regex),
        routeKey: '$default',
        stage: 'prod',
        time: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
        timeEpoch: expect.any(Number),
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayEventRequestContextV2Stub({
        accountId: 'overridden-account-id',
        http: { method: 'POST' },
      });

      expect(event).toEqual({
        accountId: 'overridden-account-id',
        apiId: 'example',
        domainName: 'id.execute-api.us-east-1.amazonaws.com',
        domainPrefix: 'id',
        http: {
          method: 'POST',
          path: '/prod/resource',
          protocol: 'HTTP/1.1',
          sourceIp: expect.stringMatching(ipv4Regex),
          userAgent: 'Custom User Agent String',
        },
        requestId: expect.stringMatching(isUuidV4Regex),
        routeKey: '$default',
        stage: 'prod',
        time: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
        timeEpoch: expect.any(Number),
      });
    });
  });
});
