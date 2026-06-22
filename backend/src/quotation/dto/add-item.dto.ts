import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AddLineItemDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  costUnit: number;

  @IsNumber()
  @Min(0)
  markupPct: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discountLinePct: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  taxRatePct: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  cgstRatePct?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  sgstRatePct?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  igstRatePct?: number;
}

export class AddLineItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddLineItemDto)
  items: AddLineItemDto[];
}
