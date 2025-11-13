import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePositionDto } from './create-province.dto';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
  @ApiPropertyOptional({ example: 'Programmer' })
  name?: string;
}
