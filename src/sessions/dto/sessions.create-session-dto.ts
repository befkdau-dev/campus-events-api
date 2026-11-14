import { IsString, IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateSessionDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  startAt!: string;

  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  endsAt!: string;
}
