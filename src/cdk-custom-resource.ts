import type {
  CdkCustomResourceEvent,
  CdkCustomResourceIsCompleteEvent,
  CloudFormationCustomResourceResourcePropertiesCommon,
} from 'aws-lambda';
import {
  CloudFormationCustomResourceCreateEventStub,
  CloudFormationCustomResourceDeleteEventStub,
  CloudFormationCustomResourceUpdateEventStub,
} from './cloudformation-custom-resource';

export const CdkCustomResourceCreateEventStub = <
  TResourceProperties = CloudFormationCustomResourceResourcePropertiesCommon,
  TOldResourceProperties = TResourceProperties,
>(
  overrides: Partial<CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>> = {}
): CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties> => {
  return {
    ...CloudFormationCustomResourceCreateEventStub(),
    ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
    ...overrides,
  } as CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>;
};

export const CdkCustomResourceUpdateEventStub = <
  TResourceProperties = CloudFormationCustomResourceResourcePropertiesCommon,
  TOldResourceProperties = TResourceProperties,
>(
  overrides: Partial<CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>> = {}
): CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties> => {
  return {
    ...CloudFormationCustomResourceUpdateEventStub(),
    ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
    ...overrides,
  } as CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>;
};

export const CdkCustomResourceDeleteEventStub = <
  TResourceProperties = CloudFormationCustomResourceResourcePropertiesCommon,
  TOldResourceProperties = TResourceProperties,
>(
  overrides: Partial<CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>> = {}
): CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties> => {
  return {
    ...CloudFormationCustomResourceDeleteEventStub(),
    ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
    ...overrides,
  } as CdkCustomResourceEvent<TResourceProperties, TOldResourceProperties>;
};

export const CdkCustomResourceIsCompleteEventStub = <
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
