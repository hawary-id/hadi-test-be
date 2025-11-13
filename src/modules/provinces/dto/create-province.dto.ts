import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProvinceDto {
  @ApiProperty({ example: 'Banten' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
