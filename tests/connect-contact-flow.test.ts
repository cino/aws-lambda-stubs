import { describe, expect, it } from 'vitest';
import { ConnectContactFlowStub } from '../src';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from '../src/common';

describe('#connect-contact-flow', () => {
  it('should should return a valid event', () => {
    const event = ConnectContactFlowStub();

    expect(event).toEqual({
      Details: {
        ContactData: {
          Attributes: {},
          Channel: 'CHAT',
          ContactId: 'example-contact-id',
          CustomerEndpoint: {
            Type: 'TELEPHONE_NUMBER',
            Address: '123-456-7890',
          },
          InitialContactId: 'example-initial-contact-id',
          InitiationMethod: 'INBOUND',
          PreviousContactId: 'example-previous-contact-id',
          InstanceARN: `arn:aws:connect:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:instance/example-instance-id`,
          Queue: {
            ARN: `arn:aws:connect:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:instance/example-instance-id/queue/example-queue-id`,
            Name: 'example-queue-name',
          },
          SystemEndpoint: {
            Type: 'TELEPHONE_NUMBER',
            Address: '098-765-4321',
          },
          MediaStreams: {
            Customer: {
              Audio: null,
            },
          },
        },
        Parameters: {},
      },
      Name: 'ContactFlowEvent',
    });
  });

  it('should allow overrides', () => {
    const event = ConnectContactFlowStub({
      Details: {
        ContactData: {
          ContactId: 'overridden-contact-id',
          Channel: 'VOICE',
        },
        Parameters: {
          customParam: 'customValue',
        },
      },
    });

    expect(event).toEqual({
      Details: {
        ContactData: {
          Attributes: {},
          Channel: 'VOICE',
          ContactId: 'overridden-contact-id',
          CustomerEndpoint: {
            Type: 'TELEPHONE_NUMBER',
            Address: '123-456-7890',
          },
          InitialContactId: 'example-initial-contact-id',
          InitiationMethod: 'INBOUND',
          PreviousContactId: 'example-previous-contact-id',
          InstanceARN: `arn:aws:connect:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:instance/example-instance-id`,
          Queue: {
            ARN: `arn:aws:connect:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:instance/example-instance-id/queue/example-queue-id`,
            Name: 'example-queue-name',
          },
          SystemEndpoint: {
            Type: 'TELEPHONE_NUMBER',
            Address: '098-765-4321',
          },
          MediaStreams: {
            Customer: {
              Audio: null,
            },
          },
        },
        Parameters: {
          customParam: 'customValue',
        },
      },
      Name: 'ContactFlowEvent',
    });
  });
});
