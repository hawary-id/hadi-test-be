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
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CityResponseDto } from './dto/city-response.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiCreatedBaseResponse } from 'src/common/decorators/api-created-base-response.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-base-response.decorator';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiBody({ type: CreateCityDto })
  @ApiCreatedBaseResponse(CreateCityDto)
  @ApiResponse({ status: 409, description: 'City already exists' })
  create(@Body() dto: CreateCityDto) {
    return this.citiesService.create(dto);
  }

  @Get('all')
  @ApiBaseResponse(CityResponseDto)
  findAll() {
    return this.citiesService.findAll();
  }

  @Get()
  @ApiBaseResponse(CityResponseDto)
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
    return this.citiesService.findAllPaginate(
      pageNum,
      limitNum,
      search,
      orderBy,
      orderDir,
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'uuid-city-id' })
  @ApiBaseResponse(CityResponseDto)
  @ApiResponse({ status: 404, description: 'City not found' })
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 'uuid-city-id' })
  @ApiBody({ type: UpdateCityDto })
  @ApiBaseResponse(CityResponseDto)
  @ApiResponse({ status: 404, description: 'City not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    return this.citiesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', example: 'uuid-city-id' })
  @ApiResponse({ status: 204, description: 'City deleted successfully' })
  @ApiResponse({ status: 404, description: 'City not found' })
  remove(@Param('id') id: string) {
    return this.citiesService.remove(id);
  }
}
