import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty({ example: 'uuid-company-id' })
  id: string;

  @ApiProperty({ example: 'PT ABC' })
  name: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;
}
