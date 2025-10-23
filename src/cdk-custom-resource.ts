import type {
  CdkCustomResourceEvent,
  CdkCustomResourceIsCompleteEvent,
  CloudFormationCustomResourceResourcePropertiesCommon,
} from 'aws-lambda';
import {
  cloudFormationCustomResourceCreateEventStub,
  cloudFormationCustomResourceDeleteEventStub,
  cloudFormationCustomResourceUpdateEventStub,
} from './cloudformation-custom-resource';

export const cdkCustomResourceCreateEventStub = <
  TResourceProperties = CloudFormationCustomResourceResourcePropertiesCommon,
  TOldResourceProperties = TResourceProperties,
>(
  overrides: Partial<CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>> = {}
): CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties> => {
  return {
    ...cloudFormationCustomResourceCreateEventStub(),
    ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
    ...overrides,
  } as CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>;
};

export const cdkCustomResourceUpdateEventStub = <
  TResourceProperties = CloudFormationCustomResourceResourcePropertiesCommon,
  TOldResourceProperties = TResourceProperties,
>(
  overrides: Partial<CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>> = {}
): CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties> => {
  return {
    ...cloudFormationCustomResourceUpdateEventStub(),
    ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
    ...overrides,
  } as CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>;
};

export const cdkCustomResourceDeleteEventStub = <
  TResourceProperties = CloudFormationCustomResourceResourcePropertiesCommon,
  TOldResourceProperties = TResourceProperties,
>(
  overrides: Partial<CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>> = {}
): CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties> => {
  return {
    ...cloudFormationCustomResourceDeleteEventStub(),
    ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
    ...overrides,
  } as CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>;
};

export const cdkCustomResourceIsCompleteEventStub = <
  TResourceProperties = CloudFormationCustomResourceResourcePropertiesCommon,
  // biome-ignore lint/suspicious/noExplicitAny: is any in CdkCustomResourceIsCompleteEvent
  TData extends Record<string, any> = Record<string, any>,
  TOldResourceProperties = TResourceProperties,
>(
  event: CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>,
  overrides: Partial<CdkCustomResourceIsCompleteEvent<TResourceProperties, TData, TOldResourceProperties>> = {}
): CdkCustomResourceIsCompleteEvent<TResourceProperties, TData, TOldResourceProperties> => {
  return {
    ...event,
    ...{
      PhysicalResourceId: 'my-physical-resource-id',
      Data: {} as TData,
    },
    ...overrides,
  } as CdkCustomResourceIsCompleteEvent<TResourceProperties, TData, TOldResourceProperties>;
};
