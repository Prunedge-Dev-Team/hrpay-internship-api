import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        SALT: Joi.number().required(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    OrganizationsModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
