import { describe, expect, it } from 'vitest';
import {
  APIGatewayEventRequestContextV2Stub,
  APIGatewayEventRequestContextWithAuthorizerStub,
  APIGatewayRequestAuthorizerEventStub,
  APIGatewayRequestAuthorizerEventV2Stub,
  APIGatewayTokenAuthorizerEventStub,
  DEFAULT_ACCOUNT_ID,
  DEFAULT_REGION,
} from '../src';
import { clfDateRegex, ipv4Regex, userAgentRegex, uuidV4Regex } from './helpers';

describe('#api-gateway-authorizer', () => {
  describe('token-authorizer', () => {
    it('should return a valid event', () => {
      const event = APIGatewayTokenAuthorizerEventStub();

      expect(event).toEqual({
        type: 'TOKEN',
        authorizationToken: 'test-token',
        methodArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/prod/GET/resource`,
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayTokenAuthorizerEventStub({
        authorizationToken: 'custom-token',
        methodArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/dev/POST/another-resource`,
      });

      expect(event).toEqual({
        type: 'TOKEN',
        authorizationToken: 'custom-token',
        methodArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/dev/POST/another-resource`,
      });
    });
  });

  describe('request-authorizer-event', () => {
    it('should return a valid event', () => {
      const event = APIGatewayRequestAuthorizerEventStub();

      expect(event).toEqual({
        type: 'REQUEST',
        methodArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/prod/GET/resource`,
        resource: '/resource',
        path: '/prod/resource',
        httpMethod: 'GET',
        headers: {
          'User-Agent': expect.stringMatching(userAgentRegex),
          Accept: '*/*',
        },
        multiValueHeaders: {},
        pathParameters: {},
        queryStringParameters: {},
        multiValueQueryStringParameters: {},
        stageVariables: {},
        requestContext: {
          ...APIGatewayEventRequestContextWithAuthorizerStub(),
          ...{
            identity: {
              ...APIGatewayEventRequestContextWithAuthorizerStub().identity,
              sourceIp: expect.stringMatching(ipv4Regex),
            },
            apiId: expect.stringMatching(/^[a-zA-Z0-9]{10}$/),
            domainPrefix: event.requestContext.apiId,
            requestId: expect.stringMatching(uuidV4Regex),
            requestTimeEpoch: expect.any(Number),
          },
        },
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayRequestAuthorizerEventStub({
        resource: '/custom-resource',
        methodArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/dev/GET/custom-resource`,
      });

      expect(event).toEqual({
        type: 'REQUEST',
        methodArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/dev/GET/custom-resource`,
        resource: '/custom-resource',
        path: '/prod/resource',
        httpMethod: 'GET',
        headers: {
          'User-Agent': expect.stringMatching(userAgentRegex),
          Accept: '*/*',
        },
        multiValueHeaders: {},
        pathParameters: {},
        queryStringParameters: {},
        multiValueQueryStringParameters: {},
        stageVariables: {},
        requestContext: {
          ...APIGatewayEventRequestContextWithAuthorizerStub(),
          ...{
            identity: {
              ...APIGatewayEventRequestContextWithAuthorizerStub().identity,
              sourceIp: expect.stringMatching(ipv4Regex),
            },
            apiId: expect.stringMatching(/^[a-zA-Z0-9]{10}$/),
            domainPrefix: event.requestContext.apiId,
            requestId: expect.stringMatching(uuidV4Regex),
            requestTimeEpoch: expect.any(Number),
          },
        },
      });
    });
  });

  describe('request-authorizer-event-v2', () => {
    it('should return a valid event', () => {
      const event = APIGatewayRequestAuthorizerEventV2Stub();

      expect(event).toEqual({
        version: '2.0',
        type: 'REQUEST',
        routeArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/prod/GET/resource`,
        identitySource: [],
        routeKey: 'GET /resource',
        rawPath: '/prod/resource',
        rawQueryString: '',
        cookies: [],
        headers: {
          'User-Agent': expect.stringMatching(userAgentRegex),
          Accept: '*/*',
        },
        queryStringParameters: {},
        requestContext: {
          ...APIGatewayEventRequestContextV2Stub(),
          ...{
            http: {
              ...APIGatewayEventRequestContextV2Stub().http,
              sourceIp: expect.stringMatching(ipv4Regex),
              userAgent: event.headers?.['User-Agent'],
            },
            requestId: expect.stringMatching(uuidV4Regex),
          },
          apiId: expect.stringMatching(/^[a-zA-Z0-9]{10}$/),
          domainName: `${event.requestContext.apiId}.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          domainPrefix: event.requestContext.apiId,
          time: expect.stringMatching(clfDateRegex),
          timeEpoch: expect.any(Number),
        },
        pathParameters: {},
        stageVariables: {},
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayRequestAuthorizerEventV2Stub({
        routeArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/dev/POST/custom-resource`,
        requestContext: {
          stage: 'dev',
        },
      });

      expect(event).toEqual({
        version: '2.0',
        type: 'REQUEST',
        routeArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/dev/POST/custom-resource`,
        identitySource: [],
        routeKey: 'GET /resource',
        rawPath: '/prod/resource',
        rawQueryString: '',
        cookies: [],
        headers: {
          'User-Agent': expect.stringMatching(userAgentRegex),
          Accept: '*/*',
        },
        queryStringParameters: {},
        requestContext: {
          ...APIGatewayEventRequestContextV2Stub(),
          ...{
            http: {
              ...APIGatewayEventRequestContextV2Stub().http,
              sourceIp: expect.stringMatching(ipv4Regex),
              userAgent: event.headers?.['User-Agent'],
            },
            apiId: expect.stringMatching(/^[a-zA-Z0-9]{10}$/),
            domainName: `${event.requestContext.apiId}.execute-api.${DEFAULT_REGION}.amazonaws.com`,
            domainPrefix: event.requestContext.apiId,
            requestId: expect.stringMatching(uuidV4Regex),
            stage: 'dev',
            time: expect.stringMatching(clfDateRegex),
            timeEpoch: expect.any(Number),
          },
        },
        pathParameters: {},
        stageVariables: {},
      });
    });
  });
});
