import { describe, expect, it } from 'vitest';
import {
  APIGatewayEventRequestContextV2Stub,
  APIGatewayEventRequestContextWithAuthorizerStub,
  DEFAULT_ACCOUNT_ID,
} from '../../src';
import { clfDateRegex, ipv4Regex, userAgentRegex, uuidV4Regex } from '../helpers';

describe('#api-gateway', () => {
  describe('api-gateway-event-request-context-with-authorizer', () => {
    it('should return the api gateway event request context with authorizer', () => {
      const event = APIGatewayEventRequestContextWithAuthorizerStub();

      expect(event).toEqual({
        accountId: DEFAULT_ACCOUNT_ID,
        apiId: expect.stringMatching(/^[a-zA-Z0-9]{10}$/),
        domainPrefix: event.apiId,
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
          vpcId: null,
          vpceId: null,
        },
        path: '/prod/resource',
        stage: 'prod',
        requestId: expect.stringMatching(uuidV4Regex),
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
        apiId: expect.stringMatching(/^[a-zA-Z0-9]{10}$/),
        domainPrefix: event.apiId,
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
          vpcId: null,
          vpceId: null,
        },
        path: '/prod/resource',
        stage: 'prod',
        requestId: expect.stringMatching(uuidV4Regex),
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
        apiId: expect.stringMatching(/^[a-zA-Z0-9]{10}$/),
        domainName: `${event.apiId}.execute-api.us-east-1.amazonaws.com`,
        domainPrefix: event.apiId,
        http: {
          method: 'GET',
          path: '/prod/resource',
          protocol: 'HTTP/1.1',
          sourceIp: expect.stringMatching(ipv4Regex),
          userAgent: expect.stringMatching(userAgentRegex),
        },
        requestId: expect.stringMatching(uuidV4Regex),
        routeKey: '$default',
        stage: 'prod',
        time: expect.stringMatching(clfDateRegex),
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
        apiId: expect.stringMatching(/^[a-zA-Z0-9]{10}$/),
        domainName: `${event.apiId}.execute-api.us-east-1.amazonaws.com`,
        domainPrefix: event.apiId,
        http: {
          method: 'POST',
          path: '/prod/resource',
          protocol: 'HTTP/1.1',
          sourceIp: expect.stringMatching(ipv4Regex),
          userAgent: expect.stringMatching(userAgentRegex),
        },
        requestId: expect.stringMatching(uuidV4Regex),
        routeKey: '$default',
        stage: 'prod',
        time: expect.stringMatching(clfDateRegex),
        timeEpoch: expect.any(Number),
      });
    });
  });
});
