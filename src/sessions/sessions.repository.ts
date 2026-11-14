import { Injectable } from '@nestjs/common';
import { Sessions, SESSION_SEED } from './sessions.type.js';

export interface SessionRepository {
  all(): Sessions[];
  byId(eventId: number, sessionId: number): Sessions | undefined;
  allByEventId(eventId: number): Sessions[];
  save(s: Sessions): Sessions;
}

@Injectable()
export class InMemorySessionRepository implements SessionRepository {
  private readonly rows = new Map<number, Sessions>(
    SESSION_SEED.map((r) => [r.id, r]),
  );

  all() {
    const sessions = [...this.rows.values()];
    return sessions;
  }

  byId(eventId: number, sessionId: number) {
    const sessions = [...this.rows.values()];
    return sessions.find(
      (session) => session.eventId === eventId && session.id === sessionId,
    );
  }

  allByEventId(eventId: number) {
    const sessions = [...this.rows.values()];
    return sessions.filter((session) => session.eventId === eventId);
  }
  save(s: Sessions) {
    this.rows.set(s.id, s);
    return s;
  }
}
