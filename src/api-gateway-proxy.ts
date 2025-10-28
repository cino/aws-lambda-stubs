import type {
  APIGatewayEventRequestContextIAMAuthorizer,
  APIGatewayEventRequestContextJWTAuthorizer,
  APIGatewayEventRequestContextLambdaAuthorizer,
  APIGatewayEventWebsocketRequestContextV2,
  APIGatewayProxyCognitoAuthorizer,
  APIGatewayProxyEventV2,
  APIGatewayProxyEventV2WithIAMAuthorizer,
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyEventV2WithLambdaAuthorizer,
  APIGatewayProxyWebsocketEventV2,
  APIGatewayProxyWithCognitoAuthorizerEvent,
} from 'aws-lambda';
import { DateTime } from 'luxon';
import type { Merge } from 'type-fest';
import {
  APIGatewayEventRequestContextV2Stub,
  APIGatewayEventRequestContextV2WithAuthorizerStub,
  APIGatewayEventRequestContextWithAuthorizerStub,
  DEFAULT_REGION,
  type PartialAPIGatewayEventRequestContext,
  type PartialAPIGatewayEventRequestContextV2,
  randomIpAddress,
} from './common';
import { deepMerge } from './utils/deepmerge';

// V1
// export const APIGatewayProxyWithLambdaAuthorizerEventStub = <TAuthorizerContext>(
//   overrides: Partial<APIGatewayProxyWithLambdaAuthorizerEvent<TAuthorizerContext>>
// ): APIGatewayProxyWithLambdaAuthorizerEvent<TAuthorizerContext> => {};

type PartialAPIGatewayProxyWithCognitoAuthorizerEvent = Merge<
  Partial<APIGatewayProxyWithCognitoAuthorizerEvent>,
  {
    requestContext?: PartialAPIGatewayEventRequestContext<APIGatewayProxyCognitoAuthorizer>;
  }
>;

export const APIGatewayProxyWithCognitoAuthorizerEventStub = (
  overrides: PartialAPIGatewayProxyWithCognitoAuthorizerEvent = {}
): APIGatewayProxyWithCognitoAuthorizerEvent => {
  if (overrides.path) {
    overrides.requestContext = {
      path: overrides.path,
      ...overrides.requestContext,
    };
  }

  return deepMerge<APIGatewayProxyWithCognitoAuthorizerEvent>(
    {
      body: null,
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'GET',
      isBase64Encoded: false,
      path: '/prod/resource',
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: APIGatewayEventRequestContextWithAuthorizerStub({
        authorizer: {
          claims: {
            sub: '1234567890',
            email: 'john.doe@example.com',
          },
        },
        identity: {
          cognitoAuthenticationProvider: '',
          cognitoAuthenticationType: '',
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          sourceIp: randomIpAddress(),
        },
      }),
      resource: '/resource',
    },
    overrides as Partial<APIGatewayProxyWithCognitoAuthorizerEvent>
  );
};

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

  return deepMerge<APIGatewayProxyEventV2>(
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
    overrides as Partial<APIGatewayProxyEventV2>
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

  return deepMerge<APIGatewayProxyWebsocketEventV2>(
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
      body: '',
      isBase64Encoded: false,
      stageVariables: {},
    },
    overrides as Partial<APIGatewayProxyWebsocketEventV2>
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
        ...overrides.requestContext?.http,
      },
    };
  }

  return deepMerge<APIGatewayProxyEventV2WithJWTAuthorizer>(
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
    overrides as Partial<APIGatewayProxyEventV2WithJWTAuthorizer>
  );
};

type PartialAPIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext> = Merge<
  Partial<APIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext>>,
  {
    requestContext?: PartialAPIGatewayEventRequestContextV2;
  }
>;

export const APIGatewayProxyEventV2WithLambdaAuthorizerStub = <TAuthorizerContext = object>(
  authorizerContext: TAuthorizerContext,
  overrides: PartialAPIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext> = {}
): APIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext> => {
  if (overrides.rawPath) {
    overrides.requestContext = {
      ...overrides.requestContext,
      http: {
        path: overrides.rawPath,
        ...overrides.requestContext?.http,
      },
    };
  }

  return deepMerge<APIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext>>(
    {
      version: '2.0',
      routeKey: '$default',
      rawPath: '/prod/resource',
      rawQueryString: '',
      cookies: [],
      headers: {},
      queryStringParameters: {},
      requestContext: APIGatewayEventRequestContextV2WithAuthorizerStub<
        APIGatewayEventRequestContextLambdaAuthorizer<TAuthorizerContext>
      >({ lambda: authorizerContext }),
      isBase64Encoded: false,
    },
    overrides as Partial<APIGatewayProxyEventV2WithLambdaAuthorizer<TAuthorizerContext>>
  );
};

type PartialAPIGatewayProxyEventV2WithIAMAuthorizer = Merge<
  Partial<APIGatewayProxyEventV2WithIAMAuthorizer>,
  {
    requestContext?: PartialAPIGatewayEventRequestContextV2;
  }
>;

export const APIGatewayProxyEventV2WithIAMAuthorizerStub = (
  authorizerContext: APIGatewayEventRequestContextIAMAuthorizer['iam'],
  overrides: PartialAPIGatewayProxyEventV2WithIAMAuthorizer = {}
): APIGatewayProxyEventV2WithIAMAuthorizer => {
  if (overrides.rawPath) {
    overrides.requestContext = {
      ...overrides.requestContext,
      http: {
        path: overrides.rawPath,
        ...overrides.requestContext?.http,
      },
    };
  }

  return deepMerge<APIGatewayProxyEventV2WithIAMAuthorizer>(
    {
      version: '2.0',
      routeKey: '$default',
      rawPath: '/prod/resource',
      rawQueryString: '',
      cookies: [],
      headers: {},
      queryStringParameters: {},
      requestContext: APIGatewayEventRequestContextV2WithAuthorizerStub<APIGatewayEventRequestContextIAMAuthorizer>({
        iam: authorizerContext,
      }),
      isBase64Encoded: false,
    },
    overrides as Partial<APIGatewayProxyEventV2WithIAMAuthorizer>
  );
};
