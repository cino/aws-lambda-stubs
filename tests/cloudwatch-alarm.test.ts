import { describe, expect, it } from 'vitest';
import { CloudWatchAlarmEventStub, DEFAULT_ACCOUNT_ID } from '../src';

describe('#cloudwatch-alarm', () => {
  describe('#cloudWatchAlarmEventStub', () => {
    it('should return a valid event', () => {
      const event = CloudWatchAlarmEventStub();

      expect(event).toEqual({
        source: 'aws.cloudwatch',
        alarmArn: `arn:aws:cloudwatch:us-east-1:${DEFAULT_ACCOUNT_ID}:alarm:example-alarm`,
        accountId: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-east-1',
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
                      InstanceId: 'i-12345678',
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
      });
    });

    it('should allow overrides', () => {
      const event = CloudWatchAlarmEventStub({
        region: 'us-west-2',
        alarmData: {
          state: {
            value: 'OK',
          },
        },
      });

      expect(event).toEqual({
        source: 'aws.cloudwatch',
        alarmArn: `arn:aws:cloudwatch:us-west-2:${DEFAULT_ACCOUNT_ID}:alarm:example-alarm`,
        accountId: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-west-2',
        alarmData: {
          alarmName: 'lambda-demo-metric-alarm',
          state: {
            value: 'OK',
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
                      InstanceId: 'i-12345678',
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
      });
    });
  });
});
