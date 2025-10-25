import { describe, expect, it } from 'vitest';
import { LexEventStub } from '../src';

describe('#lex', () => {
  it('should return a valid event', () => {
    const event = LexEventStub();

    expect(event).toEqual({
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
    });
  });

  it('should allow overrides', () => {
    const event = LexEventStub({
      userId: 'custom-user-id',
      sessionAttributes: {},
      bot: {
        name: 'custom-bot-name',
      },
    });

    expect(event).toEqual({
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
        name: 'custom-bot-name',
        alias: '$LATEST',
        version: '1',
      },
      userId: 'custom-user-id',
      inputTranscript: 'I would like to order some flowers',
      invocationSource: 'FulfillmentCodeHook',
      outputDialogMode: 'Text',
      messageVersion: '1.0',
      sessionAttributes: {},
      requestAttributes: {},
    });
  });
});
