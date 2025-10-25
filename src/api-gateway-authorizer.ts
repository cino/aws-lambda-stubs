import type {
  APIGatewayRequestAuthorizerEvent,
  APIGatewayRequestAuthorizerEventV2,
  APIGatewayTokenAuthorizerEvent,
} from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { Merge } from 'type-fest';
import {
  APIGatewayEventRequestContextV2Stub,
  APIGatewayEventRequestContextWithAuthorizerStub,
  DEFAULT_ACCOUNT_ID,
  DEFAULT_REGION,
  type PartialAPIGatewayEventRequestContextV2,
} from './common';

export const APIGatewayTokenAuthorizerEventStub = (
  overrides: Partial<APIGatewayTokenAuthorizerEvent> = {}
): APIGatewayTokenAuthorizerEvent => {
  return {
    type: 'TOKEN',
    authorizationToken: 'test-token',
    methodArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/prod/GET/resource`,

    ...overrides,
  };
};

export const APIGatewayRequestAuthorizerEventStub = (
  overrides: Partial<APIGatewayRequestAuthorizerEvent> = {}
): APIGatewayRequestAuthorizerEvent => {
  return deepmerge<APIGatewayRequestAuthorizerEvent>(
    {
      type: 'REQUEST',
      methodArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/prod/GET/resource`,
      resource: '/resource',
      path: '/resource',
      httpMethod: 'GET',
      headers: {
        'User-Agent': 'Custom User Agent String',
        Accept: '*/*',
      },
      multiValueHeaders: {},
      pathParameters: {},
      queryStringParameters: {},
      multiValueQueryStringParameters: {},
      stageVariables: {},
      requestContext: APIGatewayEventRequestContextWithAuthorizerStub(),
    },
    overrides as APIGatewayRequestAuthorizerEvent
  );
};

type PartialAPIGatewayRequestAuthorizerEventV2 = Merge<
  Partial<APIGatewayRequestAuthorizerEventV2>,
  {
    requestContext?: PartialAPIGatewayEventRequestContextV2;
  }
>;

export const APIGatewayRequestAuthorizerEventV2Stub = (
  overrides: PartialAPIGatewayRequestAuthorizerEventV2 = {}
): APIGatewayRequestAuthorizerEventV2 => {
  return deepmerge(
    {
      version: '2.0',
      type: 'REQUEST',
      routeArn: `arn:aws:execute-api:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:example/prod/GET/resource`,
      identitySource: [],
      routeKey: 'GET /resource',
      rawPath: '/prod/resource',
      rawQueryString: '',
      cookies: [],
      headers: {
        'User-Agent': 'Custom User Agent String',
        Accept: '*/*',
      },
      queryStringParameters: {},
      requestContext: APIGatewayEventRequestContextV2Stub(),
      pathParameters: {},
      stageVariables: {},
    },
    overrides as APIGatewayRequestAuthorizerEventV2
  );
};

export const CustomAuthorizerEventStub = () => {};
