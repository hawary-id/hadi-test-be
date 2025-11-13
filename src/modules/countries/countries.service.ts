import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { Prisma } from 'generated/prisma/client';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCountryDto) {
    try {
      return await this.prisma.country.create({
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
        throw new ConflictException('Country name already exists');
      }
      throw error;
    }
  }

  async findAllPaginate(
    page = 1,
    limit = 10,
    search?: string,
    orderByField: keyof Prisma.CountryOrderByWithRelationInput = 'createdAt',
    orderDir: 'asc' | 'desc' = 'desc',
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.CountryWhereInput = { deletedAt: null };

    if (search) {
      where.name = {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const orderBy: Prisma.CountryOrderByWithRelationInput = {
      [orderByField]: orderDir,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.country.findMany({
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
      this.prisma.country.count({ where }),
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
    return this.prisma.country.findMany({
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
    const country = await this.prisma.country.findUnique({
      where: { id: id, deletedAt: null },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    if (!country) throw new NotFoundException('Country not found');
    return country;
  }

  async update(id: string, dto: UpdateCountryDto) {
    try {
      const updated = await this.prisma.country.update({
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
          throw new NotFoundException('Country not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Country code already exists');
        }
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.country.update({
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
        throw new NotFoundException('Country not found');
      }
      throw error;
    }
  }
}
