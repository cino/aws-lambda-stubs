import type { IoTCustomAuthorizerEvent } from 'aws-lambda';

export const IoTCustomAuthorizerEventStub = (
  overrides: Partial<IoTCustomAuthorizerEvent> = {}
): IoTCustomAuthorizerEvent => {
  return {
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

    ...overrides,
  };
};
