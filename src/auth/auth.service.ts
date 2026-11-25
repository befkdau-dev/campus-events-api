import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { User } from '../users/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { TokenPairDto } from './dto/token-pair.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<TokenPairDto> {
    if (await this.users.findByEmail(dto.email)) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await argon2.hash(dto.password);
    const user = await this.users.create({ email: dto.email, passwordHash });
    return this.issueTokens(user);
  }

  async login(dto: LoginDto): Promise<TokenPairDto> {
    const user = await this.users.findByEmail(dto.email);
    const ok = user && (await argon2.verify(user.passwordHash, dto.password));
    if (!user || !ok) throw new UnauthorizedException('Invalid credentials');
    return this.issueTokens(user);
  }

  async refresh(userId: number, presented: string): Promise<TokenPairDto> {
    const user = await this.users.findById(userId);
    if (!user || !user.refreshHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const ok = await argon2.verify(user.refreshHash, presented);
    if (!ok) {
      // valid signature but not the current token: possible replay of a stolen token
      await this.users.setRefreshHash(userId, null);
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.issueTokens(user); // rotation: the old refresh token stops working
  }

  async logout(userId: number): Promise<void> {
    await this.users.setRefreshHash(userId, null);
  }

  private async issueTokens(user: User): Promise<TokenPairDto> {
    const payload = { sub: user.id, email: user.email, roles: user.roles };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: '3m',
      }),
      this.jwt.signAsync(
        { sub: user.id, jti: randomUUID() },
        {
          secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    await this.users.setRefreshHash(user.id, await argon2.hash(refreshToken));
    return { accessToken, refreshToken };
  }
}
