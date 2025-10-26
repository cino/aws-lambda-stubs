import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { Merge } from 'type-fest';
import { APIGatewayEventRequestContextV2Stub, type PartialAPIGatewayEventRequestContextV2 } from './common';

// V1
// export const APIGatewayProxyWithLambdaAuthorizerEventStub = <TAuthorizerContext>(
//   overrides: Partial<APIGatewayProxyWithLambdaAuthorizerEvent<TAuthorizerContext>>
// ): APIGatewayProxyWithLambdaAuthorizerEvent<TAuthorizerContext> => {};

// export const APIGatewayProxyWithCognitoAuthorizerEventStub = (
//   overrides: Partial<APIGatewayProxyWithCognitoAuthorizerEvent>
// ): APIGatewayProxyWithCognitoAuthorizerEvent => {};

// V2

export type PartialAPIGatewayProxyEventV2 = Merge<
  Partial<APIGatewayProxyEventV2>,
  {
    requestContext?: PartialAPIGatewayEventRequestContextV2;
  }
>;

/**
 * Returns a default API Gateway Proxy Event V2 object,
 * which is an _unauthenticated_ representation of the event.
 */
export const APIGatewayProxyEventV2Stub = (overrides: PartialAPIGatewayProxyEventV2 = {}): APIGatewayProxyEventV2 => {
  const path = overrides.rawPath || '/prod/resource';

  return deepmerge<APIGatewayProxyEventV2>(
    {
      version: '2.0',
      routeKey: '$default',
      rawPath: '/prod/resource',
      rawQueryString: '',
      headers: {},
      cookies: [],
      queryStringParameters: {},
      requestContext: APIGatewayEventRequestContextV2Stub({
        http: {
          path,
        },
      }),
      isBase64Encoded: false,
    },
    overrides as APIGatewayProxyEventV2
  );
};

// export const APIGatewayProxyWebsocketEventV2Stub = (
//   overrides: Partial<APIGatewayProxyWebsocketEventV2>
// ): APIGatewayProxyWebsocketEventV2 => {};

// export const APIGatewayProxyEventV2WithJWTAuthorizerStub = (
//   overrides: Partial<APIGatewayProxyEventV2WithJWTAuthorizer>
// ): APIGatewayProxyEventV2WithJWTAuthorizer => {};

// export const APIGatewayProxyEventV2WithLambdaAuthorizerStub = (
//   overrides: Partial<APIGatewayProxyEventV2WithLambdaAuthorizer>
// ): APIGatewayProxyEventV2WithLambdaAuthorizer => {};

// export const APIGatewayProxyEventV2WithIAMAuthorizerStub = (
//   overrides: Partial<APIGatewayProxyEventV2WithIAMAuthorizer>
// ): APIGatewayProxyEventV2WithIAMAuthorizer => {};
