import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, PrismaService, ConfigService],
})
export class OrganizationsModule {}
