import type { ScheduledEvent } from 'aws-lambda';
import { eventBridgeEventStub } from './event-bridge';

export const cloudWatchScheduledEventStub = (overrides?: Partial<ScheduledEvent>): ScheduledEvent => {
  return eventBridgeEventStub('Scheduled Event', {}, overrides) as ScheduledEvent;
};
