import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
  imports: [PrismaModule],
  providers: [CountriesService],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
