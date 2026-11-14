import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import type { EventCategory } from './events.type.js';
import type { Events } from './events.type.js';
import { CreateEventDTO } from './dto/events.create-event-dto.js';
import { FilterEventDTO } from './dto/events.filter-events-dto.js';

@Controller('events')
export class EventsController {
  constructor(private readonly event: EventsService) {}

  @Get()
  findAll(@Query() filter: FilterEventDTO): Events[] {
    return this.event.findAll(filter);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Events {
    return this.event.findOne(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() dto: CreateEventDTO): Events {
    return this.event.create(dto);
  }
}
