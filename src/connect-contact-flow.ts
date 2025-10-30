import type { ConnectContactFlowEvent } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { DEFAULT_ACCOUNT_ID, DEFAULT_REGION } from './common';
import { deepMerge } from './utils';

export type PartialConectContactFlowEvent = Merge<
  Partial<ConnectContactFlowEvent>,
  {
    Details?: Merge<
      Partial<ConnectContactFlowEvent['Details']>,
      {
        ContactData?: Partial<ConnectContactFlowEvent['Details']['ContactData']>;
      }
    >;
  }
>;

export const ConnectContactFlowStub = (overrides: PartialConectContactFlowEvent = {}): ConnectContactFlowEvent => {
  return deepMerge<ConnectContactFlowEvent>(
    {
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
    },
    overrides as Partial<ConnectContactFlowEvent>
  );
};
