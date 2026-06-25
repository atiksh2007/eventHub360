import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, passwordString: string, role: string) {
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwordString, salt);

    const user = await this.prisma.user.create({
      data: {
        email,
        password_hash: hash,
        role,
      },
    });

    return this.generateToken(user);
  }

  async login(email: string, passwordString: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(passwordString, user.password_hash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      userId: user.user_id.toString(),
      email: user.email,
      role: user.role,
      company_id: user.company_id,
      tenant_id: user.tenant_id,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.user_id.toString(),
        email: user.email,
        role: user.role
      }
    };
  }
}
