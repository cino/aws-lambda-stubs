import { describe, expect, it } from 'vitest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION, EventBridgeEventStub } from '../src';
import { isoDateRegex, uuidv1Regex } from './helpers';

describe('#event-bridge', () => {
  it('should return a valid event', () => {
    const event = EventBridgeEventStub('TestDetailType', { key: 'value' });

    expect(event).toEqual({
      version: '1',
      id: expect.stringMatching(uuidv1Regex),
      'detail-type': 'TestDetailType',
      source: 'test',
      account: DEFAULT_ACCOUNT_ID,
      time: expect.stringMatching(isoDateRegex),
      region: DEFAULT_REGION,
      resources: [],
      detail: { key: 'value' },
    });
  });

  it('should allow overrides', () => {
    const event = EventBridgeEventStub(
      'TestDetailType',
      { key: 'value' },
      { region: 'us-west-2', account: '098765432109' }
    );

    expect(event).toEqual({
      version: '1',
      id: expect.stringMatching(uuidv1Regex),
      'detail-type': 'TestDetailType',
      source: 'test',
      account: '098765432109',
      time: expect.stringMatching(isoDateRegex),
      region: 'us-west-2',
      resources: [],
      detail: { key: 'value' },
    });
  });

  it('should allow overwriting region and account in overrides', () => {
    const event = EventBridgeEventStub(
      'TestDetailType',
      { key: 'value' },
      { region: 'eu-central-1', account: '112233445566' }
    );

    expect(event).toEqual({
      version: '1',
      id: expect.stringMatching(uuidv1Regex),
      'detail-type': 'TestDetailType',
      source: 'test',
      account: '112233445566',
      time: expect.stringMatching(isoDateRegex),
      region: 'eu-central-1',
      resources: [],
      detail: { key: 'value' },
    });
  });
});
