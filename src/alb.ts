import type { ALBEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { deepMerge } from './utils';

export const ALBEventStub = (overrides: Partial<ALBEvent> = {}): ALBEvent => {
  return deepMerge(
    {
      requestContext: {
        elb: {
          targetGroupArn: `arn:aws:elasticloadbalancing:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:targetgroup/my-targets/1234567890123456`,
        },
      },
      httpMethod: 'GET',
      path: '/prod/resource',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
      isBase64Encoded: false,
    },
    overrides as Partial<ALBEvent>
  );
};
