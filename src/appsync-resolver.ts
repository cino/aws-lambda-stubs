import type { AppSyncAuthorizerEvent } from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DEFAULT_ACCOUNT_ID } from './common';

export const appSyncAuthorizerEventStub = (overrides: Partial<AppSyncAuthorizerEvent> = {}): AppSyncAuthorizerEvent => {
  return deepmerge<AppSyncAuthorizerEvent>(
    {
      authorizationToken: 'Bearer abcdef123456',
      requestContext: {
        apiId: '1234567890',
        accountId: DEFAULT_ACCOUNT_ID,
        requestId: 'req-1234567890abcdef',
        queryString: 'query { getUser(id: "1") { name } }',
        operationName: 'getUser',
        variables: {
          id: '1',
        },
      },
      requestHeaders: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer abcdef123456',
        'X-Api-Key': 'xyz987654321',
      },
    },
    overrides
  );
};
