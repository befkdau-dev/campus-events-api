import { Module } from '@nestjs/common';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';
import { EVENT_REPOSITORY } from './events.token.js';
import { InMemoryEventRepository } from './events.repository.js';
import { APP_GUARD } from '@nestjs/core';
import { APIKeyGuard } from '../common/guards/api-key-guard.js';
import { RolesGuard } from '../common/guards/role.guard.js';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    { provide: EVENT_REPOSITORY, useClass: InMemoryEventRepository },
    { provide: APP_GUARD, useClass: APIKeyGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [EventsService],
})
export class EventsModule {}
