import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    console.log('Request Started:', request.url);

    return next
      .handle()
      .pipe(
        finalize(() =>
          console.log(`Request completed in: ${Date.now() - start}ms`),
        ),
      );
  }
}
