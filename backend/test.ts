import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  try {
    await prisma.quotationLine.create({
      data: {
        quotation_id: 11n,
        item_type: 'Test',
        description: 'Test',
        qty: 1,
        rate: 100,
        amount: 100,
        cost: 70,
        tax_rule_id: 1n,
        tenant_id: 'system_default'
      }
    });
    console.log('success');
  } catch(e) {
    console.error('ERROR:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
run();
