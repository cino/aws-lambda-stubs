import type {
  APIGatewayEventWebsocketRequestContextV2,
  APIGatewayProxyEventV2,
  APIGatewayProxyWebsocketEventV2,
} from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DateTime } from 'luxon';
import type { Merge } from 'type-fest';
import {
  APIGatewayEventRequestContextV2Stub,
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

// export const APIGatewayProxyEventV2WithJWTAuthorizerStub = (
//   overrides: Partial<APIGatewayProxyEventV2WithJWTAuthorizer>
// ): APIGatewayProxyEventV2WithJWTAuthorizer => {};

// export const APIGatewayProxyEventV2WithLambdaAuthorizerStub = (
//   overrides: Partial<APIGatewayProxyEventV2WithLambdaAuthorizer>
// ): APIGatewayProxyEventV2WithLambdaAuthorizer => {};

// export const APIGatewayProxyEventV2WithIAMAuthorizerStub = (
//   overrides: Partial<APIGatewayProxyEventV2WithIAMAuthorizer>
// ): APIGatewayProxyEventV2WithIAMAuthorizer => {};
