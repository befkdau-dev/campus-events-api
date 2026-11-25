import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EventsModule } from './events/events.module.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { RequestIdMIddileWare } from './common/middleware/request-id-middleware.js';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';
import { LoggerMiddileware } from './common/logger/logger.middleware.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
@Module({
  imports: [
    EventsModule,
    SessionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',
        genReqId: (req, res) => {
          const existingId = req.headers['x-request-id'];
          if (existingId) {
            return Array.isArray(existingId) ? existingId[0] : existingId;
          }
          const id = randomUUID();
          res.setHeader('x-request-id', id);
          return id;
        },
        redact: {
          paths: [
            'req.headers.authorization',
            "req.headers['x-api-key']",
            'req.body.password',
            '*.phone',
          ],
          censor: '[redacted]',
        },
        transport:
          process.env.NODE_ENV === 'development'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddileware).forRoutes('*');
  }
}
