import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { Prisma } from 'generated/prisma/client';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCityDto) {
    try {
      return await this.prisma.city.create({
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
        throw new ConflictException('City name already exists');
      }
      throw error;
    }
  }

  async findAllPaginate(
    page = 1,
    limit = 10,
    search?: string,
    orderByField: keyof Prisma.CityOrderByWithRelationInput = 'createdAt',
    orderDir: 'asc' | 'desc' = 'desc',
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.CityWhereInput = {};

    if (search) {
      where.name = {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const orderBy: Prisma.CityOrderByWithRelationInput = {
      [orderByField]: orderDir,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.city.findMany({
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
      this.prisma.city.count({ where }),
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
    return this.prisma.city.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  async update(id: string, dto: UpdateCityDto) {
    try {
      const updated = await this.prisma.city.update({
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
          throw new NotFoundException('City not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('City code already exists');
        }
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.city.update({
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
        throw new NotFoundException('City not found');
      }
      throw error;
    }
  }
}
