import {
  ExecutionContext,
  CanActivate,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { Role } from '../enums/roles.enum.js';

@Injectable()
export class APIKeyGuard implements CanActivate {
  private readonly keys = new Map<string, Role>();
  constructor(private readonly config: ConfigService) {
    const admin = this.config.get<string>('ADMIN_API_KEY');
    const student = this.config.get<string>('STUDENT_API_KEY');
    if (!admin || !student) throw new Error('API Key not configured');

    this.keys.set(admin, Role.Admin);
    this.keys.set(student, Role.Student);
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const role = this.keys.get(req.headers['x-api-key']);
    if (!role) throw new UnauthorizedException('Invalid API Key');

    req.user = { role };
    return true;
  }
}
