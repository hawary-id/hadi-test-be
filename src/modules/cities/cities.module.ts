import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

@Module({
  imports: [PrismaModule],
  providers: [CitiesService],
  controllers: [CitiesController],
  exports: [CitiesService],
})
export class CitiesModule {}
