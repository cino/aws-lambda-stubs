import { describe, expect, it } from 'vitest';
import { APIGatewayEventRequestContextV2Stub, DEFAULT_ACCOUNT_ID } from '../../src/common';
import { ipv4Regex, isUuidV4Regex } from '../helpers';

describe('#api-gateway', () => {
  describe('api-gateway-event-request-context-v2', () => {
    it('should return the api gateway event request context', () => {
      const event = APIGatewayEventRequestContextV2Stub();

      expect(event).toEqual({
        accountId: DEFAULT_ACCOUNT_ID,
        apiId: 'example',
        domainName: 'id.execute-api.us-east-1.amazonaws.com',
        domainPrefix: 'id',
        http: {
          method: 'GET',
          path: '/prod/resource',
          protocol: 'HTTP/1.1',
          sourceIp: expect.stringMatching(ipv4Regex),
          userAgent: 'Custom User Agent String',
        },
        requestId: expect.stringMatching(isUuidV4Regex),
        stage: 'prod',
        time: '12/Mar/2023:19:03:58 +0000', // TODO dynamic
        timeEpoch: 1678649038000,
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayEventRequestContextV2Stub({
        accountId: 'overridden-account-id',
        http: { method: 'POST' },
      });

      expect(event).toEqual({
        accountId: 'overridden-account-id',
        apiId: 'example',
        domainName: 'id.execute-api.us-east-1.amazonaws.com',
        domainPrefix: 'id',
        http: {
          method: 'POST',
          path: '/prod/resource',
          protocol: 'HTTP/1.1',
          sourceIp: expect.stringMatching(ipv4Regex),
          userAgent: 'Custom User Agent String',
        },
        requestId: expect.stringMatching(isUuidV4Regex),
        stage: 'prod',
        time: '12/Mar/2023:19:03:58 +0000', // TODO dynamic
        timeEpoch: 1678649038000,
      });
    });
  });
});
