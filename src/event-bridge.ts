import type { EventBridgeEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

export const eventBridgeEventStub = (
  detailType: string,
  detail: object,
  overrides: Partial<EventBridgeEvent<typeof detailType, typeof detail>> = {}
): EventBridgeEvent<typeof detailType, typeof detail> => {
  return {
    version: '0',
    id: '12345678-1234-1234-1234-123456789012',
    'detail-type': detailType,
    source: 'test',
    account: DEFAULT_ACCOUNT_ID,
    time: new Date().toISOString(),
    region: DEFAULT_REGION,
    resources: [],
    detail,
    ...overrides,
  };
};
