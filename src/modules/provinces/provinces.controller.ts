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
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiCreatedBaseResponse } from 'src/common/decorators/api-created-base-response.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-base-response.decorator';
import { ProvinceResponseDto } from './dto/province-response.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  @ApiBody({ type: CreateProvinceDto })
  @ApiCreatedBaseResponse(CreateProvinceDto)
  @ApiResponse({ status: 409, description: 'Province already exists' })
  create(@Body() dto: CreateProvinceDto) {
    return this.provincesService.create(dto);
  }

  @Get('all')
  @ApiBaseResponse(ProvinceResponseDto)
  findAll() {
    return this.provincesService.findAll();
  }

  @Get()
  @ApiBaseResponse(ProvinceResponseDto)
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
    return this.provincesService.findAllPaginate(
      pageNum,
      limitNum,
      search,
      orderBy,
      orderDir,
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'uuid-province-id' })
  @ApiBaseResponse(ProvinceResponseDto)
  @ApiResponse({ status: 404, description: 'Province not found' })
  findOne(@Param('id') id: string) {
    return this.provincesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 'uuid-province-id' })
  @ApiBody({ type: UpdateProvinceDto })
  @ApiBaseResponse(ProvinceResponseDto)
  @ApiResponse({ status: 404, description: 'Province not found' })
  update(@Param('id') id: string, @Body() dto: UpdateProvinceDto) {
    return this.provincesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', example: 'uuid-province-id' })
  @ApiResponse({ status: 204, description: 'Province deleted successfully' })
  @ApiResponse({ status: 404, description: 'Province not found' })
  remove(@Param('id') id: string) {
    return this.provincesService.remove(id);
  }
}
