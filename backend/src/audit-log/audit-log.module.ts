import { Global, Module } from '@nestjs/common';
import { AuditLogService } from './services/audit-log.service';
import { AuditLogController } from './controllers/audit-log.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [AuditLogService],
  controllers: [AuditLogController],
  exports: [AuditLogService]
})
export class AuditLogModule {}
