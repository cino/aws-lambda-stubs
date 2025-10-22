import { appSyncAuthorizerEventStub } from 'src/appsync-resolver';
import { DEFAULT_ACCOUNT_ID } from 'src/common';
import { describe, expect, it } from 'vitest';

describe('#appsync-resolver', () => {
  describe('#authorizer-event', () => {
    it('should return a valid event', () => {
      const event = appSyncAuthorizerEventStub();

      expect(event).toEqual({
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
      });
    });

    it('should allow overrides', () => {
      const event = appSyncAuthorizerEventStub({
        authorizationToken: 'Bearer newtoken123456',
        requestHeaders: {
          Authorization: 'Bearer newtoken123456',
        },
      });

      expect(event).toEqual({
        authorizationToken: 'Bearer newtoken123456',
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
          Authorization: 'Bearer newtoken123456',
          'X-Api-Key': 'xyz987654321',
        },
      });
    });
  });
});
