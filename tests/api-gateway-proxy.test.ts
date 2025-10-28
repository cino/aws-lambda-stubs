import { describe, expect, it } from 'vitest';
import {
  APIGatewayProxyEventV2Stub,
  APIGatewayProxyEventV2WithIAMAuthorizerStub,
  APIGatewayProxyEventV2WithJWTAuthorizerStub,
  APIGatewayProxyEventV2WithLambdaAuthorizerStub,
  APIGatewayProxyWebsocketEventV2Stub,
  APIGatewayProxyWithCognitoAuthorizerEventStub,
  DEFAULT_ACCOUNT_ID,
  DEFAULT_REGION,
} from '../src';
import { ipv4Regex, isUuidV4Regex } from './helpers';

describe('#api-gateway-proxy', () => {
  describe('proxy-event-v1-cognito', () => {
    it('should return a valid event', () => {
      const event = APIGatewayProxyWithCognitoAuthorizerEventStub();

      expect(event).toEqual({
        body: null,
        headers: {},
        isBase64Encoded: false,
        path: '/prod/resource',
        pathParameters: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        httpMethod: 'GET',
        multiValueHeaders: {},
        stageVariables: null,
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          authorizer: {
            claims: {
              sub: '1234567890',
              email: 'john.doe@example.com',
            },
          },
          identity: {
            accessKey: null,
            accountId: null,
            apiKey: null,
            apiKeyId: null,
            caller: null,
            clientCert: null,
            cognitoAuthenticationProvider: '',
            cognitoAuthenticationType: '',
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
          httpMethod: 'GET',
          path: '/prod/resource',
          protocol: 'HTTP/1.1',
          requestId: expect.stringMatching(isUuidV4Regex),
          requestTimeEpoch: expect.any(Number),
          resourceId: 'resource-id',
          resourcePath: '/resource',
          stage: 'prod',
        },
        resource: '/resource',
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayProxyWithCognitoAuthorizerEventStub({ httpMethod: 'POST', path: '/custom/path' });

      expect(event).toEqual({
        body: null,
        headers: {},
        isBase64Encoded: false,
        path: '/custom/path',
        pathParameters: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        httpMethod: 'POST',
        multiValueHeaders: {},
        stageVariables: null,
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          authorizer: {
            claims: {
              sub: '1234567890',
              email: 'john.doe@example.com',
            },
          },
          identity: {
            accessKey: null,
            accountId: null,
            apiKey: null,
            apiKeyId: null,
            caller: null,
            clientCert: null,
            cognitoAuthenticationProvider: '',
            cognitoAuthenticationType: '',
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
          httpMethod: 'GET',
          path: '/custom/path',
          protocol: 'HTTP/1.1',
          requestId: expect.stringMatching(isUuidV4Regex),
          requestTimeEpoch: expect.any(Number),
          resourceId: 'resource-id',
          resourcePath: '/resource',
          stage: 'prod',
        },
        resource: '/resource',
      });
    });
  });

  describe('proxy-event-v2', () => {
    it('should return a valid event', () => {
      const event = APIGatewayProxyEventV2Stub();

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/prod/resource',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
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
        },
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayProxyEventV2Stub({
        rawPath: '/custom/path',
        requestContext: {
          http: {
            method: 'POST',
          },
        },
      });

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/custom/path',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          domainPrefix: 'id',
          http: {
            method: 'POST',
            path: '/custom/path',
            protocol: 'HTTP/1.1',
            sourceIp: expect.stringMatching(ipv4Regex),
            userAgent: 'Custom User Agent String',
          },
          requestId: expect.stringMatching(isUuidV4Regex),
          routeKey: '$default',
          stage: 'prod',
          time: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          timeEpoch: expect.any(Number),
        },
      });
    });
  });

  describe('proxy-event-v2-websocket-', () => {
    it('should return a valid event', () => {
      const event = APIGatewayProxyWebsocketEventV2Stub();

      expect(event).toEqual({
        requestContext: {
          routeKey: '$default',
          messageId: expect.stringMatching(isUuidV4Regex),
          eventType: 'MESSAGE',
          extendedRequestId: expect.stringMatching(isUuidV4Regex),
          messageDirection: 'IN',
          stage: 'prod',
          connectedAt: expect.any(Number),
          requestTime: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          requestTimeEpoch: expect.any(Number),
          requestId: expect.stringMatching(isUuidV4Regex),
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          connectionId: expect.stringMatching(isUuidV4Regex),
          apiId: 'example',
        },
        body: '',
        isBase64Encoded: false,
        stageVariables: {},
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayProxyWebsocketEventV2Stub({
        requestContext: {
          eventType: 'DISCONNECT',
          stage: 'dev',
        },
        body: 'Test message',
      });

      expect(event).toEqual({
        requestContext: {
          routeKey: '$default',
          messageId: expect.stringMatching(isUuidV4Regex),
          eventType: 'DISCONNECT',
          extendedRequestId: expect.stringMatching(isUuidV4Regex),
          messageDirection: 'IN',
          stage: 'dev',
          connectedAt: expect.any(Number),
          requestTime: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          requestTimeEpoch: expect.any(Number),
          requestId: expect.stringMatching(isUuidV4Regex),
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          connectionId: expect.stringMatching(isUuidV4Regex),
          apiId: 'example',
        },
        body: 'Test message',
        isBase64Encoded: false,
        stageVariables: {},
      });
    });
  });

  describe('proxy-event-v2-with-jwt-authorizer', () => {
    it('should return a valid event', () => {
      const event = APIGatewayProxyEventV2WithJWTAuthorizerStub();

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/prod/resource',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          authorizer: {
            jwt: {
              claims: {
                sub: '1234567890',
                email: 'user@example.com',
              },
              scopes: ['read:data', 'write:data'],
            },
            principalId: '1234567890',
            integrationLatency: 100,
          },
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
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
        },
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayProxyEventV2WithJWTAuthorizerStub({
        rawPath: '/custom/path',
        requestContext: {
          http: {
            method: 'POST',
            // path: '/custom/path',
          },
        },
      });

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/custom/path',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          authorizer: {
            jwt: {
              claims: {
                sub: '1234567890',
                email: 'user@example.com',
              },
              scopes: ['read:data', 'write:data'],
            },
            principalId: '1234567890',
            integrationLatency: 100,
          },
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          domainPrefix: 'id',
          http: {
            method: 'POST',
            path: '/custom/path',
            protocol: 'HTTP/1.1',
            sourceIp: expect.stringMatching(ipv4Regex),
            userAgent: 'Custom User Agent String',
          },
          requestId: expect.stringMatching(isUuidV4Regex),
          routeKey: '$default',
          stage: 'prod',
          time: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          timeEpoch: expect.any(Number),
        },
      });
    });
  });

  describe('proxy-event-v2-with-lambda-authorizer', () => {
    it('should return a valid event', () => {
      const event = APIGatewayProxyEventV2WithLambdaAuthorizerStub({ key: 'value' });

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/prod/resource',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          authorizer: { lambda: { key: 'value' } },
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
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
        },
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayProxyEventV2WithLambdaAuthorizerStub(
        { key: 'value' },
        {
          rawPath: '/custom/path',
          requestContext: {
            http: {
              method: 'POST',
            },
          },
        }
      );

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/custom/path',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          authorizer: { lambda: { key: 'value' } },
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          domainPrefix: 'id',
          http: {
            method: 'POST',
            path: '/custom/path',
            protocol: 'HTTP/1.1',
            sourceIp: expect.stringMatching(ipv4Regex),
            userAgent: 'Custom User Agent String',
          },
          requestId: expect.stringMatching(isUuidV4Regex),
          routeKey: '$default',
          stage: 'prod',
          time: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          timeEpoch: expect.any(Number),
        },
      });
    });
  });

  describe('proxy-event-v2-with-iam-authorizer', () => {
    it('should return a valid event', () => {
      const event = APIGatewayProxyEventV2WithIAMAuthorizerStub({
        accessKey: 'AKIAEXAMPLE',
        accountId: DEFAULT_ACCOUNT_ID,
        callerId: 'AIDAIEXAMPLE',
        cognitoIdentity: null,
        principalOrgId: 'o-example',
        userArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/ExampleUser`,
        userId: 'AIDAIEXAMPLE',
      });

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/prod/resource',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          authorizer: {
            iam: {
              accessKey: 'AKIAEXAMPLE',
              accountId: DEFAULT_ACCOUNT_ID,
              callerId: 'AIDAIEXAMPLE',
              cognitoIdentity: null,
              principalOrgId: 'o-example',
              userArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/ExampleUser`,
              userId: 'AIDAIEXAMPLE',
            },
          },
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
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
        },
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayProxyEventV2WithIAMAuthorizerStub(
        {
          accessKey: 'AKIAEXAMPLE',
          accountId: DEFAULT_ACCOUNT_ID,
          callerId: 'AIDAIEXAMPLE',
          cognitoIdentity: null,
          principalOrgId: 'o-example',
          userArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/ExampleUser`,
          userId: 'AIDAIEXAMPLE',
        },
        {
          rawPath: '/custom/path',
          requestContext: {
            http: {
              method: 'POST',
            },
          },
        }
      );

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/custom/path',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          authorizer: {
            iam: {
              accessKey: 'AKIAEXAMPLE',
              accountId: DEFAULT_ACCOUNT_ID,
              callerId: 'AIDAIEXAMPLE',
              cognitoIdentity: null,
              principalOrgId: 'o-example',
              userArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/ExampleUser`,
              userId: 'AIDAIEXAMPLE',
            },
          },
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          domainPrefix: 'id',
          http: {
            method: 'POST',
            path: '/custom/path',
            protocol: 'HTTP/1.1',
            sourceIp: expect.stringMatching(ipv4Regex),
            userAgent: 'Custom User Agent String',
          },
          requestId: expect.stringMatching(isUuidV4Regex),
          routeKey: '$default',
          stage: 'prod',
          time: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          timeEpoch: expect.any(Number),
        },
      });
    });
  });
});
