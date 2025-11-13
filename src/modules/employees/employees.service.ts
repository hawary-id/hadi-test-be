import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Prisma } from 'generated/prisma/client';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    try {
      return await this.prisma.employee.create({
        data: {
          name: dto.name,
        },
        select: {
          id: true,
          code: true,
          name: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Employee code already exists');
      }
      throw error;
    }
  }

  async findAllPaginate(
    page = 1,
    limit = 10,
    search?: string,
    orderByField: keyof Prisma.EmployeeOrderByWithRelationInput = 'createdAt',
    orderDir: 'asc' | 'desc' = 'desc',
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeWhereInput = { deletedAt: null };

    if (search) {
      where.name = {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const orderBy: Prisma.EmployeeOrderByWithRelationInput = {
      [orderByField]: orderDir,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        skip,
        take: limit,
        where,
        orderBy,
        select: {
          id: true,
          code: true,
          name: true,
          createdAt: true,
        },
      }),
      this.prisma.employee.count({ where }),
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      search: search ?? null,
      orderBy: orderByField,
      orderDir,
    };
  }

  findAll() {
    return this.prisma.employee.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
      where: { deletedAt: null },
    });
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: id, deletedAt: null },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
    });

    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    try {
      const updated = await this.prisma.employee.update({
        where: { id: id },
        data: {
          ...dto,
        },
        select: {
          id: true,
          code: true,
          name: true,
          createdAt: true,
        },
      });
      return updated;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Employee not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Employee code already exists');
        }
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.employee.update({
        where: { id: id },
        data: {
          deletedAt: new Date(),
        },
      });
      return { id };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Employee not found');
      }
      throw error;
    }
  }
}
