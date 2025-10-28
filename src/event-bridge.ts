import type { EventBridgeEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

export const EventBridgeEventStub = <TDetail extends object>(
  detailType: string,
  detail: TDetail,
  overrides: Partial<EventBridgeEvent<typeof detailType, typeof detail>> = {}
): EventBridgeEvent<string, typeof detail> => {
  const region = overrides.region ?? DEFAULT_REGION;
  const account = overrides.account ?? DEFAULT_ACCOUNT_ID;

  return {
    version: '0',
    id: '12345678-1234-1234-1234-123456789012',
    'detail-type': detailType,
    source: 'test',
    account,
    time: new Date().toISOString(),
    region,
    resources: [],
    detail,
    ...overrides,
  };
};
