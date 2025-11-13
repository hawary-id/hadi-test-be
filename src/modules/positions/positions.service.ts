import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { UpdatePositionDto } from './dto/update-position.dto';
import { CreatePositionDto } from './dto/create-position.dto';

@Injectable()
export class PositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePositionDto) {
    try {
      return await this.prisma.position.create({
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
        throw new ConflictException('Position name already exists');
      }
      throw error;
    }
  }

  async findAllPaginate(
    page = 1,
    limit = 10,
    search?: string,
    orderByField: keyof Prisma.PositionOrderByWithRelationInput = 'createdAt',
    orderDir: 'asc' | 'desc' = 'desc',
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.PositionWhereInput = { deletedAt: null };

    if (search) {
      where.name = {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const orderBy: Prisma.PositionOrderByWithRelationInput = {
      [orderByField]: orderDir,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.position.findMany({
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
      this.prisma.position.count({ where }),
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
    return this.prisma.position.findMany({
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
    const position = await this.prisma.position.findUnique({
      where: { id: id, deletedAt: null },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    if (!position) throw new NotFoundException('Position not found');
    return position;
  }

  async update(id: string, dto: UpdatePositionDto) {
    try {
      const updated = await this.prisma.position.update({
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
          throw new NotFoundException('Position not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Position code already exists');
        }
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.position.update({
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
        throw new NotFoundException('Position not found');
      }
      throw error;
    }
  }
}
