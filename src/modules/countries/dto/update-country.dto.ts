import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCountryDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  @ApiPropertyOptional({ example: 'Indonesia' })
  name?: string;
}
