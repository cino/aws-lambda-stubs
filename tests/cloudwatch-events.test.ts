import { describe, expect, it } from 'vitest';
import { CloudWatchScheduledEventStub, DEFAULT_ACCOUNT_ID } from '../src';
import { isoDateRegex } from './helpers';

describe('#cloudwatch-events', () => {
  describe('#cloudWatchScheduledEventStub', () => {
    it('should return a valid event', () => {
      const event = CloudWatchScheduledEventStub();

      expect(event).toEqual({
        version: '1',
        id: expect.any(String),
        'detail-type': 'Scheduled Event',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.stringMatching(isoDateRegex),
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
        version: '1',
        id: expect.any(String),
        'detail-type': 'Scheduled Event',
        source: 'test',
        account: DEFAULT_ACCOUNT_ID,
        time: expect.stringMatching(isoDateRegex),
        region: 'us-west-2',
        resources: [],
        detail: { key: 'value' },
      });
    });
  });
});
