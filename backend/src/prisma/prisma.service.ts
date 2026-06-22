import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg'; // or mysql2
import { PrismaPg } from '@prisma/adapter-pg'; // or @prisma/adapter-mysql

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Get the connection string from your env
    const connectionString = process.env.DATABASE_URL;

    // 2. Initialize the connection pool (Docker-friendly)
    const pool = new Pool({ connectionString });
    
    // 3. Create the adapter
    const adapter = new PrismaPg(pool);
    
    // 4. Pass the adapter to the constructor
    super({
      adapter,
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}