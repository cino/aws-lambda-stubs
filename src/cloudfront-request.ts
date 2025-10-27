import type { CloudFrontRequest, CloudFrontRequestEvent, CloudFrontRequestEventRecord } from 'aws-lambda';
import { cloudFrontRequestStub } from './common';
import { deepMerge } from './utils/deepmerge';

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

export const CloudFrontRequestEventRecordStub = (
  overrides: PartialCloudFrontRequestEventRecord = {}
): CloudFrontRequestEventRecord => {
  const distributionDomainName = overrides.cf?.config?.distributionDomainName || 'd111111abcdef8.cloudfront.net';

  return deepMerge(
    {
      cf: {
        config: {
          distributionDomainName: distributionDomainName,
          distributionId: 'EDFDVBD632BHDS5',
          eventType: 'viewer-request',
          requestId: crypto.randomUUID(),
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
    overrides as Partial<CloudFrontRequestEventRecord>
  );
};

export const CloudFrontRequestEventStub = (records: CloudFrontRequestEventRecord[]): CloudFrontRequestEvent => {
  return {
    Records: records,
  };
};
