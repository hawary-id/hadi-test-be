import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CompaniesController } from './modules/companies/companies.controller';
import { CompaniesService } from './modules/companies/companies.service';
import { CompaniesModule } from './modules/companies/companies.module';
import { CountriesController } from './modules/countries/countries.controller';
import { CountriesService } from './modules/countries/countries.service';
import { CountriesModule } from './modules/countries/countries.module';
import { CitiesController } from './modules/cities/cities.controller';
import { CitiesService } from './modules/cities/cities.service';
import { CitiesModule } from './modules/cities/cities.module';
import { PositionsModule } from './modules/positions/positions.module';
import jwtConfig from './config/jwt.config';
import { PositionsService } from './modules/positions/positions.service';
import { PositionsController } from './modules/positions/positions.controller';
import { ProvincesController } from './modules/provinces/provinces.controller';
import { ProvincesModule } from './modules/provinces/provinces.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    PrismaModule,
    AuthModule,
    CompaniesModule,
    CountriesModule,
    CitiesModule,
    PositionsModule,
    ProvincesModule,
  ],
  controllers: [
    AppController,
    CompaniesController,
    CountriesController,
    CitiesController,
    PositionsController,
    ProvincesController,
  ],
  providers: [
    AppService,
    CompaniesService,
    CountriesService,
    CitiesService,
    PositionsService,
  ],
})
export class AppModule {}
