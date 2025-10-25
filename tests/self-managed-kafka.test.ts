import { describe, expect, it } from 'vitest';
import { DEFAULT_REGION, SelfManagedKafkaStub } from '../src';

describe('#self-managed-kafka', () => {
  it('should return a valid event', () => {
    const event = SelfManagedKafkaStub();

    expect(event).toEqual({
      eventSource: 'SelfManagedKafka',
      bootstrapServers: `b-2.demo-cluster-1.a1bcde.c1.kafka.${DEFAULT_REGION}.amazonaws.com:9092,b-1.demo-cluster-1.a1bcde.c1.kafka.${DEFAULT_REGION}.amazonaws.com:9092`,
      records: {
        'test-topic': [
          {
            topic: 'test-topic',
            partition: 0,
            offset: 123,
            timestamp: expect.any(Number),
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
    });
  });

  it('should allow overrides', () => {
    const event = SelfManagedKafkaStub({
      bootstrapServers: 'custom-bootstrap-server:9092',
      records: {},
    });

    expect(event).toEqual({
      eventSource: 'SelfManagedKafka',
      bootstrapServers: 'custom-bootstrap-server:9092',
      records: {},
    });
  });
});
