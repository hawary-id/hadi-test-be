import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 10 })
  totalPages: number;

  @ApiProperty({ example: 'milk', nullable: true })
  search?: string | null;

  @ApiProperty({ example: 'uuid-category-id', nullable: true })
  categoryId?: string | null;

  @ApiProperty({ example: 'price_desc', nullable: true })
  sort?: string | null;
}
