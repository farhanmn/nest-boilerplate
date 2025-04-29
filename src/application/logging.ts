import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { logger } from '../utils/logger';

@Injectable()
export class RestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = req;

    let finalResBody;
    if (body?.password) {
      finalResBody = { ...body, password: '******' };
    }
    finalResBody = JSON.stringify(finalResBody);

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;

        logger.info(
          `${method} ${url} | query: ${JSON.stringify(query)} | params: ${JSON.stringify(params)} | body: ${finalResBody} | response-time: ${duration}ms`
        );
      })
    );
  }
}
