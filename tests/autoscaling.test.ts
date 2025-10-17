import { autoScalingScaleInEventStub } from 'src';
import { describe, expect, it } from 'vitest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/common';

describe('#autoscaling', () => {
  it('should return a valid event', () => {
    const event = autoScalingScaleInEventStub();

    expect(event).toEqual({
      AutoScalingGroupARN: `arn:aws:autoscaling:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:autoScalingGroup:abcdefg:autoScalingGroupName/my-asg`,
      AutoScalingGroupName: 'my-asg',
      CapacityToTerminate: [
        {
          AvailabilityZone: 'us-east-1a',
          Capacity: 1,
          InstanceMarketOption: 'on-demand',
        },
      ],
      Instances: [
        {
          AvailabilityZone: 'us-east-1a',
          InstanceId: 'i-1234567890abcdef0',
          InstanceType: 't2.micro',
          InstanceMarketOption: 'on-demand',
        },
      ],
      Cause: 'SCALE_IN',
    });
  });

  it('should allow overrides', () => {
    const event = autoScalingScaleInEventStub({
      AutoScalingGroupName: 'custom-asg',
      Cause: 'INSTANCE_REFRESH',
    });

    expect(event).toEqual({
      AutoScalingGroupARN: `arn:aws:autoscaling:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:autoScalingGroup:abcdefg:autoScalingGroupName/custom-asg`,
      AutoScalingGroupName: 'custom-asg',
      CapacityToTerminate: [
        {
          AvailabilityZone: 'us-east-1a',
          Capacity: 1,
          InstanceMarketOption: 'on-demand',
        },
      ],
      Instances: [
        {
          AvailabilityZone: 'us-east-1a',
          InstanceId: 'i-1234567890abcdef0',
          InstanceType: 't2.micro',
          InstanceMarketOption: 'on-demand',
        },
      ],
      Cause: 'INSTANCE_REFRESH',
    });
  });
});
