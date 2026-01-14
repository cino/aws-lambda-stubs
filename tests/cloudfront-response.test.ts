import { describe, expect, it } from 'vitest';
import { CloudFrontResponseEventStub } from '../src';

describe('#cloudfront-response', () => {
  it('should return a valid event', () => {
    const event = CloudFrontResponseEventStub();

    expect(event).toEqual({
      Records: [
        {
          cf: {
            config: {
              distributionDomainName: 'd111111abcdef8.cloudfront.net',
              distributionId: 'EDFDVBD632BHDS5',
              eventType: 'viewer-response',
              requestId: '4TyzHTf0o1JfW3vHAAEXAMPLE==',
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
            response: {
              status: '200',
              statusDescription: 'OK',
              headers: {
                'content-type': [
                  {
                    key: 'Content-Type',
                    value: 'image/jpeg',
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
    const event = CloudFrontResponseEventStub([
      {
        cf: {
          config: {
            distributionDomainName: 'override.cloudfront.net',
          },
          request: {
            uri: '/override/path.jpg',
          },
          response: {
            status: '201',
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
              distributionId: 'EDFDVBD632BHDS5',
              eventType: 'viewer-response',
              requestId: '4TyzHTf0o1JfW3vHAAEXAMPLE==',
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
            response: {
              status: '201',
              statusDescription: 'OK',
              headers: {
                'content-type': [
                  {
                    key: 'Content-Type',
                    value: 'image/jpeg',
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
