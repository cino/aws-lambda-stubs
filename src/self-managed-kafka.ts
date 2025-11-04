import type { SelfManagedKafkaEvent } from 'aws-lambda';
import { DEFAULT_REGION } from './common';
import { currentEpochTime } from './utils';

export const SelfManagedKafkaStub = (overrides: Partial<SelfManagedKafkaEvent> = {}): SelfManagedKafkaEvent => {
  return {
    eventSource: 'SelfManagedKafka',
    bootstrapServers: `b-2.demo-cluster-1.a1bcde.c1.kafka.${DEFAULT_REGION}.amazonaws.com:9092,b-1.demo-cluster-1.a1bcde.c1.kafka.${DEFAULT_REGION}.amazonaws.com:9092`,
    records: {
      'test-topic': [
        {
          topic: 'test-topic',
          partition: 0,
          offset: 123,
          timestamp: currentEpochTime(),
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
