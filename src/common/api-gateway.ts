import type {
  APIGatewayEventIdentity,
  APIGatewayEventRequestContext,
  APIGatewayEventRequestContextV2,
  APIGatewayEventRequestContextWithAuthorizer,
} from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID } from './consts';
import { randomIpAddress } from './random';

export type PartialAPIGatewayEventRequestContext<TAuthorizer> = Merge<
  Partial<APIGatewayEventRequestContextWithAuthorizer<TAuthorizer>>,
  {
    authorizer: APIGatewayEventRequestContext['authorizer'];
    identity?: Partial<APIGatewayEventIdentity>;
  }
>;

export const APIGatewayEventRequestContextWithAuthorizerStub = <TAuthorizer>(
  overrides: PartialAPIGatewayEventRequestContext<TAuthorizer> = {
    authorizer: undefined,
  }
): APIGatewayEventRequestContextWithAuthorizer<TAuthorizer> => {
  return deepmerge<APIGatewayEventRequestContextWithAuthorizer<TAuthorizer>>(
    {
      accountId: DEFAULT_ACCOUNT_ID,
      apiId: 'example',
      protocol: 'HTTP/1.1',
      httpMethod: 'GET',
      identity: APIGatewayEventIdentityStub(), // TODO: default identity stub
      path: '/prod/resource',
      stage: 'prod',
      requestId: crypto.randomUUID(),
      requestTimeEpoch: 1678649038000, // TODO: dynamic
      resourceId: 'resource-id',
      resourcePath: '/resource',
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
  return deepmerge(
    {
      accountId: DEFAULT_ACCOUNT_ID,
      apiId: 'example',
      domainName: 'id.execute-api.us-east-1.amazonaws.com',
      domainPrefix: 'id',
      http: {
        method: 'GET',
        path: '/prod/resource',
        protocol: 'HTTP/1.1',
        sourceIp: randomIpAddress(),
        userAgent: 'Custom User Agent String',
      },
      requestId: crypto.randomUUID(),
      stage: 'prod',
      time: '12/Mar/2023:19:03:58 +0000', // TODO dynamic
      timeEpoch: 1678649038000,
    },
    overrides
  );
};

// TODO: Gateway Identity stubs (...overloading again)
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
    // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/73964
    // vpcId: null,
    // vpceId: null,
    ...overrides,
  };
};
