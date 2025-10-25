import { describe, expect, it } from 'vitest';
import { LexV2EventStub } from '../src';
import { isUuidV4Regex } from './helpers';

describe('#lex-v2', () => {
  it('should return a valid event', () => {
    const event = LexV2EventStub();

    expect(event).toEqual({
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
        originatingRequestId: expect.stringMatching(isUuidV4Regex),
      },
      transcriptions: [],
      requestAttributes: {},
    });
  });

  it('should allow overrides', () => {
    const event = LexV2EventStub({
      sessionId: 'custom-session-id',
      bot: {
        id: 'custom-bot-id',
      },
    });

    expect(event).toEqual({
      messageVersion: '1.0',
      invocationSource: 'DialogCodeHook',
      inputMode: 'Text',
      responseContentType: 'text/plain; charset=utf-8',
      sessionId: 'custom-session-id',
      inputTranscript: 'Hello',
      bot: {
        id: 'custom-bot-id',
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
        originatingRequestId: expect.stringMatching(isUuidV4Regex),
      },
      transcriptions: [],
      requestAttributes: {},
    });
  });
});
