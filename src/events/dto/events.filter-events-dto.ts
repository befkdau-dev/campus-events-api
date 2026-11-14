import type { EventCategory } from '../events.type.js';
import { EVENT_CATEGORIES } from '../events.type.js';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsIn, IsString, IsInt, Min } from 'class-validator';

export const SORT_FIELDS = ['eventDate', 'title'] as const;
export const SORT_ORDERS = ['asc', 'desc'] as const;
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

  @IsOptional()
  @IsIn(SORT_FIELDS)
  sortBy?: (typeof SORT_FIELDS)[number];

  @IsOptional()
  @IsIn(SORT_ORDERS)
  order?: (typeof SORT_ORDERS)[number];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
