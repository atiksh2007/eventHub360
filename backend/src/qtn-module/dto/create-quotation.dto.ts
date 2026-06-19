import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateQuotationDto {
  @IsString()
  @IsNotEmpty({ message: 'Client name cannot be left blank' })
  clientName: string;

  @IsString()
  @IsNotEmpty({ message: 'Event type specification is required' })
  eventType: string;

  @IsString()
  @IsNotEmpty()
  eventDate: string;

  @IsString()
  @IsNotEmpty()
  expectedGuests: string;
}