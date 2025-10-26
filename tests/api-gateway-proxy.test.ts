import { describe, expect, it } from 'vitest';
import {
  APIGatewayProxyEventV2Stub,
  APIGatewayProxyWebsocketEventV2Stub,
  DEFAULT_ACCOUNT_ID,
  DEFAULT_REGION,
} from '../src';
import { ipv4Regex, isUuidV4Regex } from './helpers';

describe('#api-gateway-proxy', () => {
  describe('proxy-event-v2', () => {
    it('should return a valid event', () => {
      const event = APIGatewayProxyEventV2Stub();

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/prod/resource',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
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
          time: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          timeEpoch: expect.any(Number),
        },
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayProxyEventV2Stub({
        rawPath: '/custom/path',
        requestContext: {
          http: {
            method: 'POST',
          },
        },
      });

      expect(event).toEqual({
        version: '2.0',
        routeKey: '$default',
        rawPath: '/custom/path',
        rawQueryString: '',
        headers: {},
        isBase64Encoded: false,
        cookies: [],
        queryStringParameters: {},
        requestContext: {
          accountId: DEFAULT_ACCOUNT_ID,
          apiId: 'example',
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          domainPrefix: 'id',
          http: {
            method: 'POST',
            path: '/custom/path',
            protocol: 'HTTP/1.1',
            sourceIp: expect.stringMatching(ipv4Regex),
            userAgent: 'Custom User Agent String',
          },
          requestId: expect.stringMatching(isUuidV4Regex),
          stage: 'prod',
          time: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          timeEpoch: expect.any(Number),
        },
      });
    });
  });

  describe('proxy-websocket-event-v2', () => {
    it('should return a valid event', () => {
      const event = APIGatewayProxyWebsocketEventV2Stub();

      expect(event).toEqual({
        requestContext: {
          routeKey: '$default',
          messageId: expect.stringMatching(isUuidV4Regex),
          eventType: 'MESSAGE',
          extendedRequestId: expect.stringMatching(isUuidV4Regex),
          messageDirection: 'IN',
          stage: 'prod',
          connectedAt: expect.any(Number),
          requestTime: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          requestTimeEpoch: expect.any(Number),
          requestId: expect.stringMatching(isUuidV4Regex),
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          connectionId: expect.stringMatching(isUuidV4Regex),
          apiId: 'example',
        },
        body: undefined,
        isBase64Encoded: false,
        stageVariables: {},
      });
    });

    it('should allow overrides', () => {
      const event = APIGatewayProxyWebsocketEventV2Stub({
        requestContext: {
          eventType: 'DISCONNECT',
          stage: 'dev',
        },
        body: 'Test message',
      });

      expect(event).toEqual({
        requestContext: {
          routeKey: '$default',
          messageId: expect.stringMatching(isUuidV4Regex),
          eventType: 'DISCONNECT',
          extendedRequestId: expect.stringMatching(isUuidV4Regex),
          messageDirection: 'IN',
          stage: 'dev',
          connectedAt: expect.any(Number),
          requestTime: expect.stringMatching(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/),
          requestTimeEpoch: expect.any(Number),
          requestId: expect.stringMatching(isUuidV4Regex),
          domainName: `id.execute-api.${DEFAULT_REGION}.amazonaws.com`,
          connectionId: expect.stringMatching(isUuidV4Regex),
          apiId: 'example',
        },
        body: 'Test message',
        isBase64Encoded: false,
        stageVariables: {},
      });
    });
  });
});
