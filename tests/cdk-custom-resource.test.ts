import { describe, expect, it } from 'vitest';
import {
  CdkCustomResourceCreateEventStub,
  CdkCustomResourceDeleteEventStub,
  CdkCustomResourceIsCompleteEventStub,
  CdkCustomResourceUpdateEventStub,
} from '../src';
import { isUuidV4Regex } from './helpers';

describe('#cdk-custom-resource', () => {
  describe('#create-event', () => {
    it('should return a valid create event', () => {
      const event = CdkCustomResourceCreateEventStub();

      expect(event).toEqual({
        RequestType: 'Create',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
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
      const event = CdkCustomResourceCreateEventStub({
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });

      expect(event).toEqual({
        RequestType: 'Create',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
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
      const event = CdkCustomResourceUpdateEventStub();

      expect(event).toEqual({
        RequestType: 'Update',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        ResourceProperties: {
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
          Key1: 'Value1',
          Key2: 'Value2',
        },
        OldResourceProperties: {
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
          Key1: 'OldValue1',
          Key2: 'OldValue2',
        },
        PhysicalResourceId: 'my-physical-resource-id',
      });
    });

    it('should allow overrides', () => {
      const event = CdkCustomResourceUpdateEventStub({
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });

      expect(event).toEqual({
        RequestType: 'Update',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
        OldResourceProperties: {
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
          Key1: 'OldValue1',
          Key2: 'OldValue2',
        },
        PhysicalResourceId: 'my-physical-resource-id',
      });
    });
  });

  describe('#delete-event', () => {
    it('should return a valid delete event', () => {
      const event = CdkCustomResourceDeleteEventStub();

      expect(event).toEqual({
        RequestType: 'Delete',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        ResourceProperties: {
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
          Key1: 'Value1',
          Key2: 'Value2',
        },
        PhysicalResourceId: 'my-physical-resource-id',
      });
    });

    it('should allow overrides', () => {
      const event = CdkCustomResourceDeleteEventStub({
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
      });

      expect(event).toEqual({
        RequestType: 'Delete',
        ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        ResponseURL: 'https://cdk-custom-resource-response-useast1.s3.amazonaws.com/...',
        StackId: 'arn:aws:cloudformation:us-east-1:012345678901:stack/my-stack/abcd1234-ef56-7890-abcd-1234ef567890',
        RequestId: expect.stringMatching(isUuidV4Regex),
        ResourceType: 'Custom::MyCustomResource',
        LogicalResourceId: 'MyCustomResource',
        ResourceProperties: {
          Key1: 'OverriddenValue1',
          Key3: 'Value3',
          ServiceToken: 'arn:aws:lambda:us-east-1:012345678901:function:my-function',
        },
        PhysicalResourceId: 'my-physical-resource-id',
      });
    });
  });

  describe('#is-complete-event', () => {
    it('should return a valid is-complete event', () => {
      const baseEvent = CdkCustomResourceCreateEventStub();
      const event = CdkCustomResourceIsCompleteEventStub(baseEvent);

      expect(event).toEqual({
        ...baseEvent,
        PhysicalResourceId: 'my-physical-resource-id',
        Data: {},
      });
    });

    it('should allow overrides', () => {
      const baseEvent = CdkCustomResourceCreateEventStub();
      const event = CdkCustomResourceIsCompleteEventStub(baseEvent, {
        PhysicalResourceId: 'overridden-physical-resource-id',
        Data: {
          Key1: 'Value1',
        },
      });

      expect(event).toEqual({
        ...baseEvent,
        PhysicalResourceId: 'overridden-physical-resource-id',
        Data: {
          Key1: 'Value1',
        },
      });
    });
  });
});
