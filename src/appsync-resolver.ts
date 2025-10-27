import type { AppSyncAuthorizerEvent, AppSyncResolverEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID } from './common';
import { deepMerge } from './utils/deepmerge';

export const AppSyncAuthorizerEventStub = (overrides: Partial<AppSyncAuthorizerEvent> = {}): AppSyncAuthorizerEvent => {
  return deepMerge<AppSyncAuthorizerEvent>(
    {
      authorizationToken: 'Bearer abcdef123456',
      requestContext: {
        apiId: '1234567890',
        accountId: DEFAULT_ACCOUNT_ID,
        requestId: crypto.randomUUID(),
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

type PartialAppSyncResolverEvent<TArguments, TSource> = Merge<
  Partial<AppSyncResolverEvent<TArguments, TSource>>,
  {
    info?: Partial<AppSyncResolverEvent<TArguments, TSource>['info']>;
    request?: Partial<AppSyncResolverEvent<TArguments, TSource>['request']>;
  }
>;

// biome-ignore lint/suspicious/noExplicitAny: Any in upstream type
export const AppSyncResolverEventStub = <TArguments = undefined, TSource = Record<string, any> | null>(
  overrides: PartialAppSyncResolverEvent<TArguments, TSource> = {}
): AppSyncResolverEvent<TArguments, TSource> => {
  return deepMerge<AppSyncResolverEvent<TArguments, TSource>>(
    {
      arguments: {} as TArguments,
      identity: undefined,
      source: {} as TSource,
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
    },
    overrides as Partial<AppSyncResolverEvent<TArguments, TSource>>
  );
};
