import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Prisma } from 'generated/prisma/client';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data: {
          code: dto.code,
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
        throw new ConflictException('Company name already exists');
      }
      throw error;
    }
  }

  async findAllPaginate(
    page = 1,
    limit = 10,
    search?: string,
    orderByField: keyof Prisma.CompanyOrderByWithRelationInput = 'createdAt',
    orderDir: 'asc' | 'desc' = 'desc',
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.CompanyWhereInput = {};

    if (search) {
      where.name = {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const orderBy: Prisma.CompanyOrderByWithRelationInput = {
      [orderByField]: orderDir,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.company.findMany({
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
      this.prisma.company.count({ where }),
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
    return this.prisma.company.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: id },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
    });

    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: string, dto: UpdateCompanyDto) {
    try {
      const updated = await this.prisma.company.update({
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
          throw new NotFoundException('Company not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Company code already exists');
        }
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.company.update({
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
        throw new NotFoundException('Company not found');
      }
      throw error;
    }
  }
}
