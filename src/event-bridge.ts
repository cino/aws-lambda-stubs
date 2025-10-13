import type { EventBridgeEvent } from 'aws-lambda';

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
    account: '123456789012',
    time: new Date().toISOString(),
    region: 'us-east-1',
    resources: [],
    detail,
    ...overrides,
  };
};
