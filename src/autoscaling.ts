import type { AutoScalingScaleInEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_AVAILABILITY_ZONE, DEFAULT_REGION } from './common';

export const autoScalingScaleInEventStub = (
  overrides: Partial<AutoScalingScaleInEvent> = {}
): AutoScalingScaleInEvent => {
  const autoScalingGroupName = overrides.AutoScalingGroupName || 'my-asg';

  return {
    AutoScalingGroupARN: `arn:aws:autoscaling:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:autoScalingGroup:abcdefg:autoScalingGroupName/${autoScalingGroupName}`,
    AutoScalingGroupName: autoScalingGroupName,

    CapacityToTerminate: [
      {
        AvailabilityZone: DEFAULT_AVAILABILITY_ZONE,
        Capacity: 1,
        InstanceMarketOption: 'on-demand',
      },
    ],
    Instances: [
      {
        AvailabilityZone: DEFAULT_AVAILABILITY_ZONE,
        InstanceId: 'i-1234567890abcdef0',
        InstanceType: 't2.micro',
        InstanceMarketOption: 'on-demand',
      },
    ],
    Cause: 'SCALE_IN',

    ...overrides,
  };
};
