import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HashUtil } from 'src/common/utils/hash.util';
import { Prisma } from 'generated/prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async register(dto: CreateUserDto) {
    const hashedPassword = await HashUtil.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password: hashedPassword,
          name: dto.name,
          phone: dto.phone,
          address: dto.address,
          countryId: dto.countryId,
          provinceId: dto.provinceId,
          cityId: dto.cityId,
          employeeId: dto.employeeId,
        },
      });

      const items = dto.companyPositions.map((item) => ({
        userId: user.id,
        companyId: item.companyId,
        positionId: item.positionId,
        createdBy: user.id,
        updatedBy: user.id,
      }));

      await this.prisma.userCompanyRole.createMany({
        data: items,
        skipDuplicates: true,
      });

      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email or username already in use');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
      select: {
        id: true,
        username: true,
        password: true,
        userCompanyRoles: {
          select: {
            company: {
              select: {
                code: true,
                name: true,
              },
            },
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await HashUtil.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      id: user.id,
      username: user.username,
      roleCompanies: user.userCompanyRoles,
    };

    const accessToken = await this.jwt.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }
}
