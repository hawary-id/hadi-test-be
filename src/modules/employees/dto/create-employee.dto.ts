import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Syamsul Hadi' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
