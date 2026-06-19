-- CreateTable
CREATE TABLE "quotation" (
    "quotation_id" BIGSERIAL NOT NULL,
    "company_id" BIGINT NOT NULL,
    "lead_id" BIGINT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "currency" CHAR(3) NOT NULL DEFAULT 'USD',
    "subtotal" DECIMAL(14,2) NOT NULL,
    "tax_total" DECIMAL(14,2) NOT NULL,
    "total" DECIMAL(14,2) NOT NULL,
    "cost_total" DECIMAL(14,2) NOT NULL,
    "margin" DECIMAL(14,2) NOT NULL,
    "status" VARCHAR(15) NOT NULL,
    "expires_at" DATE NOT NULL,
    "tenant_id" VARCHAR(50) NOT NULL,
    "branch_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" BIGINT,
    "updated_by" BIGINT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "quotation_pkey" PRIMARY KEY ("quotation_id")
);

-- CreateTable
CREATE TABLE "quotation_line" (
    "line_id" BIGSERIAL NOT NULL,
    "quotation_id" BIGINT NOT NULL,
    "item_type" VARCHAR(20) NOT NULL,
    "ref_id" BIGINT,
    "description" VARCHAR(200) NOT NULL,
    "qty" DECIMAL(10,2) NOT NULL,
    "rate" DECIMAL(14,2) NOT NULL,
    "cost" DECIMAL(14,2) NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "tax_rule_id" BIGINT NOT NULL,
    "tenant_id" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "quotation_line_pkey" PRIMARY KEY ("line_id")
);

-- CreateTable
CREATE TABLE "quote_approval" (
    "approval_id" BIGSERIAL NOT NULL,
    "quotation_id" BIGINT NOT NULL,
    "approver_id" BIGINT,
    "status" VARCHAR(15) NOT NULL,
    "decided_at" TIMESTAMPTZ,
    "tenant_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quote_approval_pkey" PRIMARY KEY ("approval_id")
);

-- CreateTable
CREATE TABLE "price_book" (
    "price_book_id" BIGSERIAL NOT NULL,
    "company_id" BIGINT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "valid_from" DATE NOT NULL,
    "valid_to" DATE NOT NULL,
    "tenant_id" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "price_book_pkey" PRIMARY KEY ("price_book_id")
);

-- CreateTable
CREATE TABLE "rate_card" (
    "rate_card_id" BIGSERIAL NOT NULL,
    "price_book_id" BIGINT NOT NULL,
    "item_name" VARCHAR(120) NOT NULL,
    "uom" VARCHAR(15) NOT NULL,
    "rate" DECIMAL(14,2) NOT NULL,
    "cost" DECIMAL(14,2) NOT NULL,
    "tenant_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "rate_card_pkey" PRIMARY KEY ("rate_card_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quotation_quotation_id_version_key" ON "quotation"("quotation_id", "version");

-- AddForeignKey
ALTER TABLE "quotation_line" ADD CONSTRAINT "quotation_line_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("quotation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_approval" ADD CONSTRAINT "quote_approval_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("quotation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_card" ADD CONSTRAINT "rate_card_price_book_id_fkey" FOREIGN KEY ("price_book_id") REFERENCES "price_book"("price_book_id") ON DELETE CASCADE ON UPDATE CASCADE;
