import { Controller, Get, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from './public.decorator';

@Controller('dev')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Public()
  @Get('token')
  getDevToken(@Query('role') role: string = 'sales_exec') {
    const payload = {
      userId: 1,
      email: 'alex@eventhub360.com',
      role,
      company_id: 'default-tenant-hub',
      tenant_id: 'default-tenant-hub',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
