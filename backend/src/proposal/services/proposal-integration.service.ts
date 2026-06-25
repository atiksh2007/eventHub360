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
    const { quoteId, tenantId, clientName, eventName, totalAmount, customNote, styleTheme, elementsByPage } = data;

    // The frontend sends quoteId as 'Q-1', so we need to strip the 'Q-' prefix
    const numericQuoteId = quoteId.toString().replace('Q-', '');

    let dbQuote: any = null;
    let dbLines: any[] = [];
    try {
      dbQuote = await this.prisma.quotation.findUnique({
        where: { quotation_id: BigInt(numericQuoteId) }
      });
      dbLines = await this.prisma.quotationLine.findMany({
        where: { quotation_id: BigInt(numericQuoteId) }
      });
    } catch (e) {
      console.error("Failed to fetch quote from DB", e);
    }

    const formatCurrency = (amount: any) => {
      if (!amount) return '$0.00';
      return '$' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const generatePageHtml = (pageId: string, elements: any[]) => {
      if (!elements || elements.length === 0) return '';
      let pageHtml = `<div class="page" id="page-${pageId}">`;
      
      elements.forEach(el => {
        if (el.type === 'header') {
          pageHtml += `<h1 style="color: ${el.color}; font-size: ${el.fontSize}; font-family: 'Times New Roman', serif; margin-bottom: 20px;">${el.content}</h1>`;
        } else if (el.type === 'text') {
          pageHtml += `<p style="color: ${el.color}; font-size: ${el.fontSize}; white-space: pre-wrap; line-height: 1.6; margin-bottom: 20px;">${el.content}</p>`;
        } else if (el.type === 'image') {
          pageHtml += `<img src="${el.url}" style="width: 100%; border-radius: ${el.borderRadius || '0px'}; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />`;
        } else if (el.type === 'pricing') {
          
          let lineItemsHtml = '';
          if (dbLines && dbLines.length > 0) {
            dbLines.forEach(line => {
              lineItemsHtml += `
                <tr>
                  <td style="padding: 16px 0; color: #374151; font-weight: 500;">${line.description || line.item_type}</td>
                  <td style="padding: 16px 0; text-align: right; font-weight: bold; color: #111827;">${formatCurrency(line.amount)}</td>
                </tr>
              `;
            });
          } else {
            lineItemsHtml = `
              <tr>
                <td style="padding: 16px 0; color: #374151; font-weight: 500;">Standard Package</td>
                <td style="padding: 16px 0; text-align: right; font-weight: bold; color: #111827;">${formatCurrency(dbQuote?.total || 0)}</td>
              </tr>
            `;
          }

          pageHtml += `
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px;">
              <h3 style="color: ${el.color}; font-size: 24px; font-weight: bold; margin-bottom: 24px; font-family: 'Times New Roman', serif;">Investment Summary</h3>
              <table style="width: 100%; text-align: left; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #f3f4f6; color: #9ca3af; text-transform: uppercase; font-size: 14px; tracking: wider;">
                    <th style="padding-bottom: 12px; font-weight: bold;">Description</th>
                    <th style="padding-bottom: 12px; text-align: right; font-weight: bold;">Amount</th>
                  </tr>
                </thead>
                <tbody style="border-bottom: 2px solid #f3f4f6;">
                  ${lineItemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td style="padding: 16px 0 8px; color: #6b7280;">Subtotal</td>
                    <td style="padding: 16px 0 8px; text-align: right; color: #374151;">${formatCurrency(dbQuote?.subtotal)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Estimated Tax</td>
                    <td style="padding: 8px 0; text-align: right; color: #374151;">${formatCurrency(dbQuote?.tax_total)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; color: ${el.color}; font-weight: bold; font-size: 20px;">Total Investment</td>
                    <td style="padding: 16px 0; text-align: right; font-weight: bold; font-size: 20px; color: ${el.color};">${formatCurrency(dbQuote?.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          `;
        }
      });
      
      pageHtml += `</div>`;
      return pageHtml;
    };

    let dynamicContent = '';
    if (elementsByPage) {
      const pages = ['cover', 'moodboard', 'agenda', 'pricing'];
      pages.forEach(page => {
        if (elementsByPage[page] && elementsByPage[page].length > 0) {
          dynamicContent += generatePageHtml(page, elementsByPage[page]);
        }
      });
    }

    const templateSource = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; margin: 0; }
            .page { page-break-after: always; padding: 20px; box-sizing: border-box; }
            .page:last-child { page-break-after: avoid; }
            .theme-luxury { background-color: #fafafa; }
            .theme-modern { background-color: #fff; }
          </style>
        </head>
        <body class="theme-{{styleTheme}}">
          {{{dynamicContent}}}
        </body>
      </html>
    `;

    const template = handlebars.compile(templateSource);
    const html = template({
      styleTheme: styleTheme || 'modern',
      dynamicContent: dynamicContent
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