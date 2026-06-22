const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const q = await prisma.quotation.findUnique({ where: { quotation_id: 11 } });
  console.log('DB STATUS =', q.status);
}
main().finally(() => prisma.$disconnect());
