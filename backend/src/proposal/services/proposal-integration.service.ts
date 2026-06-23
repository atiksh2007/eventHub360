import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as puppeteer from 'puppeteer';
import * as handlebars from 'handlebars';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

import { AuditLogService } from '../../audit-log/services/audit-log.service';

@Injectable()
export class ProposalService {
  private s3: S3Client;

  constructor(
    private prisma: PrismaService,
    private readonly auditLogService: AuditLogService
  ) {
    // Configure S3 client for local MinIO
    this.s3 = new S3Client({
      endpoint: process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000',
      region: 'us-east-1', // MinIO requires a region, even dummy
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || 'minioadmin',
        secretAccessKey: process.env.MINIO_SECRET_KEY || 'minioadminpassword',
      },
      forcePathStyle: true, // Required for MinIO
    });
  }

  async getProposalById(id: string) {
    return { id, message: 'This returns the proposal details' };
  }

  async generatePdf(data: any) {
    const { quoteId, tenantId, clientName, eventName, totalAmount, customNote, styleTheme } = data;

    // The frontend sends quoteId as 'Q-1', so we need to strip the 'Q-' prefix
    const numericQuoteId = quoteId.toString().replace('Q-', '');

    // 1. Prepare Handlebars Template
    // Using a very basic HTML template for demonstration
    const templateSource = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
            .header { border-bottom: 2px solid #ea580c; padding-bottom: 20px; margin-bottom: 40px; }
            h1 { color: #111827; }
            .theme-luxury { background-color: #fafafa; }
            .theme-modern { background-color: #fff; }
            .footer { margin-top: 50px; font-size: 12px; color: #888; }
          </style>
        </head>
        <body class="theme-{{styleTheme}}">
          <div class="header">
            <h1>EventHub 360 - Official Proposal</h1>
            <p>Prepared for: <strong>{{clientName}}</strong></p>
          </div>
          
          <h2>{{eventName}}</h2>
          <p>{{customNote}}</p>
          
          <div style="margin-top: 40px; padding: 20px; background: #f3f4f6; border-radius: 8px;">
            <h3>Investment Summary</h3>
            <p style="font-size: 24px; font-weight: bold;">Total: \${{totalAmount}}</p>
          </div>
          
          <div class="footer">
            <p>This document is a formal proposal generated via EventHub 360.</p>
          </div>
        </body>
      </html>
    `;

    const template = handlebars.compile(templateSource);
    const html = template({
      clientName: clientName || 'Valued Client',
      eventName: eventName || 'Special Event',
      totalAmount: totalAmount || '0.00',
      customNote: customNote || 'We are excited to propose the following for your event.',
      styleTheme: styleTheme || 'modern'
    });

    // 2. Render PDF using Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    // 3. Upload to MinIO
    const bucketName = 'eventhub-proposals';
    const fileName = `proposal-${numericQuoteId}-${randomUUID()}.pdf`;
    
    let signedUrl = '';

    try {
      await this.s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: pdfBuffer,
        ContentType: 'application/pdf'
      }));

      // Generate a signed URL valid for 1 hour so the frontend can display it
      signedUrl = await getSignedUrl(this.s3, new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName
      }), { expiresIn: 3600 });
      
    } catch (e) {
      console.warn("MinIO bucket might not exist. Ensure 'eventhub-proposals' bucket is created in MinIO.");
    }

    const fileUrl = `${process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000'}/${bucketName}/${fileName}`;

    // 4. Save to Database
    const docRecord = await this.prisma.proposalDocument.create({
      data: {
        quotation_id: BigInt(numericQuoteId),
        blob_url: fileUrl, // Keep raw URL in DB
        public_hash: randomUUID(),
        tenant_id: tenantId || 'system_default'
      }
    });

    // 5. Update Quotation Status to SENT
    await this.prisma.quotation.update({
      where: { quotation_id: BigInt(numericQuoteId) },
      data: { status: 'SENT' }
    });

    await this.auditLogService.createLog(
      'Proposal Generated',
      'quotation',
      quoteId,
      'System User',
      tenantId || 'system_default',
      { fileUrl, styleTheme }
    );

    return {
      success: true,
      url: signedUrl || fileUrl,
      documentId: docRecord.doc_id.toString()
    };
  }
}