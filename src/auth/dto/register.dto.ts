import { IsEmail, MinLength, MaxLength, maxLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(64)
  password: string;
}
