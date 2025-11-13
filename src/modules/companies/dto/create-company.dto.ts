import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'COM-001' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  code: string;

  @ApiProperty({ example: 'PT ABC' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
