import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    OrganizationsModule,
    EmployeesModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
