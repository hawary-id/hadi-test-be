import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { Prisma } from 'generated/prisma/client';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProvinceDto) {
    try {
      return await this.prisma.province.create({
        data: {
          name: dto.name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Province name already exists');
      }
      throw error;
    }
  }

  async findAllPaginate(
    page = 1,
    limit = 10,
    search?: string,
    orderByField: keyof Prisma.ProvinceOrderByWithRelationInput = 'createdAt',
    orderDir: 'asc' | 'desc' = 'desc',
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.ProvinceWhereInput = { deletedAt: null };

    if (search) {
      where.name = {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const orderBy: Prisma.ProvinceOrderByWithRelationInput = {
      [orderByField]: orderDir,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.province.findMany({
        skip,
        take: limit,
        where,
        orderBy,
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      }),
      this.prisma.province.count({ where }),
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
    return this.prisma.province.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
      where: { deletedAt: null },
    });
  }

  async findOne(id: string) {
    const province = await this.prisma.province.findUnique({
      where: { id: id, deletedAt: null },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    if (!province) throw new NotFoundException('Province not found');
    return province;
  }

  async update(id: string, dto: UpdateProvinceDto) {
    try {
      const updated = await this.prisma.province.update({
        where: { id: id },
        data: {
          ...dto,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });
      return updated;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Province not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Province code already exists');
        }
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.province.update({
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
        throw new NotFoundException('Province not found');
      }
      throw error;
    }
  }
}
