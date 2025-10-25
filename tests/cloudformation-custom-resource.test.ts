import { describe, expect, it } from 'vitest';
import {
  CloudFormationCustomResourceCreateEventStub,
  CloudFormationCustomResourceDeleteEventStub,
  CloudFormationCustomResourceUpdateEventStub,
} from '../src';
import { isUuidV4Regex } from './helpers';

describe('#cloudformation-custom-resource', () => {
  describe('#create-event', () => {
    it('should return a valid create event', () => {
      const event = CloudFormationCustomResourceCreateEventStub();

      expect(event).toEqual({
        RequestType: 'Create',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        ResourceProperties: {
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
          Key1: 'Value1',
          Key2: 'Value2',
        },
      });
    });

    it('should allow overrides', () => {
      const event = CloudFormationCustomResourceCreateEventStub({
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });

      expect(event).toEqual({
        RequestType: 'Create',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });
    });
  });

  describe('#update-event', () => {
    it('should return a valid update event', () => {
      const event = CloudFormationCustomResourceUpdateEventStub();

      expect(event).toEqual({
        RequestType: 'Update',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        PhysicalResourceId: 'my-physical-resource-id',
        ResourceProperties: {
          Key1: 'Value1',
          Key2: 'Value2',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
        OldResourceProperties: {
          Key1: 'OldValue1',
          Key2: 'OldValue2',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });
    });

    it('should allow overrides', () => {
      const event = CloudFormationCustomResourceUpdateEventStub({
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });

      expect(event).toEqual({
        RequestType: 'Update',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        PhysicalResourceId: 'my-physical-resource-id',
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
        OldResourceProperties: {
          Key1: 'OldValue1',
          Key2: 'OldValue2',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });
    });
  });

  describe('#delete-event', () => {
    it('should return a valid delete event', () => {
      const event = CloudFormationCustomResourceDeleteEventStub();

      expect(event).toEqual({
        RequestType: 'Delete',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        PhysicalResourceId: 'my-physical-resource-id',
        ResourceProperties: {
          Key1: 'Value1',
          Key2: 'Value2',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });
    });

    it('should allow overrides', () => {
      const event = CloudFormationCustomResourceDeleteEventStub({
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });

      expect(event).toEqual({
        RequestType: 'Delete',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cloudformation-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        PhysicalResourceId: 'my-physical-resource-id',
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });
    });
  });
});
