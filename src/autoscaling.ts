import type { AutoScalingScaleInEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_AVAILABILITY_ZONE, DEFAULT_REGION, randomInstanceId } from './common';

export const AutoScalingScaleInEventStub = (
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
        InstanceId: randomInstanceId(),
        InstanceType: 't2.micro',
        InstanceMarketOption: 'on-demand',
      },
    ],
    Cause: 'SCALE_IN',

    ...overrides,
  };
};
