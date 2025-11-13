import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProvinceDto } from './create-province.dto';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
  @ApiPropertyOptional({ example: 'Jawa Barat' })
  name?: string;
}
