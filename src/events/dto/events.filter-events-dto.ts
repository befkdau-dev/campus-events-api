import type { EventCategory } from '../events.type.js';
import { EVENT_CATEGORIES } from '../events.type.js';
import { Transform } from 'class-transformer';
import { IsOptional, IsIn, IsString } from 'class-validator';

export class FilterEventDTO {
  @IsOptional()
  @IsString()
  eventDate?: string;

  @IsOptional()
  @IsIn(EVENT_CATEGORIES)
  category?: EventCategory;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  isPublished?: boolean;
}
