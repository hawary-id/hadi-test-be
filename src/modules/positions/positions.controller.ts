import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreatePositionDto } from './dto/create-position.dto';
import { ApiCreatedBaseResponse } from 'src/common/decorators/api-created-base-response.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-base-response.decorator';
import { PositionResponseDto } from './dto/position-response.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @ApiBody({ type: CreatePositionDto })
  @ApiCreatedBaseResponse(CreatePositionDto)
  @ApiResponse({ status: 409, description: 'Position already exists' })
  create(@Body() dto: CreatePositionDto) {
    return this.positionsService.create(dto);
  }

  @Get('all')
  @ApiBaseResponse(PositionResponseDto)
  findAll() {
    return this.positionsService.findAll();
  }

  @Get()
  @ApiBaseResponse(PositionResponseDto)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, example: 'Minuman' })
  @ApiQuery({ name: 'orderBy', required: false, enum: ['name', 'createdAt'] })
  @ApiQuery({ name: 'orderDir', required: false, enum: ['asc', 'desc'] })
  findAllPaginate(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'name' | 'createdAt',
    @Query('orderDir') orderDir?: 'asc' | 'desc',
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    return this.positionsService.findAllPaginate(
      pageNum,
      limitNum,
      search,
      orderBy,
      orderDir,
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'uuid-position-id' })
  @ApiBaseResponse(PositionResponseDto)
  @ApiResponse({ status: 404, description: 'Position not found' })
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 'uuid-position-id' })
  @ApiBody({ type: UpdatePositionDto })
  @ApiBaseResponse(PositionResponseDto)
  @ApiResponse({ status: 404, description: 'Position not found' })
  update(@Param('id') id: string, @Body() dto: UpdatePositionDto) {
    return this.positionsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', example: 'uuid-position-id' })
  @ApiResponse({ status: 204, description: 'Position deleted successfully' })
  @ApiResponse({ status: 404, description: 'Position not found' })
  remove(@Param('id') id: string) {
    return this.positionsService.remove(id);
  }
}
