import { describe, expect, it } from 'vitest';
import { eventBridgeEventStub } from '../src';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/common';

describe('#event-bridge', () => {
  it('should return a valid event', () => {
    const event = eventBridgeEventStub('TestDetailType', { key: 'value' });

    expect(event).toEqual({
      version: '0',
      id: '12345678-1234-1234-1234-123456789012',
      'detail-type': 'TestDetailType',
      source: 'test',
      account: DEFAULT_ACCOUNT_ID,
      time: expect.any(String),
      region: DEFAULT_REGION,
      resources: [],
      detail: { key: 'value' },
    });
  });

  it('should allow overrides', () => {
    const event = eventBridgeEventStub(
      'TestDetailType',
      { key: 'value' },
      { region: 'us-west-2', account: '098765432109' }
    );

    expect(event).toEqual({
      version: '0',
      id: '12345678-1234-1234-1234-123456789012',
      'detail-type': 'TestDetailType',
      source: 'test',
      account: '098765432109',
      time: expect.any(String),
      region: 'us-west-2',
      resources: [],
      detail: { key: 'value' },
    });
  });
});
