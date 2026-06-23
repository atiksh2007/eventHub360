import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (user && user.tenant_id) {
      // Inject tenant_id into the request body or query if appropriate, 
      // but primarily it's already in request.user for services to use.
      // We explicitly attach it to a global namespace or specifically to request context.
      request.tenantContext = {
        tenant_id: user.tenant_id,
        company_id: user.company_id
      };
    }
    
    return next.handle();
  }
}
