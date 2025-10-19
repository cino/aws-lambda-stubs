import type { CloudFrontRequest, CloudFrontRequestEvent, CloudFrontRequestEventRecord } from 'aws-lambda';
import deepmerge from 'deepmerge';
import { cloudFrontRequestStub } from './common';

interface PartialCloudFrontRequestEventRecord {
  cf?: {
    config?: Partial<{
      distributionDomainName: string;
      distributionId: string;
      eventType: string;
      requestId: string;
    }>;
  };
  request?: Partial<CloudFrontRequest>;
}

export const cloudFrontRequestEventRecordStub = (
  overrides: PartialCloudFrontRequestEventRecord = {}
): CloudFrontRequestEventRecord => {
  const distributionDomainName = overrides.cf?.config?.distributionDomainName || 'd111111abcdef8.cloudfront.net';

  return deepmerge(
    {
      cf: {
        config: {
          distributionDomainName: distributionDomainName,
          distributionId: 'EDFDVBD632BHDS5',
          eventType: 'viewer-request',
          requestId: '4TyzHTf0o1JfW3vHAAEXAMPLE==',
        },
        request: cloudFrontRequestStub({
          headers: {
            host: [
              {
                key: 'Host',
                value: distributionDomainName,
              },
            ],
          },
        }),
      },
    },
    overrides
  ) as CloudFrontRequestEventRecord;
};

export const cloudFrontRequestEventStub = (records: CloudFrontRequestEventRecord[]): CloudFrontRequestEvent => {
  return {
    Records: records,
  };
};
