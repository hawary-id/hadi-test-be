import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'hadi@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'hadi@mail.com' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Syamsul Hadi' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  postCode: string;

  @ApiProperty({ example: 'uuid-position-id' })
  @IsNotEmpty()
  positionId: string;

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

  @ApiProperty({
    example: ['uuid-company-id', 'uuid-company-id'],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  companyIds: string[];
}
