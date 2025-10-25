import { describe, expect, it } from 'vitest';
import { cloudFrontRequestEventRecordStub, cloudFrontRequestEventStub } from '../src';
import { isUuidV4Regex } from './helpers';

describe('#cloudfront-request', () => {
  it('should return a valid event', () => {
    const event = cloudFrontRequestEventStub([cloudFrontRequestEventRecordStub()]);

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
    const event = cloudFrontRequestEventStub([
      cloudFrontRequestEventRecordStub({
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
