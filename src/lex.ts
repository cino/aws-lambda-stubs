import type { LexEvent, LexEventSlots, LexSlotDetails } from 'aws-lambda';
import type { Merge } from 'type-fest';
import { deepMerge } from './utils';

type PartialLexEvent = Merge<
  Partial<LexEvent>,
  {
    currentIntent?: {
      name?: string;
      slots?: LexEventSlots;
      slotDetails?: LexSlotDetails;
      confirmationStatus?: 'None' | 'Confirmed' | 'Denied';
    };
    bot?: {
      name?: string;
      alias?: string;
      version?: string;
    };
  }
>;

export const LexEventStub = (overrides: PartialLexEvent = {}): LexEvent => {
  return deepMerge<LexEvent>(
    {
      currentIntent: {
        name: 'OrderFlowers',
        slots: {
          FlowerType: 'Roses',
          PickupDate: '2023-10-10',
          PickupTime: '10:00',
        },
        slotDetails: {},
        confirmationStatus: 'None',
      },
      bot: {
        name: 'OrderFlowers',
        alias: '$LATEST',
        version: '1',
      },
      userId: 'user123',
      inputTranscript: 'I would like to order some flowers',
      invocationSource: 'FulfillmentCodeHook',
      outputDialogMode: 'Text',
      messageVersion: '1.0',
      sessionAttributes: {},
      requestAttributes: {},
    },

    overrides as Partial<LexEvent>
  );
};
