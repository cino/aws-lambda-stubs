import type { CloudFrontRequest, CloudFrontRequestEvent, CloudFrontRequestEventRecord } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { cloudFrontRequestStub } from './common';
import { deepMerge, randomString } from './utils';

interface PartialCloudFrontRequestEventRecord {
  cf?: {
    config?: Partial<{
      distributionDomainName: string;
      distributionId: string;
      eventType: string;
      requestId: string;
    }>;
    request?: Partial<CloudFrontRequest>;
  };
}

const CloudFrontRequestEventRecordStub = (
  overrides: PartialCloudFrontRequestEventRecord = {}
): CloudFrontRequestEventRecord => {
  const distributionDomainName = overrides.cf?.config?.distributionDomainName || 'd111111abcdef8.cloudfront.net';

  return deepMerge(
    {
      cf: {
        config: {
          distributionDomainName: distributionDomainName,
          distributionId: randomString(14).toUpperCase(),
          eventType: 'viewer-request',
          requestId: uuidv4(),
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

export const CloudFrontRequestEventStub = (
  records: PartialCloudFrontRequestEventRecord[] = [{}]
): CloudFrontRequestEvent => {
  return {
    Records: records.map((record) => CloudFrontRequestEventRecordStub(record)),
  };
};
