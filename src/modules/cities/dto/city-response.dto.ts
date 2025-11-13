import { ApiProperty } from '@nestjs/swagger';

export class CityResponseDto {
  @ApiProperty({ example: 'uuid-city-id' })
  id: string;

  @ApiProperty({ example: 'Jakarta' })
  name: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;
}
