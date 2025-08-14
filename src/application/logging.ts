import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import * as pc from 'picocolors';
import { logger } from '../utils/logger';

@Injectable()
export class RestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, url, body, query, params } = req;

    const finalResBody: string = JSON.stringify(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      body?.password ? { ...body, password: '******' } : body
    );

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        let parameter: string = '';
        if (Object.keys(query).length > 0) {
          parameter = `| query: ${JSON.stringify(query)} `;
        }
        if (Object.keys(params).length > 0) {
          parameter = parameter + `| params: ${JSON.stringify(params)} `;
        }
        if (finalResBody) {
          parameter = parameter + `| body: ${finalResBody} `;
        }

        logger.info(
          `${method} ${pc.yellow(url)} ${parameter}| response-time: ${duration}ms`
        );
      })
    );
  }
}
