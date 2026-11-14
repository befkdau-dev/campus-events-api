import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SESSIONS_REPOSITORY } from './sessions.token.js';
import type { SessionRepository } from './sessions.repository.js';
import { Sessions } from './sessions.type.js';
import { EventsService } from '../events/events.service.js';

@Injectable()
export class SessionsService {
  constructor(
    @Inject(SESSIONS_REPOSITORY)
    private readonly repo: SessionRepository,
    private readonly events: EventsService,
  ) {}

  findAll(eventId: number): Sessions[] {
    this.events.findOne(eventId);
    return this.repo.allByEventId(eventId);
  }

  findOne(eventId: number, sessionId: number): Sessions {
    const hit = this.repo.byId(eventId, sessionId);
    if (!hit) {
      throw new NotFoundException(
        `Session with id:${sessionId} is not in this Event`,
      );
    }

    return hit;
  }
}
