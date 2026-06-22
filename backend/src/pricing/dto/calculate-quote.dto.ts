import { IsNumber, IsOptional, Min } from 'class-validator';

export class CalculateQuoteDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountGlobal?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  chargeService?: number;
}
