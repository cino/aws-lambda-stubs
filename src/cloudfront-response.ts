import type {
  CloudFrontRequest,
  CloudFrontResponse,
  CloudFrontResponseEvent,
  CloudFrontResponseEventRecord,
} from 'aws-lambda';
import { deepMerge, randomIpAddress } from './utils';

export interface PartialCloudFrontResponseEventRecord {
  cf?: {
    config?: Partial<{
      distributionDomainName: string;
      distributionId: string;
      eventType: string;
      requestId: string;
    }>;
  };
  request?: Partial<CloudFrontRequest>;
  response?: Partial<CloudFrontResponse>;
}

export const CloudFrontResponseEventRecordStub = (
  overrides: PartialCloudFrontResponseEventRecord = {}
): CloudFrontResponseEventRecord => {
  const distributionDomainName = overrides.cf?.config?.distributionDomainName || 'd111111abcdef8.cloudfront.net';

  return deepMerge(
    {
      cf: {
        config: {
          distributionDomainName,
          distributionId: 'EDFDVBD632BHDS5',
          eventType: 'viewer-response',
          requestId: '4TyzHTf0o1JfW3vHAAEXAMPLE==',
        },
        request: {
          clientIp: randomIpAddress(),
          method: 'GET',
          uri: '/images/image.jpg',
          querystring: '',
          headers: {
            host: [
              {
                key: 'Host',
                value: distributionDomainName,
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
    overrides as Partial<CloudFrontResponseEventRecord>
  );
};

export const CloudFrontResponseEventStub = (records: CloudFrontResponseEventRecord[]): CloudFrontResponseEvent => {
  return {
    Records: records,
  };
};
