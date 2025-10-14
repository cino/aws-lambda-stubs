import type { MSKEvent } from 'aws-lambda';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './utils';

export const mskEventStub = (overrides: Partial<MSKEvent> = {}): MSKEvent => {
  return {
    eventSource: 'aws:kafka',
    eventSourceArn: `arn:aws:kafka:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:cluster/vpc-2priv-2pub/751d2973-a626-431c-9d4e-d7975eb44dd7-2`,
    bootstrapServers: `b-2.demo-cluster-1.a1bcde.c1.kafka.${DEFAULT_REGION}.amazonaws.com:9092,b-1.demo-cluster-1.a1bcde.c1.kafka.${DEFAULT_REGION}.amazonaws.com:9092`,
    records: {
      'test-topic': [
        {
          topic: 'test-topic',
          partition: 0,
          offset: 123,
          timestamp: Date.now(),
          timestampType: 'CREATE_TIME',
          key: 'abcDEFghiJKLmnoPQRstuVWXyz1234==',
          value: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0Lg==',
          headers: [
            {
              headerKey: [104, 101, 97, 100, 101, 114, 86, 97, 108, 117, 101],
            },
          ],
        },
      ],
    },

    ...overrides,
  };
};
