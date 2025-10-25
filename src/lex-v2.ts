import type { LexV2Bot, LexV2Event, LexV2SessionState } from 'aws-lambda';
import deepmerge from 'deepmerge';
import type { Merge } from 'type-fest';

type PartialLexV2Event = Merge<
  Partial<LexV2Event>,
  {
    bot?: Partial<LexV2Bot>;
    sessionState?: Partial<LexV2SessionState>;
  }
>;

export const lexV2EventStub = (overrides: PartialLexV2Event = {}): LexV2Event => {
  return deepmerge<LexV2Event>(
    {
      messageVersion: '1.0',
      invocationSource: 'DialogCodeHook',
      inputMode: 'Text',
      responseContentType: 'text/plain; charset=utf-8',
      sessionId: 'session123',
      inputTranscript: 'Hello',
      bot: {
        id: 'bot-id-123',
        name: 'TestBot',
        aliasId: 'alias-id-123',
        aliasName: 'TestAlias',
        localeId: 'en_US',
        version: 'DRAFT',
      },
      interpretations: [],
      proposedNextState: {
        dialogAction: {
          type: 'ElicitIntent',
        },
        intent: {
          confirmationState: 'None',
          name: '',
          slots: {},
          state: 'InProgress',
        },
      },
      sessionState: {
        dialogAction: {
          type: 'ElicitIntent',
        },
        intent: {
          confirmationState: 'None',
          name: '',
          slots: {},
          state: 'InProgress',
        },
        sessionAttributes: {},
        originatingRequestId: crypto.randomUUID(),
      },
      transcriptions: [],
      requestAttributes: {},
    },

    overrides as Partial<LexV2Event>
  );
};
