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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import { EventsService } from './events.service.js';
import type { EventCategory } from './events.type.js';
import type { Events, Paginated } from './events.type.js';
import { CreateEventDTO } from './dto/events.create-event-dto.js';
import { FilterEventDTO } from './dto/events.filter-events-dto.js';
import { APIKeyGuard } from '../common/guards/api-key-guard.js';
import { RolesGuard } from '../common/guards/role.guard.js';
import { Role } from '../common/enums/roles.enum.js';
import { Roles } from '../common/decorators/roles.decorater.js';
import { TimingInterceptor } from '../common/timing/timing.interceptor.js';

@ApiTags('events')
@ApiSecurity('x-api-key')
@UseInterceptors(TimingInterceptor)
@Controller('events')
//@UseGuards(APIKeyGuard, RolesGuard)
export class EventsController {
  constructor(private readonly event: EventsService) {}

  @Get()
  @Roles(Role.Admin, Role.Student)
  @ApiOperation({ summary: 'Get all campus events with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of events returned.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid API key.',
  })
  findAll(@Query() filter: FilterEventDTO): Paginated<Events> {
    return this.event.findAll(filter);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Student)
  @ApiOperation({ summary: 'Get a single event by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique event ID',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Event details returned.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Events {
    return this.event.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new campus event (Admin only)' })
  @ApiResponse({ status: 201, description: 'Event successfully created.' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed on request body.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Requires Admin role.' })
  create(@Body() dto: CreateEventDTO): Events {
    return this.event.create(dto);
  }
}
