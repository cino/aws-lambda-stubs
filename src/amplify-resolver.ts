import type { AmplifyGraphQlResolverEvent } from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { Merge } from 'type-fest';
import { appSyncIdentityStub } from './common';

type PartialAmplifyGraphQlResolverEvent<
  // biome-ignore lint/suspicious/noExplicitAny: any in AmplifyGraphQlResolverEvent type
  TArguments = Record<string, any>,
  // biome-ignore lint/suspicious/noExplicitAny: any in AmplifyGraphQlResolverEvent type
  TSource = Record<string, any>,
> = Merge<
  Partial<AmplifyGraphQlResolverEvent<TArguments, TSource>>,
  {
    request?: Partial<AmplifyGraphQlResolverEvent<TArguments, TSource>['request']>;
  }
>;

export const amplifyGraphqlResolverEventStub = <
  // biome-ignore lint/suspicious/noExplicitAny: any in AmplifyGraphQlResolverEvent type
  TArguments = Record<string, any>,
  // biome-ignore lint/suspicious/noExplicitAny: any in AmplifyGraphQlResolverEvent type
  TSource = Record<string, any>,
>(
  overrides: PartialAmplifyGraphQlResolverEvent = {}
): AmplifyGraphQlResolverEvent<TArguments, TSource> => {
  return deepmerge(
    {
      typeName: 'Query',
      fieldName: 'getUser',
      arguments: {
        id: '123',
      } as TArguments,
      identity: appSyncIdentityStub('lambda'),
      source: {
        userId: '123',
        name: 'John Doe',
      } as TSource,
      request: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer abcdef123456',
        },
        domainName: 'api.example.com',
      },
      prev: null,
    },
    overrides
  );
};
