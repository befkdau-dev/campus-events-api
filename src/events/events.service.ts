import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Events } from './events.type.js';
import { EVENT_REPOSITORY } from './events.token.js';
import type { EventRepository } from './events.repository.js';
import { CreateEventDTO } from './dto/events.create-event-dto.js';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly repo: EventRepository,
  ) {}

  findAll(eventDate?: string): Events[] {
    return eventDate
      ? this.repo
          .all()
          .filter((event) =>
            new Date(event.eventDate)
              .toISOString()
              .startsWith(eventDate.split('T')[0]),
          )
      : this.repo.all();
  }

  findOne(id: number): Events {
    const hit = this.repo.byId(id);
    if (!hit) {
      throw new NotFoundException(`Event with id:${id} is not find`);
    }
    return hit;
  }
  create(dto: CreateEventDTO): Events {
    const id = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;
    return this.repo.save({
      ...dto,
      id,
      isPublished: dto.isPublished ?? false,
    });
  }
}
