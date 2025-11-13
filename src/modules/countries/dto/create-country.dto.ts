import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'Indonesia' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
