import type {
  APIGatewayEventRequestContextJWTAuthorizer,
  APIGatewayEventWebsocketRequestContextV2,
  APIGatewayProxyEventV2,
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyWebsocketEventV2,
} from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DateTime } from 'luxon';
import type { Merge } from 'type-fest';
import {
  APIGatewayEventRequestContextV2Stub,
  APIGatewayEventRequestContextV2WithAuthorizerStub,
  DEFAULT_REGION,
  type PartialAPIGatewayEventRequestContextV2,
} from './common';

// V1
// export const APIGatewayProxyWithLambdaAuthorizerEventStub = <TAuthorizerContext>(
//   overrides: Partial<APIGatewayProxyWithLambdaAuthorizerEvent<TAuthorizerContext>>
// ): APIGatewayProxyWithLambdaAuthorizerEvent<TAuthorizerContext> => {};

// export const APIGatewayProxyWithCognitoAuthorizerEventStub = (
//   overrides: Partial<APIGatewayProxyWithCognitoAuthorizerEvent>
// ): APIGatewayProxyWithCognitoAuthorizerEvent => {};

// V2

type PartialAPIGatewayProxyEventV2 = Merge<
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

type PartialAPIGatewayProxyWebsocketEventV2 = Merge<
  Partial<APIGatewayProxyWebsocketEventV2>,
  {
    requestContext?: Partial<APIGatewayEventWebsocketRequestContextV2>;
  }
>;

export const APIGatewayProxyWebsocketEventV2Stub = (
  overrides: PartialAPIGatewayProxyWebsocketEventV2 = {}
): APIGatewayProxyWebsocketEventV2 => {
  const now = DateTime.now();

  return deepmerge<APIGatewayProxyWebsocketEventV2>(
    {
      requestContext: {
        routeKey: '$default',
        messageId: crypto.randomUUID(),
        eventType: 'MESSAGE',
        extendedRequestId: crypto.randomUUID(),
        messageDirection: 'IN',
        stage: 'prod',
        connectedAt: now.toUnixInteger(),
        requestTime: now.toFormat('dd/MMM/yyyy:HH:mm:ss ZZZ'),
        requestTimeEpoch: now.toUnixInteger(),
        requestId: crypto.randomUUID(),
        domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
        connectionId: crypto.randomUUID(),
        apiId: 'example',
      },
      body: undefined,
      isBase64Encoded: false,
      stageVariables: {},
    },
    overrides as APIGatewayProxyWebsocketEventV2
  );
};

type PartialAPIGatewayProxyEventV2WithJWTAuthorizer = Merge<
  Partial<APIGatewayProxyEventV2WithJWTAuthorizer>,
  {
    requestContext?: PartialAPIGatewayEventRequestContextV2;
  }
>;

export const APIGatewayProxyEventV2WithJWTAuthorizerStub = (
  overrides: PartialAPIGatewayProxyEventV2WithJWTAuthorizer = {}
): APIGatewayProxyEventV2WithJWTAuthorizer => {
  if (overrides.rawPath) {
    overrides.requestContext = {
      ...overrides.requestContext,
      http: {
        path: overrides.rawPath,
        ...overrides.requestContext?.http
      },
    };
  }

  return deepmerge<APIGatewayProxyEventV2WithJWTAuthorizer>(
    {
      version: '2.0',
      routeKey: '$default',
      rawPath: '/prod/resource',
      rawQueryString: '',
      headers: {},
      isBase64Encoded: false,
      cookies: [],
      queryStringParameters: {},
      requestContext: APIGatewayEventRequestContextV2WithAuthorizerStub<APIGatewayEventRequestContextJWTAuthorizer>({
        jwt: {
          claims: {
            sub: '1234567890',
            email: 'user@example.com',
          },
          scopes: ['read:data', 'write:data'],
        },
        principalId: '1234567890',
        integrationLatency: 100,
      }),
    },
    overrides as APIGatewayProxyEventV2WithJWTAuthorizer
  );
};

// TODO: FIX.
// export const APIGatewayProxyEventV2WithLambdaAuthorizerStub = <TAuthorizerContext = object>(
//   authorizerContext: TAuthorizerContext,
//   overrides: Partial<APIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext>>
// ): APIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext> => {
//   return deepmerge<APIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext>>(
//     APIGatewayEventRequestContextV2WithAuthorizerStub<
//       APIGatewayEventRequestContextLambdaAuthorizer<TAuthorizerContext>
//     >({
//       lambda: undefined as unknown as TAuthorizerContext,
//     }),
//     overrides
//   );
// };

// export const APIGatewayProxyEventV2WithIAMAuthorizerStub = (
//   overrides: Partial<APIGatewayProxyEventV2WithIAMAuthorizer>
// ): APIGatewayProxyEventV2WithIAMAuthorizer => {};
