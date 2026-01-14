import { describe, expect, it } from 'vitest';
import { CloudFrontRequestEventStub } from '../src';
import { uuidV4Regex } from './helpers';

describe('#cloudfront-request', () => {
  it('should return a valid event', () => {
    const event = CloudFrontRequestEventStub();

    expect(event).toEqual({
      Records: [
        {
          cf: {
            config: {
              distributionDomainName: 'd111111abcdef8.cloudfront.net',
              distributionId: expect.stringMatching(/^[A-Z0-9]{14}$/),
              eventType: 'viewer-request',
              requestId: expect.stringMatching(uuidV4Regex),
            },
            request: {
              clientIp: expect.any(String),
              method: 'GET',
              uri: '/images/image.jpg',
              querystring: '',
              headers: {
                host: [
                  {
                    key: 'Host',
                    value: 'd111111abcdef8.cloudfront.net',
                  },
                ],
              },
            },
          },
        },
      ],
    });
  });

  it('should allow overrides', () => {
    const event = CloudFrontRequestEventStub([
      {
        cf: {
          config: {
            distributionDomainName: 'override.cloudfront.net',
          },
          request: {
            uri: '/override/path.jpg',
          },
        },
      },
    ]);

    expect(event).toEqual({
      Records: [
        {
          cf: {
            config: {
              distributionDomainName: 'override.cloudfront.net',
              distributionId: expect.stringMatching(/^[A-Z0-9]{14}$/),
              eventType: 'viewer-request',
              requestId: expect.stringMatching(uuidV4Regex),
            },
            request: {
              clientIp: expect.any(String),
              method: 'GET',
              uri: '/override/path.jpg',
              querystring: '',
              headers: {
                host: [
                  {
                    key: 'Host',
                    value: 'override.cloudfront.net',
                  },
                ],
              },
            },
          },
        },
      ],
    });
  });
});
