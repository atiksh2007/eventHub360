"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = require("crypto");
const audit_log_service_1 = require("../../audit-log/services/audit-log.service");
let ProposalService = class ProposalService {
    constructor(prisma, auditLogService) {
        this.prisma = prisma;
        this.auditLogService = auditLogService;
        this.s3 = new client_s3_1.S3Client({
            endpoint: process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000',
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.MINIO_ACCESS_KEY || 'minioadmin',
                secretAccessKey: process.env.MINIO_SECRET_KEY || 'minioadminpassword',
            },
            forcePathStyle: true,
        });
    }
    async getProposalById(id) {
        return { id, message: 'This returns the proposal details' };
    }
    async generatePdf(data) {
        const { quoteId, tenantId, clientName, eventName, totalAmount, customNote, styleTheme } = data;
        const numericQuoteId = quoteId.toString().replace('Q-', '');
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
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();
        const bucketName = 'eventhub-proposals';
        const fileName = `proposal-${numericQuoteId}-${(0, crypto_1.randomUUID)()}.pdf`;
        let signedUrl = '';
        try {
            await this.s3.send(new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Key: fileName,
                Body: pdfBuffer,
                ContentType: 'application/pdf'
            }));
            signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, new client_s3_1.GetObjectCommand({
                Bucket: bucketName,
                Key: fileName
            }), { expiresIn: 3600 });
        }
        catch (e) {
            console.warn("MinIO bucket might not exist. Ensure 'eventhub-proposals' bucket is created in MinIO.");
        }
        const fileUrl = `${process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000'}/${bucketName}/${fileName}`;
        const docRecord = await this.prisma.proposalDocument.create({
            data: {
                quotation_id: BigInt(numericQuoteId),
                blob_url: fileUrl,
                public_hash: (0, crypto_1.randomUUID)(),
                tenant_id: tenantId || 'system_default'
            }
        });
        await this.prisma.quotation.update({
            where: { quotation_id: BigInt(numericQuoteId) },
            data: { status: 'SENT' }
        });
        await this.auditLogService.createLog('Proposal Generated', 'quotation', quoteId, 'System User', tenantId || 'system_default', { fileUrl, styleTheme });
        return {
            success: true,
            url: signedUrl || fileUrl,
            documentId: docRecord.doc_id.toString()
        };
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_log_service_1.AuditLogService])
], ProposalService);
//# sourceMappingURL=proposal-integration.service.js.map