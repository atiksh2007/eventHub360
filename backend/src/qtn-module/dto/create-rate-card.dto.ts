import { IsString, IsNotEmpty, IsInt} from 'class-validator';

export class CreateRateCardDto {


    // @IsInt()
    // @IsNotEmpty({ message: 'A unique numeric ID is required for the rate card' })
    // id: number; // This will be generated server-side, but included here for clarity

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Tag/Category label is required (e.g., PREMIUM VENUE)' })
  tag: string;

  @IsString()
  @IsNotEmpty({ message: 'Capacity or item details are required' })
  capacityDetails: string;

  @IsString()
  @IsNotEmpty({ message: 'Base pricing amount is required' })
  basePricing: string; // e.g., "$5,000"

  @IsString()
  @IsNotEmpty({ message: 'Pricing unit is required (e.g., /day, /session)' })
  pricingUnit: string;

  @IsString()
  @IsNotEmpty()
  adjustmentLabel: string; // e.g., "+15% Service" or "Standard Rate"

  @IsString()
  @IsNotEmpty()
  adjustmentSubtext: string; // e.g., "Estimated Total" or "No Surcharge"

  @IsString()
  @IsNotEmpty()
  estimatedTotal: string; // e.g., "$5,750" or "No Surcharge"

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}