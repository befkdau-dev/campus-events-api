import { Injectable, OnModuleInit } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from './user.entity.js';

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];
  private nextId = 1;

  async onModuleInit() {
    this.users.push({
      id: this.nextId++,
      email: 'admin@example.com',
      passwordHash: await argon2.hash('admin12345'),
      roles: ['admin', 'user'],
      refreshHash: null,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async findById(id: number): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }

  async create(data: { email: string; passwordHash: string }): Promise<User> {
    const user: User = {
      id: this.nextId++,
      email: data.email,
      passwordHash: data.passwordHash,
      roles: ['user'],
      refreshHash: null,
    };
    this.users.push(user);
    return user;
  }

  async setRefreshHash(id: number, hash: string | null): Promise<void> {
    const user = this.users.find((u) => u.id === id);
    if (user) user.refreshHash = hash;
  }
}
