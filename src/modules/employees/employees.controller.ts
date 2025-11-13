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
import { EmployeesService } from './employees.service';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiCreatedBaseResponse } from 'src/common/decorators/api-created-base-response.decorator';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { ApiBaseResponse } from 'src/common/decorators/api-base-response.decorator';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiBody({ type: CreateEmployeeDto })
  @ApiCreatedBaseResponse(CreateEmployeeDto)
  @ApiResponse({ status: 409, description: 'Employee already exists' })
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Get('all')
  @ApiBaseResponse(EmployeeResponseDto)
  findAll() {
    return this.employeesService.findAll();
  }

  @Get()
  @ApiBaseResponse(EmployeeResponseDto)
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
    return this.employeesService.findAllPaginate(
      pageNum,
      limitNum,
      search,
      orderBy,
      orderDir,
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'uuid-employee-id' })
  @ApiBaseResponse(EmployeeResponseDto)
  @ApiResponse({ status: 404, description: 'Employee not found' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 'uuid-employee-id' })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiBaseResponse(EmployeeResponseDto)
  @ApiResponse({ status: 404, description: 'Employee not found' })
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', example: 'uuid-employee-id' })
  @ApiResponse({ status: 204, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
