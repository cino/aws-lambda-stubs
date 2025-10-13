import type { ALBEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './utils';

export const ALBEventStub = (overrides: Partial<ALBEvent> = {}): ALBEvent => {
  return {
    requestContext: {
      elb: {
        targetGroupArn: `arn:aws:elasticloadbalancing:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:targetgroup/my-targets/1234567890123456`,
      },
    },
    httpMethod: 'GET',
    path: '/my/path',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
    isBase64Encoded: false,

    ...overrides,
  };
};
