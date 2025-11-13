import { ApiProperty } from '@nestjs/swagger';

export class EmployeeResponseDto {
  @ApiProperty({ example: 'Syamsul Hadi' })
  name: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;
}
