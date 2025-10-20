import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * 统一返回结果
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          errno: 0,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data,
        };
      }),
    );
  }
}
