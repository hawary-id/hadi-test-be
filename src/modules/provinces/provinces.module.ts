import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProvincesController } from './provinces.controller';

@Module({
  imports: [PrismaModule],
  providers: [ProvincesService],
  controllers: [ProvincesController],
  exports: [ProvincesService],
})
export class ProvincesModule {}
