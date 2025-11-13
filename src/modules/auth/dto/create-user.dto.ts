import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CompanyPositionDto } from './company-position.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'hadi@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'hadi' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Syamsul Hadi' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '085775544444' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Jakarta' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'uuid-country-id' })
  @IsNotEmpty()
  countryId: string;

  @ApiProperty({ example: 'uuid-province-id' })
  @IsNotEmpty()
  provinceId: string;

  @ApiProperty({ example: 'uuid-city-id' })
  @IsNotEmpty()
  cityId: string;

  @ApiProperty({ example: 'uuid-employee-id' })
  @IsNotEmpty()
  employeeId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CompanyPositionDto)
  @ApiProperty({
    type: [CompanyPositionDto],
    example: [
      {
        companyId: 'uuid-company-id',
        positionId: 'uuid-position-id',
      },
    ],
  })
  companyPositions: CompanyPositionDto[];
}
