import { describe, expect, it } from 'vitest';
import { amplifyGraphqlResolverEventStub } from '../src';

describe('#amplify', () => {
  describe('#amplify-resolver-event', () => {
    it('should return a valid event', () => {
      const event = amplifyGraphqlResolverEventStub();

      expect(event).toEqual({
        typeName: 'Query',
        fieldName: 'getUser',
        arguments: {
          id: '123',
        },
        identity: {
          resolverContext: {},
        },
        source: {
          userId: '123',
          name: 'John Doe',
        },
        request: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer abcdef123456',
          },
          domainName: 'api.example.com',
        },
        prev: null,
      });
    });

    it('should allow overrides', () => {
      const event = amplifyGraphqlResolverEventStub({
        typeName: 'Mutation',
        fieldName: 'createUser',
        arguments: {
          id: '456',
          name: 'Jane Smith',
        },
        identity: {
          resolverContext: {
            user: {
              email: 'jane_smith@example.com',
            },
          },
        },
        source: {
          userId: '456',
          name: 'Jane Smith',
        },
        request: {
          headers: {
            Authorization: 'Bearer abcdef654321',
          },
        },
      });

      expect(event).toEqual({
        typeName: 'Mutation',
        fieldName: 'createUser',
        arguments: {
          id: '456',
          name: 'Jane Smith',
        },
        identity: {
          resolverContext: {
            user: {
              email: 'jane_smith@example.com',
            },
          },
        },
        source: {
          userId: '456',
          name: 'Jane Smith',
        },
        request: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer abcdef654321',
          },
          domainName: 'api.example.com',
        },
        prev: null,
      });
    });
  });
});
