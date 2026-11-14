import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service.js';
import { SessionsController } from './sessions.controller.js';
import { SESSIONS_REPOSITORY } from './sessions.token.js';
import { InMemorySessionRepository } from './sessions.repository.js';
import { EventsModule } from '../events/events.module.js';

@Module({
  imports: [EventsModule],
  providers: [
    SessionsService,
    { provide: SESSIONS_REPOSITORY, useClass: InMemorySessionRepository },
  ],
  controllers: [SessionsController],
})
export class SessionsModule {}
