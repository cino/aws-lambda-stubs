import { describe, expect, it } from 'vitest';
import { AppSyncAuthorizerEventStub, AppSyncIdentityStub, AppSyncResolverEventStub, DEFAULT_ACCOUNT_ID } from '../src';
import { isUuidV4Regex } from './helpers';

describe('#appsync-resolver', () => {
  describe('#authorizer-event', () => {
    it('should return a valid event', () => {
      const event = AppSyncAuthorizerEventStub();

      expect(event).toEqual({
        authorizationToken: 'Bearer abcdef123456',
        requestContext: {
          apiId: '1234567890',
          accountId: DEFAULT_ACCOUNT_ID,
          requestId: expect.stringMatching(isUuidV4Regex),
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
      const event = AppSyncAuthorizerEventStub({
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
          requestId: expect.stringMatching(isUuidV4Regex),
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

  describe('#resolver-event', () => {
    it('should return a valid event', () => {
      const event = AppSyncResolverEventStub();

      expect(event).toEqual({
        arguments: {},
        identity: undefined,
        source: {} as { name: string },
        request: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer abcdef123456',
          },
          domainName: 'api.example.com',
        },
        info: {
          selectionSetList: ['id', 'name'],
          selectionSetGraphQL: '{ id name }',
          parentTypeName: 'Query',
          fieldName: 'getUser',
          variables: {
            id: '1',
          },
        },
        prev: null,
        stash: {},
      });
    });

    it('should allow overrides', () => {
      const event = AppSyncResolverEventStub({
        arguments: { id: '2' },
        info: {
          fieldName: 'listUsers',
        },
        identity: AppSyncIdentityStub('lambda', { resolverContext: { username: 'custom_lambda_user' } }),
      });

      expect(event).toEqual({
        arguments: { id: '2' },
        identity: {
          resolverContext: { username: 'custom_lambda_user' },
        },
        source: {} as { name: string },
        request: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer abcdef123456',
          },
          domainName: 'api.example.com',
        },
        info: {
          selectionSetList: ['id', 'name'],
          selectionSetGraphQL: '{ id name }',
          parentTypeName: 'Query',
          fieldName: 'listUsers',
          variables: {
            id: '1',
          },
        },
        prev: null,
        stash: {},
      });
    });
  });
});
