import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { JwtAccessGuard } from './guards/jwt-access.guard.js';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(200)
  @Post('refresh')
  refresh(@Req() req: { user: { userId: number; refreshToken: string } }) {
    return this.auth.refresh(req.user.userId, req.user.refreshToken);
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(204)
  @Post('logout')
  logout(@Req() req: { user: { sub: number } }) {
    return this.auth.logout(req.user.sub);
  }
}
