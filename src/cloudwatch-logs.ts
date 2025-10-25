import type { CloudWatchLogsDecodedData, CloudWatchLogsEvent, CloudWatchLogsLogEvent } from 'aws-lambda';
import deepmerge from 'deepmerge';
import { DateTime } from 'luxon';
import { DEFAULT_ACCOUNT_ID } from './common';

export const cloudWatchLogsEventStub = (overrides: Partial<CloudWatchLogsDecodedData> = {}): CloudWatchLogsEvent => {
  return {
    awslogs: {
      data: Buffer.from(
        JSON.stringify(
          deepmerge(
            {
              owner: DEFAULT_ACCOUNT_ID,
              logGroup: '/aws/lambda/example-log-group',
              logStream: '2023/10/01/[$LATEST]abcdef1234567890abcdef1234567890',
              subscriptionFilters: ['example-subscription-filter'],
              messageType: 'DATA_MESSAGE',
              logEvents: [
                {
                  id: 'eventId1',
                  timestamp: DateTime.now().toUnixInteger(),
                  message: 'This is a sample log message 1',
                },
                {
                  id: 'eventId2',
                  timestamp: DateTime.now().toUnixInteger(),
                  message: 'This is a sample log message 2',
                },
              ],
            },
            overrides
          )
        )
      ).toString('base64'),
    },
  };
};

export const cloudWatchLogsLogEventStub = (overrides: Partial<CloudWatchLogsLogEvent> = {}): CloudWatchLogsLogEvent => {
  return {
    id: 'eventId1',
    timestamp: DateTime.now().toUnixInteger(),
    message: 'This is a sample log message',

    ...overrides,
  };
};
