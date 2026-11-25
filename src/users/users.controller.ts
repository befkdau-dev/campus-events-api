import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decoraters/roles.decorator.js';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { UsersService } from './users.service.js';

@Controller('users')
@UseGuards(JwtAccessGuard, RolesGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  async me(@Req() req: { user: { sub: number } }) {
    const user = await this.users.findById(req.user.sub);
    if (!user) return null;
    const { passwordHash, refreshHash, ...safe } = user;
    return safe;
  }

  // @Roles('admin')
  @Get('admin-only')
  adminOnly() {
    return { message: 'Welcome, admin' };
  }
}
