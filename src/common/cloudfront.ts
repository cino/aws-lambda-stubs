import type { CloudFrontRequest } from 'aws-lambda';
import { randomIpAddress } from '.';

export const cloudFrontRequestStub = (overrides: Partial<CloudFrontRequest> = {}): CloudFrontRequest => {
  return {
    clientIp: randomIpAddress(),
    method: 'GET',
    uri: '/images/image.jpg',
    querystring: '',
    headers: {
      host: [
        {
          key: 'Host',
          value: 'random.cloudfront.net',
        },
      ],
    },

    ...overrides,
  };
};
