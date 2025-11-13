import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({ example: 'Jakarta' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
