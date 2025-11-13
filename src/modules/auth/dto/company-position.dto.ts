import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyPositionDto {
  @ApiProperty({ example: 'uuid-company-id' })
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({ example: 'uuid-position-id' })
  @IsString()
  @IsNotEmpty()
  positionId: string;
}
