import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SessionsService } from './sessions.service.js';
import { Sessions } from './sessions.type.js';

@Controller('events/:eventId/sessions')
export class SessionsController {
  constructor(private readonly session: SessionsService) {}

  @Get()
  findAll(@Param('eventId', ParseIntPipe) eventId: number): Sessions[] {
    return this.session.findAll(eventId);
  }

  @Get(':sessionId')
  findOne(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ) {
    return this.session.findOne(eventId, sessionId);
  }
}
