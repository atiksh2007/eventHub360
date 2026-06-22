import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class UpdateApprovalDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['APPROVE', 'REJECT', 'DRAFT', 'approve', 'reject', 'draft'])
  action: string;

  @IsString()
  @IsOptional()
  feedback?: string;
}
