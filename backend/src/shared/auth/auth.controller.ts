import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.email, body.password, body.role || 'client');
  }

  @Public()
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  // Keeping dev token just in case
  @Public()
  @Get('dev/token')
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
