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
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCreatedBaseResponse } from 'src/common/decorators/api-created-base-response.decorator';
import { CompanyResponseDto } from './dto/company-response.dto';
import { ApiBaseResponse } from 'src/common/decorators/api-base-response.decorator';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateCompanyDto })
  @ApiCreatedBaseResponse(CreateCompanyDto)
  @ApiResponse({ status: 409, description: 'Company already exists' })
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Get('all')
  @ApiBaseResponse(CompanyResponseDto)
  findAll() {
    return this.companiesService.findAll();
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBaseResponse(CompanyResponseDto)
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
    return this.companiesService.findAllPaginate(
      pageNum,
      limitNum,
      search,
      orderBy,
      orderDir,
    );
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', example: 'uuid-company-id' })
  @ApiBaseResponse(CompanyResponseDto)
  @ApiResponse({ status: 404, description: 'Company not found' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiParam({ name: 'id', example: 'uuid-company-id' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiBaseResponse(CompanyResponseDto)
  @ApiResponse({ status: 404, description: 'Company not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.update(id, dto);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', example: 'uuid-company-id' })
  @ApiResponse({ status: 204, description: 'Company deleted successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
