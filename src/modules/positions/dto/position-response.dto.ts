import { ApiProperty } from '@nestjs/swagger';

export class PositionResponseDto {
  @ApiProperty({ example: 'uuid-position-id' })
  id: string;

  @ApiProperty({ example: 'Programmer' })
  name: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;
}
