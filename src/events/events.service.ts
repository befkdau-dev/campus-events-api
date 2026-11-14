import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Events } from './events.type.js';
import { EVENT_REPOSITORY } from './events.token.js';
import type { EventRepository } from './events.repository.js';
import { CreateEventDTO } from './dto/events.create-event-dto.js';
import { FilterEventDTO } from './dto/events.filter-events-dto.js';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly repo: EventRepository,
  ) {}

  findAll(filters: FilterEventDTO = {}): Events[] {
    const { eventDate, category, location, isPublished } = filters;

    return this.repo.all().filter((event) => {
      if (
        eventDate &&
        !new Date(event.eventDate)
          .toISOString()
          .startsWith(eventDate.split('T')[0])
      ) {
        return false;
      }
      if (category && event.category !== category) {
        return false;
      }
      if (location && event.location !== location) {
        return false;
      }
      if (isPublished !== undefined && event.isPublished !== isPublished) {
        return false;
      }

      return true;
    });
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
