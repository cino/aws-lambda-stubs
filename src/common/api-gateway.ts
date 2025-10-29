import type {
  APIGatewayEventIdentity,
  APIGatewayEventRequestContextV2,
  APIGatewayEventRequestContextWithAuthorizer,
} from 'aws-lambda';
import { DateTime } from 'luxon';
import type { Merge } from 'type-fest';
import { randomIpAddress } from '../utils';
import { deepMerge } from '../utils/deepmerge';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './consts';

export type PartialAPIGatewayEventRequestContext<TAuthorizer> = Merge<
  Partial<APIGatewayEventRequestContextWithAuthorizer<TAuthorizer>>,
  {
    authorizer?: TAuthorizer | undefined;
    identity?: Partial<APIGatewayEventIdentity>;
  }
>;

export const APIGatewayEventRequestContextWithAuthorizerStub = <TAuthorizer>(
  overrides: PartialAPIGatewayEventRequestContext<TAuthorizer> = {
    authorizer: undefined,
  }
): APIGatewayEventRequestContextWithAuthorizer<TAuthorizer> => {
  return deepMerge<APIGatewayEventRequestContextWithAuthorizer<TAuthorizer>>(
    {
      accountId: DEFAULT_ACCOUNT_ID,
      apiId: 'example',
      protocol: 'HTTP/1.1',
      httpMethod: 'GET',
      identity: APIGatewayEventIdentityStub(),
      path: '/prod/resource',
      stage: 'prod',
      requestId: crypto.randomUUID(),
      requestTimeEpoch: DateTime.now().toUnixInteger(),
      resourceId: 'resource-id',
      resourcePath: '/resource',
      authorizer: undefined as TAuthorizer, // Will be overridden by deepMerge
    },
    overrides as APIGatewayEventRequestContextWithAuthorizer<TAuthorizer>
  );
};

export type PartialAPIGatewayEventRequestContextV2 = Merge<
  Partial<APIGatewayEventRequestContextV2>,
  {
    http?: Partial<APIGatewayEventRequestContextV2['http']>;
  }
>;

/**
 * Returns a default API Gateway Event Request Context V2 object,
 * which is an _unauthenticated_ representation of the request context.
 */
export const APIGatewayEventRequestContextV2Stub = (
  overrides: PartialAPIGatewayEventRequestContextV2 = {}
): APIGatewayEventRequestContextV2 => {
  const dateTime = DateTime.now();

  return deepMerge(
    {
      accountId: DEFAULT_ACCOUNT_ID,
      apiId: 'example',
      domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
      domainPrefix: 'id',
      http: {
        method: 'GET',
        path: '/prod/resource',
        protocol: 'HTTP/1.1',
        sourceIp: randomIpAddress(),
        userAgent: 'Custom User Agent String',
      },
      requestId: crypto.randomUUID(),
      routeKey: '$default',
      stage: 'prod',
      time: dateTime.toFormat('dd/MMM/yyyy:HH:mm:ss ZZZ'),
      timeEpoch: dateTime.toUnixInteger(),
    },
    overrides as Partial<APIGatewayEventRequestContextV2>
  );
};

export const APIGatewayEventRequestContextV2WithAuthorizerStub = <TAuthorizer>(
  authorizer: TAuthorizer,
  overrides: PartialAPIGatewayEventRequestContextV2 = {}
): APIGatewayEventRequestContextV2 & {
  authorizer: TAuthorizer;
} => {
  return deepMerge<
    APIGatewayEventRequestContextV2 & {
      authorizer: TAuthorizer;
    }
  >(
    {
      ...APIGatewayEventRequestContextV2Stub(overrides),
      authorizer: undefined as TAuthorizer, // will be overwrtitten by deepMerge
    },
    { authorizer }
  );
};

export const APIGatewayEventIdentityStub = (
  overrides: Partial<APIGatewayEventIdentity> = {}
): APIGatewayEventIdentity => {
  return {
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
    sourceIp: randomIpAddress(),
    user: null,
    userAgent: null,
    userArn: null,
    vpcId: null,
    vpceId: null,
    ...overrides,
  };
};
