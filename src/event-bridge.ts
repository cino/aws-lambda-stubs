import type { EventBridgeEvent } from 'aws-lambda';
import { v1 as uuidv1 } from 'uuid';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';

export const EventBridgeEventStub = <TDetail extends object>(
  detailType: string,
  detail: TDetail,
  overrides: Partial<EventBridgeEvent<typeof detailType, typeof detail>> = {}
): EventBridgeEvent<string, typeof detail> => {
  const region = overrides.region ?? DEFAULT_REGION;
  const account = overrides.account ?? DEFAULT_ACCOUNT_ID;

  return {
    version: '1',
    id: uuidv1(),
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
