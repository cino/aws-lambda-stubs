import type {
  AppSyncIdentityCognito,
  AppSyncIdentityIAM,
  AppSyncIdentityLambda,
  AppSyncIdentityOIDC,
} from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './consts';
import { overwriteMerge } from './deepmerge';

type AppSyncIdentityType = 'iam' | 'cognito' | 'oidc' | 'lambda';
type AppSyncIdentityMap = {
  iam: AppSyncIdentityIAM;
  cognito: AppSyncIdentityCognito;
  oidc: AppSyncIdentityOIDC;
  lambda: AppSyncIdentityLambda;
};

export function AppSyncIdentityStub(type: 'iam', overrides?: Partial<AppSyncIdentityIAM>): AppSyncIdentityIAM;
export function AppSyncIdentityStub(
  type: 'cognito',
  overrides?: Partial<AppSyncIdentityCognito>
): AppSyncIdentityCognito;
export function AppSyncIdentityStub(type: 'oidc', overrides?: Partial<AppSyncIdentityOIDC>): AppSyncIdentityOIDC;
export function AppSyncIdentityStub(type: 'lambda', overrides?: Partial<AppSyncIdentityLambda>): AppSyncIdentityLambda;
export function AppSyncIdentityStub(
  type: AppSyncIdentityType,
  overrides: Partial<AppSyncIdentityMap[AppSyncIdentityType]> = {}
): AppSyncIdentityMap[AppSyncIdentityType] {
  switch (type) {
    case 'iam':
      return {
        accountId: DEFAULT_ACCOUNT_ID,
        cognitoIdentityPoolId: `${DEFAULT_REGION}:abcd1234-efgh-5678-ijkl-9012mnop3456`,
        cognitoIdentityId: `${DEFAULT_REGION}:abcdef12-3456-7890-abcd-ef1234567890`,
        sourceIp: ['203.0.113.1', '198.51.100.1'],
        username: 'jane_doe',
        userArn: `arn:aws:iam::${DEFAULT_ACCOUNT_ID}:user/jane_doe`,
        cognitoIdentityAuthType: 'AWS_IAM',
        cognitoIdentityAuthProvider: `cognito-idp.${DEFAULT_REGION}.amazonaws.com/${DEFAULT_REGION}_example`,

        ...overrides,
      };
    case 'cognito':
      return deepmerge(
        {
          sub: 'abcdef123456',
          issuer: `https://cognito-idp.${DEFAULT_REGION}.amazonaws.com/${DEFAULT_REGION}_example`,
          username: 'john_doe',
          claims: {
            email: 'john.doe@example.com',
            name: 'John Doe',
            phone_number: '+1234567890',
          },
          sourceIp: ['192.0.2.1', '198.51.100.2'],
          defaultAuthStrategy: 'ALLOW',
          groups: ['admin', 'users'],
        },
        overrides,
        { arrayMerge: overwriteMerge }
      );
    case 'oidc':
      return deepmerge(
        {
          claims: {
            email: 'john.doe@example.com',
            name: 'John Doe',
            roles: ['admin', 'user'],
          },
          issuer: 'https://example.com/oauth2/default',
          sub: '1234567890',
        },
        overrides
      );
    case 'lambda':
      return {
        resolverContext: {},

        ...overrides,
      };
  }
}
