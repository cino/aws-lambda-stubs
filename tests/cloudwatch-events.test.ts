import { describe, expect, it } from 'vitest';
import { CloudWatchScheduledEventStub } from '../src';
import { DEFAULT_ACCOUNT_ID } from '../src/common';

describe('#cloudwatch-events', () => {
  describe('#cloudWatchScheduledEventStub', () => {
    it('should return a valid event', () => {
      const event = CloudWatchScheduledEventStub();

      expect(event).toEqual({
        version: '0',
        id: expect.any(String),
        'detail-type': 'Scheduled Event',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: expect.any(String),
        resources: [],
        detail: {},
      });
    });

    it('should allow overrides', () => {
      const event = CloudWatchScheduledEventStub({
        region: 'us-west-2',
        detail: { key: 'value' },
      });

      expect(event).toEqual({
        version: '0',
        id: expect.any(String),
        'detail-type': 'Scheduled Event',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.any(String),
        region: 'us-west-2',
        resources: [],
        detail: { key: 'value' },
      });
    });
  });
});
