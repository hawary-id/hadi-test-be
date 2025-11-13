import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({ example: 'Programmer' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
