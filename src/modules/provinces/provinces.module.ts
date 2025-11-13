import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

@Module({
  providers: [ProvincesService]
})
export class ProvincesModule {}
