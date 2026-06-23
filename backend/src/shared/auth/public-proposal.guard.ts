import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PublicProposalGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // The hash is expected either in the URL params or a custom header
    const publicHash = request.params.public_hash || request.headers['x-public-hash'];
    
    if (!publicHash) {
      throw new UnauthorizedException('Missing public access token');
    }

    // Ideally, validate this hash against the database `proposal_documents` table
    // For now, let's just make sure it exists
    
    // Example Prisma Check (pseudo-code depending on your exact schema)
    // const proposal = await prisma.proposal_documents.findUnique({ where: { public_hash: publicHash }});
    // if (!proposal) throw new UnauthorizedException('Invalid or expired token');
    
    return true;
  }
}
