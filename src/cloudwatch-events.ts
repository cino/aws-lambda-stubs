import type { ScheduledEvent } from 'aws-lambda';
import { EventBridgeEventStub } from './event-bridge';

export const CloudWatchScheduledEventStub = (overrides?: Partial<ScheduledEvent>): ScheduledEvent => {
  return EventBridgeEventStub('Scheduled Event', {}, overrides) as ScheduledEvent;
};
