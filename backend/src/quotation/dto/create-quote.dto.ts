import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Client name cannot be left blank' })
  clientName: string;

  @IsString()
  @IsNotEmpty({ message: 'Event type specification is required' })
  eventType: string;

  @IsString()
  @IsOptional()
  eventDate?: string;

  @IsString()
  @IsOptional()
  expectedGuests?: string;
}
