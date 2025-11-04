import type { CloudWatchAlarmEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { deepMerge, randomInstanceId } from './utils';

type PartialCloudWatchAlarmEvent = Merge<
  Partial<CloudWatchAlarmEvent>,
  {
    alarmData?: Merge<
      Partial<CloudWatchAlarmEvent['alarmData']>,
      {
        state?: Partial<CloudWatchAlarmEvent['alarmData']['state']>;
        previousState?: Partial<CloudWatchAlarmEvent['alarmData']['previousState']>;
        configuration?: Partial<CloudWatchAlarmEvent['alarmData']['configuration']>;
      }
    >;
  }
>;

export const CloudWatchAlarmEventStub = (overrides: PartialCloudWatchAlarmEvent = {}): CloudWatchAlarmEvent => {
  const region = overrides.region ?? DEFAULT_REGION;

  return deepMerge(
    {
      source: 'aws.cloudwatch',
      alarmArn: `arn:aws:cloudwatch:${region}:${DEFAULT_ACCOUNT_ID}:alarm:example-alarm`,
      accountId: DEFAULT_ACCOUNT_ID,
      time: new Date().toISOString(),
      region,
      alarmData: {
        alarmName: 'lambda-demo-metric-alarm',
        state: {
          value: 'ALARM',
          reason: 'test',
          timestamp: '2023-08-04T12:36:15.490+0000',
        },
        previousState: {
          value: 'INSUFFICIENT_DATA',
          reason: 'Insufficient Data: 5 datapoints were unknown.',
          reasonData:
            '{"version":"1.0","queryDate":"2023-08-04T12:31:29.591+0000","statistic":"Average","period":60,"recentDatapoints":[],"threshold":5.0,"evaluatedDatapoints":[{"timestamp":"2023-08-04T12:30:00.000+0000"},{"timestamp":"2023-08-04T12:29:00.000+0000"},{"timestamp":"2023-08-04T12:28:00.000+0000"},{"timestamp":"2023-08-04T12:27:00.000+0000"},{"timestamp":"2023-08-04T12:26:00.000+0000"}]}',
          timestamp: '2023-08-04T12:31:29.595+0000',
        },
        configuration: {
          description: 'Metric Alarm to test Lambda actions',
          metrics: [
            {
              id: '1234e046-06f0-a3da-9534-EXAMPLEe4c',
              metricStat: {
                metric: {
                  namespace: 'AWS/Logs',
                  name: 'CallCount',
                  dimensions: {
                    InstanceId: randomInstanceId(),
                  },
                },
                period: 60,
                stat: 'Average',
                unit: 'Percent',
              },
              returnData: true,
            },
          ],
        },
      },
    },
    overrides as Partial<CloudWatchAlarmEvent>
  );
};
