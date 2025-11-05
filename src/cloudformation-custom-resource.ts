import type {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceUpdateEvent,
} from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

export const CloudFormationCustomResourceCreateEventStub = (
  overrides: Partial<CloudFormationCustomResourceCreateEvent> = {}
): CloudFormationCustomResourceCreateEvent => {
  return {
    RequestType: 'Create',
    ServiceToken: `arn:aws:lambda:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:function:my-function`,
    ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
    StackId: `arn:aws:cloudformation:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890`,
    RequestId: uuidv4(),
    ResourceType: 'Custom::MyCustomResource',
    LogicalResourceId: 'MyCustomResource',
    ResourceProperties: {
      ServiceToken: `arn:aws:lambda:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:function:my-function`,
      Key1: 'Value1',
      Key2: 'Value2',
    },
    ...overrides,
  };
};

export const CloudFormationCustomResourceUpdateEventStub = (
  overrides: Partial<CloudFormationCustomResourceUpdateEvent> = {}
): CloudFormationCustomResourceUpdateEvent => {
  return {
    RequestType: 'Update',
    ServiceToken: `arn:aws:lambda:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:function:my-function`,
    ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
    StackId: `arn:aws:cloudformation:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890`,
    RequestId: uuidv4(),
    ResourceType: 'Custom::MyCustomResource',
    LogicalResourceId: 'MyCustomResource',
    PhysicalResourceId: 'my-physical-resource-id',
    ResourceProperties: {
      ServiceToken: `arn:aws:lambda:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:function:my-function`,
      Key1: 'Value1',
      Key2: 'Value2',
    },
    OldResourceProperties: {
      ServiceToken: `arn:aws:lambda:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:function:my-function`,
      Key1: 'OldValue1',
      Key2: 'OldValue2',
    },
    ...overrides,
  };
};

export const CloudFormationCustomResourceDeleteEventStub = (
  overrides: Partial<CloudFormationCustomResourceDeleteEvent> = {}
): CloudFormationCustomResourceDeleteEvent => {
  return {
    RequestType: 'Delete',
    ServiceToken: `arn:aws:lambda:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:function:my-function`,
    ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
    StackId: `arn:aws:cloudformation:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890`,
    RequestId: uuidv4(),
    ResourceType: 'Custom::MyCustomResource',
    LogicalResourceId: 'MyCustomResource',
    ResourceProperties: {
      ServiceToken: `arn:aws:lambda:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:function:my-function`,
      Key1: 'Value1',
      Key2: 'Value2',
    },
    PhysicalResourceId: 'my-physical-resource-id',
    ...overrides,
  };
};
