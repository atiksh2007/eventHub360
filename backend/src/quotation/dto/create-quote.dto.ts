import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  eventType?: string;

  @IsString()
  @IsOptional()
  eventDate?: string;

  @IsString()
  @IsOptional()
  expectedGuests?: string;

  @IsOptional()
  metadata?: any;
}
