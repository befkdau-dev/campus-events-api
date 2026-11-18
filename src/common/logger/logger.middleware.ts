import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddileware implements NestMiddleware {
  use(req: Request, res: Response, nxt: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`);
    nxt();
  }
}
