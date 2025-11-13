import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './modules/auth/auth.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CountriesModule } from './modules/countries/countries.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { PositionsModule } from './modules/positions/positions.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { PrismaModule } from './prisma/prisma.module';

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
    EmployeesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
