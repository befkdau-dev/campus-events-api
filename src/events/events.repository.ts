import { Injectable } from '@nestjs/common';
import { Events, SEED } from './events.type.js';

export interface EventRepository {
  all(): Events[];
  byId(id: number): Events | undefined;
  save(e: Events): Events;
}

@Injectable()
export class InMemoryEventRepository implements EventRepository {
  private readonly rows = new Map<number, Events>(SEED.map((r) => [r.id, r]));

  all() {
    return [...this.rows.values()];
  }

  byId(id: number) {
    return this.rows.get(id);
  }
  save(e: Events) {
    this.rows.set(e.id, e);
    return e;
  }
}
