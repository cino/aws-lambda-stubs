import { describe, expect, it } from 'vitest';
import { IoTCustomAuthorizerEventStub } from '../src';

describe('#iot-authorizer', () => {
  it('should return a valid event', () => {
    const event = IoTCustomAuthorizerEventStub();

    expect(event).toEqual({
      signatureVerified: true,
      protocols: ['http', 'tls'],
      protocolData: {
        http: {
          headers: {
            'x-custom-auth-header': 'custom-auth-value',
          },
          queryString: 'param1=value1&param2=value2',
        },
        tls: {
          serverName: 'example.com',
        },
      },
      connectionMetadata: {
        id: 'connection-id-123',
      },
    });
  });

  it('should allow overrides', () => {
    const event = IoTCustomAuthorizerEventStub({
      signatureVerified: false,
      connectionMetadata: {
        id: 'custom-connection-id',
      },
    });

    expect(event).toEqual({
      signatureVerified: false,
      protocols: ['http', 'tls'],
      protocolData: {
        http: {
          headers: {
            'x-custom-auth-header': 'custom-auth-value',
          },
          queryString: 'param1=value1&param2=value2',
        },
        tls: {
          serverName: 'example.com',
        },
      },
      connectionMetadata: {
        id: 'custom-connection-id',
      },
    });
  });
});
