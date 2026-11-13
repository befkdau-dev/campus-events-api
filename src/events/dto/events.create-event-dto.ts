import {
  IsBoolean,
  IsEmpty,
  IsISO8601,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsIn,
} from 'class-validator';
import { EVENT_CATEGORIES } from '../events.type.js';
import type { EventCategory } from '../events.type.js';

export class CreateEventDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location!: string;

  @IsISO8601()
  eventDate!: string;

  @IsIn(EVENT_CATEGORIES)
  category!: EventCategory;

  @IsBoolean()
  isPublished!: boolean;
}
