import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'eventhub-super-secret-jwt-key',
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.userId || payload.sub, 
      email: payload.email,
      role: payload.role || 'sales_exec',
      company_id: payload.company_id || 'default-tenant-hub',
      tenant_id: payload.tenant_id || payload.company_id || 'default-tenant-hub'
    };
  }
}
