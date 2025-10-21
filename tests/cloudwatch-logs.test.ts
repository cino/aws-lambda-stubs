import { cloudWatchLogsEventStub, cloudWatchLogsLogEventStub } from 'src';
import { describe, expect, it } from 'vitest';
import { DEFAULT_ACCOUNT_ID } from '../src/common';

describe('#cloudwatch-logs', () => {
  describe('#cloudWatchLogsEventStub', () => {
    it('should return a valid event', () => {
      const event = cloudWatchLogsEventStub();

      expect(event).toEqual({
        awslogs: {
          data: expect.any(String),
        },
      });

      const decodedData = JSON.parse(Buffer.from(event.awslogs.data, 'base64').toString('utf-8'));

      expect(decodedData).toEqual({
        owner: DEFAULT_ACCOUNT_ID,
        logGroup: '/aws/lambda/example-log-group',
        logStream: '2023/10/01/[$LATEST]abcdef1234567890abcdef1234567890',
        subscriptionFilters: ['example-subscription-filter'],
        messageType: 'DATA_MESSAGE',
        logEvents: [
          {
            id: 'eventId1',
            timestamp: expect.any(Number),
            message: 'This is a sample log message 1',
          },
          {
            id: 'eventId2',
            timestamp: expect.any(Number),
            message: 'This is a sample log message 2',
          },
        ],
      });
    });

    it('should allow overrides', () => {
      const event = cloudWatchLogsEventStub({
        logGroup: '/aws/lambda/overridden-log-group',
      });

      const decodedData = JSON.parse(Buffer.from(event.awslogs.data, 'base64').toString('utf-8'));

      expect(decodedData).toEqual({
        owner: DEFAULT_ACCOUNT_ID,
        logGroup: '/aws/lambda/overridden-log-group',
        logStream: '2023/10/01/[$LATEST]abcdef1234567890abcdef1234567890',
        subscriptionFilters: ['example-subscription-filter'],
        messageType: 'DATA_MESSAGE',
        logEvents: [
          {
            id: 'eventId1',
            timestamp: expect.any(Number),
            message: 'This is a sample log message 1',
          },
          {
            id: 'eventId2',
            timestamp: expect.any(Number),
            message: 'This is a sample log message 2',
          },
        ],
      });
    });
  });

  describe('#cloudWatchLogsLogEventStub', () => {
    it('should return a valid event', () => {
      const logEvent = cloudWatchLogsLogEventStub();

      expect(logEvent).toEqual({
        id: 'eventId1',
        timestamp: expect.any(Number),
        message: 'This is a sample log message',
      });
    });

    it('should allow overrides', () => {
      const logEvent = cloudWatchLogsLogEventStub({
        id: 'overriddenEventId',
        message: 'This is an overridden log message',
      });

      expect(logEvent).toEqual({
        id: 'overriddenEventId',
        timestamp: expect.any(Number),
        message: 'This is an overridden log message',
      });
    });
  });
});
