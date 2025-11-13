import { ApiProperty } from '@nestjs/swagger';

export class ProvinceResponseDto {
  @ApiProperty({ example: 'uuid-province-id' })
  id: string;

  @ApiProperty({ example: 'Jawa barat' })
  name: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;
}
