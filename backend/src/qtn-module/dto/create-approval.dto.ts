import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateApprovalDto {
  @IsString()
  @IsNotEmpty()
  requester: string;

  @IsString()
  @IsOptional()
  executiveSummary?: string;

  @IsString()
  @IsOptional()
  priority?: 'High' | 'Medium' | 'Low';
}
