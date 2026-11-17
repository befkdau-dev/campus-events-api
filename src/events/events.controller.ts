import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import type { EventCategory } from './events.type.js';
import type { Events, Paginated } from './events.type.js';
import { CreateEventDTO } from './dto/events.create-event-dto.js';
import { FilterEventDTO } from './dto/events.filter-events-dto.js';
import { APIKeyGuard } from '../common/guards/api-key-guard.js';
import { RolesGuard } from '../common/guards/role.guard.js';
import { Role } from '../common/enums/roles.enum.js';
import { Roles } from '../common/decorators/roles.decorater.js';

@Controller('events')
//@UseGuards(APIKeyGuard, RolesGuard)
export class EventsController {
  constructor(private readonly event: EventsService) {}

  @Get()
  @Roles(Role.Admin, Role.Student)
  findAll(@Query() filter: FilterEventDTO): Paginated<Events> {
    return this.event.findAll(filter);
  }
  @Get(':id')
  @Roles(Role.Admin, Role.Student)
  findOne(@Param('id', ParseIntPipe) id: number): Events {
    return this.event.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @Roles(Role.Admin)
  create(@Body() dto: CreateEventDTO): Events {
    return this.event.create(dto);
  }
}
