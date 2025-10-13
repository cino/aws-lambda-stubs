import type { ALBEvent } from 'aws-lambda';

export const ALBEventStub = (overrides: Partial<ALBEvent> = {}): ALBEvent => {
  return {
    requestContext: {
      elb: {
        targetGroupArn:
          'arn:aws:elasticloadbalancing:region:account-id:targetgroup/my-targets/1234567890123456',
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
