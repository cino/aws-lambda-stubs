import { describe, expect, it } from 'vitest';
import { ALBEventStub } from '../src/alb';

describe('#alb', () => {
  it('should return a valid event', () => {
    const event = ALBEventStub();

    expect(event).toEqual({
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
    });
  });

  it('should allow overrides', () => {
    const event = ALBEventStub({
      httpMethod: 'POST',
      path: '/my/other/path',
      body: JSON.stringify({ key: 'value' }),
      isBase64Encoded: true,
    });

    expect(event).toEqual({
      requestContext: {
        elb: {
          targetGroupArn:
            'arn:aws:elasticloadbalancing:region:account-id:targetgroup/my-targets/1234567890123456',
        },
      },
      httpMethod: 'POST',
      path: '/my/other/path',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'value' }),
      isBase64Encoded: true,
    });
  });
});
