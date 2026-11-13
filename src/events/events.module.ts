import { Module } from '@nestjs/common';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';
import { EVENT_REPOSITORY } from './events.token.js';
import { InMemoryEventRepository } from './events.repository.js';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    { provide: EVENT_REPOSITORY, useClass: InMemoryEventRepository },
  ],
})
export class EventsModule {}
