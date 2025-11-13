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
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiBaseResponse } from 'src/common/decorators/api-base-response.decorator';
import { ApiCreatedBaseResponse } from 'src/common/decorators/api-created-base-response.decorator';
import { CountriesService } from './countries.service';
import { CountryResponseDto } from './dto/country-response.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiBody({ type: CreateCountryDto })
  @ApiCreatedBaseResponse(CreateCountryDto)
  @ApiResponse({ status: 409, description: 'Cauntry already exists' })
  create(@Body() dto: CreateCountryDto) {
    return this.countriesService.create(dto);
  }

  @Get('all')
  @ApiBaseResponse(CountryResponseDto)
  findAll() {
    return this.countriesService.findAll();
  }

  @Get()
  @ApiBaseResponse(CountryResponseDto)
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
    return this.countriesService.findAllPaginate(
      pageNum,
      limitNum,
      search,
      orderBy,
      orderDir,
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'uuid-country-id' })
  @ApiBaseResponse(CountryResponseDto)
  @ApiResponse({ status: 404, description: 'Country not found' })
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 'uuid-country-id' })
  @ApiBody({ type: UpdateCountryDto })
  @ApiBaseResponse(UpdateCountryDto)
  @ApiResponse({ status: 404, description: 'Country not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    return this.countriesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', example: 'uuid-country-id' })
  @ApiResponse({ status: 204, description: 'Country deleted successfully' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  remove(@Param('id') id: string) {
    return this.countriesService.remove(id);
  }
}
