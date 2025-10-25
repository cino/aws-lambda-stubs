import { describe, expect, it } from 'vitest';
import { CloudFrontRequestEventRecordStub, CloudFrontRequestEventStub } from '../src';
import { isUuidV4Regex } from './helpers';

describe('#cloudfront-request', () => {
  it('should return a valid event', () => {
    const event = CloudFrontRequestEventStub([CloudFrontRequestEventRecordStub()]);

    expect(event).toEqual({
      Records: [
        {
          cf: {
            config: {
              distributionDomainName: 'd111111abcdef8.cloudfront.net',
              distributionId: 'EDFDVBD632BHDS5',
              eventType: 'viewer-request',
              requestId: expect.stringMatching(isUuidV4Regex),
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
      CloudFrontRequestEventRecordStub({
        cf: {
          config: {
            distributionDomainName: 'override.cloudfront.net',
          },
        },
      }),
    ]);

    expect(event).toEqual({
      Records: [
        {
          cf: {
            config: {
              distributionDomainName: 'override.cloudfront.net',
              distributionId: 'EDFDVBD632BHDS5',
              eventType: 'viewer-request',
              requestId: expect.stringMatching(isUuidV4Regex),
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
