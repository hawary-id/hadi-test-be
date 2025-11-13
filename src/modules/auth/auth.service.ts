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
  async register(dto: CreateUserDto, userId: string) {
    const hashedPassword = await HashUtil.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: hashedPassword,
          email: dto.email,
          name: dto.name,
          phone: dto.phone,
          address: dto.address,
          countryId: dto.countryId,
          provinceId: dto.provinceId,
          cityId: dto.cityId,
          employeeId: dto.employeeId,
          createdBy: userId,
          updatedBy: userId,
        },
      });

      const companyIds = dto.companyIds;
      await this.prisma.userCompanyRole.createMany({
        data: companyIds.map((companyId: string) => ({
          userId: user.id,
          companyId,
        })),
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
      include: {
        companyUsers: true,
        userGroups: true,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await HashUtil.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwt.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }
}
